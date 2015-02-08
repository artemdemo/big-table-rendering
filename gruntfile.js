module.exports = function(grunt) {

    grunt.initConfig({
        exec: {
            tsPublic: { cmd: 'tsc components/ts/*.ts -outDir js/ -t ES5 --sourceMap -d'}
        },
        watch: {
            typescript: {
                files: [
                    'components/ts/*.ts'
                ],
                tasks: ['exec:tsPublic'],
                options: { livereload: true }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');


    // Default tasks
    grunt.registerTask('default', ['exec:tsPublic', 'watch']);
};