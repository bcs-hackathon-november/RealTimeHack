Session.set("roomTitle", "Title");
Session.set("roomLine1", "Line 1");
Session.set("roomLine2", "Line 2");
Session.set("roomLine3", "Line 3");

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
  	alert(line1.concat(" " + inpText));
  	var tempText = Session.get("roomLine1");
  	Session.set("roomLine1", tempText + " " + inpText);
  }
});
