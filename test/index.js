var expect = require('expect.js'),
    Progress = require('..');
describe('progress', function() {
  it('gives total and individual progress (simple case)', function(done) {
    var progress = Progress(),
        count = 0;
    progress.registerTask('one', 'desc');
    progress.emitter.once('totalProgress', function(result) {
      count++;
      expect(result).to.be(10);
      if (count == 2) done();
    });
    progress.emitter.once('progress', function(result) {
      count++;
      expect(result).to.eql({ task: 'one', details: 'desc', percent: 10 });
      if (count == 2) done();
    });
    progress.updateTask('one', 10);
  });
  it('respects the task weights', function(done) {
    var progress = Progress(),
        count = 0;
    progress.registerTask('one', 'desc', 1);
    progress.registerTask('two', 'desc', 2);
    progress.emitter.once('progress', function(result) {
      count++;
      expect(result).to.eql({ task: 'one', details: 'desc', percent: 10 });
      if (count == 2) done();
    });
    progress.emitter.once('totalProgress', function(result) {
      count++;
      expect(result).to.be(10/3);
      if (count == 2) done();
    });
    progress.updateTask('one', 10);
  });
  it('respects the task weights (2)', function(done) {
    var progress = Progress();
    progress.registerTask('one', 'desc', 5);
    progress.registerTask('two', 'desc', 5);
    progress.registerTask('three', 'desc', 20);
    progress.registerTask('four', 'desc', 1);

    progress.updateTask('one', 50);
    progress.updateTask('two', 60);
    progress.emitter.once('totalProgress', function(result) {
      expect(result).to.be(50 * 5 / 31 + 60 * 5 / 31 + 20 * 4 / 31);
      done();
    });
    progress.updateTask('three', 4);
  });
});
