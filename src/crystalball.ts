const report = require("./report");
const parser = require("./parser");
const puppetry = require("./puppetry");
const fs = require("fs");

interface parseOptions {
  file?: boolean;
  filename?: string;
  prefix?: boolean;
  ports?: boolean;
}

export function file(
  filename: string,
  options: parseOptions = { filename: "cb" }
) {
  fs.readFile(filename, "utf8", (err: Error, data: string) => {
    if (err) {
      console.error("File Error:", err.message);
    } else {
      const urls = data.split("\n");
      see(urls, options);
    }
  });
}

export async function see(
  input: string[],
  options: parseOptions = { filename: "cb" }
) {
  if (!options.filename) {
    options.filename = "cb";
  }
  const dateNow = new Date();
  const timeStamp = `${dateNow.getMonth() +
    1}-${dateNow.getDate()}-${dateNow.getFullYear()}-${dateNow.getHours()}${dateNow.getMinutes()}`;

  const reportFile = `crystalball/${options.filename}_${timeStamp}.html`;
  report.createFolders();
  const urls = await parser.urlParse(input, options);
  let reportData: object[] = [];
  for (let url of urls) {
    const puppetData = await puppetry.go(url);
    if (puppetData != undefined) {
      reportData.push(puppetData);
    }
  }
  console.log("Creating CrystalBall report");
  report.createReport(reportData, reportFile);
  console.log("CrystalBall Complete");
  process.exit();
}
