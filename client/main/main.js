// This code only runs on the client
Template.mainTemplate.helpers({
  rooms: function () {
    return Rooms.find({});
  },

  haikus: function () {
    return Haikus.find({}).fetch();
  }


});
