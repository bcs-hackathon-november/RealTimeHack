Template.room.helpers({
  'room': function () {
    return Rooms.findOne({title: "Room 1"});
  },

  'title' : function() {
  	return Rooms.findOne({title: "Room 1"}).haiku.title;
  },

  'line_1': function(){
  	return Rooms.findOne({title: "Room 1"}).haiku.line_1;
  },

  'line_2': function(){
  	return Rooms.findOne({title: "Room 1"}).haiku.line_2;
  },

  'line_3': function(){
  	return Rooms.findOne({title: "Room 1"}).haiku.line_3;
  },

  'users': function(){
  	return Meteor.users.find({});
  }
});

Template.room.events({
  'click #save' : function(){
  	alert("Saved!");
  	Haikus.insert({
  		title: Rooms.findOne({title: "Room 1"}).haiku.title, 
  		line_1: Rooms.findOne({title: "Room 1"}).haiku.line_1, 
  		line_2: Rooms.findOne({title: "Room 1"}).haiku.line_2, 
  		line_3: Rooms.findOne({title: "Room 1"}).haiku.line_3, 
  		created_at: new Date()});
  	Router.go('/');
  },

  'submit form' : function(event){
  	event.preventDefault();
  	var inpText = event.target.textInput.value;
  	var numWords = inpText.split(' ');
  	if (numWords.length != 1) {
  		alert("Only one word please");
  		return;
  	}

  	var docId = Rooms.findOne({title: "Room 1"})._id;
  	var tempText = "";
  	var count = 0;

  	if (Rooms.findOne({title: "Room 1"}).haiku.line_1_counter < 5) {
  		tempText = Rooms.findOne({title: "Room 1"}).haiku.line_1;
  		Rooms.update({_id: docId}, {$set: { line_1 : tempText + " " + inpText}});
  		count = Rooms.findOne({title: "Room 1"}).haiku.line_1_counter;
  		count++;
  		Rooms.update({_id: docId}, {$set: {line_1_counter: count}});
  	} else if (Rooms.findOne({title: "Room 1"}).haiku.line_2_counter < 7) {
  		tempText = Rooms.findOne({title: "Room 1"}).haiku.line_2;
  		Rooms.update({_id: docId}, {$set: { line_2 : tempText + " " + inpText}});
  		count = Rooms.findOne({title: "Room 1"}).haiku.line_2_counter;
  		count++;
  		Rooms.update({_id: docId}, {$set: {line_1_counter: count}});
  	} else if (Rooms.findOne({title: "Room 1"}).haiku.line_3_counter < 5) {
  		tempText = Rooms.findOne({title: "Room 1"}).haiku.line_1;
  		Rooms.update({_id: docId}, {$set: { line_3 : tempText + " " + inpText}});
  		count = Rooms.findOne({title: "Room 1"}).haiku.line_3_counter;
  		count++;
  		Rooms.update({_id: docId}, {$set: {line_3_counter: count}});
  	} else
  		return;
  	
  }
});
