Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('singleUser', function() {
	return Meteor.users.find(userId);
})