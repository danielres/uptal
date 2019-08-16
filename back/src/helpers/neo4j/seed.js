const Umzug = require("umzug");
const fs = require("fs");
const path = require("path");

const execCypher = require("./execCypher");

const command = process.argv[2] || "up";
const seedsPath = "neo4j/seeds";
const metaPath = path.resolve(process.cwd(), seedsPath, "meta.json");

const umzug = new Umzug({
  migrations: { path: seedsPath },
  storage: "json",
  storageOptions: { path: metaPath }
});

const h = str => `=== ${str} `.padEnd(50, "=");

const printLog = title => seeds => {
  if (!seeds.length) return console.log(h("No seeds to run"));

  console.log(h(title));
  console.log(seeds.map(m => m.file).join("\n"));
  console.log("".padEnd(50, "="));
};

switch (command) {
  case "up":
    umzug.up().then(printLog("Applied seeds:"));
    break;

  case "purge":
    execCypher(`MATCH (n) DETACH DELETE n`)
      .then(() => fs.writeFileSync(metaPath, "[]"))
      .catch(console.error);
    break;
}
