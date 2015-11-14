Template.exampleTemplate.helpers({
    'getName': function () {
        var userId = Session.get('thisUser');
        return Meteor.user().profile.name;
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



        var usrName = Meteor.user().profile.name;

        console.log(usrName);

        var usrId = UserList.insert({'name': usrName});
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