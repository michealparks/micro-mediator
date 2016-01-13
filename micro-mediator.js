(function (window, m) {
  if (typeof module !== 'undefined') module.exports = m
  else window.Mediator = m
})(this, function () {
  'use strict'

  try {
    new window.Map()
  } catch (e) {
    window.Map = window.Object
    window.Map.prototype.get = function (key) { return this[key] }
    window.Map.prototype.set = function (key, val) { this[key] = val }
    window.Map.prototype.has = function (key) { this[key] !== undefined }
    window.Map.prototype.forEach = function (fn) {
      window.Object.keys(this).forEach(function (key) { fn(this[key]) })
    }
  }

  window.console = window.console || { error: Function }

  function Mediator () {
    this.channels = new window.Map()
    this.idProvider = 0
  }

  Mediator.prototype.publish =
  Mediator.prototype.emit =
  Mediator.prototype.trigger = function (name, data) {
    var channel = this.channels.get(name)
    if (!channel) return console.error('Mediator: no such channel ' + channel)
    channel.forEach(function (fn) { fn(data) })
  }

  Mediator.prototype.subscribe =
  Mediator.prototype.on = function (name, fn) {
    if (!this.channels.has(name)) this.channels.set(name, new Map())
    this.channels.get(name).set(++this.idProvider, fn)
    return this.idProvider
  }

  Mediator.prototype.unsubscribe =
  Mediator.prototype.off = function (name, id) {
    var channel = this.channels.get(name)
    if (!channel) return console.error('Mediator: no such channel ' + channel)
    channel.delete(id)
  }

  Mediator.prototype.installTo = function (obj) {
    obj.publish = obj.emit = obj.trigger = this.publish.bind(this)
    obj.subscribe = obj.on = this.subscribe.bind(this)
    obj.unsubscribe = obj.off = this.unsubscribe.bind(this)
  }

  return Mediator
})
