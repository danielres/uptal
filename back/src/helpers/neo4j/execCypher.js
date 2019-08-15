const driver = require("./driver");

const execCypher = cypherCommand => async () => {
  const session = driver.session();
  await session.run(cypherCommand);
  session.close(() => driver.close());
};

module.exports = execCypher;
