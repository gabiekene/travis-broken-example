
var Store = function(name, options) {
  var _this = this;
  this.name    = name             || '';
  this.options = {
    db:          options.db       || {}, 
    versions:    options.versions || {}, 
    upgrade:     options.upgrade  || {},
  };
  this.db      = {};
  this.data    = {};
  this.boot();
};
var StorePrototype = {
  boot: function() {
    var _this = this;
    window.db_dexie = new Dexie(this.options.db);
    for (var version in this.options.versions) {
      window.db_dexie.version(version).stores(this.options.versions[version])
      .upgrade(this.options.upgrade[version] || function(t) {});
    }
    window.db_dexie.open().catch(function(e) {
      console.log(e);
    });
    this.db   = window.db_dexie;
    this.data = this.db[this.name];
  },
  list: function(where, cb) {
    var _this = this;
    var items = [];
    this.data.each(function(item){
      items.push(item)
    })
    .then(function(){
      if (cb) cb(items)
    })
    .catch(function(e) {
      console.log(e);
      if (cb) cb(false);
    });
  },
  find: function(where, cb) {
    var _this = this;
    this.data.get(parseInt(where))
    .then(function(item){
      if (cb) cb(item)
    })
    .catch(function(e) {
      console.log(e);
      if (cb) cb(false);
    });
  },
  create: function(attrs, cb) {
    var _this = this;
    this.data.add(attrs)
    .then(function(id) {
      attrs.id = id;
      if (cb) cb(attrs);
    })
    .catch(function(e) {
      console.log(e);
      if (cb) cb(false);
    });
  },
  update: function(where, attrs, cb) {
    var _this = this;
    this.data.update(parseInt(where), attrs)
    .then(function() {
      if (cb) cb(attrs);
    })
    .catch(function(e) {
      console.log(e);
      if (cb) cb(false);
    });
  },
  destroy: function(where, cb) {
    var _this = this;
    this.data.delete(parseInt(where))
    .then(function() {
      if (cb) cb(where);
    })
    .catch(function(e) {
      console.log(e);
      if (cb) cb(false);
    });
  },
  import: function(data, cb) {
    var _this = this;
  },
  clear: function(cb) {
    var _this = this;
  },
  action: function(action) {
    var _this = this;
    return param;
  },
};
for (var i in StorePrototype) Store.prototype[i] = StorePrototype[i];
