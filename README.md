# Frontend-Boilerplate - Save time bootstrapping a new project
Always wanted to use a modern frontend environment but all the js-tools intimidate you? Then this project is made for you. Frontend-Boilerplate sets up a modern frontend environment with best practices already backed in. Under the hood it uses [babel](https://github.com/babel/babel) to transpile ES6 to ES5, [webpack](https://github.com/webpack/webpack) to bundle all your modules and [mocha](https://github.com/mochajs/mocha) as a testrunner.

## Installation
Clone the repository:
```bash
git clone https://github.com/marvinhagemeister/frontend-boilerplate.git
```

Go into the cloned directory and install all npm dependencies:
```bash
cd frontend-boilerplate && npm install
```

## Use jQuery with legacy plugins
Unfortunately most jQuery plugins (except the really popular ones) were written before frontend modules were a thing. Even the newer ones usually have a broken universal module definition which makes bundling difficult. The cleanest solution would be to send a PR to the chosen plugin. But if you need a library that is not on github you can load them unprocessed with webpack.

Obviously you need jQuery first:
```bash
npm install --save jquery
```

### Inject implicit globals
Most legacy modules rely on `$` or `jQuery` being available globally. Add this to the plugin section:
```javascript
// webpack.config.js
module.exports = {
    ...
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}
```

### Point `this` to `window`
In CommonJS context `this` points to `module.exports` whereas legacy jQuery plugins expect it to be `window`. You can override `this` for specific modules with the [imports-loader](https://github.com/webpack/imports-loader).

Install [imports-loader](https://github.com/webpack/imports-loader):
```bash
npm install --save-dev imports-loader
```

Point `this` to `window`:
```javascript
// webpack.config.js
module.exports = {
    ...
    loaders: [
        {
            test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
            loader: 'imports?this=>window'
        }
    ]
}
```
Note: `ProvidePlugin` is usually more useful for implicit globals.

### Plugins with half-broken module definitions
There are a lot of modules which use outdated module definition code. They usually check for `define` (AMD) first before checking for CommonJS modules. In this case you can disable AMD loading for a specific module with [imports-loader](https://github.com/webpack/imports-loader).

```javascript
// webpack.config.js
module.exports = {
    ...
    loaders: [
        {
            test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
            loader: 'imports?define=>false'
        }
    ]
}
```
Note: you can add multiple import-loaders like this: `imports?define=>false,this=>window`
