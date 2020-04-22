const express = require('express');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();
// get all todos

app.get('/api/stores', (req, res) => {
  const {
      query: {missing },
      method,
  } = req

  switch (method) {
    case 'GET':
        // Get data from your database
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

        break
    case 'POST':
        // Update or create data in your database
        const { body } = req;
        const store =   prisma.store.create({ data: {
            storename: body.storename,
            location: body.location,
            coordinates: body.coordinates,
            date: new Date(),
            Item: {
            create: body.items,
            },
        }});

        res.status(200).json(store);
        break
    default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});