// This code only runs on the client
Template.mainTemplate.helpers({
  rooms: function () {
    return Rooms.find({});
  },

  haikus: function () {
    var haikus = Haikus.find({}).fetch();
    var aHaikus = [];
    // for (var i = 0; haikus.length(); i++) {
      // var title = haikus[i].title;
      // var _id = haikus[i]._id;
      // aHaikus[i] = {
      //   title: title,
      //   _id: _id
      // };
    // }
        console.log(haikus);
    // return aHaikus;
    return haikus;
    // console.log(haikus);
    // return haikus;
  }


});
