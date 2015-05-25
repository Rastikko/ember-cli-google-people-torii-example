import Ember from 'ember';

export default Ember.Route.extend({

	actions: {
         login: function(){
	      var self = this;
	      this.get('torii').open('google-people').then(function(authorization){
	        self.controller.set("logged", true);
	        self.controller.set("userEmail", authorization.email);
	      });
    	}
	}

});
