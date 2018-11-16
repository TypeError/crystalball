const report = require("./report");
const parser = require("./parser");
const puppetry = require("./puppetry");
const fs = require("fs");

interface parseOptions {
  file?: boolean;
  filename?: string;
  prefix?: boolean;
  ports?: boolean;
  connections?: number;
}

interface puppetObject {
  url: string;
  title: string;
  image: string;
  headers: Object;
  source: string;
  src: string[];
  href: string[];
  fileName?: string;
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

  for (let chunk of urls) {
    await Promise.all(
      chunk.map(async function(url: string) {
        try {
          const data = await puppetry.go(url);
          if (data !== undefined) {
            reportData.push(data);
          }
          return data;
        } catch (err) {
          console.error("Puppeteer Error: ", err);
        }
      })
    );
  }

  console.log("Creating CrystalBall report");
  await report.createReport(reportData, reportFile);
  await report.saveData(reportData);
  console.log("CrystalBall Complete");
  process.exit();
}
