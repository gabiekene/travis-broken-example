
var Store = function(src, options) {
  this.src     = src     || '';
  this.options = options || {};
  if (options) {
    this._data  = options._data || 'data';
    this._key   = options._key  || '';
  }
  this.boot();
};
var StorePrototype = {
  boot: function() {
    var _this = this;
    var _data = this._data
    window[_data] = window[_data] || { _log: [] };
    window.addEventListener('message', function(e) {
      var response = JSON.parse(e.data);
      var id       = response.id   || null;
      var data     = response.data || [];
      if (id && data) {
        if (window[_data][id]) window[_data][id](data)
        window[_data]._log.push(id)
        delete window[_data][id];
      }
      document.body.removeChild(document.getElementById('form__'+id))
      document.body.removeChild(document.getElementById('iframe__'+id))
    }, false);
  },
  list: function(where, cb) {
    var _this = this;
    this._get('list', where, cb)
  },
  find: function(where, cb) {
    var _this = this;
    this._get('find', where, cb)
  },
  create: function(attrs, cb) {
    var _this = this;
    this._post('create', '', attrs, cb)
  },
  update: function(where, attrs, cb) {
    var _this = this;
    this._post('update', where, attrs, cb)
  },
  destroy: function(where, cb) {
    var _this = this;
    this._post('destroy', where, {}, cb)
  },
  _route: function(action, append) {
    var _this = this;
    var url  = this.options[action] || (this.src + '/' + action);
    url     += (append ? ('/' + append) : '');
    return url + '?';
  },
  _post: function(action, where, attrs, cb) {
    var _this = this;
    var url    = '';
    var id     = this._id()
    var _key   = this._key;
    var _data  = this._data
    window[_data][id] = cb;
    if (typeof where === 'object') {
      url      = this._route(action);
      where._iframe  = id;
      where._key     = _key;
      url           += this._urlify(where);
      this._form(url, attrs, id);
    } else {
      url            = this._route(action, '/' + where);
      url           += this._urlify({ _iframe: id, _key: _key });
      this._form(url, attrs, id);
    }
  },
  _get: function(action, where, cb) {
    var _this = this;
    var url    = this._route(action);
    var id     = this._id()
    var _data  = this._data
    window[_data][id] = cb;
    var _jsonp = 'window["' + _data + '"].' + id;
    var _key   = this._key;
    if (typeof where === 'object') {
      where._jsonp  = _jsonp;
      where._key    = _key;
      url          += this._urlify(where);
      this._script(url, id);
    } else {
      url          += this._urlify({ _jsonp: _jsonp, _key: _key });
      this._script(url, id);
    }
  },
  _urlify: function(attrs) {
    var _this = this;
    var data = Object.keys(attrs).map(function(key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(attrs[key]);
    }).join('&');
    return data;
  },
  _script: function(url, id) {
    var _data = this._data
    var _this = this;
    var script = document.createElement('script');
    var name = this._name;
    script.onload = function() { 
      window[_data]._log.push(id)
      delete window[_data][id]
    };
    script.src = url;
    document.getElementsByTagName('body')[0].appendChild(script);
  },
  _form: function(url, attrs, id) {
    var _data = this._data
    var _this = this;
    var form   = document.createElement('form');
    var name   = this.name;
    form.setAttribute('method', 'POST');
    form.setAttribute('style', 'display: none;');
    form.setAttribute('action', url);
    form.setAttribute('target', 'iframe__'+id);
    form.setAttribute('id',     'form__'+id);

    for(var key in attrs) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', attrs[key]);
      form.appendChild(input);
    }
    this._iframe('iframe__'+id)
    document.body.appendChild(form);
    form.submit();
  },
  _id: function() {
    var _this = this;
    var text  =  '';
    var possible = 'abcdefghijklmnopqrstuvwxyz';
    for (var i=0; i<10; i++) {
      text += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
  },
  _iframe: function(id) {
    var _this = this;
    var iframe  = document.createElement('iframe');
    iframe.id   = id;
    iframe.name = id;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  },
  action: function(param) {
    var _this = this;
    return param;
  },
};
for (var i in StorePrototype) Store.prototype[i] = StorePrototype[i];
