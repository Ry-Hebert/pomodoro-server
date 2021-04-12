require('dotenv').config()

const Express = require('express')
const Mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ProjectItems = require('./models/projects')

const server = new Express()

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

Mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

server.listen(process.env.PORT || 3001, () =>{
    console.log('Server is running')
})

server.use('/', Express.static('./src'))

server.get('/model/projects', (req, res) => {
    TodoL.find({}, (err, items) =>{

        if(err){console.log(handleError(err))}
        res.json(items)
    })
})

server.post('/model/projects', (req, res) => {
    console.log(req.query)
    
    let qData = []

    TodoL.find({}, (err, data) =>{
        if(err){console.log(err)}
        else{
            console.log(data)
            qData.push(data)
        }
    })

    console.log(`Find Test: ${qData}`)

    let catSize = qData.filter(item =>{
        return item.category === req.query.category
    })
    
    let catLength = catSize.length

    ProjectItems.create({
    name: req.query.name,
    complete: req.query.complete,
    subItem: req.query.subItem,
    subItemID: catLength + 1
    })

    res.sendStatus(200)
})

server.put('/model/projects/:id', (req, res) =>{
    TodoL.findById(req.params.id, (err, items) =>{
        if(err){console.log(handleError(err))}
        items.update(req.query, (err) =>{
            if(err){console.log(handleError(err))}
            TodoL.find({}, (err, itemsX) =>{
                if(err){console.log(handleError(err))}
                res.json(itemsX)
            })
        })
    })
})

server.delete('/model/projects/:id', (req, res) =>{
    console.log(`This is the delete route: ${req.params.id}`)
    TodoL.remove({id: req.params.id}, (err) => {
        if(err){console.log(handleError(err))}
        TodoL.find({}, (err, items) =>{
            if(err){console.log(handleError(err))}
            res.json(items)
        })
    })
})