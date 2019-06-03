var fs = require("fs");

function readFiles(dirname, prefix) {
  fs.readdir(dirname, function(err, filenames) {
    filenames.forEach(function(filename) {
      console.log('  "' + prefix + filename + '",');
    });
  });
}

readFiles("./dist/static/js/", "/static/js/");
readFiles("./dist/static/css/", "/static/css/");
readFiles("./dist/static/media/", "/static/media/");
