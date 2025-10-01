/* eslint-disable @typescript-eslint/no-explicit-any */
import { SITE_CONFIG } from "@/lib/constants/seo";

// Generate structured data for podcast episodes
export function generatePodcastSchema(slug: string, podcastData?: any) {
	const title =
		podcastData?.title ||
		slug.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());

	return {
		"@context": "https://schema.org",
		"@type": "RadioEpisode",
		name: title,
		description:
			podcastData?.description ||
			`Traditional African story featuring cultural wisdom from our ancestors.`,
		datePublished: podcastData?.publishedAt || new Date().toISOString(),
		url: `${SITE_CONFIG.url}/podcasts/${slug}`,
		duration: podcastData?.duration || "PT30M", // 30 minutes default
		associatedMedia: {
			"@type": "AudioObject",
			contentUrl:
				podcastData?.audioUrl ||
				`${SITE_CONFIG.url}/podcasts/${slug}/audio.mp3`,
			encodingFormat: "audio/mpeg",
		},
		partOfSeries: {
			"@type": "RadioSeries",
			name: `${SITE_CONFIG.name} Podcasts`,
			description: "Traditional African stories and cultural programming",
		},
		author: {
			"@type": "Organization",
			name: SITE_CONFIG.name,
			url: SITE_CONFIG.url,
		},
		publisher: {
			"@type": "Organization",
			name: SITE_CONFIG.name,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_CONFIG.url}/logo.png`,
			},
		},
	};
}

// Generate structured data for programs
export function generateProgramSchema(programData: any) {
	return {
		"@context": "https://schema.org",
		"@type": "RadioEpisode",
		name: programData.title,
		description: programData.description,
		datePublished: programData.publishedAt,
		startDate: programData.startTime,
		endDate: programData.endTime,
		url: `${SITE_CONFIG.url}/programs/${programData.slug}`,
		partOfSeries: {
			"@type": "RadioSeries",
			name: `${SITE_CONFIG.name} Programs`,
			description: "Traditional African stories and cultural programming",
		},
		author: {
			"@type": "Organization",
			name: SITE_CONFIG.name,
		},
		publisher: {
			"@type": "Organization",
			name: SITE_CONFIG.name,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_CONFIG.url}/logo.png`,
			},
		},
	};
}

// Generate structured data for news articles
export function generateNewsSchema(articleData: any) {
	return {
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		headline: articleData.title,
		description: articleData.description,
		image: articleData.image || `${SITE_CONFIG.url}/news-default.jpg`,
		datePublished: articleData.publishedAt,
		dateModified: articleData.updatedAt || articleData.publishedAt,
		author: {
			"@type": "Person",
			name: articleData.author || `${SITE_CONFIG.name} Team`,
		},
		publisher: {
			"@type": "Organization",
			name: SITE_CONFIG.name,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_CONFIG.url}/logo.png`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_CONFIG.url}/news/${articleData.slug}`,
		},
	};
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(
	items: Array<{ name: string; url: string }>
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

// Generate FAQ schema for pages with FAQs
export function generateFAQSchema(
	faqs: Array<{ question: string; answer: string }>
) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer,
			},
		})),
	};
}

// Generate contact page schema
export function generateContactSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		url: `${SITE_CONFIG.url}/contact`,
		mainEntity: {
			"@type": "Organization",
			name: SITE_CONFIG.name,
			url: SITE_CONFIG.url,
			contactPoint: [
				{
					"@type": "ContactPoint",
					contactType: "customer service",
					email: SITE_CONFIG.email,
					url: `${SITE_CONFIG.url}/contact`,
				},
			],
			address: {
				"@type": "PostalAddress",
				streetAddress: SITE_CONFIG.address.street,
				addressLocality: SITE_CONFIG.address.city,
				addressRegion: SITE_CONFIG.address.state,
				addressCountry: SITE_CONFIG.address.countryCode,
			},
			sameAs: [
				SITE_CONFIG.social.facebookUrl,
				SITE_CONFIG.social.twitterUrl,
				SITE_CONFIG.social.instagramUrl,
				SITE_CONFIG.social.youtubeUrl,
			],
		},
	};
}

// Helper to generate meta tags for sharing
export function generateSocialMeta(
	title: string,
	description: string,
	image: string,
	url: string
) {
	return {
		title: `${title} | ${SITE_CONFIG.name}`,
		description,
		openGraph: {
			title: `${title} | ${SITE_CONFIG.name}`,
			description,
			images: [image],
			url,
			siteName: SITE_CONFIG.name,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			site: SITE_CONFIG.social.twitter,
			title: `${title} | ${SITE_CONFIG.name}`,
			description,
			images: [image],
		},
	};
}

// Helper to format page title with site name
export function formatPageTitle(pageTitle: string): string {
	return `${pageTitle} | ${SITE_CONFIG.name}`;
}

// Helper to truncate description for meta tags
export function truncateDescription(
	description: string,
	maxLength: number = 160
): string {
	if (description.length <= maxLength) return description;
	return description.substring(0, maxLength - 3).trim() + "...";
}

// Helper to generate canonical URL
export function generateCanonicalUrl(path: string): string {
	// Remove leading slash if present, then add it back
	const cleanPath = path.startsWith("/") ? path.slice(1) : path;
	return cleanPath ? `${SITE_CONFIG.url}/${cleanPath}` : SITE_CONFIG.url;
}
