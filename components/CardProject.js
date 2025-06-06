import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { truncateText } from '../lib/utils';
import { icons } from '../lib/icons';

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
            <span className="icon-arrow-upright" dangerouslySetInnerHTML={{ __html: icons['arrow-upright'] }} />
          ) : (
            <span className="icon-arrow-right" dangerouslySetInnerHTML={{ __html: icons['arrow-right'] }} />
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