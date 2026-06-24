"use client";

import { DRINK_OPTIONS } from "@/lib/constants";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionBackground } from "./SectionBackground";

interface Companion {
  firstName: string;
  lastName: string;
}

type Attendance = "coming" | "not_coming" | "unsure";
type Transfer = "yes" | "no";

const TRANSFER_OPTIONS: { value: Transfer; label: string }[] = [
  { value: "yes", label: "Да" },
  { value: "no", label: "Нет" },
];

const ATTENDANCE_OPTIONS: { value: Attendance; label: string }[] = [
  { value: "coming", label: "Да, с радостью!" },
  { value: "not_coming", label: "Нет, не смогу:(" },
];

export function RsvpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [withCompanion, setWithCompanion] = useState(false);
  const [companions, setCompanions] = useState<Companion[]>([
    { firstName: "", lastName: "" },
  ]);
  const [attendance, setAttendance] = useState<Attendance>("coming");
  const [drinks, setDrinks] = useState<string[]>([]);
  const [transfer, setTransfer] = useState<Transfer | null>(null);
  const [pool, setPool] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const toggleDrink = (drink: string) => {
    setDrinks((prev) =>
      prev.includes(drink) ? prev.filter((d) => d !== drink) : [...prev, drink]
    );
  };

  const addCompanion = () => {
    setCompanions((prev) => [...prev, { firstName: "", lastName: "" }]);
  };

  const updateCompanion = (
    index: number,
    field: keyof Companion,
    value: string
  ) => {
    setCompanions((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const removeCompanion = (index: number) => {
    setCompanions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pool === null || transfer === null) return;

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          attendance,
          drinks,
          transfer,
          pool,
          companions: withCompanion
            ? companions.filter((c) => c.firstName.trim() || c.lastName.trim())
            : [],
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFirstName("");
      setLastName("");
      setWithCompanion(false);
      setCompanions([{ firstName: "", lastName: "" }]);
      setAttendance("coming");
      setDrinks([]);
      setTransfer(null);
      setPool(null);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-canvas section-bg pb-20">
      <SectionBackground section="rsvpForm" />
      <div className="section-bg__content">
        <ScrollReveal>
        <h2 className="font-display text-5xl md:text-6xl text-center text-ink mb-4">
          Анкета гостя
        </h2>
        <p className="font-body text-xl text-center text-ink-muted mb-12">
          Пожалуйста, заполните форму до 1 августа 2026
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <form
          onSubmit={handleSubmit}
          className="glass-card max-w-2xl mx-auto p-8 md:p-12 space-y-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Имя" required>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-input"
                placeholder="Иван"
              />
            </Field>
            <Field label="Фамилия" required>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-input"
                placeholder="Иванов"
              />
            </Field>
          </div>

          <fieldset>
            <legend className="font-body text-lg font-semibold text-ink mb-4">
              Приду один/одна или с гостями?
            </legend>
            <div className="flex flex-wrap gap-4">
              <RadioButton
                checked={!withCompanion}
                onChange={() => setWithCompanion(false)}
                label="Один/одна"
              />
              <RadioButton
                checked={withCompanion}
                onChange={() => setWithCompanion(true)}
                label="Не один/одна"
              />
            </div>
          </fieldset>

          {withCompanion && (
            <div className="space-y-4 pl-4 border-l-2 border-neutral-300/40">
              <p className="font-body text-ink-muted">
                Данные ваших спутников:
              </p>
              {companions.map((companion, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={companion.firstName}
                    onChange={(e) =>
                      updateCompanion(i, "firstName", e.target.value)
                    }
                    className="form-input"
                    placeholder="Имя гостя"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={companion.lastName}
                      onChange={(e) =>
                        updateCompanion(i, "lastName", e.target.value)
                      }
                      className="form-input flex-1"
                      placeholder="Фамилия гостя"
                    />
                    {companions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCompanion(i)}
                        className="px-3 text-ink-muted hover:text-red-400 transition-colors"
                        aria-label="Удалить гостя"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addCompanion}
                className="flex items-center gap-2 font-body text-ink hover:text-ink-muted transition-colors"
              >
                <span className="w-8 h-8 rounded-full border-2 border-neutral-300 flex items-center justify-center text-xl">
                  +
                </span>
                Добавить ещё гостя
              </button>
            </div>
          )}

          <fieldset>
            <legend className="font-body text-lg font-semibold text-ink mb-4">
              Ваш ответ
            </legend>
            <div className="flex flex-wrap gap-4">
              {ATTENDANCE_OPTIONS.map((opt) => (
                <RadioButton
                  key={opt.value}
                  checked={attendance === opt.value}
                  onChange={() => setAttendance(opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-body text-lg font-semibold text-ink mb-4">
              Предпочитаемые напитки
            </legend>
            <div className="flex flex-wrap gap-3">
              {DRINK_OPTIONS.map((drink) => (
                <button
                  key={drink}
                  type="button"
                  onClick={() => toggleDrink(drink)}
                  className={`px-4 py-2 rounded-full font-body text-base border-2 transition-colors cursor-pointer ${
                    drinks.includes(drink)
                      ? "bg-neutral-800 text-white border-neutral-800"
                      : "border-neutral-300/40 text-ink hover:border-neutral-400"
                  }`}
                >
                  {drink}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-body text-lg font-semibold text-ink mb-4">
              Пойдёте ли в бассейн?
            </legend>
            <div className="flex flex-wrap gap-4">
              <RadioButton
                checked={pool === true}
                onChange={() => setPool(true)}
                label="Да"
              />
              <RadioButton
                checked={pool === false}
                onChange={() => setPool(false)}
                label="Нет"
              />
            </div>
            {pool === true && (
              <p className="mt-3 font-body text-base text-ink-muted leading-relaxed">
                Отлично! Возьмите с собой купальники, полотенца и тапочки.
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className="font-body text-lg font-semibold text-ink mb-4">
              Нужен ли трансфер? (Для гостей из Ульяновска)
            </legend>
            <div className="flex flex-wrap gap-4">
              {TRANSFER_OPTIONS.map((opt) => (
                <RadioButton
                  key={opt.value}
                  checked={transfer === opt.value}
                  onChange={() => setTransfer(opt.value)}
                  label={opt.label}
                />
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={loading || pool === null || transfer === null}
            className="w-full py-4 btn-primary font-body text-xl rounded-full transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Отправляем..." : "Отправить"}
          </button>

          {status === "success" && (
            <p className="text-center font-body text-lg text-green-600">
              Спасибо! Ваш ответ сохранён 💙
            </p>
          )}
          {status === "error" && (
            <p className="text-center font-body text-lg text-red-500">
              Ошибка при отправке. Попробуйте ещё раз.
            </p>
          )}
        </form>
      </ScrollReveal>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-body text-lg font-semibold text-ink mb-2 block">
        {label}
        {required && <span className="text-ink-muted"> *</span>}
      </span>
      {children}
    </label>
  );
}

function RadioButton({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer font-body text-lg text-ink">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 accent-neutral-700"
      />
      {label}
    </label>
  );
}
