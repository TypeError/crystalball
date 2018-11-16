const fs = require("fs");
const pug = require("pug");

interface puppetObject {
  url: string;
  title: string;
  image: string;
  headers: Object;
  source: string;
  src: string[];
  href: string[];
  fileName: string;
}

export function createReport(
  reportData: Array<puppetObject>,
  filename: string
) {
  const assetsFolder = `${__dirname}/../assets`;
  const pugFileName = `${assetsFolder}/report.pug`;
  const pugFile = pug.compileFile(pugFileName);
  const html = pugFile({ title: "CrystalBall", data: reportData });
  fs.appendFileSync(filename, html, function(err: Error) {
    if (err) throw err;
  });
}

export function saveData(reportData: Array<puppetObject>) {
  for (let dataObj of reportData) {
    const fileLocation = `crystalball/data/${dataObj.fileName}`;
    const headersData = JSON.stringify(dataObj.headers);
    const srcData = dataObj.src.toString().replace(/,/g, "\n");
    const hrefData = dataObj.href.toString().replace(/,/g, "\n");
    dataFile(fileLocation, headersData, "headers.txt");
    dataFile(fileLocation, srcData, "src.txt");
    dataFile(fileLocation, hrefData, "href.txt");
    dataFile(fileLocation, dataObj.source, "source.html");
  }
}

function dataFile(fileLocation: string, data: string, type: string) {
  fs.appendFileSync(`${fileLocation}-${type}`, data, function(err: Error) {
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
  if (!fs.existsSync("crystalball/data")) {
    fs.mkdirSync("crystalball/data");
  }
}
