const Umzug = require("umzug");
const fs = require("fs");
const path = require("path");

const execCypher = require("./execCypher");
const { h, hr, log } = require("../log");

const command = process.argv[2] || "up";
const seedsPath = "neo4j/seeds";
const metaPath = path.resolve(process.cwd(), seedsPath, "meta.json");

const umzug = new Umzug({
  migrations: { path: seedsPath },
  storage: "json",
  storageOptions: { path: metaPath }
});

const printLog = title => seeds => {
  if (!seeds.length) return log("No seeds to run");

  h(title);
  log(seeds.map(m => m.file).join("\n"));
  hr("");
};

switch (command) {
  case "up":
    umzug.up().then(printLog("Applied seeds:"));
    break;

  case "purge":
    execCypher(`MATCH (n) DETACH DELETE n`)
      .then(() => {
        log("Db purged from all content");
        fs.writeFileSync(metaPath, "[]");
      })
      .catch(console.error);
    break;
}
