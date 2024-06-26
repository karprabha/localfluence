.
├── .env
├── .env.example
├── .github
│   ├── ISSUE_TEMPLATE
│   │   ├── 2-bug-report.yml
│   │   ├── 3-feature-request.yml
│   │   └── 4-docs-issue.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows
│       └── release.yml
├── .gitignore
├── .vscode
│   └── extensions.json
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── backend
│   ├── auth-server
│   │   ├── .dockerignore
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── .prettierignore
│   │   ├── .prettierrc
│   │   ├── Dockerfile
│   │   ├── bin
│   │   │   └── www.js
│   │   ├── config
│   │   │   ├── db.config.js
│   │   │   ├── env.config.js
│   │   │   ├── index.js
│   │   │   └── oauth.config.js
│   │   ├── database
│   │   │   ├── migrations
│   │   │   │   ├── 20240505_01_initialize_users.js
│   │   │   │   ├── 20240506_01_initialize_user_oauths.js
│   │   │   │   ├── 20240513_01_initialize_user_passwords.js
│   │   │   │   ├── 20240513_02_initialize_refresh_tokens.js
│   │   │   │   ├── 20240519_01_add_user_type.js
│   │   │   │   ├── 20240519_02_initialize_influencers_and_campaign_managers.js
│   │   │   │   └── 20240520_01_initialize_campaigns.js
│   │   │   └── seeds
│   │   │       └── 20240505_01_seed_initial_users.js
│   │   ├── dev.Dockerfile
│   │   ├── docker-compose.dev.yml
│   │   ├── docker-compose.yml
│   │   ├── eslint.config.mjs
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── scripts
│   │   │   ├── copy_migrations_and_seeds.sh
│   │   │   ├── rollbackMigration.js
│   │   │   ├── rollbackSeed.js
│   │   │   ├── runMigrations.js
│   │   │   └── runSeeders.js
│   │   ├── src
│   │   │   ├── api
│   │   │   │   └── v1
│   │   │   │       ├── controllers
│   │   │   │       │   ├── auth.controller.js
│   │   │   │       │   └── index.js
│   │   │   │       ├── middlewares
│   │   │   │       │   ├── index.js
│   │   │   │       │   └── validation.middleware.js
│   │   │   │       ├── models
│   │   │   │       │   ├── index.js
│   │   │   │       │   ├── refreshToken.js
│   │   │   │       │   ├── user.js
│   │   │   │       │   ├── userOAuth.js
│   │   │   │       │   └── userPassword.js
│   │   │   │       ├── routes
│   │   │   │       │   ├── auth.routes.js
│   │   │   │       │   └── index.js
│   │   │   │       ├── services
│   │   │   │       │   ├── auth.service.js
│   │   │   │       │   ├── githubOAuth.service.js
│   │   │   │       │   ├── googleOAuth.service.js
│   │   │   │       │   ├── index.js
│   │   │   │       │   └── jwt.service.js
│   │   │   │       └── validators
│   │   │   │           ├── auth.validator.js
│   │   │   │           └── index.js
│   │   │   └── app.js
│   │   └── utils
│   │       ├── db.util.js
│   │       ├── index.js
│   │       ├── jwt.util.js
│   │       ├── logger.util.js
│   │       └── middleware.util.js
│   ├── graphql-server
│   │   ├── .dockerignore
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── .prettierignore
│   │   ├── .prettierrc
│   │   ├── Dockerfile
│   │   ├── bin
│   │   │   └── www.js
│   │   ├── config
│   │   │   ├── db.config.js
│   │   │   ├── env.config.js
│   │   │   └── index.js
│   │   ├── database
│   │   │   ├── migrations
│   │   │   │   ├── 20240505_01_initialize_users.js
│   │   │   │   ├── 20240506_01_initialize_user_oauths.js
│   │   │   │   ├── 20240513_01_initialize_user_passwords.js
│   │   │   │   ├── 20240513_02_initialize_refresh_tokens.js
│   │   │   │   ├── 20240519_01_add_user_type.js
│   │   │   │   ├── 20240519_02_initialize_influencers_and_campaign_managers.js
│   │   │   │   └── 20240520_01_initialize_campaigns.js
│   │   │   └── seeds
│   │   │       └── 20240505_01_seed_initial_users.js
│   │   ├── dev.Dockerfile
│   │   ├── docker-compose.dev.yml
│   │   ├── docker-compose.yml
│   │   ├── eslint.config.mjs
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── scripts
│   │   │   ├── copy_migrations_and_seeds.sh
│   │   │   ├── rollbackMigration.js
│   │   │   ├── rollbackSeed.js
│   │   │   ├── runMigrations.js
│   │   │   └── runSeeders.js
│   │   ├── src
│   │   │   ├── app.js
│   │   │   ├── graphql
│   │   │   │   ├── enums
│   │   │   │   │   └── userType.js
│   │   │   │   ├── mutations
│   │   │   │   │   ├── createCampaign.js
│   │   │   │   │   └── updateUserType.js
│   │   │   │   ├── queries
│   │   │   │   │   ├── getCampaigns.js
│   │   │   │   │   ├── me.js
│   │   │   │   │   └── userProfile.js
│   │   │   │   ├── schema.js
│   │   │   │   └── types
│   │   │   │       ├── campaign.js
│   │   │   │       └── user.js
│   │   │   ├── loaders
│   │   │   │   ├── campaign.js
│   │   │   │   ├── index.js
│   │   │   │   └── user.js
│   │   │   └── models
│   │   │       ├── campaign.js
│   │   │       ├── campaignManager.js
│   │   │       ├── index.js
│   │   │       ├── influencer.js
│   │   │       └── user.js
│   │   └── utils
│   │       ├── db.util.js
│   │       ├── index.js
│   │       ├── jwt.util.js
│   │       └── logger.util.js
│   └── shared
│       └── .gitkeep
├── database
│   ├── migrations
│   │   ├── 20240505_01_initialize_users.js
│   │   ├── 20240506_01_initialize_user_oauths.js
│   │   ├── 20240513_01_initialize_user_passwords.js
│   │   ├── 20240513_02_initialize_refresh_tokens.js
│   │   ├── 20240519_01_add_user_type.js
│   │   ├── 20240519_02_initialize_influencers_and_campaign_managers.js
│   │   └── 20240520_01_initialize_campaigns.js
│   ├── pgdata  [error opening dir]
│   └── seeds
│       └── 20240505_01_seed_initial_users.js
├── docker-compose.dev.yml
├── docker-compose.yml
├── docs
│   ├── FOLDER_STRUCTURE.md
│   └── images
│       └── .gitkeep
├── frontend
│   ├── .dockerignore
│   ├── .env.local
│   ├── .env.local.example
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── .next
│   ├── Dockerfile
│   ├── dev.Dockerfile
│   ├── docker-compose.dev.yml
│   ├── docker-compose.yml
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── public
│   │   └── favicon.ico
│   ├── src
│   │   ├── app
│   │   │   ├── (dashboard)
│   │   │   │   ├── components
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   └── UserTypeForm.tsx
│   │   │   │   ├── dashboard
│   │   │   │   │   ├── components
│   │   │   │   │   │   └── CampaignList.tsx
│   │   │   │   │   ├── create-campaign
│   │   │   │   │   │   ├── components
│   │   │   │   │   │   │   └── CreateCampaignForm.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── profile
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── not-found.tsx
│   │   │   ├── (public)
│   │   │   │   ├── components
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   └── OAuthSection.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── login
│   │   │   │   │   ├── components
│   │   │   │   │   │   └── LoginForm.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── oauth
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── signup
│   │   │   │       ├── components
│   │   │   │       │   └── SignUpForm.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── not-found.tsx
│   │   ├── context
│   │   │   └── ApolloProvider.tsx
│   │   ├── graphql
│   │   │   ├── mutations
│   │   │   │   ├── createCampaign.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── updateUserType.ts
│   │   │   ├── queries
│   │   │   │   ├── getCampaigns.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── me.ts
│   │   │   │   └── userProfile.ts
│   │   │   └── types
│   │   │       ├── index.ts
│   │   │       ├── me.ts
│   │   │       └── userType.ts
│   │   ├── hooks
│   │   │   └── useAuth.ts
│   │   ├── middleware.ts
│   │   ├── services
│   │   │   ├── apolloClient.ts
│   │   │   └── authService.ts
│   │   └── utils
│   │       ├── classNames.ts
│   │       └── oauthConfig.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── nginx
│   ├── nginx.conf
│   └── nginx.dev.conf
└── scripts
    └── sync-db-directories.sh
