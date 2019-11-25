// Helper function for mocking an asynchronous operation.
exports.sleep = (timeout, returnValue) => {
  if (typeof returnValue === 'function') {
    setTimeout(() => {
      console.log(`Slept for ${timeout}ms.`)
      returnValue(null, {success: true});
    }, timeout);
  } else {
    return new Promise(resolve =>setTimeout(() => {
      console.log(`Slept for ${timeout}ms.`)
      resolve(returnValue);
    }, timeout));
  }
};

exports.sleepError = (timeout, returnValue) => {
  if (typeof returnValue === 'function') {
    setTimeout(() => {
      console.log(`Slept for ${timeout}ms.`)
      returnValue(new Error('Failed miserably!'), null);
    }, timeout);
  } else {
    return new Promise((resolve, reject) => setTimeout(() => {
      console.log(`Slept for ${timeout}ms.`)
      reject('Failed miserably!');
    }, timeout));
  }
};
