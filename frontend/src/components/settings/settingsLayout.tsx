import React, { useState } from "react"
// import Socials from "./SocialProfile"
import dynamic from "next/dynamic"

// import DeleteAccount from "./DeleteAccount"
// import Error from "./Error"
// import Password from "./Password"
import Sidebar from "@/components/ui/Sidebar"

// import EditProfilePage from "./EditProfile/index"
const EditProfilePage = dynamic(() => import("@/components/settings/EditProfile"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})
const DeleteAccount = dynamic(() => import("@/components/settings/DeleteAccount"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})
const Error = dynamic(() => import("@/components/settings/Error"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})
const Password = dynamic(() => import("@/components/settings/Password"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})
const Socials = dynamic(() => import("@/components/settings/SocialProfile"), {
  loading: () => {
    return <div className="w-full bg-gray-400 animate-pulse h-[80vh]"></div>
  },
})
type SidebarNavigator = {
  tabs: { [key: string]: Tab }
  initialRouteName: string
}
type Tab = {
  params: {
    icon: string
    tabName: string
    className?: string
  }
}

const sidebarNavigator: SidebarNavigator = {
  tabs: {
    EditProfile: {
      params: {
        icon: "EditProfile",
        tabName: "Edit Profile",
      },
    },
    Password: {
      params: {
        icon: "password",
        tabName: "Password",
      },
    },
    Socials: {
      params: {
        icon: "SocialProfile",
        tabName: "Social Profile",
      },
    },
    Chat: {
      params: {
        icon: "Chat",
        tabName: "Chat",
      },
    },
    DeleteAccount: {
      params: {
        icon: "DeleteAccount",
        tabName: "Delete Account",
        className: "text-red-500",
      },
    },
  },

  initialRouteName: "EditProfile",
}

interface PageMap {
  [key: string]: React.JSX.Element
}

// type EditProfileProps = {
//   title: string
// }

interface SettingsLayoutProps {
  settingsDetails: IsettingsDetails
}
const SettingsLayout: React.FC<SettingsLayoutProps> = ({ settingsDetails }) => {
  // console.log("session ", socialsprops)settingsDetails.
  const pageComponents: PageMap = {
    EditProfile: (
      <EditProfilePage
        profileDetails={settingsDetails?.details}
        allSkills={settingsDetails?.skill}
        allSoftwares={settingsDetails?.software}
      />
    ),
    Password: <Password />,
    Socials: <Socials socialsprops={settingsDetails?.socials} />,
    DeleteAccount: <DeleteAccount />,
  }
  const [activeTab, setActiveTab] = useState<string>(sidebarNavigator?.initialRouteName)

  const ActivePage = pageComponents[activeTab]

  return (
    <div className="flex w-full md:w-[80%] mx-auto gap-[30px] p-[10px] md:p-[20px] relative flex-col md:flex-row">
      <Sidebar
        navigator={sidebarNavigator}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="whitespace-nowrap md:whitespace-normal w-full md:w-[25%] md:sticky md:top-[65px] h-fit bg-user_interface_2 flex-col  "
      />
      <div className="w-full md:p-3 bg-user_interface_2 rounded-xl">
        {ActivePage ? ActivePage : <Error />}
      </div>
    </div>
  )
}

export default SettingsLayout
