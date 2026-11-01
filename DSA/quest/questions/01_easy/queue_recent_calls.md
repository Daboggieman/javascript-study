# Queue Recent Calls

Source: queue_recent_calls

Files to submit
- solution.js

Allowed functions
- --allow-builtin

Instructions
Design a `RecentCounter` class using a queue (in JS: an array used with `push`/`shift`, or your own queue class) that counts recent "pings". `ping(t)` adds a new ping at time `t` (milliseconds) and returns how many pings have occurred in the range `[t - 3000, t]`, inclusive. Assume calls to `ping` are made with strictly increasing values of `t`.

Expected function
```js
class RecentCounter {
  constructor() {}

  ping(t) {}
}
```


Here is a possible program to test your function :
```js
const counter = new RecentCounter();
console.log(counter.ping(1));
console.log(counter.ping(100));
console.log(counter.ping(3001));
console.log(counter.ping(3002));
```

And its output :
```text
1
2
3
3
```
