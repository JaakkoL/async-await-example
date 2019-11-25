const { sleep, sleepError } = require('./util');

const asyncAwaitExample = async () => {
  console.log('Before asynchronous operation');
  const response = await sleep(1500, 'Some text');
  console.log(`Promise returned ${response}`);
  console.log('After asynchronous operation');
}

// asyncAwaitExample();

const asyncAwaitExample2 = async () => {
  console.log('Before asynchronous operation');
  const response = await sleep(1500, 'Some text');
  console.log(`First promise returned ${response}`);
  const response2 = await sleep(1500, 'Some text');
  console.log(`Second promise returned ${response2}`);
  console.log('After asynchronous operation');
}

// asyncAwaitExample2();

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

// asyncAwaitExample3();

const asyncAwaitExample4 = async () => {
  const [response1, response2] = await Promise.all([
    sleep(1500, 'Response 1 data'),
    sleep(500, 'Response 2 data')
  ]);

  console.log(`Promise 1 returned ${response1}`);
  console.log(`Promise 2 returned ${response2}`);
}

asyncAwaitExample4();
