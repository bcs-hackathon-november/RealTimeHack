// This code only runs on the client
Template.room.helpers({
  rooms: function () {
    return Rooms.find({});
  }
});
