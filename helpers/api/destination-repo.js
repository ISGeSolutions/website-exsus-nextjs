const fs = require('fs');

// destinations in JSON file for simplicity, store in a db for production applications
let destinations = require('data/users.json');

export const destinationRepo = {
    getAll: () => destinations,
    getById: id => destinations.find(x => x.id.toString() === id.toString()),
    find: x => destinations.find(x),
    create,
    update,
    delete: _delete
};

function create(user) {
    // generate new user id
    user.id = destinations.length ? Math.max(...destinations.map(x => x.id)) + 1 : 1;

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    destinations.push(user);
    saveData();
}

function update(id, params) {
    const user = destinations.find(x => x.id.toString() === id.toString());

    // set date updated
    user.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted user and save
    destinations = destinations.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/users.json', JSON.stringify(destinations, null, 4));
}