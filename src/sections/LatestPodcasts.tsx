import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import logo from "../../public/presenters/logo.webp";

// Types
interface Podcast {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  duration?: string;
  date?: string;
}

interface LatestPodcastsProps {
  podcasts?: Podcast[];
}

// Latest Podcasts Section
const LatestPodcasts: React.FC<LatestPodcastsProps> = ({ podcasts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Default podcasts if none provided
  const defaultPodcasts: Podcast[] = [
    {
      id: "1",
      title: "Morning Inspiration",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sodales tincidunt fermentum vitae aliquam sed.",
      image: logo,
      duration: "45 min",
      date: "Aug 26, 2025",
    },
    {
      id: "2",
      title: "Tech Talk Tuesday",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sodales tincidunt fermentum vitae aliquam sed.",
      image: logo,
      duration: "32 min",
      date: "Aug 25, 2025",
    },
    {
      id: "3",
      title: "Community Spotlight",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sodales tincidunt fermentum vitae aliquam sed.",
      image: logo,
      duration: "28 min",
      date: "Aug 24, 2025",
    },
    {
      id: "4",
      title: "Health & Wellness",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sodales tincidunt fermentum vitae aliquam sed.",
      image: logo,
      duration: "38 min",
      date: "Aug 23, 2025",
    },
    {
      id: "5",
      title: "Music Matters",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sodales tincidunt fermentum vitae aliquam sed.",
      image: logo,
      duration: "42 min",
      date: "Aug 22, 2025",
    },
  ];

  const displayPodcasts = podcasts?.length ? podcasts : defaultPodcasts;
  const totalPages = Math.ceil(displayPodcasts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPodcasts = displayPodcasts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePlayPodcast = (podcastId: string) => {
    console.log(`Playing podcast: ${podcastId}`);
    // Add your play logic here
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Latest Podcasts
        </h2>

        {/* Podcast Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="group bg-white dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/30 rounded-2xl hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300"
            >
              {/* Podcast Image */}
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Duration Badge */}
                {podcast.duration && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {podcast.duration}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {podcast.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {podcast.description}
                </p>

                {/* Date */}
                {podcast.date && (
                  <p className="text-gray-500 dark:text-gray-500 text-xs mb-4">
                    {podcast.date}
                  </p>
                )}

                {/* Play Button */}
                <button
                  onClick={() => handlePlayPodcast(podcast.id)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play episode
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 dark:text-white rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg transition-all duration-200 cursor-pointer ${
                      currentPage === page
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              {totalPages > 5 && (
                <span className="text-gray-600 dark:text-gray-400">...</span>
              )}
              {totalPages > 5 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 rounded-lg transition-all duration-200 cursor-pointer ${
                    currentPage === totalPages
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-300"
                  }`}
                >
                  {totalPages}
                </button>
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestPodcasts;
