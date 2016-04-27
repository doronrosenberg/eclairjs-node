EclairJS Node
===================
EclairJS Node is a node client for [Apache Spark](https://spark.apache.org).

## Installation

```
$ npm install eclairjs
```

EclairJS Node also requires a running instance of [EclairJS Nashorn](https://github.com/EclairJS/eclairjs-nashorn/).

Supported Spark versions can be found in the [Version](#version) section below.

## Example
```node
var eclairjs = require('eclairjs');

var sc = new eclairjs.SparkContext("local[*]", "Simple Word Count");

var textFile = sc.textFile('foo.txt');

var words = textFile.flatMap(function(sentence) {
  return sentence.split(" ");
});

var wordsWithCount = words.mapToPair(function(word, Tuple) {
  return new Tuple(word, 1);
}, [eclairjs.Tuple]);

var reducedWordsWithCount = wordsWithCount.reduceByKey(function(value1, value2) {
  return value1 + value2;
});

reducedWordsWithCount.collect().then(function(results) {
  console.log('Word Count:', results);
  sc.stop();
});
```

## TryIt
Everything you need to run **EclairJS** is setup in a Dockerfile. This provides you with several easy-to-use options: run a simple "hello world" example which counts the ten most frequently occurring words in a text file, run the REPL, and create new Notebooks using the JavaScript Spark API.  Please see [Using-the-Docker-Container](https://github.com/EclairJS/eclairjs-node/wikis/Using-the-Docker-Container).

You can also try out **EclairJS** in Jupyter notebooks running under the [IBM Bluemix Cloud](https://github.com/EclairJS/eclairjs-node/wikis/EclairJS-with-IBM-Bluemix). 

## Documentation
* [API Docs](https://github.com/EclairJS/eclairjs-node/wiki/API-Documentation)
* [Wiki](https://github.com/EclairJS/eclairjs-node/wiki)
* [Presentations](https://github.com/EclairJS/eclairjs-node/wiki/Project-and-Community#presentations)
* [Examples](https://github.com/EclairJS/eclairjs-node/tree/master/examples)

## Community
* [Google Group](https://groups.google.com/forum/#!forum/eclairjs)
* [Slack](eclairjs.slack.com)
* Getting Involved

## Build & Package
If you would like to take the manual route in lieu of using the Dockerfile you can build the **EclairJS** components from source and setup your own local environment.  Please see [Build and Package](https://github.com/EclairJS/eclairjs-node/wikis/Build-and-Package) for more information.

## Version
Our goal is to keep the **EclairJS** master branch up to date with the latest version of Spark. When new versions of Spark require code changes, we create a separate branch. The table below shows what is available now.

|EclairJS Version/Tag | Apache Spark Version |
| -------- | -------- |
| 0.1            | 1.5.1 |
| 0.2 - 0.4      | 1.6.0 |
| 0.5  (master)  | 1.6.0 |

Please note as new APIs are implemented for **EclairJS** they will be added to the master branch.  Refer to the [API Documentation](https://github.com/EclairJS/eclairjs-node/wikis/API-Documentation) for a list of what is currently implemented.  **EclairJS** has been tested on OSX and Linux.
