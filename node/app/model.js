
var Model = function(store) {
  var _this = this;
  this.store = store;
};
var ModelPrototype = {
  list: function(where, cb) {
    var _this = this;
    this.store.list(where, cb);
  },
  find: function(where, cb) {
    var _this = this;
    this.store.find(where, cb);
  },
  update: function(id, attrs, cb) {
    var _this = this;
    //this.validate(attrs);
    this.updateUnoptimized(id, attrs, cb);
  },
  create: function(attrs, cb) {
    var _this = this;
    //this.validate(attrs);
    this.createUnoptimized(attrs, cb);
  },
  createUnoptimized: function(attrs, cb) {
    var _this = this;
    var client          = attrs['client'];
    var client_priority = parseInt(attrs['client_priority']);
    // reordering update
    _this.store.list('', function(items) {
      var client_items = items.filter(function(el) {
        return (
          (el['client'] === client) && 
          (parseInt(el['client_priority']) >= parseInt(client_priority))
        );
      }).sort(function(a, b) {
        return parseInt(a['client_priority']) - parseInt(b['client_priority']);
      });
      var client_priority_counter = client_priority;
      // mass update
      for (var i=0; i<client_items.length; i++) {

        if (client_priority_counter === parseInt(client_items[i]['client_priority'])) {
          var _id = client_items[i]['id'];
          var _attrs = {
            title:           client_items[i]['title'] || '',
            description:     client_items[i]['description'] || '',
            client:          client_items[i]['client'] || '',
            client_priority: parseInt(client_items[i]['client_priority']) + 1,
            target_date:     client_items[i]['target_date'] || '',
            product_area:    client_items[i]['product_area'] || '',
          };
          _this.store.update(_id, _attrs);
          client_priority_counter++;
        } else {
          break;
        }
      }
      _this.store.create(attrs, function() {
        if (cb) cb();
      });
    });
  },
  updateUnoptimized: function(id, attrs, cb) {
    var _this = this;
    var client          = attrs['client'];
    var client_priority = parseInt(attrs['client_priority']);
    _this.store.list('', function(items) {
      var client_items = items.filter(function(el) {
        return (
          (el['client'] === client) && 
          (parseInt(el['client_priority']) >= parseInt(client_priority))
        );
      }).sort(function(a, b) {
        return parseInt(a['client_priority']) - parseInt(b['client_priority']);
      });
      var client_priority_counter = client_priority;
      // reordering update
      // mass update
      for (var i=0; i<client_items.length; i++) {

        if (client_priority_counter === parseInt(client_items[i]['client_priority'])) {
          var _id = client_items[i]['id'];
          var _attrs = {
            client_priority: parseInt(client_items[i]['client_priority']) + 1,
          };
          _this.store.update(_id, _attrs);
          client_priority_counter++;
        } else {
          break;
        }
      }
      _this.store.update(id, attrs, function() {
        if (cb) cb();
      });
    });
  },
  destroy: function(where, cb) {
    var _this = this;
    this.store.destroy(where, cb);
  },
  action: function(action) {
    var _this = this;
    return param;
  },
};
for (var i in ModelPrototype) Model.prototype[i] = ModelPrototype[i];

if (typeof module === 'object') module.exports = Model;
