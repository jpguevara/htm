const jasmine = require('jasmine');

var _jasmine = new jasmine();
_jasmine.loadConfigFile('spec/support/jasmine.json');
_jasmine.execute();