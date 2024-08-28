const axios = require('axios');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { Artists } = require('../models/Mindex');
// const genreList = require('./classificationID_music.json')["segment"]["_embedded"]["genres"];
const genre = {name: 'Reggae', id: 'KnvZfZ7vAed'};


dotenv.config({
    path: path.resolve(__dirname, ".env"),
}); // default .env file
const sleep = ms => new Promise(res => setTimeout(res, ms));
const API_KEY = process.env.API_KEY;

exports.getArtistDetail = async (req, res) => {
    try {
        const genreId = genre.id;
        const readJsonFilePath = path.join(__dirname, `artists_${genre.name}.json`)
        const jsonFile = fs.readFileSync(readJsonFilePath);
        const jsonData = JSON.parse(jsonFile);
        console.log(jsonData[0].artist_id);
        
        res.send(true);
    } catch (err) {
        console.error(err);
    }
}