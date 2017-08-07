var fs = require('fs');


var cssfile;
var jsfile ;
var htmlfile;

fs.readFile('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/1.7/mochawesome-report/assets/app.js', 'utf8', function(err, data) {
    if (err) throw err;
    jsfile = data;

    fs.readFile('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/1.7/mochawesome-report/assets/app.css', 'utf8', function(err, data) {
        if (err) throw err;
        cssfile = data;

        fs.readFile('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/1.7/mochawesome-report/mochawesome.html', 'utf8', function(err, data) {
            if (err) throw err;
            htmlfile = data;

            processFile();

        });

    });

});

function  processFile () {
    jsfile="<script type='text/javascript'>"+jsfile+"</script></body>";
    cssfile="<style type='text/css'>"+cssfile+"</style>";

    htmlfile = htmlfile.replace('<link rel="stylesheet" href="assets/app.css"/>', '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'+cssfile);
    htmlfile = htmlfile.replace('</body>', jsfile);

    fs.writeFile("rapport_test.html", htmlfile, function(err) {

        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

}