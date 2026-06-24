import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type CompanionRecord = {
  firstName?: string;
  lastName?: string;
};

function countCompanions(
  companions: unknown,
): number {
  if (!Array.isArray(companions)) return 0;

  return companions.filter((companion) => {
    const record = companion as CompanionRecord;
    return Boolean(record.firstName?.trim() || record.lastName?.trim());
  }).length;
}

export async function GET(request: NextRequest) {
  const password = request.headers.get("x-guest-password");
  const expected = process.env.GUEST_PAGE_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const guests = await prisma.guest.findMany({
      orderBy: { createdAt: "desc" },
    });

    const stats = {
      total: guests.length,
      coming: guests.filter((g) => g.attendance === "coming").length,
      notComing: guests.filter((g) => g.attendance === "not_coming").length,
      unsure: guests.filter((g) => g.attendance === "unsure").length,
      withTransfer: guests.filter((g) => g.transfer === "yes").length,
      withPool: guests.filter((g) => g.pool).length,
      companions: guests.reduce(
        (sum, guest) => sum + countCompanions(guest.companions),
        0,
      ),
      comingCompanions: guests
        .filter((g) => g.attendance === "coming")
        .reduce((sum, guest) => sum + countCompanions(guest.companions), 0),
    };

    const totalComing = stats.coming + stats.comingCompanions;

    return NextResponse.json({ guests, stats: { ...stats, totalComing } });
  } catch (error) {
    console.error("Guests fetch error:", error);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
