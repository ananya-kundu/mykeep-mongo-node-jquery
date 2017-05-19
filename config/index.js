
var errors = {
  "validationSchema": {
    "signup": {
      "userName": { in: "body",
        notEmpty: {
          errorMessage: 'employeeFirstName field is require & cannot be blank.'
        },
        isAlpha: {
          errorMessage: 'employeeFirstName field Must Be Alphabet.'
        }
      },
      "mobileNo": { in: "body",
        notEmpty: {
          errorMessage: 'mobileNo field is require & cannot be blank.'
        },
      },
      "email": { in: "body",
        notEmpty: {
          errorMessage: 'email field is require & cannot be blank.'
        },
        isEmail: {
          errorMessage: 'Email field must have valid format.'
        }
      },

      "password": { in: "body",
        notEmpty: {
          errorMessage: 'password field is require & cannot be blank.'
        }
      }
    },
    "login": {
      "email": { in: "body",
        notEmpty: {
          errorMessage: 'email field is require & cannot be blank.'
        },
        isEmail: {
          errorMessage: 'Email field must have valid format.'
        }
      },
      "password": { in: "body",
        notEmpty: {
          errorMessage: 'password field is require & cannot be blank.'
        }
      }
    },

    checkSystemErrors: function(err) {
      return err instanceof TypeError ||
        err instanceof SyntaxError ||
        err instanceof EvalError ||
        err instanceof RangeError ||
        err instanceof ReferenceError;
    }
  }
}

var defaultResult = {
  "status": false,
  "message": "Something Bad Happened. Please contact system administrator."
};

module.exports = errors;

/////////////////////////
//  req.checkBody("firstName", "Enter a valid firstName").optional().matches(/^[A-Za-z]+$/);
// req.checkBody("password", "Enter a valid create password").optional().matches(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z]*[A-Z])(?=.*[@#$%&_]).*$/);
