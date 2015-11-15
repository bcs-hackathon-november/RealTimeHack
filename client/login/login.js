var username;

Template.redirToMain.helpers({
    'getName': function () {
        username = Meteor.user().profile.name;
        return username;
    },
    'gotoMain': function () {
        //console.log("LOGIN.JS");
        return Router.go('/');
    }
});

Template.login.events({
    'click #facebook-login': function (event) {
        Meteor.loginWithFacebook({}, function (err) {
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });


        console.log(username);

        var usrId = UserList.insert({'name': username});
        Session.set('thisUser', usrId);
        //console.log(usrId);

    },

    'click #logout': function (event) {
        Meteor.logout(function (err) {
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        });
        //TODO
        var usrToRm = Session.get('thisUser');
        //console.log(usrToRm);
        UserList.remove(usrToRm);
    }
});
