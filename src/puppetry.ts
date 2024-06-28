const larp = require("larp");
const puppeteer = require("puppeteer");

export async function go(url: string) {
  let puppetData: Object | undefined = {};
  console.log(`Running Puppeteer on: ${url}`);
  const urlFileName = url
    .replace("://", "_")
    .replace(/\//g, "-")
    .replace(/\./g, "_");
  const imageFile = `crystalball/screenshots/${urlFileName}.png`;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(url, {
      waitUntil: "networkidle0",
    });
    if (response.ok) {
      await page.screenshot({ path: imageFile, fullPage: true });
      const html = await page.content(); //?
      const headers = await response.headers();
      const pageTitle = await page.title();
      await browser.close();
      const pageSrc = (await larp.src(html)) || ["None"];
      const pageHref = (await larp.href(html)) || ["None"];
      const resData = {
        url: url,
        title: pageTitle,
        image: imageFile.replace("crystalball/", ""),
        headers: headers,
        source: html,
        src: pageSrc,
        href: pageHref,
        fileName: urlFileName,
      };
      puppetData = resData;
    }
  } catch (err: any) {
    console.error("Puppeteer Error: ", err.message);
    puppetData = undefined;
  } finally {
    return puppetData;
  }
}
