![Moleculer logo](http://moleculer.services/images/banner.png)

# Moleculer project generator [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Create a new Moleculer microservices project

## Installation

First, install [Yeoman](http://yeoman.io) and generator-moleculer using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-moleculer
```

Then generate your new Moleculer project (moleculer-demo):

```bash
yo moleculer moleculer-demo
```

## Features
- Moleculer v0.12.x with `moleculer.config.js`
- Common project with a demo `greeter` service
- Optional API Gateway service
- Optional Transporter & Cacher
- Docker & Docker Compose files
- Unit tests with [Jest](http://facebook.github.io/jest/)
- Lint with [ESLint](http://eslint.org/)
- Launch file for debugging in [VSCode](https://code.visualstudio.com/)

## NPM scripts
- `npm run dev` - Start service.js with hot-reload and start REPL
- `npm run lint` - Run ESLint
- `npm run ci` - Start testing in watch mode
- `npm start` - Start services in production mode
- `npm test` - Run tests & coverage

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [MoleculerJS](https://moleculer.services)


[npm-image]: https://badge.fury.io/js/generator-moleculer.svg
[npm-url]: https://npmjs.org/package/generator-moleculer
[travis-image]: https://travis-ci.org/moleculerjs/generator-moleculer.svg?branch=master
[travis-url]: https://travis-ci.org/moleculerjs/generator-moleculer
[daviddm-image]: https://david-dm.org/moleculerjs/generator-moleculer.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/moleculerjs/generator-moleculer
[coveralls-image]: https://coveralls.io/repos/moleculerjs/generator-moleculer/badge.svg
[coveralls-url]: https://coveralls.io/r/moleculerjs/generator-moleculer
