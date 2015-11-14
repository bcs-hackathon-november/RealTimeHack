Router.configure({
    layoutTemplate: 'Home'
});

Router.route('/', function () {
  name: 'main'
  this.render('main');
});

Router.route('/room', function () {
  this.render('room');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/haiku', function () {
  this.render('haiku');
});
