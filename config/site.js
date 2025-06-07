// Site configuration and constants

export const siteConfig = {
  // Basic site info
  name: 'Will Hao',
  title: 'Will Hao - Personal Website',
  description: 'Personal website and portfolio of Will Hao',
  url: 'https://willhao.info',

  // Author info
  author: {
    name: 'Will Hao',
    email: 'william@willhao.info',
    twitter: '@willhao',
    github: 'willhao',
    linkedin: 'willhao',
  },

  // Navigation links
  navigation: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Works', href: '/works' },
    { name: 'Blog', href: '/blog' },
    { name: 'Timeline', href: '/timeline' },
    { name: 'Now', href: '/now' },
  ],

  // Social links
  social: {
    github: 'https://github.com/willhao',
    linkedin: 'https://linkedin.com/in/willhao',
    instagram: 'https://instagram.com/willhao',
    spotify: 'https://open.spotify.com/user/willhao',
  },

  // External APIs
  apis: {
    chess: '/api/chess',
    clash: '/api/clash',
    spotify: '/api/spotify',
  },

  // Feature flags
  features: {
    search: true,
    darkMode: true,
    widgets: true,
    analytics: false,
  },

  // Content settings
  content: {
    postsPerPage: 10,
    excerptLength: 160,
    dateFormat: 'MMM dd, yyyy',
  },
};

export default siteConfig;