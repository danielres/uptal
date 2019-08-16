const Umzug = require("umzug");
const { h, hr, log } = require("../log");

const command = process.argv[2] || "up";
const path = "neo4j/migrations";

const umzug = new Umzug({
  migrations: { path },
  storage: "json",
  storageOptions: { path: `${path}/meta.json` }
});

const printLog = title => migrations => {
  if (!migrations.length) return h("No migrations to run");

  h(title);
  log(migrations.map(m => m.file).join("\n"));
  hr();
};

switch (command) {
  case "up":
    return umzug.up().then(printLog("Applied migrations:"));

  case "down":
    return umzug.down().then(printLog("Rolled back migrations:"));
}
