# micro-mediator
A compact, performant pub/sub module.

Usage (using ES6):

```javascript
import {publish, subscribe, unsubscribe} from 'mediator';

const id = subscribe('event', (data) => {
  console.log(`My pubsub module is ${data.msg}`);
});

publish('event', {
  msg: 'just. Absolutely. Incontrovertibly. Fascinating.'
});

unsubscribe('event', id);
```

If you prefer importing defaults:

```javascript
import Mediator from 'mediator';

const id = Mediator.subscribe('event', e => console.log(e));
```

Available via Bower:

```
bower install micro-mediator
```
