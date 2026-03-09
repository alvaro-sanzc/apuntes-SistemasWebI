# WebDevLearning with NodeJS and Express

## Steps taken:
npm init
npm install 
npm install -g express-generator
npm install ejs
npx express-generator -v ejs <src>

## To install express and socket.io
```bash
npm install express socket.io express-session body-parser
```

## Steps to Debug (using debug module) 
To install debug module:
```bash
npm install debug
```
Also add the following line in the app.js:
```javascript
const debug = require('debug')('appLogs');
debug('This is a verbose log');
```
To excute the code with debug logs:
```bash
$env:DEBUG="*"; node app.js
```
After use, to desactivate debug logs:
```bash
$env:DEBUG=""
```