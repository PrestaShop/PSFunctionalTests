var fs = require('fs');



var i =0 ;
var Version = new Array();
Version = [1.6,1.7];






while (i < 2) {

// Verify the existence of Mocha Reporter
    if (fs.existsSync('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+Version[i]+'/mochawesome-report')) {
        var cssfile = '';
        var jsfile = '';
        var htmlfile= '';

        console.log(Version[i])

        // concatenate css and js files in a single html file
        function  processFile () {
            jsfile="<script type='text/javascript'>"+jsfile+"</script></body>";
            cssfile="<style type='text/css'>"+cssfile+"</style>";

            htmlfile = htmlfile.replace('<link rel="stylesheet" href="assets/app.css"/>', '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'+cssfile);
            htmlfile = htmlfile.replace('</body>', jsfile);
            fs.writeFile("email_sender/rapport_test_"+Version[i]+".html", htmlfile, function(err) {

                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });

        }


        // read content of Js file
        jsfile = fs.readFileSync('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+Version[i]+'/mochawesome-report/assets/app.js').toString();

        // read content of CSS file
        cssfile = fs.readFileSync('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+Version[i]+'/mochawesome-report/assets/app.css').toString();

        // read content of Html file
        htmlfile = fs.readFileSync('/home/travis/build/fouratachour/PSFunctionalTests/test/itg/'+Version[i]+'/mochawesome-report/mochawesome.html').toString();

        processFile();

        i++;
    }else{
        i++
    }

}


