# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Bloom Fallback Asset Generator**: Automated generation of visual fallback assets for Day Zero Scroll component
  - Autosize encode feature to ensure assets stay within 50KB maximum file size for mobile optimization
  - Three responsive sizes: mobile (800x600), tablet (1200x900), desktop (1600x1200)
  - Automatic JPEG quality adjustment to meet file size constraints
  - Manifest file with generation metadata and asset information
- **Build and Release Workflow**: GitHub Actions workflow (`build-bloom-fallbacks.yml`) for automated asset generation and release
  - Generates draft GitHub Releases with asset packages (TAR.GZ and ZIP)
  - Includes SHA-256 checksums for asset verification
  - SLSA Level 3 provenance generation for supply chain security
  - Supports workflow dispatch and tag-based releases
- **Licensing for Generated Assets**: Proprietary license (`BLOOM_ASSETS_LICENSE.md`) to protect IP rights
  - Clear attribution requirements
  - Commercial use guidelines
  - Non-commercial use permissions
- **Updated SLSA Workflow**: Enhanced `generator-generic-ossf-slsa3-publish.yml` with mobile-compatible defaults
  - Automatic installation of image processing dependencies
  - Integration with Bloom asset generation
  - Mobile-optimized artifact packaging
- Professional documentation (README, CONTRIBUTING, LICENSE)
- Comprehensive code comments and documentation
- GitHub Actions workflows for CI/CD
- Accessibility improvements with ARIA labels
- SEO and social media meta tags
- Professional repository structure and organization
- Day Zero Scroll ephemeris experience (`day-zero-scroll.html`) and reusable timeline component (`scripts/day-zero-scroll.js`)

### Changed
- Enhanced README with detailed project information
- Improved code formatting and consistency
- Optimized mobile responsiveness
- Updated branch naming conventions

### Fixed
- Touch event handling improvements
- Cross-browser compatibility issues
- Accessibility compliance updates

## [1.0.0] - 2024-07-28

### Added
- Interactive poetic codebook (`index.html`)
- Weekly astro finance guide (`astro-finance.html`)
- Chatbot configuration system (`chatbot.json`)
- Touch/swipe navigation for mobile devices
- Responsive design with elegant typography
- GitHub Pages deployment configuration

### Features
- 8-page interactive narrative experience
- Mobile-first responsive design
- Touch gesture support for navigation
- Elegant animations and transitions
- Professional typography with Georgia serif font