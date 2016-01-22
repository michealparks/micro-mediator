# micro-mediator
A super tiny mediator for use with the publisher/subscribe pattern. Uses the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) datatype. Reverts to plain objects in older browsers. 

Use with browserify/webpack or just include and it'll install on `window`.

Call `.subscribe()` or `.on()` to listen to events,

`.unsubscribe()` or `.off()` to unlisten, 

and `.publish()`, `.emit()`, or `.trigger()` to fire events.

```javascript
var Mediator = require('micro-mediator')
var mediator = new Mediator()

mediator.on('party', function (str) {
  console.log(`INCOMING PARTY DATA: ${str}`)
})

mediator.emit('party', 'Chill bros arrived.')

mediator.off('party')
```

Or install the mediator to objects of interest.

```javascript
var o = {}
var m = new window.Mediator()

m.installTo(o)

o.on('imminent asteroid impact', function(action) {
  console.log(action)
})

o.emit('imminent asteroid impact', 'panic')
```

If you'd rather just install Mediator to an object rather than make instances, just pass this method a variadic number of objects:

```javascript
Mediator.installTo(Object.prototype /* etc... */)

var bob = {}

bob.on('romantic comedy viewing', action => console.log(action))

bob.emit('romantic comedy viewing', 'cry')
```

This will install a new mediator instance on each object you pass. 

You can also install to a single instance:

```javascript
Mediator.installSingleInstanceTo(obj1, obj2, obj3)
```