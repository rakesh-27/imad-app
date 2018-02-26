var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pq').Pool;

var app = express();
app.use(morgan('combined'));


var config = {
    user: 'rockeshkumawath26',
    database: 'rockeshkumawath26',
    host: 'db.imad.hasura-app.io:5432',
    port: '5432',
    password: process.env.DB_PASSWORD
};



var articles = {
    'article-one': {
        title: 'Article-1 | Rakesh',
        heading: 'Article One',
        content: `
        <p>This a line about article one.</p>
        <p>This a line about article one.</p>
        `
    },
    'article-two': {
        title: 'Article-2 | Rakesh',
        heading: 'Article Two',
        content: `
        <p>This a line about article two.</p>
        <p>This a line about article two.</p>
        `
    },
    'article-three': {
        title: 'Article-3 | Rakesh',
        heading: 'Article Three',
        content: `
        <p>This a line about article three.</p>
        <p>This a line about article three.</p>
        `
    }

}

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
    <html>
    <head>
    <title>${title}</title>
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <h1>${heading}</h1>
    ${content}
    <a href="/">Home</a>
    </body>
    </html>
    
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/articles/:articleName', function(req, res){
    pool.query("SELECT * FROM ARTICLES WHERE TITLE = $1", [req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            if(result.rows.length === 0){
                res.status(404).send("Article not found");
            } else {
                var articleData = result.row[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});
// This can be hacked like this: /articles/';delete where 'a'='a 
// so we need to use parametized input. i.e., it will take ';delete...' as an article name


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names = [];
app.get('/submit-name', function(req, res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});


var counter = 0;
app.get('/counter', function(req, res){
   counter = counter + 1;
   res.send(counter.toString());
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
