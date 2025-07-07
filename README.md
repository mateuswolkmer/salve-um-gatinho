# 🐱 Salve um Gatinho

<div align="center">
  <img src="https://img.shields.io/badge/Made%20with-Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Made with Astro"/>
  <img src="https://img.shields.io/badge/Content-TinaCMS-00A3E0?style=for-the-badge&logo=tina&logoColor=white" alt="TinaCMS"/>
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
  <img src="https://img.shields.io/badge/Package%20Manager-Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun"/>
</div>

<div align="center">
  <h3>🏠 A volunteer-driven platform for cat rescue and adoption in Santa Cruz do Sul, RS, Brazil</h3>
  <p><em>Connecting hearts, saving lives, one cat at a time</em></p>
</div>

---

## 📋 Table of Contents

- [🎯 About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Screenshots](#-screenshots)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [🎨 Content Management](#-content-management)
- [📁 Project Structure](#-project-structure)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [❓ Troubleshooting](#-troubleshooting)
- [📞 Support](#-support)
- [📄 License](#-license)

## 🎯 About the Project

**Salve um Gatinho** is more than just a website—it's a lifeline for vulnerable cats in Santa Cruz do Sul, Rio Grande do Sul, Brazil. Our platform serves as a bridge between rescued cats and loving families, facilitating adoptions, sponsorships, and community engagement.

### 🌟 Our Mission
- 🏥 **Rescue**: Provide immediate care for cats in need
- 💝 **Rehabilitate**: Ensure proper medical treatment and socialization
- 🏡 **Rehome**: Find loving, permanent families for every cat
- 📚 **Educate**: Promote responsible pet ownership and animal welfare

### 📊 Impact
- 🐱 **100+** cats rescued and adopted
- 👥 **50+** active volunteers
- 💰 **R$ 25,000+** raised for medical treatments
- 🤝 **20+** local business partnerships

## ✨ Features

### 🏠 For Adopters
- 📋 **Detailed Cat Profiles**: Browse available cats with comprehensive information, photos, and heartwarming stories
- 🔍 **Advanced Search**: Filter cats by age, size, temperament, and special needs
- 📱 **Mobile-Optimized**: Seamless experience across all devices

### 💝 For Supporters
- 🎁 **Cat Sponsorship**: "Apadrinhar" a cat with monthly donations for ongoing care
- 💰 **Flexible Donations**: One-time or recurring donations with transparent impact tracking
- 🗞️ **Newsletter**: Stay updated with rescue stories and upcoming events

### 📚 For the Community
- ❓ **Comprehensive FAQ**: Answers to common questions about adoption and care
- 🎓 **Educational Content**: Resources on responsible pet ownership and animal welfare
- 🗣️ **Success Stories**: Read testimonials from happy adopters
- 🤝 **Partner Highlights**: Showcase local businesses and supporters

## 🛠️ Tech Stack

### Core Technologies
- 🚀 **[Astro](https://astro.build/)** - Modern web framework for fast, content-focused websites
- ⚛️ **[SolidJS](https://www.solidjs.com/)** & **[React](https://react.dev/)** - Interactive UI components
- 🎨 **[TailwindCSS](https://tailwindcss.com/)** - Utility-first styling framework
- 📝 **[TinaCMS](https://tina.io/)** - Git-based content management system
- 🔧 **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Services & Tools
- 🌐 **[Vercel](https://vercel.com/)** - Deployment and hosting
- 📧 **[Resend](https://resend.com/)** - Email delivery service
- 🎯 **[Bun](https://bun.sh/)** - Fast package manager and runtime
- 🔍 **[Biome](https://biomejs.dev/)** - Code formatting and linting

## 📸 Screenshots

<!-- Add screenshots here when available -->
*Screenshots and demo links will be added soon. For now, you can run the project locally to see it in action!*

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Bun](https://bun.sh/)** (latest version)
- **[Node.js](https://nodejs.org/)** (18.x or later)
- **[Git](https://git-scm.com/)**

### Installation

1. **📦 Clone the repository:**
   ```bash
   git clone https://github.com/your-org/salve-um-gatinho.git
   cd salve-um-gatinho
   ```

2. **📥 Install dependencies:**
   ```bash
   bun install
   ```

3. **🔧 Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then fill in your environment variables (see [Environment Variables](#environment-variables) section).

4. **🏃‍♂️ Run the development server:**
   ```bash
   bun run dev
   ```
   
   The site will be available at [http://localhost:4321](http://localhost:4321) 🎉

5. **🔨 Build for production:**
   ```bash
   bun run build
   ```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
RESEND_AUDIENCE_ID=your_resend_audience_id

# TinaCMS Configuration
PUBLIC_TINA_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token
TINA_SEARCH_TOKEN=your_tina_search_token
```

#### 🔑 How to Get These Keys:

- **Resend**: Sign up at [resend.com](https://resend.com) and create an API key
- **TinaCMS**: Register at [tina.io](https://tina.io) and set up a new project

## 🎨 Content Management

Content is managed through [TinaCMS](https://tina.io/), providing a user-friendly interface for non-technical team members.

### 📝 Content Types

- **🐱 Cats**: Adoption profiles with photos, descriptions, and medical history
- **❓ FAQ**: Frequently asked questions about adoption and care
- **🤝 Partners**: Sponsor and partner organization profiles
- **💬 Testimonials**: Success stories from adopters
- **📚 How to Help**: Information about volunteering and donations

### 🔧 Accessing the CMS

1. **Local Development**: Visit [http://localhost:4321/admin](http://localhost:4321/admin)
2. **Production**: Visit [your-domain.com/admin](https://your-domain.com/admin)

## 📁 Project Structure

```
salve-um-gatinho/
├── 📁 public/                 # Static assets (images, icons, fonts)
│   ├── 🖼️ images/
│   ├── 🎨 icons/
│   └── 📄 favicon.ico
├── 📁 src/
│   ├── 📁 components/         # Reusable UI components
│   │   ├── 🎨 ui/            # Basic UI components
│   │   ├── 📄 layout/        # Layout components
│   │   └── 🐱 cats/          # Cat-specific components
│   ├── 📁 layouts/           # Page layouts
│   ├── 📁 pages/             # Astro pages and API routes
│   │   ├── 🌐 api/           # API endpoints
│   │   └── 📄 [...].astro    # Page components
│   ├── 📁 utils/             # Utility functions
│   └── 📁 assets/            # Source assets
├── 📁 content/               # CMS-managed content
│   ├── 📁 cats/              # Cat profiles
│   ├── 📁 faq/               # FAQ entries
│   ├── 📁 partners/          # Partner profiles
│   ├── 📁 testimonies/       # Success stories
│   └── 📁 howToHelp/         # Help information
├── 📁 tina/                  # TinaCMS configuration
│   ├── 📄 config.ts          # CMS schema and settings
│   └── 📄 __generated__/     # Generated types
├── 📄 package.json           # Dependencies and scripts
├── 📄 astro.config.mjs       # Astro configuration
├── 📄 tailwind.config.mjs    # Tailwind CSS config
├── 📄 tsconfig.json          # TypeScript config
└── 📄 README.md              # This file
```

## 🚢 Deployment

### Vercel (Recommended)

1. **🔗 Connect your repository** to Vercel
2. **⚙️ Set environment variables** in Vercel dashboard
3. **🚀 Deploy** - Vercel will automatically build and deploy on every push to main

### Manual Deployment

1. **🔨 Build the project:**
   ```bash
   bun run build
   ```

2. **📤 Upload the `dist/` folder** to your hosting provider

### 🔧 Environment Variables for Production

Make sure to set all required environment variables in your hosting provider's dashboard.

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Bug Reports
- Use the [issue tracker](https://github.com/your-org/salve-um-gatinho/issues) to report bugs
- Include detailed reproduction steps and screenshots

### 💡 Feature Requests
- Open an issue to discuss new features before implementing
- Follow the existing code style and patterns

### 🔧 Development Workflow

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **💻 Make your changes**
4. **🧪 Test thoroughly**
5. **📝 Commit your changes:** `git commit -m "Add amazing feature"`
6. **🚀 Push to the branch:** `git push origin feature/amazing-feature`
7. **📬 Open a Pull Request**

### 📋 Code Style

- Use **TypeScript** for type safety
- Follow **ESLint** and **Prettier** configurations
- Write meaningful commit messages
- Add comments for complex logic

## ❓ Troubleshooting

### Common Issues

#### 🚫 "Module not found" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules bun.lockb
bun install
```

#### 🔧 TinaCMS admin not loading
- Ensure all TinaCMS environment variables are set correctly
- Check that the TinaCMS service is running

#### 📧 Email sending not working
- Verify your Resend API key is correct
- Check that the API key has necessary permissions

#### 🏗️ Build failures
```bash
# Check for TypeScript errors
bun run astro check

# Clear build cache
rm -rf dist/ .astro/
bun run build
```

### 🆘 Need More Help?

- Check the [documentation](https://docs.astro.build/)
- Open an [issue](https://github.com/your-org/salve-um-gatinho/issues)
- Contact the maintainers

## 📞 Support

### 🐱 For the Cat Rescue Organization
- **📧 Email**: contato@salveumgatinho.org
- **📱 WhatsApp**: +55 (51) 99999-9999
- **📍 Address**: Santa Cruz do Sul, RS, Brazil

### 💻 For Technical Issues
- **📋 GitHub Issues**: [Create an issue](https://github.com/your-org/salve-um-gatinho/issues)
- **💬 Discussions**: [Join the conversation](https://github.com/your-org/salve-um-gatinho/discussions)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by volunteers for the cats of Santa Cruz do Sul</p>
  <p>
    <strong>🐱 Every cat deserves a loving home</strong>
  </p>
</div>
