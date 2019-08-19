const execCypher = require("./execCypher");

module.exports = () => execCypher(`MATCH (n) DETACH DELETE n`);
