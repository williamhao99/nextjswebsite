# 🌐 Will Hao - Personal Website

A modern, responsive personal website built with Next.js 15 and React 19, showcasing the work and journey of Will Hao, a UT Austin student studying Mathematics and Plan II Honors.

**Live Site**: [willhao.info](https://willhao.info)

## ✨ Features

### 🎨 **Design & User Experience**
- **Clean, Minimalist Design**: Professional aesthetic with organized component architecture
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme Toggle**: System preference detection with manual override
- **Smooth Animations**: Subtle transitions and micro-interactions
- **Fast Loading**: Optimized performance with Next.js static generation
- **Accessibility**: WCAG compliant with keyboard navigation support

### 📝 **Content Management**
- **Dynamic Blog System**: File-based routing with slug-based posts
- **Portfolio Showcase**: Work samples and project highlights
- **Interactive Widgets**: Chess, Clash of Clans, and Spotify integrations
- **Timeline**: Career and educational milestones
- **Now Page**: Current activities and interests
- **Centralized Search**: Global search functionality across all content

### 🚀 **Performance & SEO**
- **Static Site Generation**: Pre-rendered pages for optimal performance
- **Modern Font Loading**: Google Fonts (Noto Sans & Noto Serif) with display swap
- **SEO Optimized**: Meta tags and semantic HTML structure
- **API Routes**: Built-in API endpoints for external integrations

## 🏗️ Architecture

### **Tech Stack**
- **Frontend**: Next.js 15, React 19
- **Styling**: Modular CSS with CSS Custom Properties
- **Fonts**: Google Fonts (Noto Sans, Noto Serif)
- **Icons**: Custom SVG React components
- **APIs**: Next.js API routes for external integrations

### **Project Structure**
```
willhao.info/
├── components/              # Modular React components
│   ├── index.js            # Centralized component exports
│   ├── layout/             # Layout components
│   │   ├── Navigation.js   # Main navigation with search & theme toggle
│   │   ├── Layout.js       # Page layout wrapper
│   │   ├── Hero.js         # Homepage hero section
│   │   └── Footer.js       # Site footer with social links
│   ├── ui/                 # Reusable UI components
│   │   ├── PostCard.js     # Blog post preview cards
│   │   ├── PageHeader.js   # Page title headers
│   │   └── Experience.js   # Experience/timeline components
│   ├── features/           # Feature-specific components
│   │   └── SearchModal.js  # Global search functionality
│   ├── icons/              # SVG icon components
│   │   ├── GitHubIcon.js   # GitHub social icon
│   │   ├── LinkedInIcon.js # LinkedIn social icon
│   │   ├── InstagramIcon.js # Instagram social icon
│   │   ├── SpotifyIcon.js  # Spotify integration icon
│   │   └── SearchIcon.js   # Search functionality icon
│   └── widgets/            # Interactive widget components
│       ├── SpotifyWidget.js # Spotify now playing widget
│       ├── ChessWidget.js  # Chess.com integration
│       └── ClashWidget.js  # Clash of Clans stats widget
├── pages/                  # Next.js pages (file-based routing)
│   ├── api/               # API routes
│   │   ├── chess.js       # Chess.com API integration
│   │   └── clash.js       # Clash of Clans API integration
│   ├── blog/              # Blog functionality
│   │   └── [slug].js      # Dynamic blog post pages
│   ├── works/             # Portfolio functionality
│   │   └── [slug].js      # Dynamic work showcase pages
│   ├── _app.js            # Next.js app configuration with fonts
│   ├── _document.js       # Custom document configuration
│   ├── index.js           # Homepage
│   ├── about.js           # About page
│   ├── works.js           # Portfolio/work showcase listing
│   ├── blog.js            # Blog listing page
│   ├── now.js             # Current activities page
│   ├── timeline.js        # Career timeline
│   └── [slug].js          # Dynamic content pages
├── styles/                # Modular CSS architecture
│   ├── globals.css        # Main stylesheet (imports all modules)
│   ├── variables.css      # CSS custom properties and themes
│   ├── fonts.css          # Font declarations and typography
│   ├── base.css           # Base styles, resets, and typography
│   ├── layout.css         # Layout utilities and grid systems
│   └── components.css     # Component-specific styles
├── lib/                   # Utilities and helper functions
│   ├── api/              # API-related utilities
│   ├── hooks/            # Custom React hooks (future expansion)
│   ├── constants/        # Constants and configuration
│   └── utils.js          # Date formatting, text utilities
├── config/               # Configuration management
│   └── site.js           # Site-wide configuration and constants
├── content/              # Content management structure
│   ├── blog/             # Blog post content
│   ├── works/            # Portfolio work content
│   └── projects/         # Project documentation
├── data/                 # Static data files
├── public/               # Static assets
│   ├── images/           # Profile photos and content images
│   │   ├── profile-photo.jpg
│   │   └── clash-of-clans-icon.png
│   ├── favicons/         # Site icons and PWA assets
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   ├── android-chrome-*.png
│   │   └── site.webmanifest
│   ├── theme-assets/     # Theme-related static files
│   └── content/          # Static content assets
├── next.config.js        # Next.js configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- npm package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd willhao.info
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the website.

### **Build for Production**
```bash
npm run build
npm start
```

## 📱 Pages & Features

### **🏠 Homepage** (`/`)
- Hero section with personal introduction
- Clean, professional landing experience
- Navigation to all major sections

### **👨‍💻 About** (`/about`)
- Personal background and academic journey
- UT Austin Mathematics + Plan II Honors focus
- Skills and interests showcase

### **💼 Works** (`/works`)
- Portfolio of projects and work samples
- Dynamic routing for individual work showcases
- Professional accomplishments and case studies

### **📝 Blog** (`/blog`)
- Technical articles and personal thoughts
- Dynamic slug-based routing for posts
- Searchable content with responsive cards

### **📍 Now** (`/now`)
- Current activities and focus areas
- Real-time status and interests
- Updated regularly with current projects

### **📅 Timeline** (`/timeline`)
- Career and educational milestones
- Visual timeline of achievements
- Chronological personal and academic events

### **🎮 Interactive Widgets**
- **Chess Widget**: Chess.com integration showing recent games
- **Clash of Clans Widget**: Game statistics and clan information
- **Spotify Widget**: Currently playing music integration

## 🎨 Design System

### **Component Architecture**
- **Modular Organization**: Components grouped by function (layout, ui, features, icons, widgets)
- **Centralized Exports**: Easy imports via `components/index.js`
- **Reusable Patterns**: Consistent design language across components
- **Scalable Structure**: Clear separation of concerns for easy expansion

### **CSS Architecture**
- **Modular CSS**: Separated stylesheets for different concerns
- **CSS Custom Properties**: Centralized theme variables
- **Mobile-First**: Responsive design with progressive enhancement
- **Performance Optimized**: Efficient CSS loading and minimal bundle size

### **Typography**
- **Google Fonts**: Noto Sans (primary), Noto Serif (accents)
- **Font Display Swap**: Optimized loading for better performance
- **Responsive Typography**: Fluid scaling across device sizes

## 🔧 Configuration

### **Site Configuration**
The site uses a centralized configuration system in `config/site.js`:

```javascript
import { siteConfig } from './config/site';

// Access navigation, social links, features, and content settings
const navigation = siteConfig.navigation;
const socialLinks = siteConfig.social;
const features = siteConfig.features;
```

### **Feature Flags**
- Search functionality toggle
- Dark mode toggle
- Widget display toggle
- Analytics integration toggle

### **Content Settings**
- Posts per page configuration
- Excerpt length settings
- Date format preferences

## 🌐 API Integration

### **Available API Routes**
- `/api/chess` - Chess.com integration for game statistics
- `/api/clash` - Clash of Clans API for game data

### **External Integrations**
- **Chess.com**: Recent games and player statistics
- **Clash of Clans**: Clan and player information
- **Spotify**: Currently playing music (widget)

## 📊 Performance

- **Next.js 15**: Latest framework optimizations
- **React 19**: Improved rendering performance
- **Static Generation**: Pre-rendered pages for fast loading
- **Optimized Assets**: Efficient image and font loading
- **Modular CSS**: Organized stylesheets for better caching

## 🛠️ Development

### **Component Usage**
```javascript
// Import multiple components easily
import { Navigation, Footer, PostCard, Hero } from '../components';

// Use site configuration
import { siteConfig } from '../config/site';
```

### **Adding New Pages**
1. Create new page file in `pages/` directory
2. Use the `Layout` component for consistent styling
3. Update navigation in `config/site.js` if needed

### **Adding New Components**
1. Create component in appropriate `components/` subdirectory
2. Export from `components/index.js`
3. Add styles to relevant CSS module

### **Utility Functions**
- `formatDate()` - Date formatting with custom patterns
- `truncate()` - Text truncation utilities
- `getExcerpt()` - HTML content excerpt extraction

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is proprietary software. All rights reserved © 2025 Will Hao.

## 🤝 Contact

**Will Hao**
- Website: [willhao.info](https://willhao.info)
- Email: william@willhao.info
- GitHub: [willhao](https://github.com/willhao)
- LinkedIn: [willhao](https://linkedin.com/in/willhao)
- University: UT Austin '28, Mathematics + Plan II Honors

---

<div align="center">
  <strong>Built with ❤️ using Next.js 15 & React 19</strong>
</div>