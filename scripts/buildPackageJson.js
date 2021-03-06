const fs = require('fs');
const chalk = require('chalk');
const resolve = require('path').resolve;
const sourcePackagePath = resolve(process.cwd(), './package.json');
const topLevelPackageJSONPath = resolve(process.cwd(), '../../package.json');

const packageJSON = require(sourcePackagePath);
const topLevelPackageJSON = require(topLevelPackageJSONPath);

const toDelete = ['devDependencies', 'scripts', 'private'];
toDelete.forEach(key => delete packageJSON[key]);

packageJSON.version = topLevelPackageJSON.version;
const content = JSON.stringify(packageJSON, null, 2);

const path = resolve(process.cwd(), 'dist', 'package.json');
fs.writeFile(path, content, 'utf8', err => {
  if (err) {
    console.log(chalk.red(err));
    throw err;
  } else {
    console.log('DONE building package.json with version ', chalk.green(packageJSON.version));
  }
});
