import { ChildhoodPhotos } from "@/components/ChildhoodPhotos";
import { FooterHeart } from "@/components/FooterHeart";
import { Countdown } from "@/components/Countdown";
import { DateCalendar } from "@/components/DateCalendar";
import { HeartFormula } from "@/components/HeartFormula";
import { HeroSection } from "@/components/HeroSection";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Questions } from "@/components/Questions";
import { RsvpForm } from "@/components/RsvpForm";
import { SectionBackground } from "@/components/SectionBackground";
import { Timeline } from "@/components/Timeline";
import { Wishes } from "@/components/Wishes";

export default function Home() {
  return (
    <main className="min-h-screen">
      <MusicPlayer />
      <HeroSection />
      <HeartFormula />
      <ChildhoodPhotos />
      <DateCalendar />
      <Countdown />

      <Timeline />
      <Wishes />
      <Questions />
      <RsvpForm />

      <FooterHeart />

      <footer className="section-bg relative text-center py-12 font-display text-3xl text-ink-muted overflow-hidden">
        <SectionBackground section="footer" />
        <p className="section-bg__content relative z-[1]">
          С любовью, Никита & Полина
        </p>
      </footer>
    </main>
  );
}
