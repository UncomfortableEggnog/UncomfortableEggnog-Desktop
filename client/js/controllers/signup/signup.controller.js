(function () {
  'use strict';
  angular.module('app')
    .controller('SignUpCtrl', SignUpCtrl);

  SignUpCtrl.$inject = ['ApiFactory', "$state", '$scope', 'SignUpFactory'];

  function SignUpCtrl (ApiFactory, $state, $scope, SignUpFactory) {
    var self = this;

    // self.fields.password.strength = 0;

    self.fields = {
      "email": {
        required: true,
        value: ''
      },
      "website": {
        required: false,
        value: ''
      },
      "first name": {
        required: true,
        value: ''
      },
      "last name": {
        required: true,
        value: ''
      },
      "username": {
        required: true,
        value: ''
      },
      "password": {
        required: true,
        value: '',
        strength: 0
      },
      "password repeat": {
        required: false,
        value: ''
      }
    };

    self.errorMessages = {
      website: 'Please enter a valid URL (Did you prefix your website with http://?).',
      email: 'Invalid email address.',
      minlength: 'Username is too short (4 to 12 characters allowed)',
      maxlength: 'Username is too long (4 to 12 characters allowed)',
      pattern: 'Please only use letters, numbers, and/or underscores in your username (no whitespaces allowed).',
      password: 'Your password did not match.'
    };

    self.isPassStrengthStrong = function () {
      return self.fields.password.strength > 70;
    };
    self.isPassStrengthGood = function () {
      return self.fields.password.strength > 30 && self.fields.password.strength <= 70;
    };
    self.isPassStrengthWeak = function () {
      return self.fields.password.strength <= 30;
    };

    self.post = function () {
      ApiFactory.post('/signup', {
        username: self.fields.username.value,
        password: self.fields.password.value
      }).then(function (result) {
        if (result.error) {
          self.errorList = [result.error];
// =======
          self.fields.username.value = '';
          self.fields.password.value = '';
        // if (result.errorType === 'username') {
          // console.log(result.error);
          // self.usernameError = result.error;
          console.log('error: ', result.error);
        } else if (result.token) {
          // Should return with a token
            // if token, store it in local
            // if username, store that in local as well
          localStorage.setItem('token', result.token);
          localStorage.setItem('username', result.username);
          // Redirect to userPackages page
          $state.go('userPackages', {userName: result.username});
        } else {
          $state.go('login');
          // if for some reason no token, redirect to login
        }
      });
    };

    $scope.$watch('su.fields.password.value', function (pass) {
      var strength = SignUpFactory.getPasswordStrength(pass);
      self.fields.password.strength = strength;
    });


    self.validateAndPost = function () {
      var validated = true;
      self.errorList = [];
      $scope.signupForm.$setDirty(true);
          for (var key in self.fields) {
            var field = self.fields[key];
            if (field.required) {
              console.log(field.value);
              if (!field.value) {
            $scope.signupForm[key].$dirty = true;
                self.errorList.push('Please enter your ' + key + '.');
                // self.field[]
                validated = false;
              }
            }
          }
      if (validated) {
        self.post();
      }
    };

    self.isInputInvalid = function (input) {
      return input.$dirty && input.$invalid;
    };

    self.isInputValid = function (input) {
      return input.$dirty && input.$valid && !(input.$error.minlength);
    };

    self.setPristine = function (field) {
      if (field.$$lastCommittedViewValue === '') {
        field.$setPristine();
      }
    };

  }
})();
