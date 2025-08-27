"use client";

import Navigation from "@/components/Navigation";
import { useNowPlaying } from "@/hooks/useNowPlaying";

import Footer from "@/sections/Footer";
import HeroSection from "@/sections/HeroSection";
import ScheduleSection from "@/sections/ScheduleSection";
import { Show } from "@/types";
import { FC, useState } from "react";

import LivePlayer from "@/components/LivePlayer";
import ResponsivePlayer from "@/components/ResponsivePlayer";
import { useTheme } from "@/hooks/useTheme";
import LatestPodcasts from "@/sections/LatestPodcasts";
import NewsUpdate from "@/sections/NewsUpdate";
import TeamSection from "@/sections/TeamSection";

const Home: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const STREAM_URL = "https://stream.zeno.fm/hnuqg3vbh41tv";
  const META_URL = "https://stream.zeno.fm/hnuqg3vbh41tv/metadata";

  const { nowPlaying, isLiveError } = useNowPlaying(META_URL);

  const onListenLive = () => {
    document
      .getElementById("live-player")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const toggleMenu = () => setMenuOpen((v) => !v);

  // Data
  const shows: Show[] = [
    { time: "6:00 AM", title: "Morning Vibes", host: "DJ Dad" },
    { time: "10:00 AM", title: "Midday Mix", host: "Auntie B" },
    { time: "3:00 PM", title: "Afternoon Delight", host: "Uncle T" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-black  text-gray-900 dark:text-gray-100">
      <header id="header">
        <Navigation
          isDark={isDarkMode}
          onToggleTheme={toggleTheme}
          onListenLive={onListenLive}
          menuOpen={menuOpen}
          onToggleMenu={toggleMenu}
        />
      </header>

      <main id="main">
        <HeroSection onListenLive={onListenLive} />

        <LivePlayer
          nowPlaying={nowPlaying}
          isLiveError={isLiveError}
          streamUrl={STREAM_URL}
        />

        <ScheduleSection shows={shows} />

        <LatestPodcasts />

        <TeamSection />

        <NewsUpdate />
      </main>

      <Footer />

      <ResponsivePlayer nowPlaying={nowPlaying} streamUrl={STREAM_URL} />
    </div>
  );
};

export default Home;
