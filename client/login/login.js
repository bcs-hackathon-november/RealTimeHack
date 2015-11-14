UserList = new Mongo.Collection('usersList');

    Template.login.helpers({
        'getName': function () {
            var userName = "Dan";
            return userName;
        }
    });

    Template.login.events({
        'click #facebook-login': function (event) {
            Meteor.loginWithFacebook({}, function (err) {
                if (err) {
                    throw new Meteor.Error("Facebook login failed");
                }
            });
            //TODO
            //var usrName = Meteor.user().username;
            var usrName = "Example name";
            UserList.insert({name: usrName});

        },

        'click #logout': function (event) {
            Meteor.logout(function (err) {
                if (err) {
                    throw new Meteor.Error("Logout failed");
                }
            });
            //TODO
            UserList.remove(UserList.find(Meteor.user()._id));
        }
    });