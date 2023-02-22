

const Search = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        
        console.log(event.target.song.value);

        event.target.reset()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="song" placeholder="Song Name"></input>
        </form>
    )
}

export default Search