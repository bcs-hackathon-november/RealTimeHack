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

  	var docId = Rooms.findOne({title: "Room 1"})._id;
  	var tempText = "";
  	var count = 0;
    var workingText = JSON.stringify(inpText);

    HTTP.call( 'POST', 'https://api.algorithmia.com/v1/algo/WebPredict/Sylllables/0.1.0', {
      content: workingText,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Simple sim5BKo8GlnVCZlnOKRjuX6z43F1'
      }
    }, function( error, response ) {
      if ( error ) {
        console.log( error );
      } else {
        var result = JSON.parse(response.content).result;
        var wordCount = result.length;
        if (wordCount === 0) wordCount = 1;
        console.log(result);
        console.log(wordCount);
        
      // Rooms.update({_id: docId}, {$set: { haiku : { line_1: tempText + " " + inpText}}});
      // Rooms.update({_id: docId}, {$set: { "haiku.line_1" : tempText + " " + inpText}});
      if (Rooms.findOne({title: "Room 1"}).haiku.line_1_counter + wordCount <= 5) {
        tempText = Rooms.findOne({title: "Room 1"}).haiku.line_1;
        Rooms.update({_id: docId}, {$set: {"haiku.line_1" : tempText + " " + inpText}});
        // count = Rooms.findOne({title: "Room 1"}).haiku.line_1_counter;
        // count++;
        event.target.textInput.value = "";
        Rooms.update({_id: docId}, {$inc: {"haiku.line_1_counter": wordCount}});
      } else if (Rooms.findOne({title: "Room 1"}).haiku.line_2_counter + wordCount <= 7) {
        tempText = Rooms.findOne({title: "Room 1"}).haiku.line_2;
        Rooms.update({_id: docId}, {$set: {"haiku.line_2" : tempText + " " + inpText}});
        // count = Rooms.findOne({title: "Room 1"}).haiku.line_2_counter;
        // count++;
        event.target.textInput.value = "";
        Rooms.update({_id: docId}, {$inc: {"haiku.line_2_counter": wordCount}});
      } else if (Rooms.findOne({title: "Room 1"}).haiku.line_3_counter + wordCount <= 5) {
        tempText = Rooms.findOne({title: "Room 1"}).haiku.line_3;
        Rooms.update({_id: docId}, {$set: { "haiku.line_3": tempText + " " + inpText}});
        // count = Rooms.findOne({title: "Room 1"}).haiku.line_3_counter;
        // count++;
        event.target.textInput.value = "";
        Rooms.update({_id: docId}, {$inc: {"haiku.line_3_counter": wordCount}});
      } else {
        alert("Word or Haiku is too long!");
        event.target.textInput.value = "";
        return;
      }

      }
    });
  }
});
