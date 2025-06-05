// components/Layout.js

import Head from 'next/head'
import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout({
  children,
  title = "Will Hao",
  description = "Designer and creator.",
  customClass = "",
  showHeader = true,
  posts = [],
  pages = []
}) {
  return (
    <div className={`site ${customClass}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicons/favicon.ico" />
      </Head>

      {showHeader && (
        <Navigation posts={posts} pages={pages} />
      )}

      <div className="site-content">
        {children}
      </div>

      <Footer />
    </div>
  )
}