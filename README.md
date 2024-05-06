# LocalFluence

LocalFluence is a platform aimed at facilitating connections between businesses and influencers, streamlining campaign management, and empowering influencers to monetize their reach effectively.

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Development Setup](#development-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Accessing Services](#accessing-services)
  - [Managing Database Migrations and Seeds](#managing-database-migrations-and-seeds)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Overview

Welcome to LocalFluence, where businesses and influencers connect effortlessly. Whether you're looking to discover local influencers or track campaign performance, LocalFluence provides the tools you need.

## Features

- **User-friendly Interface**: Intuitive platform design for seamless navigation.
- **Influencer Discovery**: Easily find and connect with local influencers.
- **Campaign Tracking**: Monitor campaign progress and performance.
- **Monetization Tools**: Empower influencers with effective monetization options.

## Tech Stack

- **Frontend**: Built with [Next.js](https://nextjs.org/) for a responsive and fast user interface.
- **Backend**:
  - Microservice architecture with:
    - Auth Server: RESTful authentication service.
    - GraphQL Server: Powered by Apollo for efficient data fetching.
  - **Database**: PostgreSQL database managed with [Sequelize](https://sequelize.org/).
- **Infrastructure**:
  - **NGINX**: Acts as a reverse proxy, connecting the frontend to backend services.
  - **Docker**: Utilized for containerization of services, supporting both development and production environments.
- **Other**:
  - **Continuous Integration/Continuous Deployment (CI/CD)**:
    - GitHub Actions set up for automated builds and deployments.
  - **Version Control**: Hosted on GitHub.

## Development Setup

### Prerequisites

- Docker
- vscode (optional but for best experience)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/karprabha/localfluence.git
   cd localfluence
   ```

2. Set up environment variables:

   - Create `.env` file based on `.env.example`.

3. Start development environment:

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

### Accessing Services

- **Frontend**:

  - Available at: [http://localhost:8080](http://localhost:8080)

- **Auth Server**:

  - Base URL: [http://localhost:8080/api/](http://localhost:8080/api/)

- **GraphQL Server**:
  - Base URL: [http://localhost:8080/graphql/](http://localhost:8080/graphql/)

### Managing Database Migrations and Seeds

When performing database migrations and seeds for the services in the project, follow these steps:

1. **Write Migrations and Seeds**:

   Create or modify migration and seed files directly in the root `database/migrations` and `database/seeds` directories of the project.

   Example:

   - Add new migration files in `database/migrations`.
   - Add seed files in `database/seeds`.

2. **Sync Database Directories Across Services**:

   After writing migrations and seeds, synchronize the database directories of individual services to reflect changes made:

   ```bash
   ./scripts/sync-db-directories.sh
   ```

   This script ensures that database changes are propagated correctly across services.

3. **Run Migration Scripts Inside Containers**:

   To run migrations and seeds within the containers of the services, follow these steps:

   a. **Access the Service's Interactive Shell**:
   Use Docker to enter the interactive shell of the desired service container. For example, to access the `auth-server` container:

   ```bash
   docker exec -it auth-server-dev sh
   ```

   b. **Run Migration Commands**:
   Once inside the container, run the migration and seed commands directly:

   - To migrate the database:

     ```bash
     npm run migration:up
     ```

   - To rollback migrations:

     ```bash
     npm run migration:down
     ```

   - To seed the database:

     ```bash
     npm run seed:up
     ```

   - To rollback seeds:
     ```bash
     npm run seed:down
     ```

## Contributing

We welcome contributions from the community! If you'd like to get involved, please follow our [Contribution Guidelines](./CONTRIBUTING.md) to help us improve Localfluence.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Credits

We'd like to express our gratitude to the following resources:

- **Docker**: We've utilized [Docker](https://www.docker.com/) to containerize our project.

Your contributions have made this project truly special!
