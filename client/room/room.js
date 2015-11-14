// This code only runs on the client
Template.rooms.helpers({
  rooms: function () {
    return Rooms.find({});
  }
});
