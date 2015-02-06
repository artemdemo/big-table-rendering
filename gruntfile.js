module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['components/ts/*.ts'],
                dest: 'js',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    basePath: 'components/ts',
                    sourceMap: true,
                    declaration: true
                }
            }
        },
        watch: {
            typescript: {
                files: [
                    'components/ts/*.ts'
                ],
                tasks: ['typescript'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default tasks
    grunt.registerTask('default', ['typescript', 'watch']);
};