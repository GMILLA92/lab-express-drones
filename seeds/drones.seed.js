// Iteration #1
const mongoose = require("mongoose")
const Drone = require("../models/Drone.model")

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

const drones = [
  {
    name: "Pablo drone",
    propellers: 4,
    maxSpeed: 26
  },
  {
    name: "Apple drone",
    propellers: 4,
    maxSpeed: 20
  },
  {
    name: "Papaya drone",
    propellers: 4,
    maxSpeed: 19
  }
];


const createDrone = async function() {
  try {
    const connect = await mongoose.connect(MONGO_URI)
    console.log(`Connected to database: ${connect.connections[0].name}`)
    const deleteAll = await Drone.deleteMany()
    console.log("Db clean")
    const dbDrones = await Drone.create(drones)
    console.log(`${dbDrones.length} - drones created `)
    const dbClose = await mongoose.connection.close()
    console.log("Connection closed")
  }catch (err) {
    console.log(`Error creating the seeds: ${err}`)
  }
}

createDrone()