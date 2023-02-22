import axios from "axios";


const rapidAPI = process.env.NEXT_PUBLIC_BLOG_ENDPOINT;

export const getSongID = async (req)=> {
  
    const options = {
        method: 'GET',
        url: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
        params: {q: req, per_page: '5 ', page: '1'},
        headers: {
          'X-RapidAPI-Key': rapidAPI,
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
      };

    const axiosRequest = 
        axios.request(options).then(function (response) {
            const songID = response.data.hits[0].result.id
            const matches = response.data.hits
            // console.log(songID);
            return matches;
        }).catch(function (error) {
            console.error(error);
        });  
    
    const result = await axiosRequest;

    return result
}

export const getLyrics = async (req) => {
    const options = {
        method: 'GET',
        url: 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/',
        params: {id: req, text_format: 'plain'},
        headers: {
          'X-RapidAPI-Key': rapidAPI,
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
      };
    
    const axiosRequest = 
        axios.request(options).then(function (response) {
            return (response.data);
        }).catch(function (error) {
            console.error(error);
        });

    const result = await axiosRequest;

    return result
}