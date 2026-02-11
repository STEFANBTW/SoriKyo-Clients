# SoriKyo Clients - Project Status Report

**Report Date:** 2026-02-10

## 1. Project Overview

The `SoriKyo Clients` repository is a monorepo containing two primary Next.js applications: `PRG` and `Custom CMS`. The main application, `PRG`, is a highly ambitious "Tier 3 (Market Dominator)" project designed to be a "Neuro-Inclusive, Offline-First PWA with Agentic Booking capabilities, 3D Haptic Product Visualization, and a Headless CMS foundation."

Development follows a strict, custom methodology called the "BLAST Protocol," which mandates defining Standard Operating Procedures (SOPs) in markdown before writing code.

## 2. Main Goals & Purpose

*   **`PRG` (Market Dominator)**: The core application aims to deliver a sophisticated user experience with advanced features:
    *   **Agentic Booking**: An AI-assisted booking system.
    *   **Spatial UX**: 3D product visualization using React Three Fiber.
    *   **Neuro-Inclusive UI**: Accessibility features like high-contrast mode and reduced motion.
    *   **Offline-First PWA**: Designed to be functional without a network connection.
    *   **Vector Search**: Semantic search capabilities.

*   **`Custom CMS`**: A supporting project that leverages AI to generate content schemas from natural language prompts, likely feeding content structures into the main `PRG` application.

## 3. Service Integrations

*   **GitHub**: The source code is hosted on GitHub: `https://github.com/STEFANBTW/SoriKyo-Clients.git`.
*   **Vercel**: The project is set up for deployment on Vercel. The root configuration is specifically set to build and deploy the `PRG` application, indicating it is the primary deliverable.
*   **Supabase**: Supabase is the core backend for the `PRG` application, providing:
    *   **Authentication**: User management.
    *   **Database**: PostgreSQL database for application data, including bookings.
    *   **Vector Database**: `pgvector` for semantic search features.
    The project includes a structured `supabase` directory with migrations and seed data, indicating a well-managed database schema.

## 4. Current Status & Health

*   **Structure**: The monorepo is well-organized, with clear separation between the `PRG` and `Custom CMS` projects.
*   **Tech Stack**: The project utilizes a modern and powerful tech stack, including Next.js (App Router), React, TypeScript, Tailwind CSS, and React Three Fiber.
*   **Development**: The presence of a detailed development protocol ("BLAST"), architecture documents (SOPs), and database migrations suggests that the project is in a state of active and organized development. The `PRG` project appears to be the main focus.
*   **Overall**: The project is ambitious and appears to be well-planned and in active development. The "BLAST Protocol" and detailed documentation indicate a high degree of engineering discipline.
