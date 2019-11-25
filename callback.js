const { sleep } = require('./util');

const callbackExample = () => {
  console.log('Before asynchronous operation');
  sleep(1500, (err, response) => {
    console.log(`Callback returned ${JSON.stringify(response)}`);
    console.log('After asynchronous operation');
  })
}

callbackExample();


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
