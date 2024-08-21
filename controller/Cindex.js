const axios = require('axios');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, ".env"),
}); // default .env file

const API_KEY = process.env.API_KEY;

// classification ID
exports.getClassificationID = async (req, res) => {
    try {
        const eventsList = await axios({
            method: "GET",
            url: `https://app.ticketmaster.com/discovery/v2/classifications?apikey=${API_KEY}`,
        });
        console.log(eventsList.data);
        // res.send(eventsList.json());
        res.send(eventsList.data._embedded.classifications[2]);
        const writeJsonFilePath1 = path.join(__dirname, "classificationID_music.json");
        fs.writeFileSync(writeJsonFilePath1, JSON.stringify(eventsList.data._embedded.classifications[2]));

        const writeJsonFilePath2 = path.join(__dirname, "classificationID_eventStyle.json");
        fs.writeFileSync(writeJsonFilePath2, JSON.stringify(eventsList.data._embedded.classifications[14]));

        const writeJsonFilePath3 = path.join(__dirname, "classificationID_individual_artist.json");
        fs.writeFileSync(writeJsonFilePath3, JSON.stringify(eventsList.data._embedded.classifications[12]));
    } catch (err) {
        console.error(err);
    }
}

/* 
== Classification ID ==

tour: KZFzBErXgnZfZ7vA6v
concert: KZFzBErXgnZfZ7vA6J

Singer/vocalist: KZFzBErXgnZfZ7vAde

*/


// attractions: artist

exports.getArtists = async(req, res) => {
    try {
        const classificationID = "KZFzBErXgnZfZ7vAde"; // Singer/vocalist
        const artistLists = await axios({
            method: 'GET',
            url: `https://app.ticketmaster.com/discovery/v2/attractions?apikey=${API_KEY}&locale=*&classificationId=${classificationID}`
        });
        const writeJsonFilePath = path.join(__dirname, "artistLists.json");
        console.log(artistLists.data._embedded);
        fs.writeFileSync(writeJsonFilePath, JSON.stringify(artistLists.data._embedded.attractions));
        res.send(artistLists.data._embedded.attractions);
    } catch (err) {
        console.error(err);
    }
}

