
var store = require('../app/redux');

describe('REDUX', function() {
  beforeEach(function(done){
    store.dispatch({ type: 'CREATE', data: {name: 'asdas', src: 'MORE TO COME!!!!'} });
    done();
  });
  it('CREATE', function() {
    var state = store.getState();

    expect(state.main.items['asdas']).toBe('MORE TO COME!!!!');
  });
});
