# Crystal Ball

Web Screenshot Project

Crystal Ball is a library that takes an array of URLs and returns a report with screenshots (using [Puppeteer](https://developers.google.com/web/tools/puppeteer/)), headers and src/href references.

## Usage

### Install

    npm install crystalball

#### Modules

Import: `import * as O from "crystalball";`  
Require: `const O = require("crystalball");`

## Functions

The see function takes an array of URLS and the output file name.

```javascript
O.see(["http://www.example`.com", "http://www.example2.com"], "example");
    => Report output in ./crystalball/example.html
```
