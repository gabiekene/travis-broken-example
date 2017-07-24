
var Store = require('../app/store/static');
var Model = require('../app/model');

describe('Model:Create', function() {
  var model = new Model(new Store());
  var data  = [];
  beforeEach(function(done){
    model.create({ client: 'Client A', client_priority: 1 });
    model.create({ client: 'Client A', client_priority: 1 });
    model.list('', function(items) {
      data = items;
      done();
    });
  });
  it('Returns the list length', function() {
    expect(data.length).toBe(2);
  });
  it('Client priorities are shifted if similar', function() {
    expect(data[0]['client_priority']).toBeGreaterThan(data[1]['client_priority']);
  });
});


