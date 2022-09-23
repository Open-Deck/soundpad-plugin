const LOG_PREFIX = '[soundpad-plugin]:';

const log = (message: string | object) => {
  let messageFormatted = message;
  if (typeof messageFormatted === 'object') {
    messageFormatted = JSON.stringify(message, null, 2);
  }
  console.log(`${LOG_PREFIX} ${messageFormatted}`);
};

export { log };
