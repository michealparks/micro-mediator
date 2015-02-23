# micro-mediator
A compact, performant pub/sub module.

Usage (using ES6):

```javascript
import {publish, subscribe} from 'mediator';

const id = subscribe('event', (data) => {
  console.log(`My pubsub module is ${data.msg}`);
});

publish('event', {
  msg: 'just. Absolutely. Incontrovertibly. Fascinating.'
});

unsubscribe('event', id);
```
