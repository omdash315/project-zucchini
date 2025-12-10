[![Starware](https://img.shields.io/badge/Starware-⭐-black?labelColor=f9b00d)](https://github.com/zepfietje/starware)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<p align="center">
  <a href="https://github.com/dscnitrourkela/project-zucchini">
    <img src="public/logo.png" alt="Logo" width="130">
  </a>

  <h3 align="center">Project - Zuchini</h3>

  <p align="center">
    The official repository for Nitrutsav 2026
    <br />
    <br />
    <!-- <a href="https://hacknitr.com">View Live</a> -->
    ·
    <a href="https://github.com/dscnitrourkela/project-zucchini/issues">Report Bugs</a>
    .
    <a href="https://github.com/dscnitrourkela/project-zucchini/issues">Add Features</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
      </ul>
        <li><a href="#built-with">Built With</a></li>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#contribution-guidlines">Contribution guidlines</a></li>
        <li><a href="#local-repository-setup">Local Repository Setup</a></li>
        <li><a href="#running-the-project">Running the project</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#dsc-nit-rourkela">DSC NIT Rourkela</a></li>
    <li><a href="#starware">Starware</a></li>
  </ol>
</details>

## About The Project

Nitrutsav is the annual literary and cultural festival of the National Institute of Technology, Rourkela. Recognized as one of Odisha’s largest student-run events, it brings together participants from across India for competitions and performances in music, dance, drama, literature, fine arts, and more.

This year, the complete technical infrastructure and digital experience for the fest is being developed in collaboration with DSC NIT Rourkela, providing an end-to-end platform for registrations, event management, and participant interaction.

## Built With

Following technologies and libraries are used for the development of this website

- [React 19](https://react.dev/) - Frontend library
- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript 5](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Firebase](https://firebase.google.com/) - Backend services
- [Flutter](https://flutter.dev/) - Mobile App
- [Turborepo](https://turbo.build/repo) - Monorepo build system
- [pnpm](https://pnpm.io/) - Package manager
- [Zod](https://zod.dev/) - Schema validation

## Getting Started

To setup the project locally follow the steps below.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (version 18 or higher)

  ```sh
  # macOS (Homebrew)
  brew install node

  # Windows (Chocolatey)
  choco install nodejs

  # Linux (Debian/Ubuntu)
  sudo apt install nodejs

  # Linux (Arch)
  pacman -S nodejs

  # Linux (Fedora)
  dnf module install nodejs

  # Verify installation
  node --version
  ```

- [pnpm](https://pnpm.io/installation) (version 9.0.0)

  ```sh
  # Install using npm
  npm install -g pnpm@9.0.0

  # Or using Corepack (recommended)
  corepack enable
  corepack prepare pnpm@9.0.0 --activate

  # Verify installation
  pnpm --version
  ```

- [Git](https://git-scm.com/downloads)

  ```sh
  # macOS (Homebrew)
  brew install git

  # Windows (Chocolatey)
  choco install git

  # Linux (Debian/Ubuntu)
  sudo apt-get install git

  # Linux (Arch)
  pacman -S git

  # Linux (Fedora)
  sudo dnf install git

  # Verify installation
  git --version
  ```

### Contribution guidlines

`Contributions are welcome 🎉🎉`

NOTE 1: Please abide by the [Contributing Guidelines][contributing-guidelines].

NOTE 2: Please abide by the [Code of Conduct][code-of-conduct].

### Local Repository Setup

Please refer to the project's style and contribution guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

1.  **Fork** the repo on GitHub
2.  **Clone** the project to your local system
3.  **Commit** changes to your own separate branch
4.  **Push** your work back up to your fork
5.  Submit a **Pull request** so that we can review your changes

### Running the project

This is a monorepo managed with Turborepo and pnpm workspaces. The project uses **pnpm**, not npm or yarn. It is strictly advised to stick with pnpm to avoid dependency conflicts.

```sh
# Install dependencies
pnpm install

# Run all apps in development mode
pnpm dev

# Run specific app (web runs on port 3000, admin on port 3002)
pnpm --filter web dev
pnpm --filter admin dev

# Build all apps
pnpm build

# Lint all packages
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck
```

### Project Structure

```
project-zucchini/
├── apps/
│   ├── admin/          # Admin dashboard (Next.js)
│   ├── mobile/         # Mobile app (Flutter - Coming Soon)
│   └── web/            # Main website (Next.js)
├── packages/
│   ├── eslint-config/  # Shared ESLint configs
│   ├── firebase-config/# Firebase configuration
│   ├── shared-types/   # Shared TypeScript types
│   ├── typescript-config/ # Shared TypeScript configs
│   └── ui/             # Shared UI components
└── turbo.json          # Turborepo configuration
```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## DSC NIT Rourkela

[![DSC NIT Rourkela][dsc-nitrourkela]](https://dscnitrourkela.org)

## Starware

dscnitrourkela/project-zucchini is Starware.
This means you're free to use the project, as long as you star its GitHub repository.
Your appreciation makes us grow and glow up. ⭐

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/dscnitrourkela/project-zucchini?style=for-the-badge
[contributors-url]: https://github.com/dscnitrourkela/project-zucchini/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dscnitrourkela/project-zucchini?style=for-the-badge
[forks-url]: https://github.com/dscnitrourkela/project-zucchini/network/members
[stars-shield]: https://img.shields.io/github/stars/dscnitrourkela/project-zucchini?style=for-the-badge
[stars-url]: https://github.com/dscnitrourkela/project-zucchini/stargazers
[issues-shield]: https://img.shields.io/github/issues/dscnitrourkela/project-zucchini?style=for-the-badge
[issues-url]: https://github.com/dscnitrourkela/project-zucchini/issues
[license-shield]: https://img.shields.io/github/license/dscnitrourkela/project-zucchini?style=for-the-badge
[license-url]: ./LICENSE
[dsc-nitrourkela]: public/repoCover.png
[code-of-conduct]: ./CODE_OF_CONDUCT.md
[contributing-guidelines]: ./CONTRIBUTING.md

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://ayussh.vercel.app/"><img src="https://avatars.githubusercontent.com/u/135319056?v=4?s=100" width="100px;" alt="Ayush"/><br /><sub><b>Ayush</b></sub></a><br /><a href="https://github.com/dscnitrourkela/project-zucchini/commits?author=ayussh-2" title="Code">💻</a> <a href="https://github.com/dscnitrourkela/project-zucchini/commits?author=ayussh-2" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
