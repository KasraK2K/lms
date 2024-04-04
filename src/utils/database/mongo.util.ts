// Dependencies
import { MongoClient } from 'mongodb'
// Modules
import meditation from '#meditation'

const { mongodb: mongodbConfig } = meditation.config.database

const mongoClient: MongoClient = new MongoClient(mongodbConfig.url, mongodbConfig.options)

export const mongo = {
	mongoClient,
	database: (databaseName = mongodbConfig.database) => mongoClient.db(databaseName),
	collection: (collectionName = mongodbConfig.collection) => mongoClient.db(mongodbConfig.database).collection(collectionName),
}
