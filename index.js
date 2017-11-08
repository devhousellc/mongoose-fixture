let fs = require('fs');
let { MissingSchemaError } = require('mongoose');

class FixturesManager {

  /**
   * @param db {Connection} The mongoose connection to use
   * @param skipValidation {boolean=false} defines if the schema validation should be skipped
   */
  constructor(db, skipValidation = false) {
    this.db = db;
    this.skipValidation = skipValidation;
  }

  /**
   * Clears a collection and inserts the given data as new documents
   *
   *                          String: Path to a file or directory to load
   *                          Object: Object literal in the form described above
   *                          Defaults to mongoose.connection.
   *
   * @param data {Object|string} define the fixture source (read more details in description)
   * @returns {Promise} returns empty promise in case when the objects loaded successfully
   */
  load(data) {
    if (typeof data === 'object') {
      return this.loadObject(data);
    } else if (typeof data === 'string') {
      // Determine if data is pointing to a file or directory
      try {
        let stats = fs.statSync(data);

        if (stats.isDirectory()) {
          return this.loadDir(data);
        } else { // File
          return this.loadFile(data);
        }
      } catch (err) {
        console.error('Error during fixtures loading', err);
        return Promise.reject(err);
      }
    } else { // Unsupported type
      return Promise.reject(new Error('Data must be an object, array or string (file or dir path)'));
    }
  }

  /**
   * Loads fixtures from all files in a directory
   * @param {string} directoryPath The directory path to load e.g. 'data/fixtures' or '../data'
   */
  loadDir(directoryPath) {
    // Load each file in directory
    let files = [];
    try {
      files = fs.readdirSync(directoryPath);
    } catch (err) {
      return Promise.reject(err);
    }

    let promiseChain = Promise.resolve({});

    // load file consequently
    files.forEach((file) => {
      promiseChain = promiseChain.then(() => {
        return this.loadFile(directoryPath + '/' + file);
      });
    });

    return promiseChain;
  }

  /**
   * Loads fixtures from one file
   * @param {string} file The full path to the file to load
   */

  loadFile(file) {
    console.log('loading fixtures from file', file);
    return this.load(require(file));
  }

  /**
   * Loads fixtures from object data
   * @param {Object} data The data to load, keyed by the Mongoose model name e.g.:
   *                          { User: [{name: 'Alex'}, {name: 'Bob'}] }
   */

  loadObject(data) {
    let promiseChain = Promise.resolve({});

    Object.keys(data).forEach((modelName) => {
      promiseChain = promiseChain
        .then(() => this.insertCollection(modelName, data[modelName]))
        .catch((err) => {
          console.error('fixtures loading error: ', err.message);
          throw err;
        });
    });

    return promiseChain
      .then(() => {
        console.log('inserted fixtures', Object.keys(data));
      });
  }

  /**
   * Clears a collection and inserts the given data as new documents
   * @param {string} modelName The name of the model e.g. User, Post etc.
   * @param {object} data The data to insert, as an array or object. E.g.:
   *                          { user1: {name: 'Alex'}, user2: {name: 'Bob'} }
   *                      or:
   *                          [ {name: 'Alex'}, {name:'Bob'} ]
   */

  insertCollection(modelName, data) {
    let Model = this.db.model(modelName);

    console.log('inserting fixtures', modelName, 'skipValidation', this.skipValidation);
    return new Promise((res, rej) => {
      return this.clearCollection(modelName) // clear existing collection
        .then(() => {
          let promiseChain = Promise.resolve();
          let items = [];
          if (Array.isArray(data)) {
            items = data;
          } else {
            for (let i in data) {
              items.push(data[i]);
            }
          }

          items.forEach((item) => {
            promiseChain = promiseChain.then(() => {
              if (!this.skipValidation) {

                let doc = new Model(item);
                return doc.save();
              } else {
                return new Promise((resolve, reject) => {
                  Model.collection.insert(item, (err, doc) => {
                    if (err) {
                      console.error('Fixture uploading error', Model.name, err);
                      return reject(err);
                    }

                    return resolve(doc);
                  });
                });
              }
            });
          });

          return promiseChain;
        })
        .then(() => res())
        .catch(() => rej);
    });
  }

  /**
   * Clear collection for specified model name
   * @param {string} modelName The name of the model e.g. User, Post etc.
   * @returns {Promise}
   */

  clearCollection(modelName) {
    let Model = this.db.model(modelName);
    console.log('cleaning collection', modelName);

    return new Promise((resolve, reject) => {
      Model.remove({}, (err) => {
        if (err) {
          return reject(err);
        }

        console.log('cleaned collection', modelName);
        resolve();
      });
    });
  }

  /**
   * Executes collectin dumping
   * @param modelName {string} name of Mongoose model
   * @param path {string} path to file where the fixture would be written in the format:
   *      const { ObjectID } = require('mongoose').mongo
   *      exports.ModelName = [{...}];
   * @return {Promise.<void>}
   */
  dumpCollection(modelName, path) {
    return this.db
      .model(modelName)
      .find({})
      .lean()
      .exec()
      .then((items) => {
        let json = JSON.stringify(items, null, 2).replace(/(: )("[a-f\d]{24}")(,?)/gi, '$1ObjectID($2)$3');
        let content = `const { ObjectID } = require('mongoose').mongo;\nexports.${modelName} = ${json};`;
        return new Promise((res, rej) => {
          fs.writeFile(path, content, (err) => {
            if (err) {
              console.error('Collection', modelName, 'has NOT been dumped', err);
              return rej(err);
            }

            console.log('Collection', modelName, 'has been dumped');
            return res();
          });
        });
      });
  }

  /**
   * Gets set of files which should be populated, that means dump without initial fixtures wouldn't work, it only dump already existent fixture files
   * @param filePaths {string[]}
   * @return {Promise.<void>}
   */
  dump(filePaths) {
    let promises = [];
    console.log('dumping', filePaths);
    filePaths.forEach((filePath) => {
      let models = require(filePath);
      Object.keys(models).forEach((modelName) => {
        console.log('dumping', modelName, filePath);
        promises.push(this.dumpCollection(modelName, filePath));
      });
    });

    return Promise.all(promises);
  }
}

module.exports = { FixturesManager };