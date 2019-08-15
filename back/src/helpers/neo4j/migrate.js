const Umzug = require("umzug");

const command = process.argv[2] || "up";
const umzug = new Umzug({
  storage: "json",
  storageOptions: { path: "migrations/meta.json" }
});

const printLog = title => migrations => {
  if (!migrations.length) return console.log("No migrations to run");

  console.log("=========================");
  console.log(title);
  console.log(migrations.map(m => `- ${m.file}`).join("\n"));
  console.log("=========================");
};

switch (command) {
  case "up":
    umzug.up().then(printLog("Ran migrations:"));

  case "down":
    umzug.down().then(printLog("Rolled back migrations:"));
}
