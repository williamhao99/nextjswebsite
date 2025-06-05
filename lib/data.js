// lib/data.js

// Clean data utility functions for the Next.js website
// This provides mock data functions for development and content structure

export function getAllPosts() {
  return [];
}

export function getPostBySlug(slug) {
  return null;
}

export function getAllPostSlugs() {
  return [];
}

export function getAllPages() {
  return [];
}

export function getPageBySlug(slug) {
  return null;
}

export function getAllTags() {
  return [];
}

export function getPostsByTagSlug(tagSlug) {
  return [];
}

export function getPagesByTag(tagSlug) {
  return [];
}

export function getAllAuthors() {
  return [];
}

export function getPostsByAuthorSlug(authorSlug) {
  return [];
}

export function getSiteSettings() {
  return {
    title: "Will Hao",
    description: "Designer and creator.",
    url: "https://willhao.info"
  };
}

// Utility function to process image URLs
export function processImageUrl(imageUrl) {
  if (!imageUrl) return null;

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://willhao.info';

  try {
    // Replace placeholder URL with actual site URL
    if (imageUrl.includes('__PLACEHOLDER_URL__')) {
      return imageUrl.replace('__PLACEHOLDER_URL__', SITE_URL);
    }

    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }

    // If it's a relative URL, prepend site URL
    if (imageUrl.startsWith('/')) {
      return `${SITE_URL}${imageUrl}`;
    }

    // Otherwise assume it's a content image
    return `${SITE_URL}/content/images/${imageUrl}`;
  } catch (error) {
    console.error('Error processing image URL:', error);
    return null;
  }
}