import Image from "next/image"
import logo from '../../public/favicon.png'

const Header = () => {
  return (
    <div className="w-full bg-[#121640] " >
      <Image
        src={logo}
        width={100}
        height={100}
        alt="Logo"
      />

    </div>
  )
}

export default Header