
var Store = require('../app/store/static');

describe('Store:List', function() {
  var store = new Store();
  var data  = [];
  beforeEach(function(done){
    store.create({ client: 'Client A', client_priority: 1 });
    store.create({ client: 'Client A', client_priority: 1 });
    store.list('', function(items) {
      data = items;
      done();
    });
  });
  it('Returns the list length', function() {
    expect(data.length).toBe(2);
  });
});
describe('Store:Find', function() { });
describe('Store:Create', function() { });
describe('Store:Update', function() { });
describe('Store:Destroy', function() { });
/*
*/
