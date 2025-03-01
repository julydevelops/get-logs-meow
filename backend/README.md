# Get Logs Meow

A simple Node.js/Express API for reading and filtering log files.

## Features
- **Tail Search**: Search log files for lines containing a specific term.
- **Chunked File Reading**: Reads large log files in chunks to reduce memory footprint.
- **Error Handling**: Centralized error handling middleware for Express.
- **TypeScript Support**: Fully written in TypeScript for improved development experience.


## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/get-logs-meow.git
   cd get-logs-meow

2. Run `nvm install` to install the correct Node version. 

    If you do not have nvm, you can install it with `brew install nvm`. 
    
    If you dont have HomeBrew, thats another problem all together!

3. Install dependencies with `npm i`

## Local Development

1. Run `npm run dev` to start nodemon for live updates during development
