# Contributing to VideoSum-AI-Powered-Video-Summarization-Mobile-Platform

## Welcome!

Thank you for considering contributing to VideoSum-AI-Powered-Video-Summarization-Mobile-Platform! We appreciate your willingness to help improve our project. This guide outlines the best practices and procedures for making contributions.

## Our Philosophy

We adhere to the principles of **Zero-Defect, High-Velocity, Future-Proof** development. This means we strive for robust, well-tested code delivered efficiently, with an eye towards long-term maintainability and adaptability.

## Getting Started

### 1. Fork the Repository

Start by forking the official repository:

`git clone https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform.git`

### 2. Setup Development Environment

This project uses React Native with Expo. Please ensure you have the necessary development tools installed:

*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/)
*   [Expo CLI](https://docs.expo.dev/get-started/installation/)

Install project dependencies:

bash
npm install


### 3. Run the Application

Start the development server:

bash
npx expo start


This will launch the Expo Go app on your device or simulator, allowing you to see your changes in real-time.

## Contribution Workflow

1.  **Create a Branch:** Always branch off the `main` branch for your contributions:
    bash
git checkout -b feature/your-feature-name

    or for bug fixes:
    bash
git checkout -b bugfix/your-bug-fix-name


2.  **Make Your Changes:** Implement your feature or fix. Ensure your code adheres to the project's coding standards.

3.  **Test Your Changes:** Write and run tests to ensure your changes haven't introduced regressions. We use **Vitest** for unit tests and **Playwright** for E2E tests.
    bash
npm run test


4.  **Lint Your Code:** Ensure your code is formatted correctly and adheres to linting rules. We use **Biome** for linting and formatting.
    bash
npm run lint


5.  **Commit Your Changes:** Commit your changes with clear and concise messages. Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
    bash
git commit -m "feat: add new summarization algorithm"


6.  **Push Your Branch:** Push your branch to your fork.
    bash
git push origin feature/your-feature-name


7.  **Open a Pull Request:** Create a Pull Request from your branch to the `main` branch of the `chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform` repository.
    *   Provide a clear title and description for your PR.
    *   Reference any relevant issues.
    *   Ensure all checks in the CI pipeline pass.

## Coding Standards & Best Practices

*   **TypeScript (Strict Mode):** Write clean, type-safe TypeScript. Enable strict mode (`strict: true` in `tsconfig.json`).
*   **Vite:** Utilize Vite for efficient bundling and development server.
*   **TailwindCSS v4:** Use TailwindCSS for styling. Adhere to its utility-first principles.
*   **Tauri v2:** If applicable for desktop builds, ensure adherence to Tauri guidelines.
*   **Biome:** Use Biome for linting and formatting. Ensure your code passes Biome checks (`npm run lint`).
*   **Vitest:** Write comprehensive unit tests for your components and logic.
*   **Playwright:** Implement end-to-end tests for critical user flows.
*   **Feature-Sliced Design (FSD):** While primarily a frontend architecture pattern, aim for modularity and clear separation of concerns in your code structure.
*   **SOLID Principles:** Apply SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) where applicable.
*   **DRY (Don't Repeat Yourself):** Avoid redundant code.
*   **YAGNI (You Ain't Gonna Need It):** Only implement what is currently required.

## AI Agent Directives

This project is designed to be understood and maintained by AI agents. For detailed directives on the tech stack, architectural patterns, and verification commands, please refer to the **AGENTS.md** file.

## Reporting Issues

If you encounter a bug or have a feature request, please check if a similar issue already exists. If not, open a new issue with a detailed description, steps to reproduce, and relevant environment information.

## Code of Conduct

We are committed to fostering an inclusive and welcoming environment. Please adhere to our [Code of Conduct](https://github.com/chirag127/VideoSum-AI-Powered-Video-Summarization-Mobile-Platform/blob/main/CODE_OF_CONDUCT.md) (if applicable, otherwise omit or generate one).

## License

By contributing to this project, you agree that your contributions will be licensed under the **CC BY-NC** license.

Thank you again for your interest in contributing!
