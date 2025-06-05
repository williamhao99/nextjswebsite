import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { truncateText } from '../lib/utils';

const CardProject = ({
  post,
  isOverlay = false,
  showVisual = false,
  imageSizes = '410px',
  hideTags = false,
  isPost = false,
  isLarge = false,
  maxExcerptWords = 20
}) => {
  // Extract post properties
  const {
    slug,
    title,
    feature_image,
    feature_image_alt,
    excerpt,
    twitter_description,
    canonical_url,
    tags = [],
    published_at
  } = post || {};

  // Format the date for display
  const formattedDate = published_at ? new Date(published_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  }) : '';

  // Helper to build image URLs
  const imgUrl = (image, size, format) => {
    if (!image) return '';
    // For local development with static content
    // In production, you might use a different URL structure
    return `/images/${size}/${image.split('/').pop()}${format ? `.${format}` : ''}`;
  };

  // Use the utility function for truncation
  const hasMultipleTags = tags && tags.length > 1;
  const displayedTags = tags ? tags.slice(0, 2) : [];

  return (
    <article
      className={`card ${post?.slug ? `post-${post.slug}` : ''} ${isOverlay ? 'card-overlay' : ''}`}
      data-month={formattedDate}
    >
      {showVisual && (
        <>
          {feature_image ? (
            <figure className="card-image">
              <img
                srcSet={`
                  ${imgUrl(feature_image, 's', 'webp')} 400w,
                  ${imgUrl(feature_image, 'm', 'webp')} 750w
                `}
                sizes={imageSizes}
                src={imgUrl(feature_image, 'm')}
                alt={feature_image_alt || title}
                loading="lazy"
              />
            </figure>
          ) : (
            <div className="placeholder" />
          )}
        </>
      )}

      <div className="card-wrapper">
        {twitter_description && (
          <div className="sub-heading card-excerpt">
            {twitter_description}
          </div>
        )}

        <h2 className={`${isLarge ? 'h2' : 'h3'} card-title`}>
          {title}{' '}
          {canonical_url ? (
            <span className="icon-arrow-upright">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 13.5v6H7v-10h6V8H5.5v13h13V13.5z"></path>
                <path d="M17 8.5h-4V4.5h4z"></path>
                <path d="M19 8.5L14.5 4H13v4.5h-4V10h4v4.5h1.5V10H19z"></path>
              </svg>
            </span>
          ) : (
            <span className="icon-arrow-right">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.707 11.293l-5.293-5.293-1.414 1.414L13.586 12l-4.586 4.586 1.414 1.414 5.293-5.293a1 1 0 000-1.414z"></path>
              </svg>
            </span>
          )}
        </h2>

        {!hideTags && !isPost && hasMultipleTags && (
          <div className="tags-list">
            {displayedTags.map((tag) => (
              <div key={tag.id || tag.slug} className="sub-heading tag-item">
                {tag.name}
              </div>
            ))}
          </div>
        )}

        {!isOverlay && excerpt && (
          <div className="sub-heading card-excerpt">
            {truncateText(excerpt, maxExcerptWords)}
          </div>
        )}
      </div>

      <Link
        className="u-permalink"
        href={canonical_url || `/blog/${slug}`}
        aria-label={title}
      />
    </article>
  );
};

export default CardProject;