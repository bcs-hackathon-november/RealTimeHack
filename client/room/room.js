Session.set("roomTitle", "Title");
Session.set("roomLine1", "Line 1");
Session.set("roomLine2", "Line 2");
Session.set("roomLine3", "Line 3");

Session.set("roomLine1count", 0);
Session.set("roomLine2count", 0);
Session.set("roomLine3count", 0);

Template.room.helpers({
  'rooms': function () {
    return Rooms.find({});
  },

  'title' : function() {
  	return Session.get("roomTitle");
  },

  'line_1': function(){
  	return Session.get("roomLine1");
  },

  'line_2': function(){
  	return Session.get("roomLine2");
  },

  'line_3': function(){
  	return Session.get("roomLine3");
  },

  'users': function(){
  	return Meteor.users.find({});
  }
});

Template.room.events({
  'click #save' : function(){
  	alert("Saved!");
  	Haikus.insert({
  		title: Session.get("roomTitle"), 
  		line_1: Session.get("roomLine1"), 
  		line_2: Session.get("roomLine2"), 
  		line_3: Session.get("roomLine3"), 
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
  	var curLine;
  	if (Session.get("roomLine1count") < 5)
  		curLine = "roomLine1";
  	else if (Session.get("roomLine2count") < 7)
  		curLine = "roomLine2";
  	else if (Session.get("roomLine3count") < 5)
  		curLine = "roomLine3";
  	else
  		return;

  	var tempText = Session.get(curLine);
  	Session.set(curLine, tempText + " " + inpText);
  	var count = Session.get(curLine + "count");
  	count++;
  	Session.set(curLine + "count", count);
  }
});
