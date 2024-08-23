const express = require('express');
const app = express();
const router = require('./routes/index.js');
const PORT = 8000;
const genreList = require('./controller/classificationID_music.json')["segment"]["_embedded"]["genres"];


app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/api', router);

app.listen(PORT, () => {
            console.log('Database connected!');
            console.log(`Server running in PORT: ${PORT}`);

            genreList.forEach((element, index) => {
                console.log(`${index} || ${element.name} || ${element.id}`);
            })
});

