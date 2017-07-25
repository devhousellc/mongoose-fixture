let fs = require('fs');

/**
 * Clears a collection and inserts the given data as new documents
 *
 * @param {Mixed}       The data to load. This parameter accepts either:
 *                          String: Path to a file or directory to load
 *                          Object: Object literal in the form described above
 * @param {Connection}  [db] the mongoose connection to use.
 *                          Defaults to mongoose.connection.
 * @returns {Promise} returns empty promise in case when the objects loaded successfully
 */


let load = exports.load = function (data, mongooseConnection) {
    if (typeof data === 'object') {

        return loadObject(data, mongooseConnection);

    } else if (typeof data === 'string') {

        //Get the absolute dir path if a relative path was given
        if (data.substr(0, 1) !== '/') {
            let parentPath = module.parent.filename.split('/');
            parentPath.pop();
            data = parentPath.join('/') + '/' + data;
        }

        //Determine if data is pointing to a file or directory
        try {
            let stats = fs.statSync(data);

            if (stats.isDirectory()) {
                return loadDir(data, mongooseConnection);
            } else { //File
                return loadFile(data, mongooseConnection);
            }
        } catch (err) {
            return Promise.reject(err);
        }


    } else { //Unsupported type
        return Promise.reject(new Error('Data must be an object, array or string (file or dir path)'));
    }
};


/**
 * Loads fixtures from all files in a directory
 * @param {string} directoryPath The directory path to load e.g. 'data/fixtures' or '../data'
 * @param {Connection} db The mongoose connection to use
 */
function loadDir(directoryPath, db) {

    //Get the absolute dir path if a relative path was given
    if (directoryPath.substr(0, 1) !== '/') {
        let parentPath = module.parent.filename.split('/');
        parentPath.pop();
        directoryPath = parentPath.join('/') + '/' + directoryPath;
    }

    //Load each file in directory
    let files = [];
    try {
        files = fs.readdirSync(directoryPath)
    } catch (err) {
        return Promise.reject(err)
    }

    let promiseChain = Promise.resolve({});


    // load file consequently
    files.forEach(file => {
        promiseChain = promiseChain.then(() => {
            return loadFile(directoryPath + '/' + file, db)
        })
    });

    return promiseChain;
}


/**
 * Loads fixtures from one file
 * @param {string} file The full path to the file to load
 * @param {Connection} db The mongoose connection to use
 */
function loadFile(file, db) {
    let parentPath;

    if (file.substr(0, 1) !== '/') {
        parentPath = module.parent.filename.split('/');
        parentPath.pop();
        file = parentPath.join('/') + '/' + file;
    }

    return load(require(file), db);
}

/**
 * Loads fixtures from object data
 * @param {Object} data The data to load, keyed by the Mongoose model name e.g.:
 *                          { User: [{name: 'Alex'}, {name: 'Bob'}] }
 * @param {Connection} db The mongoose connection to use
 */
function loadObject(data, db) {
    let promiseChain = Promise.resolve({});

    Object.keys(data).forEach(modelName => {
        promiseChain = promiseChain.then(() => {
            return insertCollection(modelName, data[modelName], db)
        })
    });

    return promiseChain;
}


/**
 * Clears a collection and inserts the given data as new documents
 * @param {string} modelName The name of the model e.g. User, Post etc.
 * @param {object} data The data to insert, as an array or object. E.g.:
 *                          { user1: {name: 'Alex'}, user2: {name: 'Bob'} }
 *                      or:
 *                          [ {name: 'Alex'}, {name:'Bob'} ]
 * @param {Connection} db The mongoose connection to use
 */
function insertCollection(modelName, data, db) {
    let Model = db.model(modelName),
        promiseChain = Promise.resolve({});


    return clearCollection(modelName, db) //clear existing collection
        .then(() => {
            let items = [];
            if (Array.isArray(data)) {
                items = data;
            } else {
                for (let i in data) {
                    items.push(data[i]);
                }
            }

            items.forEach(item => {
                promiseChain = promiseChain.then(() => {
                    let doc = new Model(item);
                    return doc.save();
                })
            });

            return promiseChain;
        });
}

/**
 * Clear collection for specified model name
 * @param {string} modelName The name of the model e.g. User, Post etc.
 * @param {Connection} db The mongoose connection to use
 * @returns {Promise}
 */
function clearCollection(modelName, db) {
    let Model = db.model(modelName);

    return new Promise((resolve, reject) => {
        Model.collection.remove((err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve();
            }
        })
    })
}