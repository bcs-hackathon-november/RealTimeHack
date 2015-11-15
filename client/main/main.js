// This code only runs on the client
Template.mainTemplate.helpers({
  rooms: function () {
    return Rooms.find({});
  },

  haikus: function () {
    return Haikus.find({}).fetch();
  },
  
  user: function () {
    return UserList.find({});
  },

  'chosenClass': function() {
    var userId = this._id;
    var chosenUser = Session.get('chosenUser');
    if (userId == chosenUser) {
      return "selected";
    }
  }
});

Template.mainTemplate.events({
  'click .user': function() {
    var userId = this._id;
    Session.set('chosenUser', userId);
  },
  'click #logout': function (event) {
    Meteor.logout(function (err) {
      if (err) {
        throw new Meteor.Error("Logout failed");
      }
    });
    //TODO
    var usrToRm = Session.get('thisUser');
    UserList.remove(usrToRm);
    Router.go('/login');
    //console.log("LOGGED OUT");
  }
});
