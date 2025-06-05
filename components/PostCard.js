// components/PostCard.js
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '../lib/utils';

export default function PostCard({
  post,
  noDate = false,
  noLink = false,
  feedLayout = "List"
}) {
  const postYear = new Date(post.published_at).getFullYear();
  const postMonth = new Date(post.published_at).getMonth() + 1;
  const formattedMonthYear = formatDate(post.published_at, 'MMMM YYYY');
  const formattedDayMonth = formatDate(post.published_at, 'DD MMM');

  const hasFeatureImage = feedLayout !== "Text-only" &&
                          feedLayout !== "Minimal" &&
                          post.feature_image;

  return (
    <article
      className={`feed post-year-${postYear} post-date-${postMonth} ${noDate ? 'archive-wrapper' : ''}`}
      data-month={formattedMonthYear}
    >
      {noDate && (
        <div className="date-wrapper">
          <div className="section-title year-post-label">
            {formatDate(post.published_at, 'YYYY')} Blog
          </div>
          <div className="section-title month-post-label">
            ✦ {formatDate(post.published_at, 'MMMM')}
          </div>
        </div>
      )}

      {hasFeatureImage && post.feature_image && (
        <div className={`feed-image u-placeholder square ${feedLayout === "Expanded vertical" ? 'vertical' : ''}`}>
          <Image
            src={post.feature_image}
            alt={post.feature_image_alt || post.title}
            width={400}
            height={400}
            sizes="(min-width: 576px) 160px, 40vw"
            className="u-object-fit"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="feed-wrapper">
        <h2 className="body-1 feed-title">{post.title}</h2>

        {post.excerpt && (
          <div className="feed-excerpt">
            {post.excerpt.substring(0, 100)}...
          </div>
        )}

        <div className="dot-spacer"></div>

        <div className="feed-right">
          <div className={`feed-visibility feed-visibility-${post.visibility || 'public'}`}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.729 1.2l3.346 6.629 6.44.638-4.2 4.478 1.47 7.027L12 16.13 4.215 19.97l1.47-7.027-4.2-4.478 6.44-.638L12.729 1.2zM12 3.209L9.62 8.13l-5.512.55 3.561 3.795-1.241 5.947L12 15.387l5.572 3.035-1.241-5.947 3.561-3.795-5.512-.55L12 3.209z" />
            </svg>
          </div>

          <time
            className="body-1 feed-calendar"
            dateTime={formatDate(post.published_at, 'YYYY-MM-DD')}
          >
            {formattedDayMonth}
          </time>

          <div className="feed-icon">
            {noLink ? (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.707 15.707l-1.414-1.414L13.586 12H6V6h2v4h5.586l-2.293-2.293 1.414-1.414L17.414 11l-4.707 4.707z" />
                <path d="M19 20H5V4h14v16zm0-18H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.707 11.293l-4-4a1 1 0 00-1.414 1.414L13.586 12l-3.293 3.293a1 1 0 001.414 1.414l4-4a1 1 0 000-1.414z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {noLink ? (
        <a
          className="u-permalink"
          href={`#${post.slug}`}
          aria-label={post.title}
        />
      ) : (
        <Link
          href={post.canonical_url || `/blog/${post.slug}`}
          className="u-permalink"
          aria-label={post.title}
        />
      )}
    </article>
  );
}
