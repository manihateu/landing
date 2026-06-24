"use client";

import { useCallback, useState } from "react";

interface Companion {
  firstName: string;
  lastName: string;
}

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  attendance: string;
  drinks: string[];
  transfer: string;
  pool: boolean;
  companions: Companion[];
  createdAt: string;
}

interface Stats {
  total: number;
  coming: number;
  notComing: number;
  unsure: number;
  withTransfer: number;
  withPool: number;
  companions: number;
  comingCompanions: number;
  totalComing: number;
}

const ATTENDANCE_LABELS: Record<string, string> = {
  coming: "Придёт",
  not_coming: "Не придёт",
  unsure: "Не знает",
};

const TRANSFER_LABELS: Record<string, string> = {
  yes: "Да",
  no: "Нет",
};

export default function GuestPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGuests = useCallback(async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/guests", {
        headers: { "x-guest-password": pwd },
      });
      if (!res.ok) {
        setError("Неверный пароль");
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setGuests(data.guests);
      setStats(data.stats);
      setAuthenticated(true);
    } catch {
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGuests(password);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-sky-light">
        <form
          onSubmit={handleLogin}
          className="glass-card p-10 max-w-md w-full text-center"
        >
          <h1 className="font-display text-4xl text-ink mb-6">
            Список гостей
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            className="form-input w-full mb-4"
            required
          />
          {error && (
            <p className="text-red-500 font-body mb-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 btn-primary font-body text-lg rounded-full transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Загрузка..." : "Войти"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-sky-light">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl text-ink">
            Список гостей
          </h1>
          <button
            onClick={() => fetchGuests(password)}
            className="px-6 py-2 btn-primary rounded-full font-body transition-colors cursor-pointer"
          >
            Обновить
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {[
              { label: "Ответов", value: stats.total },
              { label: "Придут", value: stats.totalComing },
              { label: "Гостей", value: stats.coming },
              { label: "Спутников", value: stats.comingCompanions },
              { label: "Не придут", value: stats.notComing },
              { label: "Не знают", value: stats.unsure },
              { label: "Трансфер", value: stats.withTransfer },
              { label: "Бассейн", value: stats.withPool },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <p className="font-display text-3xl text-ink">{s.value}</p>
                <p className="font-body text-sm text-ink-muted">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="glass-card overflow-x-auto">
          <table className="w-full font-body text-left">
            <thead>
              <tr className="border-b border-neutral-200/30">
                <th className="p-4 text-ink font-semibold">Имя</th>
                <th className="p-4 text-ink font-semibold">Фамилия</th>
                <th className="p-4 text-ink font-semibold">Ответ</th>
                <th className="p-4 text-ink font-semibold">Напитки</th>
                <th className="p-4 text-ink font-semibold">Трансфер</th>
                <th className="p-4 text-ink font-semibold">Бассейн</th>
                <th className="p-4 text-ink font-semibold">Спутники</th>
                <th className="p-4 text-ink font-semibold">Дата</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr
                  key={guest.id}
                  className="border-b border-neutral-200/10 hover:bg-white/50"
                >
                  <td className="p-4">{guest.firstName}</td>
                  <td className="p-4">{guest.lastName}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        guest.attendance === "coming"
                          ? "bg-green-100 text-green-700"
                          : guest.attendance === "not_coming"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {ATTENDANCE_LABELS[guest.attendance] ?? guest.attendance}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {guest.drinks.length > 0
                      ? guest.drinks.join(", ")
                      : "—"}
                  </td>
                  <td className="p-4 text-sm">
                    {TRANSFER_LABELS[guest.transfer] ?? guest.transfer}
                  </td>
                  <td className="p-4 text-sm">
                    {guest.pool ? "Да" : "Нет"}
                  </td>
                  <td className="p-4 text-sm">
                    {Array.isArray(guest.companions) &&
                    guest.companions.length > 0
                      ? guest.companions
                          .map(
                            (c: Companion) =>
                              `${c.firstName} ${c.lastName}`.trim()
                          )
                          .join("; ")
                      : "—"}
                  </td>
                  <td className="p-4 text-sm text-ink-muted">
                    {new Date(guest.createdAt).toLocaleString("ru-RU")}
                  </td>
                </tr>
              ))}
              {guests.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-ink-muted">
                    Пока нет ответов
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
