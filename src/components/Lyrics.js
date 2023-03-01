import Image from "next/image"

const Lyrics = ({ lyrics, artist, title, image, date }) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col items-center pb-5 pt-5 rounded-lg">
        <h2 className="text-xl text-[#121640] font-bold">{title}</h2>
        <p>Artist: {artist}</p>
        <p className="mb-3">Release Date: {date}</p>
        <Image
          src={image}
          alt="image"
          width={200}
          height={200}
          className="rounded-md"
        >

        </Image>
      </div>
      <p className="css-fix p-5">{lyrics}</p>
    </div>
  )
}

export default Lyrics