# Introduction

This is the frontend part of **_SEP4 Group 4X_** – a Greenhouse Application 🍅.
It is hosted on [github pages](https://ham222.github.io/greenhouse-frontend) and is connected to the backend part via a [RESTful API](https://github.com/xoxkoo/greenhouse-backend). Another part of the project is the [IoT group](https://github.com/wikcioo/greenhouse-iot), responsible for the physical device.

# Tech stack

The project uses many different technologies, namely:

- **React**
- **Typescript**
- **Tailwind CSS**
- **Material UI**
- **Node.js**

# Running the project

First of all, download the packages using the `npm i` command. Then, start the app using `npm start`.

## Running the project offline

1. If the app was running, stop it.

2. Change the _REACT_APP_API_BASE_URL_ environmental variable in the _.env_ file to **<http://localhost:3100>** and save the file.

3. Run `npm run mocks` and wait for the mock server to start

4. Run `npm start`.

# Branching strategy & pull requests

The branches and pull requests followed a special convention, agreed upon before even creating the repository.
Every branch name consists of three parts:

- Group identifier
- ID number
- Short description

An example branch name would be `feat-68-create-apply-presets`

## Group identifier

The **group identifier** can take one of three values:

- _feat_ for adding a new feature
- _bug_ for providing fixes to known bugs
- _exp_ for experimental features not intended for main branch

## ID number

The **ID number** is a number of the issue on Jira.

## Short description

The **short description** is limited to 4-5 words, to fit the 50 character rule. It should describe the feature added or bug fixed.

# Development process

To make sure there was minimal friction between the contributors while developing, it was agreed that **Node.js v18.15.0** should be used.
Besides that, the development was conducted using _Visual Studio Code_ with several extensions:

- ESLint, for making sure the code followed best practices
- Prettier, for keeping the formatting consistent
- Tailwind CSS Intellisense, for speeding up the dev process by providing a quick properties lookup
- Remote development, for creating and using the _dev containers_

## Dev containers

Working with containers is straightforward when the instructions are followed properly:

1. Pull the latest version of the main branch
2. Create a new branch that adheres to the convenction
3. Open the terminal and go into the project directory
4. Run `docker build -t frontend .` to create a new image
5. Run `docker run -dp 3000:3000 --name frontend-container frontend` to create a container from the image
6. Attach VSCode to the container
7. Start developing
8. Create a pull request
9. When the pull request is merged, delete the branch, container and image

# Test coverage

Different testing frameworks and approaches were used throughout the development process of the project.

To generate test coverage, run the following command: `npm run test:coverage`. The test coverage will be generated in the console.
