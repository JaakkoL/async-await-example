# async-await-example

- Fully supported in Node.js 8.x
  - https://node.green/#ES2017-features-async-functions
- For browsers, better to transpile with Babel
  - https://caniuse.com/#feat=async-functions


## From callbacks to promises to async await

Async await helps 

### [Callback Example](./callback.js)

- Callback function signature is `function(err, value) {}`.
- Error handling is often difficult.
- Ends up in a pyramid of doom 💩💩💩.

**With one callback:**

```javascript
const { sleep } = require('./util');

const callbackExample = () => {
  console.log('Before asynchronous operation');
  sleep(1500, (err, response) => {
    console.log(`Callback returned ${JSON.stringify(response)}`);
    console.log('After asynchronous operation');
  })
}

callbackExample();

// Logs to console.
Before asynchronous operation
Slept for 1500ms.
Callback returned {"success":true}
After asynchronous operation
```

**With two nested callbacks:**

```javascript
const { sleep } = require('./util');

const callbackExample2 = () => {
  console.log('Before asynchronous operation');
  sleep(1500, (err, response) => {
    console.log(`First callback returned ${JSON.stringify(response)}`);
    sleep(1500, (err, response) => {
      console.log(`Second callback returned ${JSON.stringify(response)}`);
      console.log('After asynchronous operation');
    })
  })
}

callbackExample2();

// Logs to console.
Before asynchronous operation
Slept for 1500ms.
First callback returned {"success":true}
Slept for 1500ms.
Second callback returned {"success":true}
After asynchronous operation

```

### [Promise Example](./promise.js)

- Improved error handling.
- Often requires outside libraries to help with managing control flow.

**With one promise:**

```javascript
const { sleep } = require('./util');

const promiseExample = () => {
  console.log('Before asynchronous operation');
  sleep(1500, 'Some text')
    .then(response => {
      console.log(`Promise returned ${response}`);
      console.log('After asynchronous operation');
    });
}

promiseExample();

// Logs to console.
Before asynchronous operation
Slept for 1500ms.
Promise returned Some text
After asynchronous operation
```

**With two nested promises:**

```javascript
const { sleep } = require('./util');

const promiseExample2 = () => {
  console.log('Before asynchronous operation');
  sleep(1500, 'Some text')
    .then(response => {
      console.log(`First promise returned ${response}`);
      return  sleep(1500, 'Some text')
        .then(response => {
          console.log(`Second promise returned ${response}`);
          console.log('After asynchronous operation');
        })
    });
}

promiseExample2();

// Logs to console.
Before asynchronous operation
Slept for 1500ms.
First promise returned Some text
Slept for 1500ms.
Second promise returned Some text
After asynchronous operation

```


### [Async Await Example](./async-await.js)

- Built on top of Promises.
- Compatible with all Promise-based APIs.
- Keyword `async` declares an asynchronous function.
- Keyword `await` pauses the execution of `async` functions.
- Enables writing highly readable code while working with asynchronous functions.
- Works well with both sequential and concurrent asynchronous code.

**With one promise:**

```javascript
const { sleep } = require('./util');

const asyncAwaitExample = async () => {
  console.log('Before asynchronous operation');
  const response = await sleep(1500, 'Some text');
  console.log(`Promise returned ${response}`);
  console.log('After asynchronous operation');
}

asyncAwaitExample();

// Logs to console.
Before asynchronous operation
Slept for 1500ms.
Callback returned {"success":true}
After asynchronous operation
```

**With two promises:**

```javascript
const { sleep } = require('./util');

const asyncAwaitExample2 = async () => {
  console.log('Before asynchronous operation');
  const response = await sleep(1500, 'Some text');
  console.log(`First promise returned ${response}`);
  const response2 = await sleep(1500, 'Some text');
  console.log(`Second promise returned ${response2}`);
  console.log('After asynchronous operation');
}

asyncAwaitExample2();


// Logs to console.
Before asynchronous operation
Slept for 1500ms.
First promise returned Some text
Slept for 1500ms.
Second promise returned Some text
After asynchronous operation
```

## Error handling with `async-await`

```javascript
const { sleepError } = require('./util');

const asyncAwaitExample3 = async () => {
  try {
    console.log('Before asynchronous operation');
    const response = await sleepError(1500, 'Some text');
    console.log(`Promise returned ${response}`);
    console.log('After asynchronous operation');
  } catch(error) {
    // Handle error.
    console.error(error)
  }
}

asyncAwaitExample3();

// Logs to console.
Before asynchronous operation
Slept for 1500ms.
Failed miserably!
```

## Handling multiple promises concurrently with `async-await`

- Run multiple asynchronous functions concurrently and pause event loop until all of them have finished with `await Promise.all([promise1, promise2, ...])`.
- `Promise.all` returns an array of all promise values in the same order.

```javascript
const { sleep } = require('./util');

const asyncAwaitExample4 = async () => {
  const [response1, response2] = await Promise.all([
    sleep(1500, 'Response 1 data'),
    sleep(500, 'Response 2 data')
  ]);

  console.log(`Promise 1 returned ${response1}`);
  console.log(`Promise 2 returned ${response2}`);
}

asyncAwaitExample4();

// Logs to console.
Slept for 500ms.
Slept for 1500ms.
Promise 1 returned Response 1 data
Promise 2 returned Response 2 data
```

## Async functions are thenable
- Async function returns `Promise`
- Function return value is the resolved value (then).
- If async function throws error, it's the rejected value (catch).

```javascript
const { sleep } = require('./util');

const asyncAwaitExample5 = async () => {
  const response = await sleep(1500, 'Response data');
  return response;
}

asyncAwaitExample5()
  .then(response => {
    console.log(`Promise returned ${response}`)
  })
  .catch(error => {
    console.error(error)
  });

// Logs to console.
Slept for 1500ms.
Promise returned Response data
```
