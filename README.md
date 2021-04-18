# Seoulspice Pickup API

### Setup Prerequisites

- Install git if you don't have it already. The link below describes several ways to do this.

  https://git-scm.com/download/mac

- Optional: Install nvm. This makes it easy to install multiple versions of node and switch between them.
  https://github.com/nvm-sh/nvm

- Install node if you don't have it already. I'm using node version 14. You can use nvm to install node, or install it directly from the node website:
  https://nodejs.org/en/download/

### Server setup

- Install PM2. This is a process manager which you'll need to run the Express app. In the terminal, type: `npm i -g pm2` to install it globally.

- Fork the server repo, which will make a copy of it in your github account. `https://github.com/michaelcaterisano/seoulspice-api`

- Clone the repo locally
- git clone `https://github.com/{YOUR-ACCOUNT-HERE}/seoulspice-api.git

- In the root folder of the repo, run `npm install` to install node modules.

- Create `ecosystem.local-dev.config.js` and `ecosystem.local-prod.config.js` files at the project root. I'll send you environment variables to copy into these files.

- Create a file called `discountcodes.js` in the root directory. I'll send you the appropriate file contents for this file.

- Start the server in development mode by typing `pm2 start ecosystem.local-dev.config.js`. An instance of the server should now be running locally on port 3002.

- Type `pm2 start ecosystem.local-prod.config.js` to run an instance of the server with production variables. Another instance of the server should now be running on port 3001.
