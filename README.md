# Webpack 3.0 Basic Flow
Event Emitter
- we have a publisher that emits events
- we have consumers which register their interest in a given event
- Rx.Subject is both an Observer and Observable, so it handles both publish and subscribe.

## 1. Create a plain project with a package.json
`npm ini -y`

## 2. Install Webpack and WebPackDevServer
`npm install --save-dev webpack@latest webpack-dev-server@latest`

## 3. Bundle mappings overview
Source Files: /src/**/*.js
Entry point: /src/app.js
Output: dist/app.bundle.js

## 4. The webpack.config
The simplest config file looks like this:
```javascript
const webpack = require('webpack');
const config = {
    context: __dirname + '/src',
    entry: {
        app: './entry.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
    },
    devServer: {
        open: true, // to open the local server in browser
        contentBase: __dirname + '/src',
    }
};
module.exports = config;
```

## 5. Add some NPM scripts (dev (with watch), production(uglify, minify))
File: package.json
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --progress --open --colors --watch --hot",
    "production": "NODE_ENV=production webpack -p --progress --colors"
  },
```

## 6. Create an index.html & some js files in /src/
File: src/index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>Webpack 3 Basic App</title>
</head>
<body>
    <h1> Hello World </h1>
    <script src="/assets/app.bundle.js"></script>
</body>
</html>
```

File: src/entry.js
```javascript
const _ = require('lodash');
import { Subject } from 'rxjs/Rx';

class EventEmitter {
    constructor(){
        this.subject = new Subject({});
        console.info('event emitter shared observable attached')
    }
}
const singleton = new EventEmitter();
export default singleton;
```

## 7. Webpack Loaders
Think of the loaders as middleware pipes that you can add to your bundling process (after the automatic bundling from webpack)
### 7.1 ES6 Transpilling via Babel (core + es6 presets) *you won't need it for modern browsers for most of the ES6 features as they are now part of the latest versions of the most common browsers
`npm install --save-dev babel-loader babel-core babel-preset-es2015`

Add a new entry on the webpack.config.js literal object
```javascript
module: {
    rules: [
        {
            test: /\.js$/, //Check for all js files
            loader: 'babel-loader',
            query: {
                presets: ["babel-preset-es2015"].map(require.resolve)
            }
        }
    ]
}
```

## 7.2 SASS and CSS Loaders
`npm install --save-dev css-loader style-loader sass-loader node-sass`
New entry to webpack.config.js literal object
```javascript
module: {
  rules: [
        {
            test: /\.(sass|scss)$/,
            use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            ]
        }
    ]
}
```

## 8. Set sourcemaps (development only)
Let's add some keys to the webpack.config.js literal object
```javascript
devtool: "eval-source-map"
```

And just before exporting the config.
```javascript
// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
  config.devtool = "";
  // More Pipes and Stuff (separate build outputs, versioning, etc)
}
```

## 9. Done!
` npm run dev`
` npm run production`

## The files
The JS entry file /src/entry.js.
```javascript
'use strict';
import { Subject } from 'rxjs/Rx';
import Styles from './styles/index.scss';

class EventEmitter {
    constructor(){
        this.subject = new Subject({});
        console.info('event emitter shared observable attached')
    }
}
const singleton = new EventEmitter();
export default singleton;
```

The Webpack.config.js
```javascript
const webpack = require('webpack');
const config = {
    context: __dirname + '/src',
    entry: {
        app: './entry.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
        publicPath: "/dist",
    },
    devServer: {
        contentBase: __dirname + '/src',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ["babel-preset-es2015"].map(require.resolve)
                }
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    devtool: "eval-source-map",
    plugins: []
};

if (process.env.NODE_ENV === "production") {
  // More Production Stuff (separate build outputs, versioning, etc)
}
module.exports = config;
```

The HTML File /src/index.html
```html
<!DOCTYPE html>
<html>
<head>
    <title>Webpack 3 Basic App</title>
</head>
<body>
    <h1> Hello World </h1>
    <script src="/assets/app.bundle.js"></script>
</body>
</html>
```

The package.json
```json
{
  "name": "webpack-basic",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --progress --open --colors --watch --hot",
    "production": "NODE_ENV=production webpack -p --progress --colors"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.0",
    "babel-preset-es2015": "^6.24.1",
    "css-loader": "^0.28.4",
    "lodash": "^4.17.4",
    "node-sass": "^4.5.3",
    "rxjs": "^5.4.1",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.18.2",
    "webpack": "^3.0.0",
    "webpack-dev-server": "^2.5.0"
  }
}
```