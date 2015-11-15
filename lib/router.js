Router.configure({
    layoutTemplate: 'Home'
});

Router.route('/', function () {
  name: 'main'
  this.render('mainTemplate');
});

Router.route('/room/:id', function () {
  var room = Rooms.findOne(new Meteor.Collection.ObjectID(this.params._id));
  this.render('room', {data: room});
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/haiku/:_id', function () {
	var haiku = Haikus.findOne({_id: this.params._id});
	this.render('haikuTemplate', {data: haiku});
});
