const axios = require('axios');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { Artists } = require('../models/Mindex');
// const genreList = require('./classificationID_music.json')["segment"]["_embedded"]["genres"];
const genreList = [{name: 'Alternative', id: 'KnvZfZ7vAvv'}];

dotenv.config({
    path: path.resolve(__dirname, ".env"),
}); // default .env file
const sleep = ms => new Promise(res => setTimeout(res, ms));
const API_KEY = process.env.API_KEY;

// artist 정보 불러와서 db에 저장해보기
// total 3960명

exports.getArtistsInit = async (req, res) => {
    try {
        const classificationID = "KZFzBErXgnZfZ7vAde"; // Singer/vocalist
        let totalPage = 0;
        let totalArtists = 0;
        let sizePage = 0;
        let cntArtists = 0;
        let bulkArtists = [];
        let tmpInfo = [];
        genreList.forEach(async (element) => {
            try {
                let genreId = element.id;
                cntArtists = 0;
                const artistLists = await axios({
                    method: 'GET',
                    url: `https://app.ticketmaster.com/discovery/v2/attractions?apikey=${API_KEY}&locale=*&classificationId=${classificationID}&genreId=${genreId}`
                });
                totalPage = artistLists.data.page.totalPages;
                totalArtists = artistLists.data.page.totalElements;
                sizePage = artistLists.data.page.size;
                for(let page = 0; page < totalPage; page++) {
                    const artistLists = await axios({
                        method: 'GET',
                        url: `https://app.ticketmaster.com/discovery/v2/attractions?apikey=${API_KEY}&locale=*&classificationId=${classificationID}&page=${page}&genreId=${genreId}`
                    });
                    await sleep(1000);
                    for(let i = 0; i < sizePage; i++) {
                        if(i < artistLists.data._embedded.attractions?.length) {
                            console.log(`page: ${page}, ${i}th size, ${cntArtists}th artist, Genre: ${element.name}`, artistLists.data._embedded.attractions[i].name);
                            cntArtists++;
                            bulkArtists.push({
                                artist_id: artistLists.data._embedded.attractions[i].id,
                                artist_name: artistLists.data._embedded.attractions[i].name,
                                artist_profile: artistLists.data._embedded.attractions[i].images[0].url
                            });
                            tmpInfo.push({
                                genre: element.name,
                                genreID: element.id,
                                artist_number: cntArtists
                            });
                        }
                        
                    }
                }
                
            } catch (err) {
                console.error(err);
            }
            
        })
        let sum = 0;
        tmpInfo.forEach((e) => {
            sum += e.artist_number;
            console.log(`${e.genre} || ${e.genreID} || ${e.artist_number}`);
        });
        console.log('TOTAL ARTIST FETCHED >>>> ', sum);
        // 받아온 아티스트의 수가 API 전체의 아티스트 수와 같으면 db에 bulkcreate
        if(bulkArtists.length === totalArtists) {
            const artists = await Artists.bulkCreate(bulkArtists);
            console.log("SUCCESS!");
        }


        res.send(true);
    } catch (err) {
        console.error(err);
    }
}