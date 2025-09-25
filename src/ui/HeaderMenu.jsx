import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentification/Logout";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import tw from "tailwind-styled-components";
import { useGeneralSettingsContext } from "../contexts/GeneralSettingsContext";

const MainContainer = tw.div`flex items-center justify-between gap-6`;
const ButtonContainer = tw.button`text-primary-500`;
const NotificationContainer = tw.a`relative inline-block mr-4`;
const NotificationIconContainer = tw.span`text-primary-500`;
const NotificationTextContainer = tw.span`absolute -top-3 -right-6 rounded-full bg-accent-500 text-neutral-900 w-10 h-10 flex items-center justify-center`;

const iconFontSize = 28;

function HeaderMenu() {
  const { state: stateGeneralSettings, dispatch: dispatchGeneralSettings } =
    useGeneralSettingsContext();

  const navigate = useNavigate();

  const body = document.querySelector("body");
  const dark = stateGeneralSettings.darkMode;

  const handleToggleLightDark = () => {
    dispatchGeneralSettings({ type: "darkMode/selected", payload: !dark });

    if (!dark) body.classList.add("dark");
    else body.classList.remove("dark");
  };

  return (
    <MainContainer>
      <li>
        <ButtonContainer onClick={() => navigate("/account")}>
          <PersonIcon sx={{ fontSize: iconFontSize }} />
        </ButtonContainer>
      </li>
      <li>
        <ButtonContainer onClick={handleToggleLightDark}>
          {dark ? (
            <WbSunnyIcon sx={{ fontSize: iconFontSize }} />
          ) : (
            <ModeNightIcon sx={{ fontSize: iconFontSize }} />
          )}
        </ButtonContainer>
      </li>
      {/* <NotificationContainer>
        <NotificationIconContainer>
          <NotificationsIcon sx={{ fontSize: iconFontSize }} />
        </NotificationIconContainer>
        <NotificationTextContainer>3</NotificationTextContainer>
      </NotificationContainer> */}
    </MainContainer>
  );
}

export default HeaderMenu;
