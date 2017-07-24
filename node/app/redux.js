
var Redux = require('redux');

var reducer = function(state, action) {
  state = state || { // immutable
    action: '',
    items:  {},
  };
  state.action = action.type;
  switch (action.type) {
    case 'CREATE':
      state.items[action.data.name] = action.data.src;
      break;
  };
  return state;
};
var store = Redux.createStore(Redux.combineReducers({
  'main':  reducer,
}));

if (typeof module === 'object') module.exports = store;
