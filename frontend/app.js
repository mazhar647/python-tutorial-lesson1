const express = require("express");
let path = require("path");

let app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

const URL = process.env.BACKEND_URL || 'http://localhost:8000/api';

const fetch = (...args) => 
    import('node-fetch').then(({default:fetch}) => fetch(...args));

app.get('/', async function(req,res) {
    const options = {
        method:'GET'
    };
    fetch(URL, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));
    try {
        let response = await fetch(URL, options);
        response = await response.json();
        res.render('index', response)
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Internal server error.'});
    }
});

// Serve all files inside the public folder
// app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});