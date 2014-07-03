var fs = require('graceful-fs');
var path = require('path');
var Promise = require('bluebird');
var request = require('request');
var requestPromise = Promise.promisify(request);
var stream = require('stream');
var unzip = require('unzip');
var util = require('util');
var yaml = require('js-yaml');

function Crowdin(config) {
    this.config = config || {};
    if (!this.config.apiKey) throw new Error('Missing apiKey');
    if (!this.config.endpointUrl) throw new Error('Missing endpointUrl');
}

// return Promise
Crowdin.prototype.requestData = function(params) {
    return requestPromise(params)
    // Catch response errors
    .then(function(res) {
        if (!res || !res[0]) throw new Error('No response');
        if (res[0].statusCode >= 400) throw new Error(res[1]);
        return res[1]; // Return response body
    })
    // Parse JSON
    .then(function(body) {
        if (body) return JSON.parse(body);
        return {};
    })
    // Throw error if present
    .then(function(data) {
        if (data.error) throw new Error(data.error.message);
        else return data;
    });
};

// return Promise
Crowdin.prototype.getInfo = function() {
  return this.requestData({
      uri: this.config.endpointUrl + '/info/?json',
      method: 'POST',
      form: {
          key: this.config.apiKey
      }
  });
};

// return Promise
Crowdin.prototype.getLanguages = function() {
    return this.getInfo()
    .then(function(data) {
        return data.languages;
    });
};

// return Stream
Crowdin.prototype.download = function() {
    return request.get(this.config.endpointUrl + '/download/all.zip?key=' + this.config.apiKey);
};

// return Promise
Crowdin.prototype.downloadToStream = function(toStream) {
    var that = this;
    return new Promise(function(resolve, reject) {
        that.download()
        .pipe(toStream)
        .on('error', reject)
        .on('close', resolve)
        .on('end', resolve);
    });
};

// return Promise
Crowdin.prototype.downloadToZip = function(zipPath) {
    return this.downloadToStream(fs.createWriteStream(zipPath));
};

// return Promise
Crowdin.prototype.downloadToPath = function(toPath) {
    return this.downloadToStream(unzip.Extract({path: toPath}));
};

// return Stream
Crowdin.prototype.downloadAndParse = function() {
    return this.download()
    .pipe(unzip.Parse());
};

// return Promise
Crowdin.prototype.downloadToObject = function() {
    var that = this;
    return new Promise(function(resolve, reject) {
        var res = {};
        that.downloadAndParse()
        .on('entry', function(entry) {
            // Only process YAML files
            if (entry.type === 'File' && path.extname(entry.path) === '.yml') {
                // Split path without extension
                var arr = entry.path.replace('.yml', '').split('/');
                var lang = arr.shift();
                if (!res[ lang ]) res[ lang ] = {};
                var prefix = arr.join('.');

                // Read file and convert from YAML
                var buffer = '';
                entry
                .on('error', reject)
                .on('data', function(chunk) {
                    buffer += chunk.toString();
                })
                .on('end', function() {
                    var js = yaml.safeLoad(buffer);
                    Object.keys(js).forEach(function(key) {
                        res[ lang ][ prefix + '.' + key ] = js[ key ];
                    });
                });
            }
            else entry.autodrain();
        })
        .on('error', reject)
        .on('close', function() {
            resolve(res);
        });
    });
};

module.exports = Crowdin;
