# CrystalBall 🔮

Web Screenshot Project

CrystalBall is a library that takes an array or file of URLs and returns a report with screenshots (using [Puppeteer](https://developers.google.com/web/tools/puppeteer/)), application headers and src/href references. 

## Usage
### CrystalBall Command Line Install   

`npm install crystalball -g`  

#### CrystalBall (cli)

The first parameter is URL(s) (encapsulated in quotes, separated by commas) or a filename and followed by individual options. 

##### Options (not required)

`prefix` : Prefix http and https to each URL  
`port` : Add additional port 8080 for HTTP and 8443 for HTTPS  
`file` : Use the first parameter as a filename (instead of URLs) to parse (URLs separated by a new line)

If the last argument is a number, it will specify the number of concurrent connections *(default = 10)*. 

Note: The `file` argument _must_ be included to use a filename. 

##### Examples:

Array of URLS:  
`crystalball 'http://example.com, http://example1.com'`  

Array of URLS with Options:  
`crystalball 'http://example.com, http://example1.com' prefix ports 15` 

File (must include `file` argument):  
`crystalball 'example.txt' file`   

File with Options:  
`crystalball 'example.txt' file prefix ports 15`  

Note: The _first_ argument should be encapsulated in quotes. 

### Module Install

`npm install crystalball`

#### Modules

Import: `import * as O from "crystalball";`  
Require: `const O = require("crystalball");`

## Options (not required)

Options are passed as an object with the following properties and values. 

`file : true ` : Use filename as argument  
`filename: "example"` :  Report filename (defaults to `cb`)
`prefix: true ` : Prefix http and https  
`ports : boolean` : Add port 8080 for http and port 8443 for https  
`connections : number` : Number of concurrent connections *(default = 10)*

##### Example:

```javascript
O.see("example.txt", { file: true, filename: "example", prefix: true });
    => Report output in ./crystalball/example_date.html
    => Data output in ./crystalball/data/
```

## Functions

The `see` function takes an array of URLS and options. 

```javascript
O.see(["http://www.example`.com", "http://www.example2.com"], options);
    => Report output in ./crystalball/cb_date.html
    => Data output in ./crystalball/data/
```

The `file` function takes a filename and options. 

```javascript
O.file("example.txt", options);
    => Report output in ./crystalball/cb_date.html
    => Data output in ./crystalball/data/
```

## Reporting

1. HTML report with screenshots, application headers and src/href references at `./crystalball/cb_date.html`. *(Note: Clicking on each screenshot will toggle size)*
2. Data files with application source, headers and src/href references at `./crystalball/data/`.

