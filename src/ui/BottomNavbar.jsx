import { NavLink } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

import tw from "tailwind-styled-components";

const BottomNavElements = tw.ul`grid h-full md:max-w-[60rem] lg:max-w-[78rem] grid-cols-4 mx-auto font-medium`;
const BottomNavButton = tw.button`inline-flex flex-col items-center justify-center px-5 hover:bg-blue-800 text-neutral-400 dark:text-neutral-600`;
const NavTitle = tw.div`text-lg`;

function BottomNavbar() {
  const navPages = [
    {
      text: "Home",
      icon: <HomeOutlinedIcon sx={{ fontSize: "2.5rem" }} />,
      url: "/",
    },
    {
      text: "Voca",
      icon: <NoteAddOutlinedIcon sx={{ fontSize: "2.5rem" }} />,
      url: "/voca",
    },
    {
      text: "Game",
      icon: <SportsEsportsOutlinedIcon sx={{ fontSize: "2.5rem" }} />,
      url: "/game",
    },
    {
      text: "Dictionary",
      icon: <SearchOutlinedIcon sx={{ fontSize: "2.5rem" }} />,
      url: "/dictionary",
    },
    // {
    //   text: "Settings",
    //   icon: <TuneOutlinedIcon sx={{ color: "white", fontSize: "2.8rem" }} />,
    //   url: "/settings",
    // },
  ];

  const body = document.querySelector("body");
  const lightDarkMode = body.classList.value;

  return (
    <nav className="bg-neutral-900 px-4 py-4 border-t-2 dark:border-neutral-700">
      <BottomNavElements>
        {navPages.map((page) => {
          return (
            <BottomNavButton key={page.text}>
              <NavLink
                to={page.url}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary-500 text-neutral-0 rounded-2xl px-4"
                    : "text-neutral-200"
                }
              >
                {page.icon}
                <NavTitle>{page.text}</NavTitle>
              </NavLink>
            </BottomNavButton>
          );
        })}
      </BottomNavElements>
    </nav>
  );
}

export default BottomNavbar;
