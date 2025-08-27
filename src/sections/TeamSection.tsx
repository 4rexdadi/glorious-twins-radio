import { Presenter } from "@/types";
import Image from "next/image";
import PresenterImg1 from "../../public/presenters/prep1.webp";
import PresenterImg2 from "../../public/presenters/prep2.webp";
import PresenterImg3 from "../../public/presenters/prep3.webp";
import PresenterImg0 from "../../public/presenters/taiwo.webp";

// Team Section Component
const TeamSection = () => {
  // Default presenters if none provided
  const defaultPresenters: Presenter[] = [
    {
      name: "Olalere Taiwo",
      image: PresenterImg0,
      role: "Chairman",
      bio: "",
    },
    {
      name: "Temitope Raifu",
      image: PresenterImg1,
      role: "OAP",
      bio: "Meet Temitope Raifu, popularly know as LONGSTORY. As editor and a presenter at Glorious Twins Radio Ibadan.. born and raise in ondo state ikare Akoko... Im here to give the best",
    },
    {
      name: "M Crown",
      image: PresenterImg2,
      role: "Studio ENGR/OAP",
      bio: "Owofade Mayowa Mary Popularly known as Mrown is a media versatile media professional; a studio engineer, On Air Personality (OAP), graphic designer and professional video editor. With her experience in the media industry, she's ready to inform, educate and entertain the general public. Stay tuned!!!",
    },
    {
      name: "Oloyode Abolaji Faruq",
      image: PresenterImg3,
      role: "Manager/OAP",
      bio: "Meet Oloyede Abolaji Faruq, popularly know as AWIYE EDE. The manager of Glorious Twins Radio, Ibadan. Born and raised in Ibadan, Oyo State, he attended Aunty Ayo Secondary School in the Olunde area and later studied Mass Communication at The Polytechnic, Ibadan. He's here to keep you inspired and entertained with unending vibes.",
    },
  ];

  const displayPresenters = defaultPresenters;

  // Function to render a presenter card
  const renderPresenterCard = (
    presenter: Presenter,
    idx: number,
    isLarge = false
  ) => (
    <div
      key={idx}
      className={`bg-white dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-600/30 rounded-lg ${
        isLarge ? "max-w-md mx-auto" : ""
      }`}
    >
      {/* Presenter Image */}
      <div
        className={`relative w-full overflow-hidden ${
          isLarge ? "h-80" : "h-56"
        }`}
      >
        <Image
          src={presenter.image}
          alt={presenter.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Show Time Badge */}
        {presenter.showTime && (
          <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
            {presenter.showTime}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-${isLarge ? "8" : "6"}`}>
        <h3
          className={`font-bold text-gray-900 dark:text-white mb-1 ${
            isLarge ? "text-2xl" : "text-xl"
          }`}
        >
          {presenter.name}
        </h3>
        <p className="text-emerald-500 dark:text-emerald-400 text-sm font-medium mb-3">
          {presenter.role}
        </p>
        <p
          className={`text-gray-700 dark:text-gray-300 leading-relaxed ${
            isLarge ? "text-base" : "text-sm"
          }`}
        >
          {presenter.bio}
        </p>
      </div>
    </div>
  );

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Meet Our Team
        </h2>

        {/* Mobile: Single column */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 gap-6">
            {displayPresenters.map((presenter, idx) =>
              renderPresenterCard(presenter, idx)
            )}
          </div>
        </div>

        {/* Desktop: 4-2-1 Grid Layout */}
        <div className="hidden lg:block">
          {displayPresenters.length >= 4 && (
            <>
              {/* First Row: 4 columns */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                {displayPresenters
                  .slice(0, 4)
                  .map((presenter, idx) => renderPresenterCard(presenter, idx))}
              </div>

              {/* Second Row: 2 columns (if more than 4 presenters) */}
              {displayPresenters.length > 4 && (
                <div className="grid grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
                  {displayPresenters
                    .slice(4, 6)
                    .map((presenter, idx) =>
                      renderPresenterCard(presenter, idx + 4)
                    )}
                </div>
              )}

              {/* Third Row: 1 column (if more than 6 presenters) */}
              {displayPresenters.length > 6 && (
                <div className="grid grid-cols-1 max-w-lg mx-auto">
                  {displayPresenters
                    .slice(6, 7)
                    .map((presenter, idx) =>
                      renderPresenterCard(presenter, idx + 6, true)
                    )}
                </div>
              )}
            </>
          )}

          {/* Fallback for less than 4 presenters */}
          {displayPresenters.length < 4 && (
            <div
              className={`grid gap-6 ${
                displayPresenters.length === 1
                  ? "grid-cols-1 max-w-md mx-auto"
                  : displayPresenters.length === 2
                  ? "grid-cols-2 max-w-4xl mx-auto"
                  : "grid-cols-3 max-w-5xl mx-auto"
              }`}
            >
              {displayPresenters.map((presenter, idx) =>
                renderPresenterCard(
                  presenter,
                  idx,
                  displayPresenters.length === 1
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
