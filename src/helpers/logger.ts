const LOG_PREFIX = '[plugin-template]:';

const log = (message: string | object) => {
  let messageFormatted = message;
  if (typeof messageFormatted === 'object') {
    messageFormatted = JSON.stringify(message, null, 2);
  }
  console.log(`${LOG_PREFIX} ${messageFormatted}`);
};

export { log };
