const fs = require("fs");
const pug = require("pug");

export function createReport(reportData: object[], filename: string) {
  const assetsFolder = `${__dirname}/../assets`;
  const pugFileName = `${assetsFolder}/report.pug`;
  const pugFile = pug.compileFile(pugFileName);
  const html = pugFile({ title: "CrystalBall", data: reportData });
  fs.appendFileSync(filename, html, function(err: Error) {
    if (err) throw err;
  });
}

export function createFolders() {
  if (!fs.existsSync("crystalball")) {
    fs.mkdirSync("crystalball");
  }
  if (!fs.existsSync("crystalball/screenshots")) {
    fs.mkdirSync("crystalball/screenshots");
  }
}
