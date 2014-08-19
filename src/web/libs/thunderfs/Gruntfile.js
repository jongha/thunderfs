"use strict";

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON("thunderfs.json"),
    name: "thunderfs",
    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
      "<%= grunt.template.today('yyyy-mm-dd') %>\n" +
      "<%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
      "* Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;" +
      " Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n",
    // Task configuration.
    clean: {
      files: ["dist"]
    },
    uglify: {
      options: {
        banner: "<%= banner %>"
      },
      dist: {
        src: "src/js/<%= name %>.js",
        dest: "dist/js/<%= name %>.min.js"
      }
    },
    cssmin: {
      options: {
        banner: "<%= banner %>"
      },
      dist: {
        src: "dist/css/<%= name %>.css",
        dest: "dist/css/<%= name %>.min.css"
      }
    },
    qunit: {
      files: ["test/**/*.html"],
      options: {
        coverage: {
          src: ["src/**/*.js"],
          instrumentedFiles: "temp/",
          lcovReport: "report/coverage"
        }
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: ".jshintrc"
        },
        src: "Gruntfile.js"
      },
      src: {
        options: {
          jshintrc: "src/.jshintrc"
        },
        src: ["src/**/*.js"]
      },
      test: {
        options: {
          jshintrc: "test/.jshintrc"
        },
        src: ["test/**/*.js"]
      },
    },
    shell: {
      coverall: {
        command: "node_modules/coveralls/bin/coveralls.js < report/coverage/lcov.info"
      }
    },
    watch: {
      gruntfile: {
        files: "<%= jshint.gruntfile.src %>",
        tasks: ["jshint:gruntfile"]
      },
      src: {
        files: "<%= jshint.src.src %>",
        tasks: ["jshint:src", "qunit"]
      },
      test: {
        files: "<%= jshint.test.src %>",
        tasks: ["jshint:test", "qunit"]
      },
    },
    less: {
      development: {
        options: {
          paths: ["dist/css"]
        },
        files: {
          "dist/css/<%= name %>.css": "src/less/<%= name %>.less"
        }
      },
      production: {
        options: {
          paths: ["dist/css"],
          cleancss: true,
          modifyVars: {
          /*
            imgPath: '"http://mycdn.com/path/to/images"',
            bgColor: 'red'
          */
          }
        },
        files: {
          "dist/css/<%= name %>.css": "src/less/<%= name %>.less"
        }
      }
    }   
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-qunit-istanbul");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  
  // Default task.
  grunt.registerTask("default", ["jshint", "qunit", "clean", "uglify", "less", "cssmin"]);

  // Travis task.
  grunt.registerTask("travis", ["jshint", "qunit", "shell:coverall"]);
};
