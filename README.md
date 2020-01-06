# Build Project

To build this project, mysql must be install first.

If that has not been done yet, find the installation links here:
Windows: https://dev.mysql.com/downloads/windows/installer/

Mac: https://dev.mysql.com/doc/refman/5.7/en/osx-installation-pkg.html

## Installation

In order to start the project, you need to clone the repo to your local machine and migrate to the frontend and backend on seperate terminals, then run on both the command:
```bash
. npm install 
```

## Database Setup

The next step after completeing mysql installation is connecting to the database.

The config.json file in the config folder has the database configuration.

Connecting locally requires specifying the user and password to mysql. That can be done by setting the specific environment variables in the command running node.

To change the user, use 'username' To change the password, use 'password'

To migrate tables and get the seed data, run 'npm run db:setup' on backend folder. Go to your msql workbench and see a databse called 'tracker'. Some table containing data should be available.

To run the project:
```
on the frontend : npm start
backend: run 'node/src/server.js'
```