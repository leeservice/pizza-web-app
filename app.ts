import exp = require("constants");
import { Request, Response } from "express"

const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');

//config nunjucks
const appViews = path.join(__dirname, '/views');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    // express is a middleware - that's .app .set -> it helps us set, use and configure nunjucks
    express: app
};

// set up nunjucks as template engine - describes how to generate html
nunjucks.configure(appViews,nunjucksConfig);

// config express and have app listen on port 3000
app.set('view engine', 'html');
app.use('/public',express.static(path.join(__dirname,'/public')));

// allows your route to process the request body being returned by forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express routes to render the pizza.html file
app.get('/', (req: Request, res: Response) => {
    res.render('pizza', { 
        title: 'Lee Service Pizza Time',})
});

app.listen(3000, ()=> {
    console.log('Server listening on port 3000')
});

// update this every time we need a controller
require ('./controller/productController') (app);
require ('./controller/orderController') (app);