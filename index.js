var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});


app.get('/api/stores', (req, res) => {
    const {
        query: {missing },
        method,
    } = req

    switch (method) {
        case 'GET':
            prisma.store.findMany({ where: 
                { 
                    Item: {
                        some: 
                            {item: missing} 
                    } 
                }
            }).then(results => {
                res.status(200).json(results)
            })
            break;
        case 'POST':
            res.send(JSON.stringify({ Hello: 'POST'}));
            break;
        default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
});  

app.listen(port, function () {
 console.log('Example app listening on port !');
});