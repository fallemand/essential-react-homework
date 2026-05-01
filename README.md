# Intro to React - Homework

While having lunch, your CTO and your Tech Leader met and discussed about a technology that most big companies are using which improves code maintenance and reusability by using components. They ended up agreeing that React could indeed help BigCorp deliver the best lottery website.

### Homework management 🏠

The final result of all homework is the React Native Application full of features implemented iteratively in the end phase of each module in the course. In order to keep consistency and track all of your changes we highly recommend you to create your own GitHub repository where your work as a participant will be stored. Your GitHub repository should be shared with all trainers, which will enable us to verify your work and communicate.

Each module in the course will end up with homework consisting of a few tasks to fulfil. We would like to suggest a comfortable system for you to submit each task of the homework as a separate PR to the main branch in your repository. This will create a space for us to communicate with you, by doing code reviews - thanks to that we will be able to check your homework, discuss some uncertainties, or respond to questions you will leave in the PR. In case you have any trouble with homework you can always book a 1 to 1 session with the trainer, and also don't hesitate to ask your questions in the dedicated communication channel. Keep in mind that you don't have to worry about being blocked for the next homework, every homework will have a starting point, so you always will be able to override the content of your repository with the prepared starting point.

### The goal of this module’s homework

The goal of this homework is to create a web application in React.

### Checkpoints 💡

The homework repository contains periodic checkpoints for your convenience. You will see callouts denoting the current checkpoint throughout this instruction. They will look something like this:

> 💡 You are now here → `checkpoint-xyz`

Feel free to check out the corresponding branch of any given checkpoint if you’re struggling or simply want to compare your solution with ours.

With that out of the way, let’s start!

## Part 1: Project setup

This project is a **pnpm monorepo** with three applications (backend, web, mobile) and a shared package for common code. The monorepo structure allows code reuse and consistent tooling across all packages.

### Monorepo Structure

```
apps/
  ├── backend/     # Express API server
  ├── web/         # React web application (Vite)
  └── mobile/      # React Native mobile app (Expo)
packages/
  └── shared/      # Shared types, hooks, and utilities
```

### Getting Started

1. Install dependencies from the root:

   ```bash
   pnpm install
   ```

2. Run individual apps:

   ```bash
   pnpm dev:backend   # Start backend server
   pnpm dev:web       # Start web app
   pnpm dev:mobile    # Start mobile app
   ```

3. Other useful commands:
   ```bash
   pnpm lint          # Lint all packages
   pnpm format        # Format all packages
   pnpm typecheck     # Type-check all packages
   pnpm build:web     # Build web app for production
   ```

<details>
  <summary><b>Step 1. Create a free Upstash account to store data in Redis database</b></summary><br>

In order to store data about lotteries you need a database. For this homework, you'll use Redis provided by Upstash. It has a generous free plan which should be just enough to cover everything you need. Go to [https://upstash.com](https://upstash.com/) and create a free account. Create a new Redis database - you can use any name you'd like. You'll get redirected to a page where all required secrets are shown.

After that, create a `.env` file in `apps/backend/` with the contents:

```
  REDIS_URL="rediss://db:token@address:6379
```

which you can copy from Upstash directly after creating a free database by pressing the "TCP" badge.

Now, to run the server, use `pnpm dev:backend` from the root directory.

</details>

<details>
  <summary><b>Step 2: React project setup</b></summary><br>

The React web application is already set up in `apps/web/` using Vite with React and TypeScript. The web app uses the `@lottery/shared` package for shared types, hooks, and utilities.

To start the development server:

```bash
  pnpm dev:web
```

The app will be available at `http://localhost:5173`

</details>

<details>
  <summary><b>Step 3: Code formatting and linting</b></summary><br>

ESLint and Prettier are already configured for all packages in the monorepo. The configuration includes:

1.Install necessary dependencies

```bash
  npm install prettier@2 eslint-plugin-prettier eslint-config-prettier -D
```

2.Adjust .eslintrc.cjs configuration

```js
/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    // Include prettier here
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  // Include prettier here
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Add a rule for prettier errors
    'prettier/prettier': 'error',
  },
};
```

3.Add .prettierrc.cjs to our web project

```js
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
};
```

At this point, we should have fully working web and backend projects in the root of our repository.

</details>

<details>
  <summary><b>Step 4: Add MaterialUI</b></summary><br>

To make things simples for feature implementation and focus on React, we will be using MaterialUI library for our frontend components. You can fine installation instructions here -https://mui.com/material-ui/getting-started/installation/.

</details>

<details>
  <summary><b>Step 5: Add .env file in web directory</b></summary><br>

The frontend needs to know which api server to connect to, so let's create a .env file:

```
VITE_API_URL=http://localhost:3000
```

</details>

> 💡 You are now here → https://github.com/callstack-workshops/essential-react-homework/tree/part-2

## Part 2: Add a lottery

Given the UI design implement Add a lottery feature.

<details>
  <summary><b>Add lottery FAB button</b></summary><br>

![267631611-6044cdf1-07b9-421b-a6b0-98dc005f2324.png](assets/267631611-6044cdf1-07b9-421b-a6b0-98dc005f2324.png)

</details>

<details>
  <summary><b>Add lottery modal</b></summary><br>

![267631757-e56f250d-251d-43eb-94e5-ee06fece7ece.png](assets/267631757-e56f250d-251d-43eb-94e5-ee06fece7ece.png)

</details>

<details>
  <summary><b>Add lottery modal form validation</b></summary><br>

![267631887-783f4ca1-9c3c-411c-8cc7-86736152f283.png](assets/267631887-783f4ca1-9c3c-411c-8cc7-86736152f283.png)

</details>

<details>
  <summary><b>Add lottery loading state</b></summary><br>

![267632061-cb7ec061-c586-4466-b8ff-f3eccc5519d1.png](assets/267632061-cb7ec061-c586-4466-b8ff-f3eccc5519d1.png)

</details>

<details>
  <summary><b>Notification after successful action</b></summary><br>

![267632188-bf80c280-46a6-4aff-ac45-98aa3a4dfdd8.png](assets/267632188-bf80c280-46a6-4aff-ac45-98aa3a4dfdd8.png)

</details>

Add lottery feature should have following things implemented:

- FAB button to open a modal
- Modal with a form to add a new lottery
- Forms should be validated
- Loading state should be present when form is submitted
- After successful form submission modal should close automatically and Notification with a message should open

Helpful resources:

- https://formik.org/ and https://github.com/jquense/yup can be used to implement form validation
- Modal component - https://mui.com/material-ui/react-modal/
- Notification component - https://mui.com/material-ui/react-snackbar/
- LoadingButton component from MaterialUI is a part of a complimentary library -https://www.npmjs.com/package/@mui/lab

> 💡 You are now here → https://github.com/callstack-workshops/essential-react-homework/tree/part-3

## Part 3: List lotteries

Given the UI design implement List lotteries feature.

<details>
  <summary><b>Fetch and display lottery data</b></summary><br>

![267632320-3c1eac8e-072a-44e9-8f65-f2a41588fe8e.png](assets/267632320-3c1eac8e-072a-44e9-8f65-f2a41588fe8e.png)
![267632361-e306725f-128d-4219-9426-6e09c04c093e.png](assets/267632361-e306725f-128d-4219-9426-6e09c04c093e.png)
![267632406-a700006a-ab52-4ba8-9021-d01e68ca8270.png](assets/267632406-a700006a-ab52-4ba8-9021-d01e68ca8270.png)

</details>

<details>
  <summary><b>Make lotteries selectable and add register FAB button</b></summary><br>

![267632563-ac5fd39a-14be-4b09-8077-136ea66f8ebf.png](assets/267632563-ac5fd39a-14be-4b09-8077-136ea66f8ebf.png)

</details>

<details>
  <summary><b>Add Register modal with name input and validation</b></summary><br>

![267632627-50988024-0da9-46cf-af93-3b5dc5ebe090.png](assets/267632627-50988024-0da9-46cf-af93-3b5dc5ebe090.png)

</details>

<details>
  <summary><b>Register to selected lotteries and notification message</b></summary><br>

![267632706-95b60ead-576e-49cb-8510-b0df33b226dc.png](assets/267632706-95b60ead-576e-49cb-8510-b0df33b226dc.png)

</details>

List lotteries feature:

- Should display list of lotteries
- Adding a new lottery should re-fetch the lotteries
- Lotteries should be selectable by clicking on them
- Finished lotteries should be grayed-out and not be selectable as we are not able to register for them
- Register FAB button should open a modal to register for selected lotteries
- Register FAB button should be disabled when no lotteries are selected
- Register modal should close after successful submission and notification with a message should be shown

> 💡 You are now here → https://github.com/callstack-workshops/essential-react-homework/tree/part-4

## Part 4: Filter lotteries

Given the UI design implement Filter lotteries feature.

<details>
  <summary><b>Add text input to filter fetched lotteries</b></summary><br>

![267633613-fd7a79fb-bd43-4031-99d7-d8f1ed507095.png](assets/267633613-fd7a79fb-bd43-4031-99d7-d8f1ed507095.png)

</details>

<details>
  <summary><b>Handle no search result case</b></summary><br>

![267633722-46e6c84b-76f1-4e36-9e79-0963b2f802d9.png](assets/267633722-46e6c84b-76f1-4e36-9e79-0963b2f802d9.png)

</details>

Filter lotteries:

- Should have text input to with a search icon
- Typing in the input should filter the results
- When there are no search results for a given filter, no search result information should be displayed

> 💡 You are now here → https://github.com/callstack-workshops/essential-react-homework/tree/part-4-done
