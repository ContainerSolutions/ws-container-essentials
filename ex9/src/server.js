/*
 * Demo NodeJS app
 */

http = require("http");

http.createServer(function(req, res) {

    var fs = require("fs");
    var yaml = require("js-yaml");
    var connect = require("connect");
    var serveStatic = require("serve-static");
    var finalhandler = require("finalhandler");
    var multiparty = require("multiparty");

    if (req.method == "GET") {
        // serve GET requests from the "public/" directory
        serveStatic("public")(req, res, finalhandler(req, res));

    } else if (req.method == "POST") {
        // consider POST requests as uploads

        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {

            userYaml = fields["yaml"][0];

            // check YAML for validity, show error message of invalid
            try {
                yaml.load(userYaml);
            } catch (e) {
                console.log(e);
                userYaml = "Invalid YAML!";
            }

            // load template for showing YAML with syntax highlighting...
            var html = fs.readFileSync("public/pretty.html", "utf8");
            // ... and replace placeholder with uploaded YAML
            html = html.replace("<!-- pretty-yaml-here -->", userYaml)

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);

        });
    }
}).listen(1337);

console.log("Up and running...");
