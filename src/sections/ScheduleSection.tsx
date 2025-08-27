import { Show } from "@/types";

interface ScheduleSectionProps {
  shows: Show[];
}

const toInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ shows }) => {
  // Default shows if none provided
  const defaultShows = [
    {
      time: "6:00AM",
      title: "Morning Vibes",
      host: "DJ Des",
    },
    {
      time: "12:00PM",
      title: "Midday Mix",
      host: "Auntie B",
    },
    {
      time: "6:00PM",
      title: "Afternoon Delight",
      host: "Uncle T",
    },
  ];

  const displayShows = shows?.length > 0 ? shows : defaultShows;

  return (
    <div className=" py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12 text-black dark:text-white">
          Program Schedule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {displayShows.map((show, index) => (
            <div
              key={index}
              className="group rounded-2xl transition-all duration-300 bg-white dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/30"
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Header with Time Badge and Avatar */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-3">
                      {show.time}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {show.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      With {show.host}
                    </p>
                  </div>

                  {/* Host Avatar */}
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-emerald-500/30">
                    {toInitials(show.host)}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  className="w-full cursor-pointer mt-4 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-600/50 border border-gray-300 dark:border-gray-600/30 hover:border-gray-400 dark:hover:border-gray-500/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  onClick={() => {
                    // Add your reminder logic here
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
