const { rejects } = require('assert');
const { query } = require('express');
const express = require('express')
const mysql = require('mysql')

const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodeappdb'
}

const connection = mysql.createConnection(config);

const app = express()

app.get('/', (req, res, next) => {
    const sql = `SELECT name FROM people`

    let finalResults = []

    connection.query(sql, 
    function (err, results, fields) {
        if (err) throw err;
        else console.log('Selected ' + results.length + ' row(s).');
        for (i = 0; i < results.length; i++) {
            console.log('Row: ' + JSON.stringify(results[i]));
            finalResults.push(JSON.stringify(results[i]));
        }

        console.log("final results: " + finalResults)

        res.send(`<h1>Full Cycle Rocks!</h1> <p>${finalResults}</p>`)
    })
})

app.get("/cadastro/:name", (req, res) => {
    try {
        const sql = `INSERT INTO people(name) values('${req.params.name}')`
        connection.query(sql)

        res.send(`<h2>Nome: ${req.params.name} foi inserido com sucesso!</h2>`);        
    } catch (error) {
        res.send('<h2>Ocorreu um erro na inserção do nome!</h2>');
    }
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
