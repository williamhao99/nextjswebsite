# 🌐 Will Hao - Personal Website

A modern, responsive personal website built with Next.js, showcasing my work, thoughts, and journey as a UT Austin student studying Mathematics and Plan II Honors.

**Live Site**: [willhao.info](https://willhao.info)

## ✨ Features

### 🎨 **Design & User Experience**
- **Clean, Minimalist Design**: Professional aesthetic suitable for academic and professional contexts
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme Toggle**: System preference detection with manual override
- **Smooth Animations**: Subtle transitions and micro-interactions
- **Fast Loading**: Optimized performance with Next.js static generation
- **Keyboard Navigation**: Full accessibility with keyboard shortcuts

### 📝 **Content Management**
- **Dynamic Blog System**: Static content with clean Next.js routing
- **Portfolio Showcase**: Work samples and project highlights
- **Timeline**: Career and educational milestones
- **Now Page**: Current activities and interests
- **Archive**: Organized content history

### 🚀 **Performance & SEO**
- **Static Site Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Next.js Image component with lazy loading
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Accessibility**: WCAG compliant with focus indicators and screen reader support

## 🏗️ Architecture

### **Tech Stack**
- **Frontend**: Next.js 15, React 19, Modern CSS
- **Styling**: CSS Custom Properties, CSS Grid, Flexbox
- **Icons**: Custom SVG icons
- **Fonts**: System fonts with web fallbacks

### **Project Structure**
```
willhao.info/
├── components/              # Reusable React components
│   ├── Navigation.js       # Main navigation with search & theme toggle
│   ├── Layout.js           # Page layout wrapper
│   ├── SearchModal.js      # Global search functionality
│   ├── PostCard.js         # Blog post preview cards
│   ├── CardProject.js      # Project showcase cards
│   ├── Hero.js             # Homepage hero section
│   ├── Footer.js           # Site footer with links
│   └── ...
├── pages/                  # Next.js pages (file-based routing)
│   ├── index.js           # Homepage
│   ├── about.js           # About page
│   ├── works.js           # Portfolio/work showcase
│   ├── blog.js            # Blog listing
│   ├── now.js             # Current activities
│   ├── timeline.js        # Career timeline
│   ├── archive.js         # Content archive
│   ├── [slug].js          # Dynamic blog post pages
│   └── _app.js            # Next.js app configuration
├── lib/                   # Utility functions and data management
│   ├── data.js            # Data utility functions
│   └── utils.js           # Helper functions
├── styles/                # Global styles
│   └── globals.css        # Main stylesheet
├── public/                # Static assets
│   ├── images/            # Profile photos and content images
│   ├── favicons/          # Site icons and logo
│   └── theme-assets/      # CSS and JS assets
├── next.config.js         # Next.js configuration
└── package.json           # Project dependencies
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/williamhao99/nextjs-website.git
   cd nextjs-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
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
- Hero section with introduction
- Navigation to all major sections
- Clean, professional landing experience

### **👨‍💻 About** (`/about`)
- Personal background and story
- Academic and professional journey
- Skills and interests

### **💼 Work** (`/works`)
- Portfolio of projects and work samples
- Project cards with descriptions and links
- Professional accomplishments

### **📝 Blog** (`/blog`)
- Technical articles and personal thoughts
- Searchable content with tags
- Responsive post cards

### **📍 Now** (`/now`)
- Current activities and focus areas
- Reading list and current projects
- Updated regularly

### **📅 Timeline** (`/timeline`)
- Career and educational milestones
- Visual timeline of achievements
- Chronological life events

### **📚 Archive** (`/archive`)
- Organized content by date and category
- Historical posts and projects
- Easy browsing of past content

## 🎨 Design Philosophy

### **Visual Design**
- **Minimalist Aesthetic**: Clean, uncluttered interface
- **Professional Look**: Suitable for academic and professional contexts
- **Consistent Branding**: Cohesive color scheme and typography
- **Mobile-First**: Responsive design prioritizing mobile experience

### **User Experience**
- **Intuitive Navigation**: Clear site structure and wayfinding
- **Fast Loading**: Optimized performance for quick page loads
- **Accessibility**: Screen reader friendly with keyboard navigation
- **Search-Driven**: Quick access to any content via global search

## 🔧 Customization

### **Theme Colors**
The site uses CSS custom properties for easy theme customization:
```css
:root {
  --brand-color: #6c49b6;
  --primary-text-color: hsla(214,70%,4%,0.92);
  --background-color: #fff;
  /* ... more variables in basics.css */
}
```

### **Content Updates**
Content can be updated by:
1. Editing the placeholder data in page files
2. Adding new pages to the `pages/` directory
3. Updating component content directly

### **Adding New Pages**
Create new pages by adding files to the `pages/` directory following Next.js conventions.

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Page Load Speed**: <2s on average
- **SEO Optimized**: Proper meta tags and structured data
- **Accessibility**: WCAG 2.1 AA compliant

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
- Email: [Contact through website](https://willhao.info/about)
- University: UT Austin '28, Mathematics + Plan II Honors

---

<div align="center">
  <strong>Built with ❤️ using Next.js</strong>
</div>