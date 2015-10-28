# micro-mediator
A super tiny mediator for use with the publisher/subscribe pattern. Uses the [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) datatype. [Browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Browser_compatibility) varies.

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
var o = {}, m = new Mediator()

m.installTo(o)

o.on('imminent asteroid imapct', console.log)

m.emit('imminent asteroid impact', 'panic')
```

If in a non commonjs environment, the mediator will attach itself to ```window```.