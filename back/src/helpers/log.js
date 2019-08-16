const log = (...args) => console.log(...args);

const h = str => log(`=== ${str} `.padEnd(50, "="));

const hr = () => log("".padEnd(50, "="));

module.exports = { h, hr, log };
