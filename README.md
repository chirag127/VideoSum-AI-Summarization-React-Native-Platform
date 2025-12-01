<div align="center">
  <img src="https://raw.githubusercontent.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/main/docs/logo.png" alt="VideoSum Logo" width="180"/>
  <h1>VideoSum-AI-Powered-Video-Summarization-Mobile-Platform</h1>
  <p>The definitive cross-platform mobile app (React Native/Expo) for AI-powered video summarization. Quickly distill lengthy video content into concise, actionable insights, boosting productivity and learning speed for professionals and students on iOS and Android.</p>

  <p>
    <a href="https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/actions/workflows/ci.yml">
      <img src="https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/actions/workflows/ci.yml/badge.svg" alt="Build Status" style="flat-square">
    </a>
    <a href="https://codecov.io/gh/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform">
      <img src="https://img.shields.io/codecov/c/github/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform?style=flat-square&token=YOUR_CODECOV_TOKEN_HERE" alt="Code Coverage">
    </a>
    <img src="https://img.shields.io/badge/Tech%20Stack-TypeScript%20%7C%20React%20Native%20%7C%20Expo%20%7C%20AI-blue?style=flat-square" alt="Tech Stack">
    <img src="https://img.shields.io/badge/Lint%2FFormat-Biome-blueviolet?style=flat-square" alt="Lint/Format">
    <a href="https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=flat-square" alt="License">
    </a>
    <img src="https://img.shields.io/github/stars/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform?style=flat-square" alt="GitHub Stars">
  </p>

  <a href="https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/stargazers">
    <img src="https://img.shields.io/badge/Star%20⭐%20this%20Repo-lightgrey?style=social&logo=github" alt="Star this repo">
  </a>
</div>

## 🚀 Overview

VideoSum is a cutting-edge cross-platform mobile application engineered to revolutionize how users consume video content. Leveraging advanced AI, it meticulously distills extensive video material into concise, actionable summaries, thereby enhancing user productivity and learning efficiency across both iOS and Android platforms.

## 🌟 Features

*   **AI-Powered Summarization:** Utilizes state-of-the-art machine learning models to identify and extract key information from video content.
*   **Cross-Platform Compatibility:** Developed with React Native and Expo for seamless performance on iOS and Android devices.
*   **Intuitive User Interface:** A clean, modern, and responsive design for an optimal user experience.
*   **Multiple Input Sources:** Support for various video input methods (e.g., direct upload, YouTube links).
*   **Customizable Summary Length:** Tailor summaries to your specific needs, from quick overviews to detailed insights.
*   **Offline Access:** Access previously summarized content without an internet connection.
*   **Secure & Private:** Prioritizes user data privacy and security with robust encryption standards.

## 🏗️ Architecture: Feature-Sliced Design (FSD)

VideoSum adheres to the **Feature-Sliced Design (FSD)** methodology, providing a clear, scalable, and maintainable project structure. This modular approach ensures strict layer independence and promotes efficient feature development and team collaboration.

mermaid
graph TD
    A[App] --> B(Processes & AI Models)
    B --> C(Features)
    C --> D(Entities)
    D --> E(Shared UI & Services)

    subgraph Layers
        direction TB
        A --- App
        B --- Processes
        C --- Features
        D --- Entities
        E --- Shared
    end

    App --> Feature1(Feature: Video Upload)
    App --> Feature2(Feature: Summarization View)
    App --> Feature3(Feature: User Profile)

    Feature1 --> ProcessVideo(Process: Video Processing)
    Feature2 --> ProcessSummary(Process: Summary Generation)

    ProcessVideo --> AI_Model_1(AI Model: Speech-to-Text)
    ProcessVideo --> AI_Model_2(AI Model: Keyframe Extraction)
    ProcessSummary --> AI_Model_3(AI Model: Text Summarization)

    Feature1 --> EntityVideo(Entity: Video Object)
    Feature2 --> EntitySummary(Entity: Summary Object)
    Feature3 --> EntityUser(Entity: User Object)

    EntityVideo --> SharedUI(Shared: UI Components)
    EntityVideo --> SharedUtils(Shared: Utility Functions)
    EntityVideo --> SharedServices(Shared: API Services)


## 📋 Table of Contents

*   [🚀 Overview](#-overview)
*   [🌟 Features](#-features)
*   [🏗️ Architecture: Feature-Sliced Design (FSD)](#%EF%B8%8F-architecture-feature-sliced-design-fsd)
*   [🤖 AI Agent Directives](#-ai-agent-directives)
*   [🛠️ Development Setup](#%EF%B8%8F-development-setup)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running the Application](#running-the-application)
*   [⚙️ Available Scripts](#%E2%9A%99%EF%B8%8F-available-scripts)
*   [🚀 Deployment](#-deployment)
*   [🤝 Contributing](#-contributing)
*   [📄 License](#-license)
*   [🛡️ Security](#%EF%B8%8F-security)

<details>
<summary><h2>🤖 AI Agent Directives</h2></summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** This project, `VideoSum-AI-Powered-Video-Summarization-Mobile-Platform`, is a React Native/Expo mobile application with AI integration.

*   **PRIMARY SCENARIO: MOBILE / APP (TypeScript / React Native)**
    *   **Stack:** This project leverages **TypeScript 5.x+**, **React Native 0.73+**, and **Expo SDK 50+** for cross-platform mobile development. Key tools include **npm/yarn/pnpm** (for package management), **Biome** (for ultra-fast linting and formatting), and **Vitest** (for robust unit and integration testing).
    *   **Architecture:** Adheres to the **Feature-Sliced Design (FSD)** pattern, ensuring clear separation of concerns for features like video upload, AI processing orchestration, summarization display, and user authentication, while maintaining a unified mobile experience.
    *   **AI Integration:** Deeply integrated with **Google Gemini API** (`gemini-3-pro` by default) for intelligent video transcription, keyphrase extraction, and text summarization. Prioritize modular design, clear API contracts, and robust error handling for all AI model interactions.
    *   **State Management:** Utilizes **React Context API** and/or lightweight libraries like **Zustand** or **Jotai** for efficient state management.
    *   **Styling:** Employs **TailwindCSS for React Native** (Nativewind) or a similar utility-first CSS-in-JS solution for rapid and consistent UI development.

*   **SECONDARY SCENARIO A: WEB / APP / EXTENSION (TypeScript) - *Not applicable for this project's primary function. Reference only for potential future web-based extensions or admin panels.***
    *   **Stack:** TypeScript 6.x (Strict), Vite 7 (Rolldown), Tauri v2.x (Native), WXT (Extensions).
    *   **State:** Signals (Standardized).
    *   **Lint/Test:** Biome (Speed) + Vitest (Unit) + Playwright (E2E).
    *   **Architecture:** Feature-Sliced Design (FSD).

*   **SECONDARY SCENARIO B: SYSTEMS / PERFORMANCE (Low Level) - *Not applicable for this project. Reference only.***
    *   **Stack:** Rust (Cargo) or Go (Modules).
    *   **Lint:** Clippy / GolangCI-Lint.
    *   **Architecture:** Hexagonal Architecture (Ports & Adapters).

---

## 4. ARCHITECTURAL PATTERNS & PRINCIPLES
*   **Feature-Sliced Design (FSD):** The primary architectural pattern, emphasizing strict layering and domain-driven module organization. Each "slice" (app, processes, features, entities, shared) has explicit dependencies, enforcing unidirectional data flow.
*   **SOLID Principles:** Adherence to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
*   **DRY (Don't Repeat Yourself):** Promote reusable components, hooks, and utility functions.
*   **YAGNI (You Aren't Gonna Need It):** Avoid premature optimization and over-engineering. Build only what is required.
*   **Clean Code Principles:** Focus on readability, maintainability, and testability.

---

## 5. DEVELOPMENT WORKFLOW & STANDARDS
*   **Testing Strategy:**
    *   **Unit Tests:** Vitest for individual components, hooks, and utility functions. Aim for >90% code coverage.
    *   **Integration Tests:** Vitest for testing interactions between modules within a feature.
    *   **End-to-End (E2E) Tests:** Detox or Maestro for testing full user flows on actual devices/simulators.
*   **Linting & Formatting:** **Biome** is mandatory for all TypeScript/JavaScript files. Pre-commit hooks via `lint-staged` and `husky` ensure code quality.
*   **CI/CD:** Automated workflows via GitHub Actions for linting, testing, building, and deploying to Expo Application Services (EAS).
*   **Semantic Versioning:** Follow `MAJOR.MINOR.PATCH` for all releases.
*   **Conventional Commits:** Enforce conventional commit messages for clear history and automated changelog generation.

---

## 6. VERIFICATION COMMANDS (FOR AI AGENTS)
*   **Install Dependencies:** `npm install` or `yarn install` or `pnpm install`
*   **Run Linting:** `npm run lint`
*   **Run Tests:** `npm run test`
*   **Run Build (for production):** `npm run build` (or `eas build`)
*   **Start Development Server:** `npm start`
*   **Check TypeScript types:** `npm run type-check`

</details>

## 🛠️ Development Setup

Follow these steps to get a development environment up and running for VideoSum.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: `v18.x` or higher (LTS recommended)
*   **npm** or **Yarn** or **pnpm**: Your preferred package manager.
*   **Expo CLI**: Install globally using `npm install -g expo-cli`

### Installation

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform.git
    cd VideoSum-AI-Powered-Video-Summarization-Mobile-Platform
    

2.  **Install dependencies:**
    bash
    # Using npm
    npm install

    # Or using Yarn
    # yarn install

    # Or using pnpm
    # pnpm install
    

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory based on `.env.example`.
    
    # Example .env content
    EXPO_PUBLIC_GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY
    # Add other necessary environment variables
    
    You will need a Google Gemini API key for AI functionalities.

### Running the Application

To start the development server:

bash
npm start
# Or yarn start
# Or pnpm start


This will open the Expo Dev Tools in your browser. You can then:
*   Scan the QR code with your physical device (iOS or Android) running the Expo Go app.
*   Run on an iOS simulator (press `i`).
*   Run on an Android emulator (press `a`).
*   Run in a web browser (press `w` - useful for basic UI testing, but full functionality requires mobile).

## ⚙️ Available Scripts

In the project directory, you can run:

| Script        | Description                                                                 |
| :------------ | :-------------------------------------------------------------------------- |
| `npm start`   | Starts the Expo development server.                                         |
| `npm run android` | Runs the app on a connected Android device or emulator.                       |
| `npm run ios`     | Runs the app on a connected iOS device or simulator.                          |
| `npm run web`     | Runs the app in the browser.                                                |
| `npm run test`    | Launches the Vitest test runner.                                            |
| `npm run lint`    | Runs Biome to lint and format all `src` files.                              |
| `npm run format`  | Formats code using Biome (fix linting issues automatically).                |
| `npm run build`   | Builds the app for production using Expo Application Services (EAS).        |
| `npm run type-check` | Checks TypeScript files for type errors.                                  |

## 🚀 Deployment

Deployment to app stores (Apple App Store, Google Play Store) is managed via **Expo Application Services (EAS)**.
To build for production:

bash
eas build --platform ios
eas build --platform android


Ensure you have configured `eas.json` and are logged in to Expo CLI (`expo login`).

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/blob/main/.github/CONTRIBUTING.md) for guidelines on how to submit pull requests, report bugs, and suggest features.

## 📄 License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/blob/main/LICENSE) License.

## 🛡️ Security

For information on security vulnerabilities and how to report them, please refer to our [SECURITY.md](https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/blob/main/.github/SECURITY.md) file.
