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

function checkSyllables(word) {
	Algorithmia.client("sim5BKo8GlnVCZlnOKRjuX6z43F1")
           .algo("algo://WebPredict/Sylllables/0.1.0")
           .pipe(word)
           .then(function(output) {
             console.log(output);
	});
}

checkSyllables("hello");

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
				"haiku.line_1": "",
				"haiku.line_2": "",
				"haiku.line_3": "",
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

  	var docId = Rooms.findOne({title: "Room 1"})._id;
  	var tempText = "";
  	var count = 0;

  	// Rooms.update({_id: docId}, {$set: { haiku : { line_1: tempText + " " + inpText}}});
  	// Rooms.update({_id: docId}, {$set: { "haiku.line_1" : tempText + " " + inpText}});
  	if (Rooms.findOne({title: "Room 1"}).haiku.line_1_counter < 5) {
  		tempText = Rooms.findOne({title: "Room 1"}).haiku.line_1;
  		Rooms.update({_id: docId}, {$set: {"haiku.line_1" : tempText + " " + inpText}});
  		// count = Rooms.findOne({title: "Room 1"}).haiku.line_1_counter;
  		// count++;
  		event.target.textInput.value = "";
  		Rooms.update({_id: docId}, {$inc: {"haiku.line_1_counter": 1}});
  	} else if (Rooms.findOne({title: "Room 1"}).haiku.line_2_counter < 7) {
  		tempText = Rooms.findOne({title: "Room 1"}).haiku.line_2;
  		Rooms.update({_id: docId}, {$set: {"haiku.line_2" : tempText + " " + inpText}});
  		// count = Rooms.findOne({title: "Room 1"}).haiku.line_2_counter;
  		// count++;
  		event.target.textInput.value = "";
  		Rooms.update({_id: docId}, {$inc: {"haiku.line_2_counter": 1}});
  	} else if (Rooms.findOne({title: "Room 1"}).haiku.line_3_counter < 5) {
  		tempText = Rooms.findOne({title: "Room 1"}).haiku.line_3;
  		Rooms.update({_id: docId}, {$set: { "haiku.line_3": tempText + " " + inpText}});
  		// count = Rooms.findOne({title: "Room 1"}).haiku.line_3_counter;
  		// count++;
  		event.target.textInput.value = "";
  		Rooms.update({_id: docId}, {$inc: {"haiku.line_3_counter": 1}});
  	} else {
  		alert("Haiku is finished");
  		event.target.textInput.value = "";
  		return;
  	}
  }
});
