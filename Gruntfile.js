module.exports = function (grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        options: {
          reporter: 'nyan'
        },
        src: ['test/**/*.js']
      }
    },
    docco: {
      debug: {
        src: ['electron/**/*.js'],
        options: {
          output: 'docs/'
        }
      }
    },
    shell: {
      options: {
        stderr: false
      },
      build: {
        command: 'webpack .;electron-packager . Jarvis --platform=darwin --arch=x64 --version=0.35.4 --icon=./app/assets/icons/jarvis.icns --overwrite; cp ./app/assets/icons/jarvis.icns ./Jarvis-darwin-x64/Jarvis.app/Contents/Resources/atom.icns'
      },
      dev: {
        command: 'webpack .;NODE_ENV=DEV electron .;cat ./app/configCTRL/config.json > ./app/configCTRL/config-dev.json'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('docs', [
    'docco'
  ]);

  grunt.registerTask('build', [
    'shell:build'
  ]);
  grunt.registerTask('dev', [
    'shell:dev'
  ]);


};
