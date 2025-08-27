import { StaticImageData } from "next/image";

export interface Presenter {
  name: string;
  role: string;
  bio: string;
  image: StaticImageData;
  showTime?: string;
  socials?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface Show {
  time: string;
  title: string;
  host: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  href: string;
}
