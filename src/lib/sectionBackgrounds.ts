export type SectionBackgroundKey =
  | "heartFormula"
  | "childhoodPhotos"
  | "dateCalendar"
  | "countdown"
  | "timeline"
  | "wishes"
  | "questions"
  | "rsvpForm"
  | "footerHeart"
  | "footer";

export interface BackgroundDecoration {
  image: number;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  mobileTop?: string;
  mobileRight?: string;
  mobileBottom?: string;
  mobileLeft?: string;
  width: string;
  mobileWidth?: string;
  rotate?: number;
  opacity?: number;
  mobileOpacity?: number;
  flip?: boolean;
  desktopOnly?: boolean;
}

const W = "clamp(64px, 13vw, 168px)";
const W_LG = "clamp(80px, 16vw, 200px)";
const W_SM = "clamp(48px, 10vw, 120px)";
const W_MOBILE = "64px";

/** Top-left corner — visible on mobile, clear of centered content */
const M_TL = {
  mobileTop: "3%",
  mobileLeft: "0%",
  mobileRight: "auto",
  mobileBottom: "auto",
  mobileWidth: W_MOBILE,
  mobileOpacity: 0.3,
} as const;

/** Bottom-right corner — visible on mobile */
const M_BR = {
  mobileTop: "auto",
  mobileLeft: "auto",
  mobileBottom: "3%",
  mobileRight: "0%",
  mobileWidth: W_MOBILE,
  mobileOpacity: 0.3,
} as const;

function pack(
  startId: number,
  layout: Omit<BackgroundDecoration, "image">[],
): BackgroundDecoration[] {
  return layout.map((item, index) => ({
    image: startId + index,
    ...item,
  }));
}

export const SECTION_BACKGROUNDS: Record<
  SectionBackgroundKey,
  BackgroundDecoration[]
> = {
  heartFormula: pack(1, [
    {
      top: "0%",
      left: "-6%",
      width: W,
      rotate: -16,
      opacity: 0.26,
      ...M_TL,
    },
    {
      top: "0%",
      right: "-6%",
      width: W_SM,
      rotate: 14,
      opacity: 0.24,
      flip: true,
      desktopOnly: true,
    },
    {
      bottom: "0%",
      left: "2%",
      width: W_SM,
      rotate: 10,
      opacity: 0.22,
      desktopOnly: true,
    },
    {
      bottom: "0%",
      right: "-5%",
      width: W,
      rotate: -8,
      opacity: 0.25,
      ...M_BR,
    },
  ]),
  childhoodPhotos: pack(5, [
    {
      top: "4%",
      left: "-7%",
      width: W_LG,
      rotate: -10,
      opacity: 0.27,
      ...M_TL,
    },
    {
      top: "22%",
      right: "-8%",
      width: W,
      rotate: 18,
      opacity: 0.23,
      flip: true,
      desktopOnly: true,
    },
    {
      bottom: "18%",
      left: "-4%",
      width: W_SM,
      rotate: 12,
      opacity: 0.21,
      desktopOnly: true,
    },
    {
      bottom: "2%",
      right: "-7%",
      width: W_LG,
      rotate: -14,
      opacity: 0.26,
      ...M_BR,
    },
  ]),
  dateCalendar: pack(9, [
    {
      top: "2%",
      left: "-5%",
      width: W,
      rotate: -12,
      opacity: 0.25,
      ...M_TL,
    },
    {
      top: "28%",
      right: "-6%",
      width: W_LG,
      rotate: 8,
      opacity: 0.24,
      desktopOnly: true,
    },
    {
      bottom: "20%",
      left: "-3%",
      width: W_SM,
      rotate: -18,
      opacity: 0.22,
      desktopOnly: true,
    },
    {
      bottom: "0%",
      right: "-6%",
      width: W,
      rotate: 15,
      opacity: 0.26,
      flip: true,
      ...M_BR,
    },
  ]),
  countdown: pack(13, [
    {
      top: "0%",
      left: "-8%",
      width: W_SM,
      rotate: 14,
      opacity: 0.24,
      ...M_TL,
    },
    {
      top: "30%",
      right: "-7%",
      width: W,
      rotate: -10,
      opacity: 0.23,
      desktopOnly: true,
    },
    {
      bottom: "25%",
      left: "-4%",
      width: W,
      rotate: 6,
      opacity: 0.22,
      desktopOnly: true,
    },
    {
      bottom: "0%",
      right: "-8%",
      width: W_SM,
      rotate: -16,
      opacity: 0.25,
      flip: true,
      ...M_BR,
    },
  ]),
  timeline: pack(17, [
    {
      top: "1%",
      left: "-6%",
      width: W,
      rotate: -14,
      opacity: 0.26,
      ...M_TL,
    },
    {
      top: "35%",
      right: "-7%",
      width: W_LG,
      rotate: 11,
      opacity: 0.24,
      desktopOnly: true,
    },
    {
      bottom: "35%",
      left: "-5%",
      width: W_SM,
      rotate: -8,
      opacity: 0.22,
      desktopOnly: true,
    },
    {
      bottom: "1%",
      right: "-6%",
      width: W,
      rotate: 16,
      opacity: 0.25,
      flip: true,
      ...M_BR,
    },
  ]),
  wishes: pack(21, [
    {
      top: "3%",
      left: "-7%",
      width: W_LG,
      rotate: -10,
      opacity: 0.25,
      ...M_TL,
    },
    {
      top: "40%",
      right: "-8%",
      width: W,
      rotate: 12,
      opacity: 0.23,
      desktopOnly: true,
    },
    {
      bottom: "30%",
      left: "-4%",
      width: W_SM,
      rotate: -15,
      opacity: 0.21,
      desktopOnly: true,
    },
    {
      bottom: "2%",
      right: "-7%",
      width: W_LG,
      rotate: 8,
      opacity: 0.26,
      ...M_BR,
    },
  ]),
  questions: pack(25, [
    {
      top: "0%",
      left: "-6%",
      width: W_SM,
      rotate: -12,
      opacity: 0.24,
      ...M_TL,
    },
    {
      top: "25%",
      right: "-7%",
      width: W,
      rotate: 14,
      opacity: 0.22,
      flip: true,
      desktopOnly: true,
    },
    {
      bottom: "20%",
      left: "-5%",
      width: W,
      rotate: -6,
      opacity: 0.21,
      desktopOnly: true,
    },
    {
      bottom: "0%",
      right: "-6%",
      width: W_SM,
      rotate: 10,
      opacity: 0.25,
      ...M_BR,
    },
  ]),
  rsvpForm: [
    {
      image: 11,
      top: "2%",
      left: "-7%",
      width: W_LG,
      rotate: -14,
      opacity: 0.26,
      ...M_TL,
    },
    {
      image: 30,
      top: "38%",
      right: "-8%",
      width: W,
      rotate: 9,
      opacity: 0.23,
      desktopOnly: true,
    },
    {
      image: 31,
      bottom: "32%",
      left: "-4%",
      width: W_SM,
      rotate: 16,
      opacity: 0.22,
      desktopOnly: true,
    },
    {
      image: 19,
      bottom: "1%",
      right: "-7%",
      width: W_LG,
      rotate: -11,
      opacity: 0.25,
      flip: true,
      ...M_BR,
    },
  ],
  footerHeart: pack(33, [
    {
      top: "0%",
      left: "-8%",
      width: W_SM,
      rotate: -10,
      opacity: 0.24,
      ...M_TL,
    },
    {
      top: "0%",
      right: "-8%",
      width: W_SM,
      rotate: 10,
      opacity: 0.24,
      flip: true,
      desktopOnly: true,
    },
    {
      bottom: "0%",
      left: "-4%",
      width: W_SM,
      rotate: 8,
      opacity: 0.2,
      desktopOnly: true,
    },
    {
      bottom: "0%",
      right: "-8%",
      width: W_SM,
      rotate: -8,
      opacity: 0.24,
      flip: true,
      ...M_BR,
    },
  ]),
  footer: pack(37, [
    {
      top: "0%",
      left: "-10%",
      width: W_SM,
      rotate: 12,
      opacity: 0.22,
      mobileTop: "5%",
      mobileLeft: "0%",
      mobileRight: "auto",
      mobileBottom: "auto",
      mobileWidth: "56px",
      mobileOpacity: 0.28,
    },
    {
      top: "0%",
      right: "-10%",
      width: W_SM,
      rotate: -12,
      opacity: 0.22,
      flip: true,
      desktopOnly: true,
    },
    {
      bottom: "0%",
      left: "-8%",
      width: W_SM,
      rotate: -8,
      opacity: 0.2,
      desktopOnly: true,
    },
    {
      bottom: "0%",
      right: "-10%",
      width: W_SM,
      rotate: 8,
      opacity: 0.22,
      flip: true,
      mobileTop: "auto",
      mobileLeft: "auto",
      mobileBottom: "5%",
      mobileRight: "0%",
      mobileWidth: "56px",
      mobileOpacity: 0.28,
    },
  ]),
};
