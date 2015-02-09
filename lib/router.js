
//	LAYOUT TEMPLATE AS DEFAULT LAYOUT FOR ALL ROUTES
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  loginFormTemplate: 'loginForm',
  //Give visual feedback that something is happening
   waitOn: function() { return Meteor.subscribe('posts'); }

});

//Defines a new route and maps it to the root/path
Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
	name: 'postPage',
	data: function() { return Posts.findOne(this.params._id); }
});

//Define route for new Page
Router.route('/submit', {name: 'postSubmit'});
//...
var requireLogin = function() {
  if (! Meteor.user()) {
     if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}
//Valid routes but invalid :_id leads to dataNotfound
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});