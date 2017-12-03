module.exports = function(grunt) {

  //configuration
  grunt.initConfig({
    concat: {
      js: {
        src: ['src/js/one.js', 'src/js/two.js', 'src/js/three.js'],
        dest: 'script.js'
      }
    },
    sass: {
      dist: {
        files: [{
          src: 'src/css/sass/styles.scss',
          dest: 'src/css/styles.css'
        }]
      }
    },
    uglify: {
      build: {
        files: [{
          src: 'script.js',
          dest: 'script.min.js'
        }]
      }
    },
    cssmin: {
      build: {
        files: [{
          src: 'src/css/styles.css',
          dest: 'style.min.css'
        }]
      }
    },
    watch: {
      files: ['src/css/sass/styles.scss'],
      tasks: ['sass','cssmin']
    }
  }); //end initConfig

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sass'); // this package doesn't require ruby
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //register Tasks - run just one plugin
  grunt.registerTask('concat-js',['concat:js']);

}; //end exports
