const { Client } = require('pg')

let client = {}

function connect () {
    client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'queueioDB',
        user: 'postgres',
        password: 'postgres'
    })

    client.connect((error) => {
        if (error) {
            throw error
        }
    })
}

function query (query, values, resultCallback) {
    client.query(query, values, (error, result) => {
        if (error) {
            throw error
        }
        console.log(result)
        resultCallback(result)
    })
}

function disconnect () {
    client.end()
}

module.exports = {
    connect: connect,
    disconnect: disconnect,
    query: query
}
