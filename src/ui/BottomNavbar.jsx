import { NavLink } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import tw from "tailwind-styled-components";

const BottomNavElements = tw.ul`grid h-full md:max-w-[60rem] lg:max-w-[78rem] grid-cols-4 mx-auto font-medium`;
const BottomNavButton = tw.button`inline-flex flex-col items-center justify-center px-4 hover:bg-blue-800 text-neutral-400 dark:text-neutral-600`;
const NavTitle = tw.div`font-light text-sm md:text-base`;

function BottomNavbar() {
  const navPages = [
    {
      text: "Home",
      icon: <HomeOutlinedIcon sx={{ fontSize: "1.6rem" }} />,
      url: "/",
    },
    {
      text: "Voca",
      icon: <NoteAddOutlinedIcon sx={{ fontSize: "1.6rem" }} />,
      url: "/voca",
    },
    {
      text: "Game",
      icon: <SportsEsportsOutlinedIcon sx={{ fontSize: "1.6rem" }} />,
      url: "/game",
    },
    {
      text: "Dictionary",
      icon: <SearchOutlinedIcon sx={{ fontSize: "1.6rem" }} />,
      url: "/dictionary",
    },
  ];

  const body = document.querySelector("body");

  return (
    <div className="bg-neutral-900 px-4 py-2 border-t-2 dark:border-neutral-700">
      <nav className="max-w-xl mx-auto">
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
    </div>
  );
}

export default BottomNavbar;
