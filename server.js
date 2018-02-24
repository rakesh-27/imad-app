var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var counter = 0;
app.get('/counter', function(req, res){
   counter = counter + 1;
   res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res){
    var name = names.query.name;
    names.push[name];
    res.send(JSON.stringify(names));
});


app.get('/:articleName', function(req, res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
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
