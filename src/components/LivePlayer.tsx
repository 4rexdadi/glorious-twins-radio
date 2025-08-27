"use client";

import { useEffect, useRef, useState } from "react";

interface LivePlayerProps {
  nowPlaying: string;
  isLiveError: boolean;
  streamUrl: string;
}

const LivePlayer: React.FC<LivePlayerProps> = ({
  nowPlaying,
  isLiveError,
  streamUrl,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Clean Play Icon Component
  const PlayIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );

  // Clean Pause Icon Component
  const PauseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" />
    </svg>
  );

  // Clean Loading Icon Component
  const LoadingIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 animate-spin">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset="20"
        fill="none"
      />
    </svg>
  );

  return (
    <div className="max-w-lg mx-auto px-4 my-16 relative z-20">
      {/* Main Player Card */}
      <div className="bg-white dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/30">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600/50">
          <div className="flex items-center gap-3">
            {/* Live Icon */}
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-gray-900 dark:text-white font-semibold text-sm">
                Now Playing:
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                {(nowPlaying && nowPlaying) || nowPlaying === "-"
                  ? "GloriousTwins Radio"
                  : "GloriousTwins Radio"}
              </p>
            </div>
          </div>
        </div>

        {/* Custom Audio Controls */}
        <div className="px-6 py-4">
          {/* Progress Bar */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono min-w-[40px]">
              {formatTime(currentTime)}
            </span>

            <div className="flex-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full relative group cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200">
              <div
                className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-200 group-hover:bg-gray-800 dark:group-hover:bg-gray-100"
                style={{
                  width: duration ? `${(currentTime / duration) * 100}%` : "0%",
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-900 dark:bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  left: duration ? `${(currentTime / duration) * 100}%` : "0%",
                }}
              />
            </div>

            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono min-w-[40px]">
              {formatTime(0)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Clean Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlayPause}
                disabled={isLoading}
                className={`
                  flex cursor-pointer items-center justify-center
                  w-10 h-10 rounded-full
                  transition-all duration-200 ease-out
                  focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900
                  disabled:opacity-50 disabled:cursor-not-allowed
                  bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300
                `}
              >
                {isLoading ? (
                  <LoadingIcon />
                ) : isPlaying ? (
                  <PauseIcon />
                ) : (
                  <PlayIcon />
                )}
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.814L4.653 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.653l3.73-3.814a1 1 0 011.617.814zM14.657 7.757a1 1 0 011.414 0A9.972 9.972 0 0118 12a9.972 9.972 0 01-1.929 4.243 1 1 0 01-1.414-1.414A7.971 7.971 0 0016 12c0-1.751-.563-3.37-1.514-4.686a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                title="Volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200"
              />
              <svg
                className="w-4 h-4 text-gray-900 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 3.75a1 1 0 00-1.264-.956L5.203 4H2.667A1.667 1.667 0 001 5.667v8.666A1.667 1.667 0 002.667 16h2.536l3.533 1.206A1 1 0 0010 16.25V3.75z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-6 py-3 bg-gray-100 dark:bg-black/50 border-t border-gray-200 dark:border-gray-600/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Frequency: 000.0FM • Ibadan
            </span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(streamUrl)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs underline transition-colors duration-200 cursor-pointer"
                title="Copy stream URL"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden HTML5 Audio Element */}
      <audio ref={audioRef} src={streamUrl} preload="none" className="hidden" />

      {/* Error Message */}
      {isLiveError && (
        <div className="mt-3 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-amber-400 text-xs text-center">
            Having trouble fetching track info. Stream still plays fine.
          </p>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #1f2937;
          cursor: pointer;
          border: 2px solid #9ca3af;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        .dark .slider::-webkit-slider-thumb {
          background: white;
          border-color: #374151;
        }
        .slider::-webkit-slider-thumb:hover {
          background: #374151;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .dark .slider::-webkit-slider-thumb:hover {
          background: #f3f4f6;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #1f2937;
          cursor: pointer;
          border: 2px solid #9ca3af;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        .dark .slider::-moz-range-thumb {
          background: white;
          border-color: #374151;
        }
        .slider::-moz-range-thumb:hover {
          background: #374151;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .dark .slider::-moz-range-thumb:hover {
          background: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default LivePlayer;
