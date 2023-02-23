import Image from "next/image"

const Lyrics = ({lyrics, artist, title, image, date }) => {
  return (
    <div>
        <h2>{title}</h2>
        <p>{artist}</p>
        <p>{date}</p>
        <Image
            src={image}
            alt="image"
            width={200}
            height={200}
        >

        </Image>
        <p className="css-fix">{lyrics}</p>
    </div>
  )
}

export default Lyrics