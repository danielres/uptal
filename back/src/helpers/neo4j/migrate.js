const Umzug = require("umzug");

const command = process.argv[2] || "up";
const path = "neo4j/migrations";

const umzug = new Umzug({
  migrations: { path },
  storage: "json",
  storageOptions: { path: `${path}/meta.json` }
});

const h = str => `=== ${str} `.padEnd(50, "=");

const printLog = title => migrations => {
  if (!migrations.length) return console.log(h("No migrations to run"));

  console.log(h(title));
  console.log(migrations.map(m => m.file).join("\n"));
  console.log("".padEnd(50, "="));
};

switch (command) {
  case "up":
    return umzug.up().then(printLog("Applied migrations:"));

  case "down":
    return umzug.down().then(printLog("Rolled back migrations:"));
}
