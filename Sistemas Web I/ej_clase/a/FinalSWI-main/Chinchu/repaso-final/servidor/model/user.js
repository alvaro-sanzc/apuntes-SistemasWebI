const User = class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.watchLists = [];
    }

    createWatchList(name) {
        //const list = factories.listFactory(name);
        //this.watchLists.push(list);
    }
};

module.exports = User;