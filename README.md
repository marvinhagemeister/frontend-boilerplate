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

### Change `this` reference and fix broken module definitions
In CommonJS context `this` points to `module.exports` whereas legacy jQuery plugins expect it to be `window`. You can override `this` for specific modules with the [imports-loader](https://github.com/webpack/imports-loader). Moreover most legacy modules that were written during the early stages of UMD contain broken module definitions. They usually check for `define` (AMD) first before checking for CommonJS modules. To fix this we can leverage [imports-loader](https://github.com/webpack/imports-loader) again by simply setting `define` to `false`.

Install [imports-loader](https://github.com/webpack/imports-loader):
```bash
npm install --save-dev imports-loader
```

Point `this` to `window` and set `define` to false:
```javascript
// webpack.config.js
module.exports = {
    ...
    loaders: [
        {
            test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
            loader: 'imports?this=>window,define=>false'
        }
    ]
}
```
Note: `ProvidePlugin` is usually more useful for implicit globals, whereas import-loaders is only meant for specific files.
