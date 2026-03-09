// appddbb.js
const bcrypt = require('bcrypt');

const users = {
    data: {},
    email_user: {},
    register: async function(username, email, password) {
        if (this.data.hasOwnProperty(username)) {
            throw new Error(`Ya existe el usuario ${username}.`);
        }
        if (this.data.hasOwnProperty(email)) {
            throw new Error(`Ya existe el usuario ${email}.`);
        }
        try {
            const hash = await new Promise((resolve, reject) => {
                this.generateHash(password, (err, hash) => {
                    if (err) reject(err);
                    else resolve(hash);
                });
            });
            this.data[username] = { username, email, hash };
            this.email_user[email] = username;
        } catch (err) {
            throw new Error('Error al registrar el usuario: ' + err.message);
        }
    },

    generateHash: function(password, callback) {
        bcrypt.hash(password, 10, callback);
    },

    comparePass: async function(password, hash) {
        return await bcrypt.compare(password, hash);
    },

    isLoginRight: async function(email_user, type, password) {
        if (type == 'email') {
            if (!this.email_user.hasOwnProperty(email_user)) {
                return false;
            }
            return await this.comparePass(password, this.data[this.email_user[email_user]].hash);
        } else {
            if (!this.data.hasOwnProperty(email_user)) {
                return false;
            }
            return await this.comparePass(password, this.data[email_user].hash);
        }
    },

    getEmailByUsername: function(username) {
        return this.data[username].email;
    },

    getUsernameByEmail: function(email) {
        return this.email_user[email];
    }
};

const chat = {
    data: {},
    registerMessage: function(chatTitle, username, message) {
        this.data[chatTitle] = this.data[chatTitle] || {};
        this.data[chatTitle][username] = this.data[chatTitle][username] || [];
        this.data[chatTitle][username].push({ username, content: message });
    },

    getUserMessages: function(chatTitle, username) {
        return this.data[chatTitle]?.[username] || [];
    },

    getChat: function(chatTitle) {
        const totalChat = [];
        const chatUsers = this.data[chatTitle] || {};

        Object.values(chatUsers).forEach(userMessages => {
            totalChat.push(...userMessages);
        });

        return totalChat;
    }
};

module.exports = { users, chat };