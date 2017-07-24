
var Store = function(src, options) {
  var _this = this;
  this.src     = src     || '';
  this.options = options || {};
  this.boot();
};
var StorePrototype = {
  boot: function() {
    // 
  },
  list: function(where, cb) {
    var _this = this;
    var url = this._buildRoute('list');
    if (typeof where === 'object') {
      url += this._buildWhere(where);
    }
    this._get(url, cb);
  },
  find: function(where, cb) {
    var _this = this;
    var url = this._buildRoute('find');
    if (typeof where === 'object') {
      url += this._buildWhere(where);
      this._get(url, cb);
    } else {
      this._get(url + '/' + where, cb);
    }
  },
  create: function(attrs, cb) {
    var _this = this;
    var url = this._buildRoute('create');
    this._post(url, attrs, cb);
  },
  update: function(where, attrs, cb) {
    var _this = this;
    var url = this._buildRoute('update');
    if (typeof where === 'object') {
      url += this._buildWhere(where);
      this._post(url, attrs, cb);
    } else {
      this._post(url + '/' + where, attrs, cb);
    }
  },
  destroy: function(where, cb) {
    var _this = this;
    var url = this._buildRoute('destroy');
    if (typeof where === 'object') {
      url += this._buildWhere(where);
      this._post(url, {}, cb);
    } else {
      this._post(url + '/' + where, {}, cb);
    }
  },
  _buildRoute: function(action) {
    var _this = this;
    var url = this.options[action] || (this.src + '/' + action);
    return url;
  },
  _buildWhere: function(where) {
    var _this = this;
    if ((typeof where === 'object') && (Object.keys(where).length !== 0)) {
      var _where = '?';
      for (var i in where) {
        _where += '&' + i + '=' + where[i];
      }
      return _where;
    }
    return '';
  },
  _get: function(url, cb) {
    var _this = this;
    axios.get(url)
    .then(function(response) {
      if (cb) cb(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  },
  _post: function(url, attrs, cb) {
    var _this = this;
    var data = this._urlify(attrs);
    axios.post(url, data)
    .then(function(response) {
      if (cb) cb(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  },
  _urlify: function(attrs) {
    var _this = this;
    var data = Object.keys(attrs).map(function(key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(attrs[key]);
    }).join('&');
    return data;
  },
  action: function(param) {
    var _this = this;
    return param;
  }
};
for (var i in StorePrototype) Store.prototype[i] = StorePrototype[i];
