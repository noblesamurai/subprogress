var events = require('events');

module.exports = function() {
  var tasks = {},
      ret = {};

  ret.emitter = new events.EventEmitter(),

  ret.registerTask = function(task, details, weight) {
    weight = weight || 1;
    tasks[task] = { details: details, weight: weight, percent: 0 };
  };

  ret.updateTask = function(task, percent) {
    tasks[task].percent = percent;
    ret.emitter.emit('progress', { task: task, details: tasks[task].details,  percent: percent });
    // Gives weighted average for overall progress
    var totalWeights = 0;
    for (var task in tasks) {
      totalWeights += tasks[task].weight;
    }
    ret.emitter.emit('totalProgress',
      Object.keys(tasks).reduce(function(acc, task) { 
        var _task = tasks[task];
        return acc + _task.percent * _task.weight / totalWeights;
      }, 0)
    );
  }

  ret.getTasks = function() {
    return tasks;
  }

  return ret;
}
