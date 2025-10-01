import programService from "@/services/programService";
import { Program } from "@/types";
import React, { useEffect, useState } from "react";

interface ScheduleSectionProps {}

const toInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const formatTime = (time: string) => {
  // Assumes time is in HH:MM format, converts to 12-hour format
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes}${ampm}`;
};

export const ScheduleSection: React.FC<ScheduleSectionProps> = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await programService.getFeaturedPrograms();

      // Filter active programs and sort by start time
      const activePrograms = data
        .filter((p) => p.active)
        .sort((a, b) => a.startTime.localeCompare(b.startTime))
        .slice(0, 3); // Show top 3 programs

      setPrograms(activePrograms);
    } catch (err) {
      setError("Failed to load programs. Please try again.");
      console.error("Error fetching programs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-black dark:text-white">
            Program Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-white dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/30 p-6 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full mb-3"></div>
                    <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-xl mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-black dark:text-white">
            Program Schedule
          </h2>
          <div className="max-w-md mx-auto bg-white dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600/30 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Unable to Load Programs
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchPrograms}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (programs.length === 0) {
    return (
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12 text-black dark:text-white">
            Program Schedule
          </h2>
          <div className="max-w-md mx-auto bg-white dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600/30 p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Programs Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for our program schedule
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Success State with Data
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12 text-black dark:text-white">
          Program Schedule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="group rounded-2xl transition-all duration-300 bg-white dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/30"
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Header with Time Badge and Avatar */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
                      {formatTime(program.startTime)} -{" "}
                      {formatTime(program.endTime)}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {program.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      With {program.host}
                    </p>
                    {program.day && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {program.day}s
                      </p>
                    )}
                  </div>

                  {/* Host Avatar */}
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-emerald-500/30">
                    {toInitials(program.host)}
                  </div>
                </div>

                {/* Description if available */}
                {program.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {program.description}
                  </p>
                )}

                {/* Action Button */}
                <button
                  type="button"
                  className="w-full cursor-pointer mt-4 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600/50 border border-gray-300 dark:border-gray-600/30 hover:border-gray-400 dark:hover:border-gray-500/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  onClick={() => {
                    alert("Reminder feature coming soon!");
                  }}
                >
                  <svg
                    className="w-4 h-4 transition-transform group-hover/btn:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM4 19h8a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Set Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSection;
