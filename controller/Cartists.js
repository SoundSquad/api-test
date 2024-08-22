const axios = require('axios');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, ".env"),
}); // default .env file

const API_KEY = process.env.API_KEY;

// artist 정보 불러와서 db에 저장해보기
// total 3960명