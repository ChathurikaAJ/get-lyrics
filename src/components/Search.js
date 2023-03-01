import { getLyrics, getSongID } from "@/services";
import { useState, useEffect } from "react";
import Lyrics from "./Lyrics";
import Link from "next/link";
import { useRouter } from 'next/router'
import Loading from "./Loading";


const Search = () => {

    const [lyrics, setLyrics] = useState('')
    const [matches, setMatches] = useState([])
    const [displayList, setDisplayList] = useState(true)
    const [displayLyrics, setDisplayLyrics] = useState(false)
    const [artist, setArtist] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event) => {
        setDisplayLyrics(false)
        
        event.preventDefault();
        textDisplay()

        getSongID(event.target.song.value)
        .then((result)=>{
            setMatches(result)
            setDisplayList(true)
        })
        
        event.target.reset()
    }

    const handleSelect = (result)=> {
        setLoading(true)
        setDisplayList(false)

        setArtist(result.artist_names)
        setTitle(result.title)
        setImage(result.header_image_url)
        setDate(result.release_date_for_display)

        getLyrics(result.id)
            .then((result) => {
                textDisplay(result.lyrics.lyrics.body.plain)
                setLoading(false)
                setDisplayLyrics(true)
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
        <div className="flex flex-col items-center justify-center ">
            <form onSubmit={handleSubmit}>
                <input className="text-center text-sky-400 text-lg border-solid border-b-2 border-[#121640]  mt-10 mb-10 p-2 focus:outline-none" name="song" placeholder="Enter the song name"></input>
            </form>
            {displayList && matches.map((song) => (
                <p className="mb-2 hover:cursor-pointer hover:text-[#eb5286]" key={song.result.id} onClick={()=> handleSelect(song.result)}>{song.result.full_title}</p>
               
            ))}

            {loading && <Loading />}

            {displayLyrics && <Lyrics lyrics={lyrics} artist={artist} title={title} image={image} date={date} />}
        </div>
    )
}

export default Search