Meteor.methods({
    'saveDocument': function (usrName) {
        return UserList.insert({'name': usrName});
    }
})