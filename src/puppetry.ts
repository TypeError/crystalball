const larp = require("larp");
const puppeteer = require("puppeteer");

export async function go(url: string) {
  let puppetData: Object | undefined = {};
  console.log(`Running Puppeteer on ${url}`);
  const urlFileName = url
    .replace("://", "_")
    .replace("/", "-")
    .replace(".", "_");
  const imageFile = `crystalball/screenshots/${urlFileName}.png`;
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(url, {
      waitUntil: "networkidle2"
    });
    if (response.ok) {
      await page.screenshot({ path: imageFile, fullpage: true });
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
        href: pageHref
      };
      puppetData = resData;
    }
  } catch (err) {
    console.error("Puppeteer Error: ", err.message);
    puppetData = undefined;
  } finally {
    return puppetData;
  }
}
