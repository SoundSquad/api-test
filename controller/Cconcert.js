const { Artists } = require('../models/Mindex');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');  // 이 줄을 추가합니다.

function extractEventData(event) {
    // 공연 제목
    const name = event.name || 'No title';

    // 공연 시작일과 종료일
    const startDate = event.dates.start?.localDate || 'No start date';
    const endDate = event.dates.end?.localDate || startDate;

    // 공연 이미지 (width: 1024)
    const imageUrl = event.images.find(img => img.width === 1024)?.url || 'No image';

    // 공연 위치
    const venue = event._embedded.venues[0];
    const location = `${venue.city?.name || 'Unknown City'}, ${venue.state?.name || 'Unknown State'}, ${venue.country?.name || 'Unknown Country'}`;

    // 공연 설명
    const description = event.info || 'No description available';

    // 티켓 판매 링크
    const ticketLink = event.url || 'No ticket link available';

    return {
        title: name,
        start_date: startDate,
        end_date: endDate,
        image_url: imageUrl,
        location,
        description,
        ticket_link: ticketLink
    };
}

async function fetchAndSaveData(artistNum, artistId, apiKey) {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${artistId}&sort=date,desc&apikey=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        const data = response.data;
        const events = data._embedded?.events || [];
        
        const extractedEvents = events.map(extractEventData);

        const outputData = {
            artist_num: artistNum,
            artist_id: artistId,
            events: extractedEvents
        };

      // 저장 경로를 public 디렉토리로 변경
      const saveDir = path.join(__dirname, '../public');
      const filePath = path.join(saveDir, `artist_${artistNum}_events.json`);

      // 디렉토리가 없으면 생성
      await fs.mkdir(saveDir, { recursive: true });

      await fs.writeFile(
          filePath,
          JSON.stringify(outputData, null, 2),
          'utf-8'
      );

      console.log(`Data saved for artist ${artistNum} at ${filePath}`);
    } catch (error) {
        console.error(`Error fetching data for artist ${artistNum}:`, error.message);
    }
}

exports.getConcertsInit = async (req, res) => {
    const apiKey = 'zyH5o2CegptQ7Zmv16GryFW40QN4VE5c';

    try {
        for (let i = 614; i < 3716; i++) {
            const artist = await Artists.findOne({
                where: { artist_num: i },
                attributes: ['artist_num', 'artist_id'],
            });
            
            if (artist) {
                await fetchAndSaveData(artist.artist_num, artist.artist_id, apiKey);
                // API 요청 제한을 준수하기 위한 딜레이
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }


        
        res.status(200).json({ message: "Data fetching process completed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during the data fetching process" });
    }
};