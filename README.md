# Salve um Gatinho

<div align="center">
  <img src="https://img.shields.io/badge/Made%20with-Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white" alt="Made with Astro"/>
  <img src="https://img.shields.io/badge/Content-TinaCMS-00A3E0?style=for-the-badge&logo=tina&logoColor=white" alt="TinaCMS"/>
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
  <img src="https://img.shields.io/badge/Package%20Manager-Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun"/>
</div>

Salve um Gatinho is a volunteer-driven web platform for the rescue, care, and responsible adoption of vulnerable cats in Santa Cruz do Sul, RS, Brazil. The project connects the community to adoption, sponsorship, and donation opportunities, and shares stories of rescued cats.

## Features

- Browse available cats for adoption, with detailed profiles and stories
- Sponsor ("apadrinhar") a cat with monthly donations
- Learn how to help through donations, volunteering, or spreading the word
- Read testimonials from adopters
- FAQ and educational content about rescue and adoption
- Partner and supporter highlights
- Contact and newsletter subscription forms

## Tech Stack

- [Astro](https://astro.build/) (main framework)
- [SolidJS](https://www.solidjs.com/) and [React](https://react.dev/) for interactive components
- [TailwindCSS](https://tailwindcss.com/) for styling
- [TinaCMS](https://tina.io/) for content management
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel](https://vercel.com/) for deployment
- [Resend](https://resend.com/) for email handling
- [Bun](https://bun.sh/) for package management and scripts

## Content Management

Content is managed by [TinaCMS](https://tina.io/). You can access the content management interface at [`/admin`](http://localhost:4321/admin) when running the project locally.

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-org/salve-um-gatinho.git
   cd salve-um-gatinho
   ```
2. **Install dependencies:**
   ```sh
   bun install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root with the following (see below for details):
   ```env
   RESEND_API_KEY=your_resend_api_key
   RESEND_AUDIENCE_ID=your_resend_audience_id
   PUBLIC_TINA_CLIENT_ID=your_tina_client_id
   TINA_TOKEN=your_tina_token
   TINA_SEARCH_TOKEN=your_tina_search_token
   ```
4. **Run the development server:**

   ```sh
   bun run dev
   ```

   The site will be available at [http://localhost:4321](http://localhost:4321).

   You can access the TinaCMS admin at [http://localhost:4321/admin](http://localhost:4321/admin).

5. **Build for production:**
   ```sh
   bun run build
   ```

## Environment Variables

- `RESEND_API_KEY`: API key for Resend (email sending)
- `RESEND_AUDIENCE_ID`: Audience ID for Resend (newsletter)
- `PUBLIC_TINA_CLIENT_ID`: TinaCMS client ID
- `TINA_TOKEN`: TinaCMS token
- `TINA_SEARCH_TOKEN`: TinaCMS search indexer token

## Project Structure

```
/
├── public/           # Static assets (images, icons, etc.)
├── src/
│   ├── components/   # UI and page components (Astro, Solid, React)
│   ├── layouts/      # Layout components
│   ├── pages/        # Astro pages and API routes
│   ├── api/          # API endpoints (contact, subscribe)
│   └── utils/        # Utility functions
├── content/          # Markdown content (cats, partners, faq, etc.)
├── tina/             # TinaCMS configuration
├── package.json
└── astro.config.mjs
```

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss major changes.

## License

MIT
