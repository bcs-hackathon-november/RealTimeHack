<<<<<<< HEAD
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
=======
window.fbAsyncInit = function() {
        FB.init({
            appId      : '789309501195621',
            xfbml      : true,
            version    : 'v2.5'
        });
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
>>>>>>> 268fc1711dfec86fe927bd62f4b9408ec11fb622
