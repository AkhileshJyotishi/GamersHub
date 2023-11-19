import React from "react"

interface HeaderProps {
  backgroundImage: string
}

const ProfileHeader: React.FC<HeaderProps> = ({ backgroundImage }) => {
  return (
    <section className="relative block h-[500px]">
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <span id="blackOverlay" className="absolute w-full h-full bg-black opacity-50"></span>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 top-auto w-full overflow-hidden pointer-events-none h-70-px"
        style={{ transform: "translateZ(0px)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="fill-current text-blueGray-200"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </section>
  )
}

export default ProfileHeader
