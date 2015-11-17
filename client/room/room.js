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

  	var docId = Rooms.findOne({title: "Room 1"})._id;

  	Haikus.insert({
  		title: Rooms.findOne({title: "Room 1"}).haiku.title, 
  		line_1: Rooms.findOne({title: "Room 1"}).haiku.line_1, 
  		line_2: Rooms.findOne({title: "Room 1"}).haiku.line_2, 
  		line_3: Rooms.findOne({title: "Room 1"}).haiku.line_3, 
  		created_at: new Date()});

  	Rooms.update({_id: docId},
			{$set: {
				"haiku.title": "Title Test 1",
				"haiku.line_1": "Line 1: ",
				"haiku.line_2": "Line 2: ",
				"haiku.line_3": "Line 3: ",
				"haiku.line_1_counter": 0,
				"haiku.line_2_counter": 0,
				"haiku.line_3_counter": 0,
				"haiku.created_at": new Date()
			}}
	);

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

    Meteor.call('inputWord', inpText); 
    event.target.textInput.value = "";	
  }
});
