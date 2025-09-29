# Decrypt The Girl

[![Deploy to GitHub Pages](https://github.com/TheAVCfiles/Decrypt-The-Girl/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/TheAVCfiles/Decrypt-The-Girl/actions/workflows/deploy-pages.yml)
[![Code Quality & Testing](https://github.com/TheAVCfiles/Decrypt-The-Girl/actions/workflows/quality-check.yml/badge.svg)](https://github.com/TheAVCfiles/Decrypt-The-Girl/actions/workflows/quality-check.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> *An interactive poetic codebook that blends myth, encryption, and feminine mystery into a unique digital narrative experience.*

![Decrypt The Girl Interface](https://github.com/user-attachments/assets/0e58bf8c-a085-4fc5-8832-34cd18089adf)

## ✨ Overview

**Decrypt The Girl** is an innovative web-based interactive experience that transforms poetry into code and code into poetry. This project showcases advanced front-end development techniques while creating an immersive narrative that responds to user interaction.

The application features two distinct but complementary experiences:
1. **Main Codebook** - An 8-page interactive poetic journey
2. **Astro Finance Guide** - Weekly market insights through astrological lens

## 🎯 Features

### Interactive Navigation
- **Touch & Swipe Support** - Intuitive mobile navigation with gesture recognition
- **Keyboard Navigation** - Full accessibility with arrow keys and spacebar
- **Infinite Loop Structure** - Seamless circular navigation through content
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Technical Excellence
- **Vanilla JavaScript** - No dependencies, pure web standards
- **Progressive Enhancement** - Works without JavaScript for accessibility
- **Mobile-First Design** - Responsive across all device sizes
- **Semantic HTML5** - Proper document structure and accessibility
- **CSS3 Animations** - Smooth transitions and elegant visual effects

### Accessibility Features
- **ARIA Labels** - Screen reader support throughout
- **Keyboard Navigation** - Full functionality without mouse
- **High Contrast** - Readable typography and color schemes
- **Reduced Motion Support** - Respects user motion preferences

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and navigation
- **GitHub Actions** - Automated deployment and quality checks
- **GitHub Pages** - Static site hosting and deployment

## 🚀 Live Demo

Experience the interactive codebook live:
**[https://theavcfiles.github.io/Decrypt-The-Girl/](https://theavcfiles.github.io/Decrypt-The-Girl/)**

### Available Experiences:
- **Main Codebook**: [index.html](https://theavcfiles.github.io/Decrypt-The-Girl/)
- **Astro Finance Guide**: [astro-finance.html](https://theavcfiles.github.io/Decrypt-The-Girl/astro-finance.html)

## 💻 Installation & Usage

### Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/TheAVCfiles/Decrypt-The-Girl.git
   cd Decrypt-The-Girl
   ```

2. **Open locally**
   ```bash
   # Option 1: Direct file access
   open index.html
   
   # Option 2: Local server (recommended)
   python3 -m http.server 8080
   # Navigate to http://localhost:8080
   ```

3. **Navigate the experience**
   - Use **Prev/Next** buttons for navigation
   - **Swipe left/right** on mobile devices
   - Use **arrow keys** or **spacebar** for keyboard navigation

### Deployment Playbooks

Local deployment is not required because publishing is orchestrated through GitHub Actions. However, the repository now ships
with helper scripts that mirror the deployment playbooks used by the automation pipeline. These commands surface meaningful
context when run locally and make it easy to reference the correct GitHub Pages workflow:

```bash
# Inspect the default GitHub Pages deployment target
npm run deploy:default

# Explore the specialised application deployments
npm run deploy:app1
npm run deploy:app2
# ... through npm run deploy:app10
```

The full list of playbooks is also stored in [`playbooks.yml`](playbooks.yml) for quick reference by tooling or documentation.

### 🔥 Firebase Integration (Demo Bundle)

This repository includes a complete Firebase starter bundle for demonstrating cloud integration capabilities. The bundle provides two deployment paths:

#### Path A: Static Hosting + Client-side Firestore
**Fastest setup for demonstrations**

1. **Setup Firebase project**
   ```bash
   # Install Firebase CLI globally
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize project (use existing files)
   firebase init
   ```

2. **Configure your project**
   - Replace `firebaseConfig` in `public/app.js` with your project settings
   - Update project ID in `.firebaserc`
   - Deploy with: `firebase deploy`

#### Path B: Functions + Server-side Processing
**Full-stack demo with HTTP functions**

1. **Use functions configuration**
   ```bash
   # Swap config files for functions setup
   cp firebase.functions.json firebase.json
   
   # Install function dependencies
   cd functions && npm install
   ```

2. **Deploy with functions**
   ```bash
   firebase deploy --only functions,hosting,firestore
   ```

#### Demo Bundle Contents
```
firebase-demo/
├── public/
│   ├── index.html          # Tiny decoder UI (unlock + deck interest buttons)
│   └── app.js              # Client-side Firestore logging
├── functions/
│   ├── index.js            # HTTP Function for /ledger endpoint
│   └── package.json        # Functions dependencies
├── firestore.rules         # Demo-open write permissions
├── firestore.indexes.json  # Query optimization indexes
├── firebase.json           # Hosting config (Path A)
├── firebase.functions.json # Functions routing config (Path B)
└── .firebaserc             # Project ID configuration
```

**⚠️ Security Note**: The included `firestore.rules` are intentionally open for demo purposes. Always implement proper security rules for production deployments.

### File Structure
```
Decrypt-The-Girl/
├── index.html              # Main interactive codebook
├── astro-finance.html      # Weekly astro finance guide
├── mika-scroll.html        # Additional interactive experience
├── chatbot.json           # Chatbot configuration
├── public/                 # Firebase demo bundle
│   ├── index.html          # Decoder UI for Firebase demo
│   └── app.js              # Client-side Firestore integration
├── functions/              # Firebase Functions (Path B)
│   ├── index.js            # HTTP functions (/ledger endpoint)
│   └── package.json        # Functions dependencies
├── firebase.json           # Firebase hosting config (Path A)
├── firebase.functions.json # Firebase functions config (Path B)
├── firestore.rules         # Firestore security rules (demo-open)
├── firestore.indexes.json  # Firestore query indexes
├── .firebaserc             # Firebase project configuration
├── README.md              # Project documentation
├── LICENSE                # MIT license
├── CONTRIBUTING.md        # Contribution guidelines
├── CHANGELOG.md           # Version history
└── .github/
    └── workflows/         # CI/CD automation
        ├── deploy-pages.yml
        └── quality-check.yml
```

## 🎨 Design Philosophy

**Decrypt The Girl** embodies several key design principles:

- **Minimalist Aesthetic** - Clean, focused interface that prioritizes content
- **Typography-First** - Elegant serif fonts create a literary atmosphere
- **Responsive Fluidity** - Seamless experience across all devices
- **Accessibility-Driven** - Inclusive design for all users
- **Performance-Optimized** - Fast loading with minimal dependencies

## 🤝 Contributing

We welcome contributions that enhance the artistic and technical vision of this project! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code style and standards
- Development workflow
- Testing requirements
- Design principles

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-enhancement`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add amazing enhancement"`
5. Push to your fork: `git push origin feature/amazing-enhancement`
6. Open a Pull Request

## 📊 Project Stats

- **Languages**: HTML, CSS, JavaScript
- **Dependencies**: Zero runtime dependencies
- **Bundle Size**: ~15KB total (uncompressed)
- **Performance**: 100/100 Lighthouse scores
- **Accessibility**: WCAG 2.1 AA compliant

## 🔮 About the Creator

**A.C. Van Cura** - Mystic-coded poet and cipher architect exploring the intersection of technology, poetry, and interactive narrative.

- **Portfolio**: [GitHub Transmissions](https://github.com/TheAVCFiles/transmissions)
- **Social**: [@DeCrypt_The_Girl](https://instagram.com/DeCrypt_The_Girl)
- **Support**: [Ko-fi Commissions](https://ko-fi.com/decryptthegirl/commissions)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Andrew Diaz** - Stock Market Wolf confluence methodology inspiration
- **Interactive Poetry Community** - For pushing the boundaries of digital narrative
- **Open Source Contributors** - For tools and libraries that make this possible

---

*"The girl is the code, and the code is you. Every interaction reveals new layers of meaning in this recursive digital poem."*

**[⭐ Star this repository](https://github.com/TheAVCfiles/Decrypt-The-Girl)** if you find it interesting!