// components/FeedTitle.js

import React from 'react'
import Link from 'next/link'
import { icons } from '../lib/icons';

/**
 * FeedTitle renders the equivalent of feed-title.hbs as a React component.
 *
 * Props:
 * - title    (string)   → required heading text
 * - viewAll  (boolean)  → whether to show the "View all" link (corresponds to {{#if view_all}})
 * - url      (string)   → href for the "View all" link (used if viewAll is true)
 *
 * Usage example:
 *   <FeedTitle title="Latest Articles" viewAll={true} url="/articles" />
 */
export default function FeedTitle({ title = '', viewAll = false, url = '' }) {
  return (
    <header className="feed-header container medium">
      <div className="feed-header-wrapper">
        <h2 className="section-title feed-header-title">{title}</h2>

        {viewAll && url && (
          <Link href={url}>
            <a className="section-title link-view-all button button-text">
              <span className="link-label">View all</span>
              <span className="icon-arrow-right" dangerouslySetInnerHTML={{ __html: icons['arrow-right'] }} />
            </a>
          </Link>
        )}
      </div>
    </header>
  )
}