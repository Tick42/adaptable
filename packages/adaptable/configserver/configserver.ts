import { AdaptableState } from '../src/Redux/Store/Interface/IAdaptableStore';
import * as express from 'express';
import * as BodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import * as bunyan from 'bunyan';

/**********
 * Enhancements:
 * Ideally all filesystem access should be async.......
 * Load up App config only one time at startup
 * use Path everywhere instead of building manually paths
 * create app config if doesnt exist
 */

let log = bunyan.createLogger({ name: 'AdaptableConfigServer', level: 'debug' });

if (process.argv.length <= 2) {
  log.error('Wrong number of arguments');
  log.error('Usage: ' + __filename + ' --configfolder foldername');
  log.error('ex: ' + __filename + ' --configfolder ./config');
  process.exit(-1);
}

const arg: { configfolder: string } = (argList => {
  let arg: any = { configfolder: '' },
    a,
    opt,
    thisOpt,
    curOpt: any;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');
    if (opt === thisOpt) {
      // argument value
      if (curOpt) {
        arg[curOpt] = opt;
      }
      curOpt = null;
    } else {
      // argument name
      curOpt = opt;
      arg[curOpt] = true;
    }
  }
  return arg;
})(process.argv);

/** Configuration **/
let ABConfigFolder = arg.configfolder;
if (!fs.existsSync(ABConfigFolder)) {
  fs.mkdirSync(ABConfigFolder);
}
if (!ABConfigFolder.endsWith('/')) {
  ABConfigFolder += '/';
}
let ApplicationConfigFileName = ABConfigFolder + 'Application.abjson';
let TeamSharingFolder = ABConfigFolder + 'TeamSharing/';
if (!fs.existsSync(TeamSharingFolder)) {
  fs.mkdirSync(TeamSharingFolder);
}
let app = express();
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());

app.get('/adaptable-config', function(req, res) {
  let username = req.headers['ab_username'];
  let adaptable_id = req.headers['ab_id'];
  try {
    if (username) {
      let filename = ABConfigFolder + username + '_' + adaptable_id + '.abjson';
      let ApplicationConfig: AdaptableState;
      let UserConfig: AdaptableState;
      if (fs.existsSync(ApplicationConfigFileName)) {
        ApplicationConfig = JSON.parse(
          fs.readFileSync(ApplicationConfigFileName, { encoding: 'utf8' })
        );
      }

      if (fs.existsSync(filename)) {
        UserConfig = JSON.parse(fs.readFileSync(filename, { encoding: 'utf8' }));
        log.debug('Sending config for : ' + username);
        //   ForcePredefinedItems(ApplicationConfig)
        let mergedStates = MergePredefinedWithUser(ApplicationConfig, UserConfig);
        res.status(200).send(JSON.stringify(mergedStates));
      } else {
        //nothing yet in the user config
        log.debug('No current config for : ' + username);
        if (ApplicationConfig) {
          res.status(200).send(JSON.stringify(ApplicationConfig));
        } else {
          res.status(200).send({});
        }
      }
    } else {
      log.error('UserName not provided for load');
      res.sendStatus(403);
    }
  } catch (error) {
    res.sendStatus(500);
    log.error('Error Getting config for : ' + username + '\n' + error);
  }
});

app.post('/adaptable-config', function(req, res) {
  var username = req.headers['ab_username'];
  var adaptable_id = req.headers['ab_id'];
  if (!username || !adaptable_id) {
    return res.sendStatus(403);
  }
  let filename = ABConfigFolder + username + '_' + adaptable_id + '.abjson';

  fs.writeFileSync(filename, JSON.stringify(req.body));
  res.json({ ok: true });
});

app.post('/adaptable-teamsharing', function(req, res) {
  let filename =
    TeamSharingFolder +
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9) +
    '.abjson';
  let sharedItem = req.body;
  fs.writeFile(filename, JSON.stringify(sharedItem, null, '\t'), { encoding: 'utf8' }, function(
    err
  ) {
    if (err) {
      res.sendStatus(500);
      log.error('Error saving shared item' + '\n' + err);
    } else {
      log.debug('Shared item Saved : ' + filename);
      res.sendStatus(200);
    }
  });
});

app.get('/adaptable-teamsharing', function(req, res) {
  var files = getFiles(TeamSharingFolder);
  let entities = [];
  for (let file of files) {
    entities.push(
      JSON.parse(fs.readFileSync(path.join(TeamSharingFolder, file), { encoding: 'utf8' }))
    );
  }
  res.status(200).send(JSON.stringify(entities));
});

function getFiles(srcpath: string) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isFile();
  });
}

app.listen(3000, function() {
  log.info('Adaptable Config Server listening on port 3000!');
});

function customizer(objValue: any, srcValue: any) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

function MergePredefinedWithUser(predefinedState: any, userState: any) {
  const result = _.extend({}, predefinedState);

  for (const key in userState) {
    if (!userState.hasOwnProperty(key)) {
      continue;
    }
    const value = userState[key];

    // Assign if we don't need to merge at all
    if (!result.hasOwnProperty(key)) {
      result[key] = _.isObject(value) && !Array.isArray(value) ? _.merge({}, value) : value;
      continue;
    }

    const oldValue = result[key];

    if (_.isObject(value) && !Array.isArray(value)) {
      result[key] = _.mergeWith({}, oldValue, value, customizer);
    } else {
      result[key] = value;
    }
  }

  return result;
}
