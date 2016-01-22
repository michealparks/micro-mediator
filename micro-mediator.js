(function (window, m) {
  if (typeof module !== 'undefined') module.exports = m()
  else window.Mediator = m()
})(this, function () {
  'use strict'

  try {
    var map = new window.Map()
    map.set('test')
    map.get('test')
    map.forEach(function () {})
    map = undefined
  } catch (e) {
    window.Map = window.Object
    window.Map.prototype.get = function (key) { return this[key] }
    window.Map.prototype.set = function (key, val) { this[key] = val }
    window.Map.prototype.has = function (key) { this[key] !== undefined }
    window.Map.prototype.forEach = function (fn) {
      window.Object.keys(this).forEach(function (key) { fn(this[key]) })
    }
  }

  var hasDebug = 'console' in window

  function Mediator () {
    this._channels = new window.Map()
    this._idProvider = 0
  }

  Mediator.prototype.publish =
  Mediator.prototype.emit =
  Mediator.prototype.trigger = function (name, data) {
    var channel = this._channels.get(name)
    if (!channel && hasDebug) return console.error('no such mediator channel as ' + name)
    channel.forEach(function (fn) { fn(data) })
  }

  Mediator.prototype.subscribe =
  Mediator.prototype.on = function (name, fn) {
    if (!this._channels.has(name)) this._channels.set(name, new Map())
    this._channels.get(name).set(++this._idProvider, fn)
    return this._idProvider
  }

  Mediator.prototype.unsubscribe =
  Mediator.prototype.off = function (name, id) {
    var channel = this._channels.get(name)
    if (!channel && hasDebug) return console.error('no such mediator channel as ' + name)
    channel.delete(id)
  }

  Mediator.prototype.installTo = function (obj) {
    obj.publish = obj.emit = obj.trigger = this.publish.bind(this)
    obj.subscribe = obj.on = this.subscribe.bind(this)
    obj.unsubscribe = obj.off = this.unsubscribe.bind(this)
  }

  Mediator.installTo = function () {
    Array.prototype.slice.call(arguments).forEach(function (arg) {
      install(new Mediator(), arg)
    })
  }

  Mediator.installSingleInstanceTo = function () {
    var m = new Mediator()
    Array.prototype.slice.call(arguments).forEach(function (arg) {
      install(m, arg)
    })
  }

  function install (m, o) { m.installTo(o) }

  return Mediator
})
