crowdin-node
============

Node module for accessing the Crowdin API

## Disclaimer

This is an unofficial API client library. Crowdin and the Crowdin API are the property of Crowdin, LLC.

## Install

```bash
npm install crowdin
```

## Usage

`apiKey` and `endpointUrl` parameters must be set to create the instance, an error will be thrown otherwise.

```js
var crowdin = new Crowdin({
    apiKey: '7d38782fa7cb4b6a9fbae2de65e91989',
    endpointUrl: 'https://api.crowdin.com/api/project/<your-project>'
});
```

## API

### .requestData(Object parameters)
Returns a Promise of a call to the API endpoint with specified parameters.  
Parses the response body and rejects if the API returns an error.

### .getRequest(String endpoint)
Returns a Promise of a GET request to the set API endpoint. Uses `requestData()`.

### .postRequest(String endpoint)
Returns a Promise of a POST request to the set API endpoint. Uses `requestData()`.

### .getInfo()
Returns a Promise of project information. Uses `postRequest()`.

### .getLanguages()
Returns a Promise of project languages. Uses `getInfo()`.

### .export()
Returns a Promise of an API call to the `export` endpoint. Uses `getRequest()`.

### .download()
Downloads the translations ZIP and returns the Stream.  
You might call `export()` before to ensure you have the latest translations.

### .downloadToStream(Stream)
Downloads the translations ZIP to the specified stream. Uses `download()` and returns an empty Promise.

### .downloadToZip(String path)
Downloads the translations ZIP to the specified path. Uses `download()` and returns an empty Promise.

### .downloadToPath(String path)
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
npm run coverage
```

## License

Apache 2.0  
Copyright 2015 Hailo
