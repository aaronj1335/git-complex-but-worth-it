var fs = require('fs');

/* global module:false */
module.exports = function(grunt) {
  var port = grunt.option('port') || 8000;
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    cssmin: {
      compress: {
        files: {
          'css/reveal.min.css': ['css/reveal.css']
        }
      }
    },

    sass: {
      main: {
        files: {
          'css/theme/default.css': 'css/theme/source/default.scss',
          'css/theme/beige.css': 'css/theme/source/beige.scss',
          'css/theme/night.css': 'css/theme/source/night.scss',
          'css/theme/serif.css': 'css/theme/source/serif.scss',
          'css/theme/simple.css': 'css/theme/source/simple.scss',
          'css/theme/sky.css': 'css/theme/source/sky.scss',
          'css/theme/moon.css': 'css/theme/source/moon.scss',
          'css/theme/solarized.css': 'css/theme/source/solarized.scss'
        }
      }
    },

    jshint: {
      options: JSON.parse(fs.readFileSync('.jshintrc')),
      files: ['Gruntfile.js']
    },

    connect: {
      server: {
        options: {
          host: 'localhost',
          port: port,
          base: '.'
        }
      }
    },

    zip: {
      'reveal-js-presentation.zip': [
        'index.html',
        'css/**',
        'js/**',
        'lib/**',
        'images/**',
        'plugin/**'
      ]
    },

    watch: {
      main: {
        files: ['Gruntfile.js', 'js/reveal.js', 'css/reveal.css'],
        tasks: 'default'
      },
      theme: {
        files: ['css/theme/source/*.scss', 'css/theme/template/*.scss'],
        tasks: 'themes'
      }
    }

  });

  // Dependencies
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-zip');

  // Default task
  grunt.registerTask('default', ['jshint', 'cssmin']);

  // Theme task
  grunt.registerTask('themes', ['sass']);

  // Package presentation to archive
  grunt.registerTask('package', ['default', 'zip']);

  // Serve presentation locally
  grunt.registerTask('serve', ['connect', 'watch']);
};

