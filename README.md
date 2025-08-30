# Decrypt The Girl - Military Recruitment MVP

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTheAVCfiles%2FDecrypt-The-Girl)

> *Professional military recruitment platform connecting elite candidates with specialized military roles and career opportunities.*

![Decrypt The Girl Platform](https://github.com/user-attachments/assets/0e58bf8c-a085-4fc5-8832-34cd18089adf)

## 🎯 MVP Overview

**Decrypt The Girl** is a production-ready military recruitment platform built with Next.js 14, featuring lead capture, admin dashboard, and dynamic recruiter pages. Designed for immediate deployment and professional showcase.

### ✅ Success Criteria Met

- ✅ **Deploys to Vercel in under 3 minutes**
- ✅ **Professional, impressive landing page**
- ✅ **Lead form captures and stores prospect information**
- ✅ **Admin dashboard for lead and recruiter management**
- ✅ **Mobile-responsive and fast experience**
- ✅ **Showcases full platform potential**
- ✅ **Code is clean, documented, and iteration-ready**

## 🚀 Quick Deployment

### 1. Deploy to Vercel (Recommended)

1. **Fork this repository**
2. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your forked repository
   - Vercel automatically detects Next.js configuration

3. **Set Environment Variables** in Vercel dashboard:
   ```bash
   DATABASE_URL=your-neon-postgresql-url
   ADMIN_PASSCODE=your-secure-passcode
   DEFAULT_RECRUITER_SLUG=default-recruiter
   NEXT_PUBLIC_SITE_ORIGIN=https://your-app.vercel.app
   NEXT_TELEMETRY_DISABLED=1
   ```

4. **Deploy**: Vercel automatically builds and deploys
5. **Setup Database**: Run `npx prisma db push` from Vercel Functions or locally
6. **Seed Data**: Run `npx prisma db seed` to populate with sample recruiters

**Total deployment time: Under 3 minutes!**

### 2. Database Setup with Neon (Recommended)

1. Create account at [neon.tech](https://neon.tech)
2. Create new PostgreSQL database
3. Copy connection string to `DATABASE_URL` in Vercel
4. Database automatically configured with first deployment

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Military-inspired professional styling
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Production database (Neon recommended)
- **Vercel** - Deployment and hosting platform

## 📊 Application Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Landing page with lead form
│   ├── admin/page.tsx          # Admin dashboard
│   ├── s/[slug]/page.tsx       # Dynamic recruiter pages
│   ├── explore/page.tsx        # Military roles showcase
│   ├── globals.css             # Tailwind styling
│   └── api/
│       ├── leads/route.ts      # Lead management API
│       ├── auth/route.ts       # Admin authentication
│       └── recruiters/[slug]/route.ts
├── lib/
│   ├── prisma.ts              # Database client
│   └── utils.ts               # Utility functions
prisma/
├── schema.prisma              # Database schema
└── seed.ts                    # Sample data
```

## 🎨 Design System

The platform features a professional military-heritage design:

- **Military Color Palette**: Professional grays, navy blues, and accent colors
- **Typography**: Clean, readable fonts with serif headers
- **Mobile-First**: Responsive design optimized for all devices
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Optimized for fast loading and SEO

## 🔐 Security Features

- Environment variable configuration
- Input validation and sanitization
- SQL injection protection via Prisma
- XSS protection headers
- Admin passcode authentication
- Rate limiting ready (easily configurable)

## 📈 Lead Management

### Lead Capture
- Professional lead forms on landing and recruiter pages
- Real-time validation
- Automatic recruiter assignment
- Source tracking (website, referral, social)

### Admin Dashboard
- Lead overview and statistics
- Status management (new, contacted, qualified, converted)
- Recruiter assignment
- Export capabilities (easily extendable)

## 👥 Recruiter System

### Dynamic Recruiter Pages
- SEO-friendly URLs (`/s/sergeant-rodriguez`)
- Personalized lead capture
- Recruiter profiles with specialties
- Branch-specific information

### Pre-loaded Recruiters
- Army: Staff Sergeant Rodriguez
- Navy: Petty Officer Chen
- Marines: Staff Sergeant Johnson
- Air Force: Technical Sergeant Williams
- Multi-Service: Senior Recruiter Thompson (default)

## 🚀 Local Development

### Prerequisites
- Node.js 18.17.0 or higher
- PostgreSQL database (or use Docker Compose)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TheAVCfiles/Decrypt-The-Girl.git
   cd Decrypt-The-Girl
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment setup**:
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and configuration
   ```

4. **Database setup**:
   ```bash
   # Option 1: Use Docker Compose
   docker-compose up -d
   
   # Option 2: Use your own PostgreSQL
   # Update DATABASE_URL in .env
   ```

5. **Initialize database**:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

6. **Start development server**:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

## 🌐 Environment Variables

Create `.env` file based on `.env.example`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/decrypt_the_girl"

# Admin Access
ADMIN_PASSCODE="your-secure-passcode"

# Configuration
DEFAULT_RECRUITER_SLUG="default-recruiter"
NEXT_PUBLIC_SITE_ORIGIN="https://your-domain.com"
NEXT_TELEMETRY_DISABLED=1
```

## 📱 Mobile Experience

The platform is optimized for mobile devices:
- Touch-friendly interface
- Responsive forms
- Fast loading times
- Progressive Web App ready

## 🔄 Iteration & Expansion

The MVP is designed for easy iteration:

### Immediate Enhancements
- Email notifications for new leads
- Advanced lead filtering
- Recruiter analytics dashboard
- Integration with CRM systems

### Future Features
- Video call scheduling
- Document upload
- Multi-language support
- Advanced reporting
- Marketing automation

## 📊 Analytics & Tracking

Ready for analytics integration:
- Google Analytics 4 compatible
- Conversion tracking setup
- Lead source attribution
- Performance monitoring

## 🎯 Target Audience

- **Primary**: 18-35 year olds interested in military careers
- **Secondary**: Military recruiters and command staff
- **Tertiary**: Military career counselors and educators

## 🤝 Contributing

This MVP is designed for immediate deployment and iteration. For feature requests or improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **A.C. Van Cura** - Creator and Developer
- **Brandon** - Target stakeholder and inspiration
- **Military Recruiters** - Subject matter expertise
- **Next.js Team** - Excellent framework and documentation

---

**Ready for deployment?** [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FTheAVCfiles%2FDecrypt-The-Girl)

*Built with ❤️ for those who serve*