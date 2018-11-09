const O = require("./crystalball");

interface parseOptions {
  file?: boolean;
  prefix?: boolean;
  ports?: boolean;
}

export function urlParse(urls: string[], options?: parseOptions) {
  if (options) {
    if (options.prefix) {
      urls = urls.map(url =>
        url.replace("http://", "").replace("https://", "")
      );
      const urlsHttp = urls.map(url => `http://${url}`);
      const urlsHttps = urls.map(url => `https://${url}`);
      urls = urlsHttp.concat(urlsHttps);
    }

    if (options.ports) {
      let urlPort: string[] = urls.map(url => {
        const newUrl = url.split("/");
        if (url.includes("http://")) {
          return `${newUrl[0]}//${newUrl[2]}:8080`;
        } else if (url.includes("https://")) {
          return `${newUrl[0]}//${newUrl[2]}:8443`;
        } else {
          return url;
        }
      });

      urls = urls.concat(urlPort);
    }
  }

  const urlSet = new Set(urls);
  urls = [...urlSet];
  return urls;
}
