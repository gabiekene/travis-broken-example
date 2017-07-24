
var Store = function() {
  var _this = this;
  this.id   = 0;
  this.data = [];
  this.boot();
};
var StorePrototype = {
  boot: function() {
    var _this = this;
  },
  list: function(where, cb) {
    var _this = this;
    var _data = this.data.slice();
    var data  = [];
    for (var i=0; i<_data.length; i++) {
      data[i] = {};
      for (var j in _data[i]) {
        data[i][j] = _data[i][j];
      }
    }
    if (typeof where === 'object') {
      if (cb) cb(this._query(where));
    } else {
      if (cb) cb(data);
    }
  },
  find: function(where, cb) {
    var _this = this;
    if (!(typeof where === 'object')) {
      where = {id: parseInt(where)};
    }
    if (cb) cb(this._query(where)[0]);
  },
  create: function(attrs, cb) {
    var _this = this;
    attrs.id = ++this.id;
    this.data.push(attrs);
    if (cb) cb(attrs)
  },
  update: function(where, attrs, cb) {
    var _this = this;
    var _data = [];
    if (!(typeof where === 'object')) {
      where = {id: parseInt(where)};
    }
    _data = this._query(where);
    for (var i=0; i<_data.length; i++) {
      for (var j in attrs) {
        _data[i][j] = attrs[j]
      }
    }
    if (cb) cb(_data)
  },
  destroy: function(where, cb) {
    var _this = this;
    var _data = [];
    if (!(typeof where === 'object')) {
      where = {id: parseInt(where)};
    }
    _data = this._query(where);
    for (var i=0; i<_data.length; i++) {
      for (var j=0; j<this.data.length; j++) {
        if (_data[i].id === this.data[j].id) {
          this.data.splice(j, 1);
          break;
        }
      }
    }
    if (cb) cb(_data)
  },
  import: function(data, cb) {
    var _this = this;
  },
  clear: function(cb) {
    var _this = this;
  },
  _query: function(where) {
    var _this = this;
    var _data = [];
    if (typeof where === 'object') {
      for (var i=0; i<this.data.length; i++) {
        var inside = true;
        for (var j in where) {
          if (
            (!this.data[i][j]) ||
            (this.data[i][j] && (this.data[i][j] !== where[j]))
          ) {
            inside = false;
          }
        }
        if (inside) _data.push(this.data[i]);
      }
    }
    return _data;
  },
  action: function(action) {
    var _this = this;
    return param;
  },
};
for (var i in StorePrototype) Store.prototype[i] = StorePrototype[i];

if (module && module.exports) module.exports = Store;
