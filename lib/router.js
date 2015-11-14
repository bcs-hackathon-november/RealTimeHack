Router.configure({
    layoutTemplate: 'Home'
});

Router.route('/', function () {
  name: 'main'
  this.render('mainTemplate');
});

Router.route('/room', function () {
  this.render('room');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/haiku/:_id', function () {
	var haiku = Haikus.findOne(new Meteor.Collection.ObjectID(this.params._id));
	this.render('haikuTemplate', {data: haiku});
});
