## About

This full-stack app serves as a tool for managing projects by creating your customized Kanban board. The app is based on the MERN stack.

The project was deployed on the Heroku platform and is available at [https://morning-lake-85858.herokuapp.com/](https://morning-lake-85858.herokuapp.com/).

## Features

The application allows you to manage your Kanban board through:

### CRUD
- creating, removing and editing lanes 
- creating, removing and editing notes

### Moving elements within the board
- assigning notes to different lanes and moving them both between lanes
- changing the order of notes within a single lane
- changing the order of lanes within the whole board

### Additional information
- You can add optional task descriptions to notes and edit them as your project progresses.
- You can rename lanes and notes by clicking their name and editing the input's value. Changes will be saved automatically after you press enter or after the input loses focus (user clicks on another element).
- Each lane keeps track on the number of notes assigned to it and displays the number it in its upper-right corner.

## Technologies used

The app was bootstrapped with [Hashnode's MERN tool](http://mern.io/) and utilizes the following solutions in the front-end:
- React.js - for user interface design and rendering
- Redux - for global state management
- React DnD - for drag and drop support

The back-end of the app uses Node.js and Express.js for managing the server and is integrated with MongoDb database through Mongoose.js.

Development wise, the project also uses:
- Webpack - for tasks automation and code optimization
- GIT - for version control
- NPM - for package managing
- ES6 Javascript syntax

## Quickstart

```sh
  npm install
  npm start
```

**Note : Please make sure your MongoDB is running.** For MongoDB installation guide see [this](https://docs.mongodb.org/v3.0/installation/). Also `npm6` is required to install dependencies properly.
[MERN Documentation](http://mern.io/documentation.html)

## Available Commands

1. `npm run start` - starts the development server with hot reloading enabled

2. `npm run bs` - bundles the code and starts the production server

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

5. `npm run cover` - generates test coverage report

6. `npm run lint` - runs linter to check for lint errors
