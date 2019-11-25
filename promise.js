const { sleep } = require('./util');

const promiseExample = () => {
  console.log('Before asynchronous operation');
  sleep(1500, 'Some text')
    .then(response => {
      console.log(`Promise returned ${response}`);
      console.log('After asynchronous operation');
    });
}

// promiseExample();

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
