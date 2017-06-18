import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import * as express from 'express';
import * as colors from 'colors';
var packageJson = require('../package.json');

let app = express();

app.use((req, res) => {
    fs.readFile(path.join(__dirname, './index.html'), 'utf8', (error, data) => {
        const result = data.replace(/\$\{css\}/g, '').replace(/\$\{js\}/g, 'http://localhost:8080/bundle.js');
        res.status(200).send(result);
    });
});

app.listen(4000, '0.0.0.0', function () {
    console.log(colors.green(`${packageJson.name} at http://localhost:4000/`));
});