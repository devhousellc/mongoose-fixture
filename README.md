devhouse-fixtures
=================

[![NPM](https://nodei.co/npm/devhouse-fixtures.svg?downloads=true&downloadRank=true)](https://www.npmjs.com/package/devhouse-fixtures)&nbsp;&nbsp;


This is the clone of the original repo [mongoose-fixtures](https://github.com/powmedia/mongoose-fixtures) except several things:

1. Db dumping support (could be combined with your owner migration tool to do full fixture migration)
2. No __async__ unnecessary dependencies
3. No callback, returns _Promise_ instead
4. Consequent models loading
5. Connection must be specified (you almost always have db connection in your project, isn't it?)


Fixtures can be in one file, or divided up into separate files for organisation
(e.g. one file per model)

The fixture files must export objects which are keyed by the Mongoose model name, each
containing the data for documents within that.

NOTE: Loading fixtures will clear the existing contents of a collection!


Examples
------
With the file below, 3 documents will be inserted into the 'User' collection and 2 into the 'Business' collection:

    //fixtures.js
    exports.User = [
        { name: 'Gob' },
        { name: 'Buster' },
        { name: 'Steve Holt' }
    ];

    exports.Business = [
        { name: 'The Banana Stand' },
        { name: 'Bluth Homes' }
    ];


You can also load fixtures as an object where each document is keyed, in case you want to reference another document:

    //users.js
    var ObjectId = require('mongodb').BSONNative.ObjectID;

    exports.User = {
        user1: {
            _id: new ObjectId(),
            name: 'Michael'
        },
        user2: {
            _id: new ObjectId(),
            name: 'George Michael',
            father: exports.User.user1._id
        }
    }


Usage
-----
    
    let db = require('../data-model/db'),
    fixtures = require('pow-mongoose-fixtures');
    
    describe('tescases', function () {
        before(done => {
            fixtures.load(__dirname + '/fixtures/', db.connection)
                .then(() => done());
        });
        it('Check database count', done => {
            ...
        })

    })


Installation
------------
    
    git clone https://github.com/chichivica/mongoose-fixtures.git
    npm install
