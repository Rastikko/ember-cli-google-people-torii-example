import Ember from 'ember';

export default Ember.Controller.extend({

	logged: false,

	isLoggedIn: function() {		
		return this.get("logged");
	}.property("logged")

});
