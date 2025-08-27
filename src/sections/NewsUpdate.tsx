import Image, { StaticImageData } from "next/image";
import logo from "../../public/presenters/logo.webp";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  date: string;
  category: string;
  readTime?: string;
}

interface NewsUpdateProps {
  newsItems?: NewsItem[];
}

const NewsUpdate: React.FC<NewsUpdateProps> = ({ newsItems }) => {
  // Default news items if none provided
  const defaultNews: NewsItem[] = [
    {
      id: "1",
      title: "Lorem ipsum dolor sit amet consectetur....",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sodales tincidunt fermentum vitae aliquam sed.",
      image: logo,
      date: "28 Aug, 2025 10:55PM",
      category: "Politics",
      readTime: "3 min read",
    },
    {
      id: "2",
      title: "Lorem ipsum dolor sit amet consectetur....",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sodales tincidunt fermentum vitae aliquam sed.",
      image: logo,
      date: "28 Aug, 2025 10:55PM",
      category: "Politics",
      readTime: "5 min read",
    },
    {
      id: "3",
      title: "Lorem ipsum dolor sit amet consectetur....",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sodales tincidunt fermentum vitae aliquam sed.",
      image: logo,
      date: "28 Aug, 2025 10:55PM",
      category: "Politics",
      readTime: "4 min read",
    },
    {
      id: "4",
      title: "Lorem ipsum dolor sit amet consectetur....",
      description:
        "Lorem ipsum dolor sit amet consectetur. Sodales tincidunt fermentum vitae aliquam sed.",
      image: logo,
      date: "28 Aug, 2025 10:55PM",
      category: "Politics",
      readTime: "6 min read",
    },
  ];

  const displayNews = newsItems?.length ? newsItems : defaultNews;

  const handleReadMore = (newsId: string) => {
    console.log(`Reading more about: ${newsId}`);
    // Add your navigation logic here
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          News Update
        </h2>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayNews.map((news) => (
            <div
              key={news.id}
              className="group bg-white dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50 transition-all duration-300"
            >
              <div className="flex gap-4 p-4">
                {/* News Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Date and Category */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-500 text-xs">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {news.date}
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                      {news.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {news.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-3 line-clamp-2">
                    {news.description}
                  </p>

                  {/* Read More Button */}
                  <button
                    onClick={() => handleReadMore(news.id)}
                    className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-medium transition-colors duration-200 cursor-pointer"
                  >
                    Read More
                    <svg
                      className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsUpdate;
