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

### .requestData()
Returns a Promise of a call to the API endpoint with specified parameters.
Parses the response body and rejects if the API returns an error.

### .getRequest()
Returns a Promise of a GET request to the set API endpoint. Uses `requestData()`.

### .postRequest()
Returns a Promise of a POST request to the set API endpoint. Uses `requestData()`.

### .getInfo()
Returns a Promise of project information. Uses `postRequest()`.

### .getLanguages()
Returns a Promise of project languages. Uses `getInfo()`.

### .extract()
Returns a Promise of an API call to the `extract` endpoint. Uses `getRequest()`.

### .download()
Downloads the translations ZIP and returns the Stream.
You might call `extract()` before to ensure you have the latest translations.

### .downloadToStream(stream)
Downloads the translations ZIP to the specified stream. Uses `download()` and returns an empty Promise.

### .downloadToZip(path)
Downloads the translations ZIP to the specified path. Uses `download()` and returns an empty Promise.

### .downloadToPath(path)
Downloads and extracts the translations ZIP to the specified path. Uses `download()` and returns an empty Promise.

### .downloadAndParse()
Downloads and parses the translations ZIP. Uses `download()` and returns the Stream of file entries.
See the [node-unzip documentation](https://github.com/EvanOxfeld/node-unzip#parse-zip-file-contents).

### .downloadToObject()
Downloads, extracts and converts the translations ZIP to a JS object. Returns a Promise.

## Tests

Tests are written with [mocha](http://visionmedia.github.io/mocha/)

```bash
npm test
```

Coverage using [istanbul](http://gotwarlost.github.io/istanbul/)

```bash
npm run-script coverage
```
