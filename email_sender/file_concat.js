var fs = require('fs');



var i =0 ;
var Version = new Array();
Version = [1.6,1.7];

while (i < 2) {

// Verify the existence of Mocha Reporter
    if (fs.existsSync('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+Version[i]+'/mochawesome-report')) {
        var cssFile = '';
        var jsFile = '';
        var htmlFile= '';

        console.log(Version[i])

        // concatenate css and js files in a single html file
        function  processFile () {
            jsFile="<script type='text/javascript'>"+jsFile+"</script></body>";
            cssFile="<style type='text/css'>"+cssFile+"</style>";

            htmlFile = htmlFile.replace('<link rel="stylesheet" href="assets/app.css"/>', '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'+cssFile);
            htmlFile = htmlFile.replace('</body>', jsFile);
            fs.writeFile("email_sender/rapport_test_"+Version[i]+".html", htmlFile, function(err) {

                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });

        }

        // read content of Js file
        jsFile = fs.readFileSync('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+Version[i]+'/mochawesome-report/assets/app.js').toString();

        // read content of CSS file
        cssFile = fs.readFileSync('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+Version[i]+'/mochawesome-report/assets/app.css').toString();

        // read content of Html file
        htmlFile = fs.readFileSync('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+Version[i]+'/mochawesome-report/mochawesome.html').toString();

        processFile();

        i++;
    }else{
        i++
    }

}


