import { getLyrics, getSongID } from "@/services";
import { useState } from "react";


const Search = () => {

    const [lyrics, setLyrics] = useState('')
    const [matches, setMatches] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault();
        textDisplay()

        getSongID(event.target.song.value)
        .then((result)=>{
            console.log(result);
            setMatches(result)
        })
        
        event.target.reset()
    }

    const handleSelect = (id)=> {
        getLyrics(id)
            .then((result) => {
                console.log(result.lyrics.lyrics.body.plain)
                textDisplay(result.lyrics.lyrics.body.plain)
            })
    }

    const textDisplay = (text) => {
        if(text) {
            const textArray = [...text]
            
            for (let index = 0; index < textArray.length; index++) {
                const element = textArray[index];
                if (element==="]"){
                    textArray.splice(index+1,0,`\n`)
                    index++
                }
            }

            const lyrics = textArray.join('')
            setLyrics(lyrics)
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="song" placeholder="Song Name"></input>
            </form>
            {matches.map((song) => (
                <p onClick={()=> handleSelect(song.result.id)}>{song.result.full_title}</p>
                
            ))}
            <p className="css-fix">{lyrics}</p>
        </div>
    )
}

export default Search