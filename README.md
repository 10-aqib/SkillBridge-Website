# SkillBridge 🌉

**SkillBridge** is a modern digital platform designed to connect skilled service providers with people who need reliable and professional services.

The project aims to make it easier for users to discover skilled workers, explore their services, build trust through profiles and ratings, and connect with the right professional for their needs.

> **Connecting Skills with Opportunities.**

---

## 🚀 Overview

Finding trustworthy skilled workers can often be difficult, especially when there is no centralized platform to discover, compare, and connect with service providers.

SkillBridge addresses this problem by providing a digital platform where:

* Customers can discover skilled professionals.
* Service providers can showcase their skills and services.
* Users can explore professional profiles.
* Customers can make informed decisions before hiring.
* Skilled workers can gain better visibility and access to opportunities.

The website serves as the modern web interface and digital presence for the SkillBridge platform.

---

## ✨ Features

### 🏠 Modern Landing Page

A visually polished landing page introducing SkillBridge, its purpose, benefits, and core functionality.

### 👨‍🔧 Skilled Worker Platform

Designed around connecting customers with professionals offering different skills and services.

### 🔐 Authentication

Authentication functionality is integrated using Supabase, providing a foundation for secure user access and account management.

### 📊 User Dashboard

A dedicated dashboard interface provides users with an organized area for accessing platform functionality.

### 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

### 🎨 Modern UI/UX

The website includes:

* Responsive navigation
* Modern hero section
* Feature showcases
* Animated sections
* App previews
* Call-to-action sections
* Professional typography
* Interactive UI elements

### ⚡ Smooth Animations

Scroll-based animations and interactive elements are used throughout the website to create a more engaging experience.

### 📱 Mobile App Preview

The website includes dedicated sections showcasing the SkillBridge mobile application experience.

### 🔗 Clear User Journey

The website guides visitors through:

**Problem → Solution → Features → How It Works → Target Audience → Call to Action**

---

## 🛠️ Tech Stack

| Technology         | Purpose                                      |
| ------------------ | -------------------------------------------- |
| **Next.js 16**     | React framework and application architecture |
| **React 19**       | User interface development                   |
| **TypeScript**     | Type-safe development                        |
| **Tailwind CSS 4** | Styling and responsive UI                    |
| **Supabase**       | Authentication and backend services          |
| **Lucide React**   | UI icons                                     |
| **ESLint**         | Code quality and linting                     |
| **Vercel**         | Deployment platform                          |

The application's `package.json` confirms Next.js 16.3.3, React 19.2.8, TypeScript 5, Tailwind CSS 4, Supabase SSR/client packages, and Lucide React.

---

## 📂 Project Structure

```text
skillBridge-Website/
│
├── .gitignore
├── README.md
│
└── website/
    │
    ├── app/
    │   ├── dashboard/
    │   ├── login/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    │
    ├── components/
    │   ├── AboutSection.tsx
    │   ├── AppPreview.tsx
    │   ├── AudienceSection.tsx
    │   ├── FeatureShowcase.tsx
    │   ├── FinalCTA.tsx
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── HowItWorks.tsx
    │   ├── Navbar.tsx
    │   ├── PhoneMockup.tsx
    │   ├── ProblemSolution.tsx
    │   ├── ScrollAnimationProvider.tsx
    │   ├── ValueBar.tsx
    │   └── ValueHighlights.tsx
    │
    ├── config/
    │   └── site.ts
    │
    ├── middleware.ts
    ├── next.config.ts
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    └── ...
```

The repository follows the Next.js App Router structure, with reusable UI sections separated into the `components` directory.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/10-aqib/skillBridge-Website.git
```

### 2. Navigate to the project

```bash
cd skillBridge-Website/website
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file inside the `website` directory.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the placeholder values with your Supabase project credentials.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📦 Available Scripts

Inside the `website` directory:

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint to identify code-quality issues.

---

## 🔐 Environment Configuration

SkillBridge uses Supabase for backend-related functionality and authentication.

For local development, configure the required environment variables in:

```text
website/.env.local
```

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Never commit `.env.local` or private credentials to GitHub.**

---

## 🌐 Deployment

SkillBridge is built with Next.js and is suitable for deployment on Vercel.

### Deploy with Vercel

1. Import the GitHub repository into Vercel.
2. Set the project root directory to:

```text
website
```

3. Configure the required environment variables.
4. Deploy the project.

### Production Build

Before deployment, verify that the application builds successfully:

```bash
npm install
npm run lint
npm run build
```

---

## 🎯 Project Goals

SkillBridge is designed to:

* Make skilled services easier to discover.
* Help customers find suitable professionals.
* Give skilled workers an online presence.
* Improve trust between customers and service providers.
* Create better employment and service opportunities.
* Provide a simple and modern digital experience.

---

## 🔮 Future Improvements

Potential future improvements include:

* 🔎 Advanced worker search and filtering
* 📍 Location-based service discovery
* ⭐ Worker ratings and reviews
* 💬 Real-time customer-worker messaging
* 📅 Service booking and scheduling
* 💰 Online payments
* 🔔 Push notifications
* 👤 Complete worker profiles
* 📊 Advanced dashboards
* 🛡️ Identity and profile verification
* 📱 Full Flutter mobile application
* 🤖 AI-powered worker recommendations

---

## 🧩 Application Sections

The current website is organized into reusable sections including:

* Hero
* About
* Problem & Solution
* Features
* How It Works
* Target Audience
* App Preview
* Value Highlights
* Final Call to Action
* Footer

This component-based architecture makes the website easier to maintain and extend.

---

## 🛡️ Security

The project follows standard web application security practices, including:

* Environment-based configuration
* No hardcoded private credentials
* Supabase-based authentication
* Server-side middleware support
* TypeScript for safer development
* ESLint for code-quality checks

---

## 📱 Platform Vision

SkillBridge is not intended to be limited to a website.

The long-term vision is to provide a complete ecosystem consisting of:

```text
                 SkillBridge
                     │
        ┌────────────┼────────────┐
        │            │            │
     Website     Mobile App    Backend
        │            │            │
        └────────────┼────────────┘
                     │
             Skilled Professionals
                     │
                  Customers
```

The web platform provides the digital foundation while the mobile application can provide a more convenient experience for customers and service providers.

---

## 👨‍💻 Developer

**Muhammad Aqib**

BS Information Technology Student
Bahria University

---

## 📄 License

This project is currently developed as an academic and portfolio project.

If you intend to reuse, distribute, or commercially deploy the project, please contact the repository owner first.

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

**SkillBridge - Connecting Skills with Opportunities.**

