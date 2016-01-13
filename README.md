# micro-mediator
A super tiny mediator for use with the publisher/subscribe pattern. Uses the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) datatype. Reverts to plain objects in older browsers. 

Use with browserify/webpack or just include and it'll install on `window`.

Has the ability to use `subscribe` and `on` for subscription, `unsubscribe` and `off` for unsubscription, and `publish`, `emit`, and `trigger`.

```javascript
var mediator = new require('micro-mediator')

mediator.on('party', function(data) {
  console.log('INCOMING PARTY DATA: ' + data)
})

mediator.emit('party', 'Chill bros arrived.')

mediator.off('party')
```

Or install the mediator to objects of interest.

```javascript
var o = {}, m = new window.Mediator()

m.installTo(o)

o.on('imminent asteroid imapct', console.log)

m.emit('imminent asteroid impact', 'panic')
```