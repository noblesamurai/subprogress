# subprogress

Progress aggregator for weighted sub-tasks.

[![build status](https://secure.travis-ci.org/timothyleslieallen/subprogress.png)](http://travis-ci.org/timothyleslieallen/subprogress)

## Prerequisites

```
$ pip install pre-commit
```

## Installation

This module is installed via npm:

``` bash
$ pre-commit install --install-hooks
$ npm install subprogress
```

## Example Usage

```js
var progress = require('subprogress')();

progress.registerTask('render', 'Render the things', 1);
progress.registerTask('tidy', 'Tidy up', 2);

progress.emitter.once('progress', function(result) {
  expect(result).to.eql({ task: 'one', details: 'desc', percent: 10 });
  if (count == 2) done();
});
progress.emitter.once('totalProgress', function(result) {
  expect(result).to.be(10/3);
});

progress.updateTask('one', 10);
```
