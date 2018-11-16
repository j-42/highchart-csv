module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {},
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/main.css': 'css/scss/main.scss',
        }
      }
    },
    jshint: {
      files: ['js/*.js'],
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['index.html'],
      },
      data: {
          files: ['data/**/*.csv'],
          tasks: ['data'],
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['jshint'],
      },
      sass: {
        options: {
          livereload: false,
        },
        files: ['css/scss/**/*.scss'],
        tasks: ['sass'],
      },
      css: {
        files: ['css/**/*.css'],
      },
    },
  });

  // Actually running things.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-notify');

  // Default task(s).
  grunt.registerTask('default', ['connect', 'watch']);

};
