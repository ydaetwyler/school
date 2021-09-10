/**
 * To run with mongo shell
 * Supply connection string in shell
 * Atlas -> 
 * mongosh mongodb+srv://filewalker:dxu7mbp1pqw_DZR%40enj@cluster0.fpmyd.mongodb.net/myFirstDatabase scripts/init.mongo.mjs
 */

db.issues.remove({})

const issuesDB = [
    {
        id: 1, status: 'New', owner: 'Jason', effort: 5,
        created: new Date('2021-09-09'), due: undefined,
        title: 'Error while Error in Error'
    },
    {
        id: 2, status: 'Assassinated', owner: 'R2D2', effort: 14,
        created: new Date('2021-09-10'), due: new Date('2021-09-20'),
        title: 'Missing fall protection on (flat) earth'
    }
]

db.issues.insertMany(issuesDB)
const count = db.issues.count()
print('Inserted', count, 'issues')

db.counters.remove({ _id: 'issues' })
db.counters.insert({ _id: 'issues', current: count })

db.issues.createIndex({ id: 1 }, { unique: true })
db.issues.createIndex({ status: 1 })
db.issues.createIndex({ owner: 1 })
db.issues.createIndex({ created: 1 })