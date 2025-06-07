// components/Experience.js

import React from 'react';

/**
 * Props:
 * - postClass    (string)   → corresponds to `{{post_class}}`
 * - date         (string)   → already formatted as "MMMM YYYY" (e.g. "June 2025")
 * - content      (string)   → the main content/text (escaped)
 * - title        (string)   → the title
 * - excerpt      (string)   → optional excerpt (shown in the right column)
 *
 * Usage example:
 *   <Experience
 *     postClass="my-post-class"
 *     date="June 2025"
 *     content="Worked at Acme Corp"
 *     title="Software Engineer"
 *     excerpt="Jun 2023 – May 2025"
 *   />
 */
export default function Experience({
  postClass = '',
  date = '',
  content = '',
  title = '',
  excerpt = ''
}) {
  // Build the CSS classes exactly as in Handlebars:
  // class="feed {{post_class}} no-link"
  const classes = ['feed', postClass, 'no-link'].filter(Boolean).join(' ');

  return (
    <article className={classes} data-month={date}>
      <div className="feed-wrapper">
        <div>
          <div className="sub-heading feed-sub-title">{content}</div>
          <h2 className="body-1 feed-title">{title}</h2>
        </div>
        <div className="dot-spacer" />
        <div className="feed-right">
          {excerpt && (
            <div className="body-1 feed-calendar">{excerpt}</div>
          )}
        </div>
      </div>
    </article>
  );
}