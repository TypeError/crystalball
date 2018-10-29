const puppeteer = require("puppeteer");
const fs = require("fs");
const larp = require("larp");

interface puppetResponse {
  url: string;
  image: string;
  headers: object;
  source: string;
  src: string[];
  href: string[];
}

export async function see(urls: string[], filename: string = "CS-Report") {
  createFolders();
  for (let url of urls) {
    const puppetData = await puppetry(url);
    if (puppetData != undefined) {
      await createReport(puppetData, filename);
    }
  }
  console.log("Crystal Ball Complete");
  return true;
}

function createReport(puppetData: puppetResponse, filename: string) {
  const imageSrc = puppetData.image.replace("crystalball/", "");
  const src = `<li>${puppetData.src.join("</li><li>")}</li>`;
  const href = `<li>${puppetData.href.join("</li><li>")}</li>`;
  const headers = JSON.stringify(puppetData.headers);
  const reportData = `<h2><a href="${puppetData.url}">${
    puppetData.url
  }</a></h2><br><img src="${imageSrc}"><h3>Headers</h3><p>${headers}</p><h3>Src</h3><ul>${src}</ul><h3>Href</h3><ul>${href}</ul><hr><br>`;
  fs.appendFile(`crystalball/${filename}.html`, reportData, function(
    err: Error
  ) {
    if (err) throw err;
  });
}

function createFolders() {
  if (!fs.existsSync("crystalball")) {
    fs.mkdirSync("crystalball");
  }
  if (!fs.existsSync("crystalball/screenshots")) {
    fs.mkdirSync("crystalball/screenshots");
  }
}

async function puppetry(url: string) {
  const urlFileName = url
    .replace("://", "_")
    .replace("/", "-")
    .replace(".", "_");
  const imageFile = `crystalball/screenshots/${urlFileName}.png`;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(url);
    await page.waitFor(1 * 1000);
    await page.screenshot({ path: imageFile });
    const html = await page.content(); //?
    const headers = await response.headers();
    await browser.close();
    const pageSrc = (await larp.src(html)) || ["None"];
    const pageHref = (await larp.href(html)) || ["None"];
    const resData = {
      url: url,
      image: imageFile,
      headers: headers,
      source: html,
      src: pageSrc,
      href: pageHref
    };
    return resData;
  } catch (e) {
    console.log("Puppeteer Error: ", e);
    return undefined;
  }
}
