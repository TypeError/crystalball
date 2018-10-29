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

export async function see(urls: string[], filename: string) {
  createFolders();
  for (let url of urls) {
    const puppetData = await puppetry(url);
    await createReport(puppetData, filename);
  }
}

function createReport(puppetData: puppetResponse, filename: string) {
  const reportData = `<h1><a href="${puppetData.url}">${
    puppetData.url
  }</a></h1><br><img src="${puppetData.image.replace(
    "crystalball/",
    ""
  )}"><h2>Headers</h2><p>${JSON.stringify(
    puppetData.headers
  )}</p><h2>Src</h2><p>${puppetData.src}</p><h2>Href</h2><p>${
    puppetData.href
  }</p><hr><br>`;
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
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const response = await page.goto(url);
  await page.waitFor(1 * 1000);
  await page.screenshot({ path: imageFile });
  const html = await page.content(); //?
  const headers = await response.headers();
  await browser.close();
  const pageSrc = await larp.src(html);
  const pageHref = await larp.href(html);
  const resData = {
    url: url,
    image: imageFile,
    headers: headers,
    source: html,
    src: pageSrc,
    href: pageHref
  };
  return resData;
}
