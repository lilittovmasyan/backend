#Node API Boilerplate

## Installation

```bash
$ npm install
```

```bash
$ bower install
```

## File structure

```
|-- api
|   |-- index.js                  API Express app export and init call
|   `-- modules
|       |-- index.js              API modules routes and models init
|       `-- user                  Sample User module
|           |-- user.handlers.js  Handlers of User module
|           |-- user.model.js     User model
|           `-- user.routes.js    Routes of User module
|-- app.js                        Application entry point
|-- bin
|   `-- app                       Application main execution file
|-- bower.json
|-- config                        Configurations
|   `-- index.js
|-- lib                           Libraries initializations
|   |-- express.js                Express application initalization
|   `-- mongoose.js               Mongoose initalization
|-- package.json
`-- public                        Static files
    |-- index.html
    `-- src
        `-- app.js                Sample Angular app


```