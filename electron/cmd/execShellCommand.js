var exec = require('child_process').exec;

module.exports = function (shellCommand) {
  exec(shellCommand, function (error, stdout, stderr) {
    if (error) {
      console.log(error);
      throw new Error(error);
    }
  });
};
