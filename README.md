# City Super Market Backend

## Run on Production Env

-   `git clone https://github.com/city-super-market/csm-backend.git`
-   `cd csm-backend`
-   `npm ci`
-   `npm run build`
-   `npm start`
-   `cp .env.sample .env` and update env variables accordingly

## Run on Dev Env

-   `git clone https://github.com/city-super-market/csm-backend.git`
-   `cd csm-backend`
-   `npm ci`
-   `cp .env.sample .env` and update env variables accordingly
-   `npm run dev`

## TODO:

-   Configure Logger (winston + morgan)
-   Configure ESLint
-   Configure Github Actions (Deploy to EC2)
-   Configure Swagger
-   Configure Testing with Jest
-   Configure Database (MySQL)
-   Configure Docker
-   Configure Rate Limiting
-   Configure Caching
-   Configure CORS

## Dev Diary

### Create project folder

-   `mkdir csm-backend && cd csm-backend`

### Initialize project

-   `npm init`
-   `git init`
-   `touch .gitignore`

    ```gitognore
    node_modules/
    dist/

    .env
    ```

### Configure project version (NVM)

-   `echo $(node -v) >> .nvmrc` // DO NOT DO THIS IF YOU ALREADY HAVE .nvmrc FILE
-   `echo "engine-strict=true" >> .npmrc` // DO NOT DO THIS IF YOU ALREADY HAVE .npmrc FILE
-   NVM Installation
    -   Check if NVM already exists, if not continue
        -   `nvm -v`
    -   `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
    -   Refresh terminal config
        -   `source ~/.bashrc` // FOR LINUX USERS
        -   `source ~/.zshrc` // FOR MAC USERS
-   Update version using nvm
    -   `nvm install`
    -   `nvm use`
-   Update `package.json` file

    ```json
    {
        "engines": {
            "node": ">=20.12.2",
            "npm": ">=10.8.2"
        }
    }
    ```

### Setup Express

-   Install Express.js
    -   `npm i express`
-   Install Nodemon
    -   `npm i -D nodemon`
-   Update `package.json` scripts

    ```json
    {
        "scripts": {
            "start": "NODE_ENV=production node dist/server.js",
            "dev": "npx nodemon dist/server.js"
        }
    }
    ```

### Setup Typescript

-   Install Typescript
    -   `npm i -D typescript`
-   Create Basic Configuration file
    -   `npx tsc --init`
-   Update Configuration

    -   `tsconfig.json`

    ```json
    {
        "compilerOptions": {
            "target": "es2016",
            "module": "commonjs",
            "rootDir": "./src",
            "outDir": "./dist",
            "esModuleInterop": true,
            "forceConsistentCasingInFileNames": true,
            "strict": true,
            "skipLibCheck": true,

            "noImplicitAny": true,
            "strictNullChecks": true,
            "strictBindCallApply": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "resolveJsonModule": true
        }
    }
    ```

-   Install Typescript definitions
    -   `npm i -D @types/express @types/node`
-   Enable Cold Reloading
    -   `npm install -D ts-node`
-   Update nodemon.json

    -   `touch nodemon.json`

    ```json
    {
        "watch": ["src"],
        "ext": ".ts,.js",
        "ignore": [],
        "exec": "npx ts-node ./src/server.ts"
    }
    ```

-   Update `package.json` scripts

    ```json
    {
        "start": "NODE_ENV=production node dist/server.js",
        "dev": "npx nodemon",
        "build": "npx tsc"
    }
    ```

### Setup Prettier

-   Install prettier
    -   `npm install --save-dev --save-exact prettier`
    -   `node --eval "fs.writeFileSync('.prettierrc','{}\n')"`
-   Setup Husky
    -   `npm i husky lint-staged`
    -   `npx husky init`
    -   `node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"`
-   Add the following to `package.json`

    ```json
    {
        "lint-staged": {
            "**/*": "prettier --write --ignore-unknown"
        }
    }
    ```

-   Add the following to `.prettierrc`

    ```json
    {
        "printWidth": 120,
        "tabWidth": 4,
        "semi": true,
        "singleQuote": true,
        "jsxSingleQuote": true
    }
    ```

### Setup ESLint

TODO:

### Basic Hello World Code

`src/app.ts`

```typescript
import express, { Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/', (req, res: Response) => {
    return res.status(200).json({ msg: 'Hello World!' });
});

export default app;
```

`src/server.ts`

```typescript
import app from './app';

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### Folder Structure

```
Portfolio
|\_ .github/
|\_ .husky/
|\_ dist/
|\_ node_modules/
|\_ src/
    |\_ controllers/
    |\_ docs/
        |\_ api/
        |\_ swagger/
    |\_ interfaces/
    |\_ middlewares/
    |\_ models/
    |\_ public/
        |\_ client/
    |\_ routes/
        |\_ v1/
    |\_ services/
    |\_ utils/
        |\_ constants/
        |\_ exceptions/
        |\_ helpers/
    |\_ validators/
    |\_ app.ts
    |\_ server.ts
|\_ .env
|\_ .env.sample
|\_ .gitignore
|\_ .npmrc
|\_ .nvmrc
|\_ .prettierrc
|\_ .eslint.config.mjs
|\_ nodemon.json
|\_ package-lock.json
|\_ package.json
|\_ README.md
|\_ tsconfig.json
```

TODO: update file creating/updating commands with node instead linux command (touch/echo)
