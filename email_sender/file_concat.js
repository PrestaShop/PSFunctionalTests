var fs = require('fs');



var i =0 ;
var Version = new Array();
version = [1.6,1.7];

while (i < 2) {
    var cssfile = '';
    var jsfile = '';
    var htmlfile= '';
    console.log(version[i])

    // read the content of JS file
    fs.readFile('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+version[i]+'/mochawesome-report/assets/app.js', 'utf8', function(err, data) {
        if (err) throw err;
        jsfile = data;

        // read the content of CSS file
        fs.readFile('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+version[i]+'/mochawesome-report/assets/app.css', 'utf8', function(err, data) {
            if (err) throw err;
            cssfile = data;

            // read the content of HTML file
            fs.readFile('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+version[i]+'/mochawesome-report/mochawesome.html', 'utf8', function(err, data) {
                if (err) throw err;
                htmlfile = data;

                processFile();

            });

        });

    });


// Concatenation of all file in single HTML file [1.6]
    function  processFile () {
        jsfile="<script type='text/javascript'>"+jsfile+"</script></body>";
        cssfile="<style type='text/css'>"+cssfile+"</style>";

        htmlfile = htmlfile.replace('<link rel="stylesheet" href="assets/app.css"/>', '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'+cssfile);
        htmlfile = htmlfile.replace('</body>', jsfile);
        fs.writeFile("rapport_test_"+version[i]+".html", htmlfile, function(err) {

            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

    }




    i++;
}


