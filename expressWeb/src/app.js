const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Paths
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// Set view engine and paths
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path); // Register all partials from the directory

// Serve static files
app.use(express.static(static_path));

// Routing
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/about', (req, res) => {
    res.render("about");
});

app.get('/weather', (req, res) => {
    res.render("weather"); // Ensure you have a 'weather.hbs' template
});

app.get('/moreInfo', (req, res)=> {
    res.render('moreInfo')
})


app.get('*', (req, res) => {
    res.render("404error"); // Ensure you have a '404.hbs' template
});


// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});








