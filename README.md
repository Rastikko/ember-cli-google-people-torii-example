# Ember-cli-google-people-torii-example

Here an example of how to create an ember provider to grab the email information of google oauth.

```javascript
actions: {
     login: function(){
      var self = this;
      this.get('torii').open('google-people').then(function(authorization){
        self.controller.set("logged", true);
        self.controller.set("userEmail", authorization.email);
      });
	}
}
```

Base on https://github.com/Frozenfire92/EmberAuthTutorial