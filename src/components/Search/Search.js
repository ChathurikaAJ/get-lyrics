import { getSongID } from "@/services";

const Search = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // console.log(event.target.song.value);

        getSongID(event.target.song.value)
        .then((result)=> console.log(result))
        
        

        // event.target.reset()
    }





    return (
        <form onSubmit={handleSubmit}>
            <input name="song" placeholder="Song Name"></input>
        </form>
    )
}

export default Search