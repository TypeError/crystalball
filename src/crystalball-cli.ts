#! /usr/bin/env node

const O = require("./crystalball");

interface parseOptions {
  file?: boolean;
  filename?: string;
  prefix?: boolean;
  ports?: boolean;
  connections?: number;
}
function commands() {
  try {
    let options: parseOptions = {};
    var args = process.argv.slice(2);
    if (process.argv.length >= 3) {
      var args = process.argv.slice(2);
      if (args.includes("prefix")) {
        options.prefix = true;
      }
      if (args.includes("ports")) {
        options.ports = true;
      }

      if (typeof Number(args[args.length - 1]) == "number") {
        options.connections = parseInt(args[args.length - 1]);
      }

      if (args.includes("file")) {
        const input = args[0];
        O.file(input, options);
      } else {
        const input = args[0].split(",");
        O.see(input, options);
      }
    } else {
      console.log(
        `Please run CrystalBall with URL(s) or filename and options (file, prefix, and/or ports)
        Example: crystalball example.txt file prefix ports`
      );
    }
  } catch (err) {
    console.error("CrystalBall Error:", err.message);
  }
}

commands();
