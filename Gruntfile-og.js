module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // read the package.json file so we know what packages we have
    pkg: grunt.file.readJSON('package.json'),
    // config options used in the uglify task to minify scripts
    uglify: {
      options: {
        // this adds a message at the top of the file with todays date to indicate build date
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/scripts.js',
        dest: 'scripts.min.js'
      }
    },
    // config options for the cssmin task to minify stylesheets
    cssmin: {
      minify: {
        src: 'src/css/style.css',
        dest: 'style.min.css'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that provides the "cssmin" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Uglify task
  grunt.registerTask('uglify', ['uglify']);
  // CSSMin task
  grunt.registerTask('cssmin', ['cssmin']);
  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);

};
