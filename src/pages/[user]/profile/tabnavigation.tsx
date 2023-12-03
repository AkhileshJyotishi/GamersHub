// import clsx from 'clsx';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';

// type TabProps = {
//     label: string;
//     active: boolean;
//     onClick: () => void;
// };

// const Tab: React.FC<TabProps> = ({ label, active, onClick }) => {
//     return (
//         <div className={clsx(`${active ? ' current ' : ''}`, "sm:min-w-[80px]")}>
//             <Link
//                 href="#"
//                 className={` inline-block   p-2 ${active
//                     ? 'text-secondary  bg-[#00000090]'
//                     : 'bg-white'
//                     }  text-light outline-none focus:outline-none  p-3 `}
//                 onClick={onClick}
//             >
//                 {label}
//             </Link>
//         </div>
//     );
// };

// type TabContent = {
//     label: string;
//     content: JSX.Element;
// };

// type TabSelectorProps = {
//     tabs: TabContent[];
// };

// const TabSelector: React.FC<TabSelectorProps> = ({ tabs }) => {
//     const [activeTab, setActiveTab] = useState<string>(tabs[0].label);
//     const [activeTabContent, setactiveTabContent] = useState<JSX.Element>(tabs[0].content);
//     const handleTabChange = (label: string) => {
//         setActiveTab(label);
//     };
//     useEffect(() => {
//         let data = tabs.find((tab) => tab.label === activeTab)?.content
//         if (data) {

//             setactiveTabContent(data!)
//         }
//     }, [activeTab])

//     return (
//         < >
//             <div className="bg-[#00000085] w-[90%] sm:w-[50%]  text-sm font-medium text-center  rounded-xl text-text  flex flex-col sm:flex-row dark:text-gray-400 mx-auto  bottom-[50px] justify-evenly left-0 right-0 z-50 p-5 lg:sticky top-[61px] mt-[20px] ">
//                 {tabs.map((tab) => (
//                     <Tab
//                         key={tab?.label}
//                         label={tab?.label}
//                         active={activeTab === tab?.label}
//                         onClick={() => handleTabChange(tab?.label)}
//                     />
//                 ))}
//             </div>
//             <div className="grid w-full  p-4 md:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 gap-[20px]">
//                 {activeTabContent}

//             </div>

//         </>
//     );
// };

// export default TabSelector;
