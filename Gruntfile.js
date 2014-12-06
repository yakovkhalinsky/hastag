var path = require('path');

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        less: {
            styles: {
                files: {
                    'public/css/styles.css': 'less/styles.less'
                }
            }
        },
        watch: {
            less: {
                files: ['less/**/*.less'],
                tasks: ['less:styles']
            },
            grunt: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    watch: ['index.js']
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['watch', 'nodemon'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['less'])
    grunt.registerTask('dev', ['less', 'concurrent']);

};
