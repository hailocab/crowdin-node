crowdin-node
============

Nodejs module for accessing Crowdin.net

## Install

```bash
npm install
```

## Usage

```js
var crowdin = new Crowdin({
    apiKey: '12345', // Must be set
    endpointUrl: '//' // Must be set
});
```

## API

### .getInfo()
Returns a Promise of project information.

### .getLanguages()
Returns a Promise of project languages.

### .downloadToZip(path)
Downloads the translations ZIP to the specified path and returns an empty Promise.

### .downloadToPath(path)
Downloads and extracts the translations ZIP to the specified path. Returns an empty Promise.

### .downloadToObject()
Downloads, extracts and convert the translations ZIP to a JS object. Returns a Promise.

## Tests

Tests are written with [mocha](http://visionmedia.github.io/mocha/)

```bash
npm test
```

Coverage using [istanbul](http://gotwarlost.github.io/istanbul/)

```bash
npm run-script coverage
```
