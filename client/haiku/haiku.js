

// var haiku = {
// 	title: "Best haiku here", 
// 	line_1: "An old silent pond...", 
// 	line_2: "A frog jumps into the pond,", 
// 	line_3: "splash! Silence again.", 
// 	created_at: new Date()

// }



if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    haikus: function () {
      return Haikus.find({});
    }
  });
}
