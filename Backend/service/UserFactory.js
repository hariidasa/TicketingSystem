const RegularUser = require('../domain/RegularUser');

module.exports = {
    createUser(data) {
        if (data.type == 'regular') return new RegularUser(data);
    }
}