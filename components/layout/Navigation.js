// components/Navigation.js
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchModal from '../features/SearchModal';
import SearchIcon from '../icons/SearchIcon';

function ThemeToggleIcon() {
  return (
    <div className="theme-toggle-icon">
      <div className="moon-or-sun">
        <div className="moon-mask"></div>
      </div>
    </div>
  );
}

export default function Navigation({ posts = [], pages = [] }) {
  const [theme, setTheme] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for system color scheme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // If no saved theme, use system preference
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    setIsMounted(true);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const toggleTheme = () => {
    if (!isMounted || theme === null) return;
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const isActiveLink = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/works', label: 'Works' },
    { href: '/blog', label: 'Blog' },
    { href: '/now', label: 'Now' },
    { href: '/timeline', label: 'Timeline' }
  ];

  return (
    <>
      <header className="gh-head">
        <div className="gh-head-inner container">
          <div className="gh-head-brand">
            <div className="gh-head-brand-wrapper">
              <div className="gh-head-logo-text">
                <Link href="/" className="gh-head-logo">
                  <figure className="gh-head-logo-wrapper">
                    <Image
                      src="/favicons/William Hao-3-2.png"
                      alt="William Hao"
                      width={200}
                      height={50}
                      priority
                      className="logo-image"
                    />
                  </figure>
                </Link>
              </div>
              <div className="sub-heading tagline">
                UT Austin '28, Mathematics + Plan II Honors
              </div>
            </div>
          </div>

          <nav className="gh-head-menu">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={isActiveLink(href) ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </Link>
            ))}

            <div className="gh-head-actions">
              <button
                className="gh-theme-toggle gh-icon-btn visible-desktop"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                <ThemeToggleIcon />
              </button>
              <button
                className="gh-search gh-icon-btn"
                aria-label="Search this site"
                onClick={() => setIsSearchOpen(true)}
              >
                <div className="search-icon">
                  <SearchIcon size={18} />
                </div>
              </button>
            </div>
          </nav>

          {/* Wave separator positioned right below nav.gh-head-menu */}
          <div className="head-separator">
            <div className="wave-separator"></div>
          </div>

          {/* Profile Photo - Independent Element */}
          <div className="header-profile">
            <div className="profile-photo">
              <img
                src="/images/profile-photo.jpg"
                alt="Will Hao"
                className="profile-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="profile-placeholder" style={{display: 'none'}}>
                WH
              </div>
            </div>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
        pages={pages}
      />
    </>
  );
}
