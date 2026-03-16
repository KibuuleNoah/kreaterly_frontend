# Kreaterly Frontend

Kreaterly is a **creator-to-brand marketplace** where content creators collaborate with brands through marketing campaigns.

The platform allows brands to launch campaigns and creators to participate by producing promotional videos. Creators earn money based on the **views their videos generate**, making it a performance-based creator economy platform.

This repository contains the **frontend application** that powers the user experience for both creators and brands.

---

# How Kreaterly Works

Kreaterly connects **brands looking for promotion** with **creators who can produce authentic content**.

### Creator Workflow

1. A **creator discovers a campaign** posted by a brand.
2. The creator **joins the campaign**.
3. The creator produces and uploads (or links) a **video promoting the brand**.
4. The **brand reviews the video** to ensure it meets campaign guidelines.
5. Once approved and published, the creator **earns money based on views**.

More views on the video means **higher earnings for the creator**.

---

# Platform Roles

### Creators

Creators participate in campaigns by producing promotional content.
They earn revenue depending on the **performance of their videos**.

### Brands

Brands launch campaigns to promote their products or services using creator-made content.

### Platform

Kreaterly connects both sides and manages campaigns, verification, and earnings.

---

# Tech Stack

The frontend is built using modern web technologies:

* **React**
* **TypeScript**
* **Tailwind / CSS**

The platform communicates with a backend API responsible for:

* Campaign management
* Video verification
* Earnings tracking
* User management

---

# Authentication

Kreaterly supports multiple authentication methods to make onboarding easy:

* Standard **username/password authentication**
* **Third-party login providers** (such as Google or other social platforms)

Users receive a token after authentication which is used to access protected parts of the platform.

---

# Features

The frontend provides interfaces for:

* Discovering marketing campaigns
* Joining campaigns as a creator
* Submitting promotional videos
* Brand review and verification workflows
* Tracking video performance and earnings

---

# Getting Started

Clone the repository:

```bash
git clone https://github.com/KibuuleNoah/kreaterly_frontend.git
cd kreaterly_frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```
