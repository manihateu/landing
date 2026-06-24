import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface CompanionInput {
  firstName: string;
  lastName: string;
}

interface RsvpBody {
  firstName: string;
  lastName: string;
  attendance: string;
  drinks: string[];
  transfer: string;
  pool: boolean;
  companions: CompanionInput[];
}

const VALID_ATTENDANCE = ["coming", "not_coming", "unsure"];
const VALID_TRANSFER = ["yes", "no"];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RsvpBody;

    if (!body.firstName?.trim() || !body.lastName?.trim()) {
      return NextResponse.json(
        { error: "Имя и фамилия обязательны" },
        { status: 400 }
      );
    }

    if (!VALID_ATTENDANCE.includes(body.attendance)) {
      return NextResponse.json(
        { error: "Некорректный ответ о присутствии" },
        { status: 400 }
      );
    }

    if (!VALID_TRANSFER.includes(body.transfer)) {
      return NextResponse.json(
        { error: "Некорректный вариант трансфера" },
        { status: 400 }
      );
    }

    if (typeof body.pool !== "boolean") {
      return NextResponse.json(
        { error: "Укажите, планируете ли вы посещение бассейна" },
        { status: 400 }
      );
    }

    const guest = await prisma.guest.create({
      data: {
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        attendance: body.attendance,
        drinks: body.drinks ?? [],
        transfer: body.transfer,
        pool: body.pool,
        companions: (body.companions ?? []) as unknown as Prisma.InputJsonValue,
      },
    });

    return NextResponse.json({ success: true, id: guest.id }, { status: 201 });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
