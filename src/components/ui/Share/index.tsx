import React from "react"
import Head from "next/head"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"

import FaceBookIcon from "@/components/icons/facebook"
import LinkedInIcon from "@/components/icons/linkedin"
import TwitterIcon from "@/components/icons/twitter"

const SocialIcon = ({
  title,
  description,
  image,
  hashtag,
}: {
  title: string
  description: string
  image: string
  hashtag: string
}) => {
  const socialIcons = [
    {
      label: "Facebook",
      icon: (
        <FacebookShareButton
          url={window.location.href}
          className="p-[10px] bg-user_interface_4 rounded-full"
          title={title}
          hashtag="#GameCreators.io"
        >
          <FaceBookIcon className="w-6 h-6 fill-text" />{" "}
        </FacebookShareButton>
      ),
    },
    {
      label: "LinkedIn",
      icon: (
        <LinkedinShareButton
          url={window.location.href}
          className="p-[10px] bg-user_interface_4 rounded-full"
          title={title}
        >
          <LinkedInIcon className="w-6 h-6 fill-text" />
        </LinkedinShareButton>
      ),
    },
    {
      label: "Twitter",
      icon: (
        <TwitterShareButton
          url={window.location.href}
          className="p-[10px] bg-user_interface_4 rounded-full"
          title={title}
        >
          {" "}
          <TwitterIcon className="w-6 h-6 fill-text" />
        </TwitterShareButton>
      ),
    },
    {
      label: "Whatsapp",
      icon: (
        <WhatsappShareButton title={title} url={window.location.href} separator="::">
          <WhatsappIcon
            round
            className="w-6 h-6 fill-text bg-user_interface_4 "
            iconFillColor="white"
            bgStyle={{ fill: "#464E55", backgroundColor: "#464E55" }}
          />
        </WhatsappShareButton>
      ),
    },
  ]

  return (
    <>
      <Head>
        <meta property="title" content={title} />
        {/* <meta property="quote" content={quote} /> */}
        <meta name="description" content={description} />
        <meta property="image" content={image} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        {/* <meta property="og:quote" content={quote} /> */}
        <meta property="og:hashtag" content={hashtag} />
        <meta property="og:image" itemProp="image" content={image} />
        <meta content="image/*" property="og:image:type" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:site_name" content="GameCreators" />
        <meta property="og:description" content={description} />
      </Head>
      <div className="flex flex-row flex-wrap gap-[35px] mt-4 justify-center">
        {socialIcons.map(({ label, icon }, idx) => (
          <div className="flex flex-col items-center cursor-pointer gap-y-1" key={idx}>
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default SocialIcon
