import { MongoClient } from "mongodb";

// %40 = @
const url = 'mongodb+srv://filewalker:dxu7mbp1pqw_DZR%40enj@cluster0.fpmyd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const testWithCallbacks = (callback) => {
    console.log(`\n_-*>> testWithCallbacks <<*-_`)
    const client = new MongoClient(url, { useNewUrlParser: true})

    client.connect((err, client) => {
        if (err) {
            callback(err)
            return
        }

        console.log(`🚀 Connected to MongoDB 🚀`)
        
        const db = client.db()
        const collection = db.collection('issuetracker.employees')
    
        const employee = { id: 6, name: 'Dschingis Khan', age: 50 }
    
        collection.insertOne(employee, (err, result) => {
            if (err) {
                console.log(`Error -> Emergency Kill!`)
                client.close()
                callback(err)
                return
            }
            
            console.log(`Result ID of insert ->\n${result.insertedId}`)
    
            collection.find({ _id: result.insertedId})
                .toArray((err, docs) => {
                    if (err) {
                        console.log(`Error -> Emergency Kill!`)
                        callback(err)
                        return
                    }

                    // Stringify for Console
                    const showJson = JSON.stringify(docs, null, " ")
                    console.log(`Result of find ->\n${showJson} `)

                    console.log(`Job done - Time to die :(`)
                    client.close()
                    callback(err)
                })
        })
    })
}

const testWithAsync = async () => {
    console.log(`\n_-*>> testWithAsync <<*-_`)
    const client = new MongoClient(url, { useNewUrlParser: true})

    try {
        await client.connect()
        console.log(`🚀 Connected to MongoDB 🚀`)

        const db = client.db()
        const collection = db.collection('issuetracker.employees')
    
        const employee = { id: 7, name: 'Kublai Khan', age: 50 }

        const result = await collection.insertOne(employee)
        console.log(`Result ID of insert ->\n${result.insertedId}`)

        const docs = await collection.find({ _id: result.insertedId })
            .toArray()
        // Stringify for Console
        const showJson = JSON.stringify(docs, null, " ")
        console.log(`Result of find ->\n${showJson} `)
    } catch(err) {
        console.log(err)
    } finally {
        console.log(`Job done - Time to die :(`)
        client.close()
    }
}

testWithCallbacks((err) => {
    err
    ? console.log(err)
    : testWithAsync()
})