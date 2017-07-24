
var Store = function(name, config) {
  var _this = this;
  this.name   = name;
  this.config = config;
  this.boot();
};
var StorePrototype = {
  boot: function() {
    var _this = this;
    firebase.initializeApp(this.config);
    this.db = firebase.database();
  },
  find: function(where, cb) {
    var _this = this;
    this.db.ref(this.name + '/' + where).once('value')
    .then(function(snap) {
      var item = snap.val();
      item.id  = snap.key;
      if (cb) cb(item);
    })
    .catch(function(e) {
      console.log(e)
      if (cb) cb(false);
    });
  },
  list: function(where, cb) {
    var _this = this;
    this.db.ref(this.name).once('value')
    .then(function(snap) {
      var items  = [];
      var _items = snap.val();
      for (var i in _items) {
        _items[i].id = i;
        items.push(_items[i]);
      }
      if (cb) cb(items);
    })
    .catch(function(e) {
      console.log(e)
      if (cb) cb(false);
    });
  },
  create: function(attrs, cb) {
    var _this = this;
    this.db.ref(this.name).push(attrs)
    .then(function(snap) {
      attrs.id = snap.key;
      if (cb) cb(attrs);
    })
    .catch(function(e) {
      console.log(e)
      if (cb) cb(false);
    });
  },
  update: function(where, attrs, cb) {
    var _this = this;
    this.db.ref(this.name + '/' + where).update(attrs)
    .then(function(snap) {
      attrs.id = where;
      if (cb) cb(attrs);
    })
    .catch(function(e) {
      console.log(e)
      if (cb) cb(false);
    });
  },
  destroy: function(where, cb) {
    var _this = this;
    this.db.ref(this.name + '/' + where).remove()
    .then(function(snap) {
      if (cb) cb(where);
    })
    .catch(function(e) {
      console.log(e)
      if (cb) cb(false);
    });
  },
  action: function(param) {
    var _this = this;
    return param;
  },
};
for (var i in StorePrototype) Store.prototype[i] = StorePrototype[i];
