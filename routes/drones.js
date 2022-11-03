const express = require('express');
const { format } = require('morgan');
const { render } = require('../app');
const router = express.Router();
const Drone = require("../models/Drone.model")
// require the Drone model here

router.get('/drones', async (req, res, next) => {
  try{
    const dbDrones = await Drone.find()
    console.log(dbDrones)
    res.render("drones/list", { dbDrones }  )
  }catch(err){
    console.log(err)
  }
  
});

router.get('/drones/create', (req, res, next) => {
  res.render("drones/create-form.hbs")
});

router.post('/drones/create', async (req, res, next) => {
  try {
    const newDrone = await Drone.create(req.body)
    res.redirect("/drones")
  } catch(err){
    res.render("drones/create-form.hbs")
  }
  
});

router.get('/drones/:id/edit', async (req, res, next) => {
  const drone = await Drone.findById(req.params.id)
  res.render ("drones/update-form.hbs", drone)
});

router.post('/drones/:id/edit', async (req, res, next) => {
  try{
    const newDrone = await Drone.findByIdAndUpdate (req.params.id, req.body,)
    res.redirect("/drones")
  } catch(err){
    const drone = await Drone.findById(req.params.id)
    res.render("drones/update-form.hbs", drone)
  }
 
});

router.post('/drones/:id/delete', async (req, res, next) => {
  const droneId = req.params.id
  try{
    const droneDb = await Drone.findByIdAndDelete(droneId)
    console.log("Drone deleted")
    res.redirect("/drones")
  }catch(err){
    console.log(err)
  }
});


module.exports = router;
