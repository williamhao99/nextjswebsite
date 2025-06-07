# Codebase Organization Guide

This document outlines the organized structure of the willhao.info codebase.

## 📁 Directory Structure

### `/components/` - React Components
```
components/
├── index.js                 # Centralized exports
├── layout/                  # Layout components
│   ├── Navigation.js
│   ├── Footer.js
│   ├── Layout.js
│   └── Hero.js
├── ui/                      # Reusable UI components
│   ├── PostCard.js
│   ├── PageHeader.js
│   └── Experience.js
├── features/                # Feature-specific components
│   └── SearchModal.js
├── icons/                   # Icon components
│   ├── GitHubIcon.js
│   ├── LinkedInIcon.js
│   ├── InstagramIcon.js
│   ├── SpotifyIcon.js
│   └── SearchIcon.js
└── widgets/                 # Widget components
    ├── SpotifyWidget.js
    ├── ChessWidget.js
    └── ClashWidget.js
```

### `/styles/` - CSS Organization
```
styles/
├── globals.css              # Main entry point (imports all)
├── fonts.css                # Font declarations
├── variables.css            # CSS custom properties
├── base.css                 # Typography, resets, base styles
├── layout.css               # Layout utilities and patterns
├── components.css           # Common component styles
└── globals.css backup       # Original backup file
```

### `/lib/` - Utilities and Libraries
```
lib/
├── api/                     # API-related utilities
│   └── data-fetchers.js
├── hooks/                   # Custom React hooks (future)
├── constants/               # Constants and enums (future)
└── utils.js                 # General utilities
```

### `/config/` - Configuration
```
config/
└── site.js                  # Site-wide configuration
```

### `/content/` - Content Management
```
content/
├── blog/                    # Blog posts (future)
├── works/                   # Portfolio works (future)
└── projects/                # Project content (future)
```

### `/data/` - Static Data
```
data/                        # Static data files (future)
```

### `/pages/` - Next.js Pages
```
pages/
├── api/                     # API routes
├── blog/                    # Blog pages
├── works/                   # Works pages
└── [various page files]
```

## 🎯 Benefits of This Organization

### 1. **Modular CSS Architecture**
- **Maintainable**: Each CSS file has a single responsibility
- **Scalable**: Easy to add new styles without conflicts
- **Readable**: Clear separation of concerns
- **Reusable**: Common patterns available as utilities

### 2. **Component Organization**
- **Logical grouping**: Components grouped by function
- **Easy imports**: Centralized exports via `components/index.js`
- **Scalable**: Clear places for new components
- **Maintainable**: Related components are co-located

### 3. **Configuration Management**
- **Centralized settings**: All site config in one place
- **Environment-friendly**: Easy to manage different environments
- **Type-safe**: Can be easily typed with TypeScript later

### 4. **Content Management**
- **Structured content**: Clear separation of different content types
- **Future-ready**: Ready for CMS integration
- **Organized**: Easy to find and manage content

## 🚀 Usage Examples

### Importing Components
```javascript
// Before
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// After
import { Navigation, Footer } from '../components';
```

### Using Configuration
```javascript
import { siteConfig } from '../config/site';

const navigation = siteConfig.navigation;
const socialLinks = siteConfig.social;
```

### CSS Structure
```css
/* All styles are now imported in globals.css */
@import './fonts.css';
@import './variables.css';
@import './base.css';
@import './layout.css';
@import './components.css';
```

## 📋 Next Steps

1. **Update Import Statements**: Update all component imports to use the new paths
2. **Add TypeScript**: Consider adding TypeScript for better type safety
3. **Content Management**: Implement the content management structure
4. **Testing**: Add component and utility tests
5. **Documentation**: Add JSDoc comments to components
6. **Performance**: Implement code splitting and lazy loading

## 🔧 Maintenance

- Keep components in their appropriate directories
- Update the centralized index files when adding new components
- Maintain the CSS module structure
- Update configuration as needed
- Document any new patterns or conventions