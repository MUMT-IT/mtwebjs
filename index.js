var express = require('express')
var app = express()

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'})
// var formidable = require('formidable')

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 5500)

app.use(function(req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1'
    next()
})

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
    res.render('index')
})

app.get('/academics/programs', function(req, res){
    res.render('academics/programs')
})

app.get('/academics/students', function(req, res){
    res.render('academics/students')
})

app.use(require('body-parser')())
app.get('/newsletter', function(req, res){
    // we will provide a csrf dummy value for now
    res.render('newsletter', {csrf: 'CSRF token goes here'})
})

// app.post('/process', function(req, res) {
//     console.log('Form (from querystring): ' + req.query.form)
//     console.log('CSRF token (from hidden field): ' + req.body._csrf)
//     console.log('Name (from visible form field): ' + req.body.name)
//     console.log('Email (from visible form field): ' + req.body.email)
//     res.redirect(303, '/thank-you')
// })

// custom 404 page
app.use(function(req, res) {
    res.status(404)
    res.render('404')
})

// custom 500 page
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' +
               app.get('port') + '; press Ctrl-C to terminate.')
})
