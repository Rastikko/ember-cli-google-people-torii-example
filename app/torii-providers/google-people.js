//app/torii-providers/google-token.js
import {configurable} from 'torii/configuration';
import Oauth2Bearer from 'torii/providers/oauth2-bearer';

var GooglePeople = Oauth2Bearer.extend({
  name: 'google-people',
  baseUrl: 'https://accounts.google.com/o/oauth2/auth',

  // additional params that this provider requires
  requiredUrlParams: ['state'],
  optionalUrlParams: ['scope', 'request_visible_actions', 'access_type'],

  requestVisibleActions: configurable('requestVisibleActions', ''),

  accessType: configurable('accessType', ''),

  responseParams: ['token'],

  scope: configurable('scope', 'email'),

  state: configurable('state', 'STATE'),

  redirectUri: configurable('redirectUri',
                            'http://localhost:8000/oauth2callback'),
  open: function(){

      var name        = this.get('name'),
          url         = this.buildUrl(),
          redirectUri = this.get('redirectUri'),
          responseParams = this.get('responseParams');

          console.log(url);

      var client_id = this.get('client_id');

      return this.get('popup').open(url, responseParams).then(function(authData){

        var missingResponseParams = [];


        responseParams.forEach(function(param){
          if (authData[param] === undefined) {
            missingResponseParams.push(param);
          }
        });

        if (missingResponseParams.length){
          throw "The response from the provider is missing " +
                "these required response params: " + responseParams.join(', ');
        }

        return Ember.$.get("https://www.googleapis.com/oauth2/v1/tokeninfo", {access_token: authData.token}).then(function(user){
          return {
            email: user.email
          };
        });
      });
    }
});

export default GooglePeople;