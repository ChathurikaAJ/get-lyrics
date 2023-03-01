import { getLyrics, getSongID } from "@/services";
import { useState, useEffect } from "react";
import Lyrics from "./Lyrics";
import Link from "next/link";
import { useRouter } from 'next/router'



const Search = () => {

    const [lyrics, setLyrics] = useState('')
    const [matches, setMatches] = useState([])
    const [displayList, setDisplayList] = useState(true)
    const [displayLyrics, setDisplayLyrics] = useState(false)
    const [artist, setArtist] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (event) => {
        setDisplayLyrics(false)
        setDisplayList(true)
        event.preventDefault();
        textDisplay()

        getSongID(event.target.song.value)
        .then((result)=>{
            setMatches(result)
        })
        
        event.target.reset()
    }

    const handleSelect = (result)=> {
        setDisplayLyrics(true)
        setDisplayList(false)

        setArtist(result.artist_names)
        setTitle(result.title)
        setImage(result.header_image_url)
        setDate(result.release_date_for_display)

        getLyrics(result.id)
            .then((result) => {
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

    const router = useRouter()



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="song" placeholder="Song Name"></input>
            </form>
            {displayList && matches.map((song) => (
                <p key={song.result.id} onClick={()=> handleSelect(song.result)}>{song.result.full_title}</p>
               
            ))}

            {displayLyrics && <Lyrics lyrics={lyrics} artist={artist} title={title} image={image} date={date} />}
        </div>
    )
}

export default Search