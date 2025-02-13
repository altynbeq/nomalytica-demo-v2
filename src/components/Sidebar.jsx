import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaChartPie } from "react-icons/fa";
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [ navLinks, setNavLinks] = useState(links);
  // const data = JSON.parse(localStorage.getItem('nomalyticsTokenAuth'));
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  // useEffect(()=> {
  //   const data = JSON.parse(localStorage.getItem('nomalyticsTokenAuth'));

  //   if(data.userRole == 'sklad'){
  //     let filteredLinks = links[0].links.filter(link => link.name == "sklad");

  //     console.log("links", links)
  //     console.log("filteredLinks", filteredLinks)
  //     links[0].links = filteredLinks;
  //     setNavLinks(links);
  //   } else if(data.userRole == 'rop'){
  //     let filteredLinks = links[0].links.filter(link => link.name == "sales");
  //     links[0].links = filteredLinks;
  //     setNavLinks(links);
  //   }
  //   setActiveMenu(true);
  // },[]);

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu == true && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex flex-row text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
               <span className='flex flex-row p-1 gap-1'>N<FaChartPie className='mt-1 '/>malytica</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className=" ">{link.text}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
