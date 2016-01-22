# micro-mediator
A super tiny mediator for use with the publisher/subscribe pattern. Uses the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) datatype. Reverts to plain objects in older browsers. 

Use with browserify/webpack or just include and it'll install on `window`.

Has the ability to use `subscribe` and `on` for subscription, `unsubscribe` and `off` for unsubscription, and `publish`, `emit`, and `trigger`.

```javascript
const Mediator = require('micro-mediator')
const mediator = new Mediator()

mediator.on('party', str => {
  console.log(`INCOMING PARTY DATA: ${str}`)
})

mediator.emit('party', 'Chill bros arrived.')

mediator.off('party')
```

Or install the mediator to objects of interest.

```javascript
const o = {}
const m = new window.Mediator()

m.installTo(o)

o.on('imminent asteroid impact', console.log)

o.emit('imminent asteroid impact', 'panic')
```

Configuration options with default values: 

```javascript
const m = new Mediator({
  debug: false, // Displays additional console information
  installTo: [] // Pass an array of objects to auto install
})

```

If you'd rather just install Mediator to an object rather than make instances, just pass this method a variadic number of objects:

```javascript
Mediator.installTo(Object.prototype)

var bob = {}

bob.on('romantic comedy viewing', action => console.log(action))

bob.emit('romantic comedy viewing', 'cry')
```

This will install a new mediator instance on each object. Or you could install to a single instance:

```javascript
Mediator.installSingleInstanceTo(obj1, obj2, obj3)
```