var io = require('indian-ocean');
var testPath = require('../utils/testPath');
var tmpPath = require('../utils/tmpPath');

var tmpFile = tmpPath('change', 'multipleTaskFilesWithOptions', 'file.test');
io.writeDataSync(tmpFile, 'file', {makeDirs: true});

var taskFilePath = testPath('taskFiles', 'report.js');
var taskFilePath2 = testPath('taskFiles', 'report-2.js');

module.exports = {
  watchGroups: [
    {
      serviceName: 'basic',
      path: tmpFile,
      events: [
        {
          type: 'change',
          taskFiles: [
            taskFilePath,
            taskFilePath2
          ],
          options: {
            test: true
          }
        }
      ]
    }
  ],
  expected: {
    onPublicInitDone: [{
      error: null,
      notification: [{ 'tests/tmp/change/multipleTaskFilesWithOptions': [ 'file.test' ] }]
    }],
    onInit: ['[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90mWatching basic bundle...\u001b[39m \u001b[1mtests/tmp/change/multipleTaskFilesWithOptions/file.test\u001b[22m\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[90m---\u001b[39m \u001b[1mtests/tmp/change/multipleTaskFilesWithOptions/file.test\u001b[22m'],
    onEvent: ['\n[\u001b[90m00:00:00.00\u001b[39m | \u001b[1m\u001b[34mwsk\u001b[39m\u001b[22m] \u001b[36mFile changed...\u001b[39m \u001b[1mtests/tmp/change/multipleTaskFilesWithOptions/file.test\u001b[22m'],
    onTaskFileEvent: [{
      eventType: 'change',
      filePath: tmpFile,
      taskFilePath: taskFilePath,
      options: {
        test: true
      }
    }, {
      eventType: 'change',
      filePath: tmpFile,
      taskFilePath: taskFilePath2,
      options: {
        test: true
      }
    }]
  }
};
