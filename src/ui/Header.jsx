import { useLocation, useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import Heading from "./Heading";
import AbcIcon from "@mui/icons-material/Abc";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { useVocaContext } from "../contexts/VocaContext";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import tw from "tailwind-styled-components";

const MainContainer = tw.div`px-2 py-2 md:py-3 bg-neutral-900 text-primary-500 border-b-2 dark:border-neutral-700`;

function Header() {
  const location = useLocation();
  const pathName = location.pathname.slice(1);
  const { state: stateVocaContext, dispatch: dispatchVoca } = useVocaContext();
  const processType = stateVocaContext.processType;

  const navigate = useNavigate();

  const selectVocaQuicky = () =>
    dispatchVoca({ type: "processType/selected", payload: "quicky" });

  const selectVocaStandard = () =>
    dispatchVoca({ type: "processType/selected", payload: "standard" });

  const handleClickBack = () => {
    navigate(-1);
    return;
  };

  let myChildren;
  if (pathName === "") {
    myChildren = (
      <div className="flex items-center justify-between text-neutral-0">
        <Heading as="h1" className="first-letter:capitalize">
          Home
        </Heading>
        <HeaderMenu />
      </div>
    );
  } else if (pathName === "voca") {
    myChildren = (
      <div className="text-sm md:text-xl flex items-center justify-around w-full mx-auto max-w-2xl">
        <button
          className={`${
            processType === "standard"
              ? "bg-primary-500 text-neutral-0"
              : "border border-neutral-0 text-neutral-0"
          } flex items-center justify-between gap-4 px-4 py-2 rounded-3xl transition-colors duration-300`}
          onClick={selectVocaStandard}
        >
          <AbcIcon />
          <p>Vocabulary</p>
        </button>
        <button
          className={`${
            processType === "quicky"
              ? "bg-primary-500 text-neutral-0"
              : "border border-neutral-0 text-neutral-0"
          } flex items-center justify-between gap-2 px-4 py-2 rounded-3xl transition-colors duration-300`}
          onClick={selectVocaQuicky}
        >
          <ElectricBoltIcon />
          <p>Quickies</p>
        </button>
      </div>
    );
  } else if (pathName === "categories") {
    myChildren = (
      <div className="flex items-center justify-between text-neutral-0">
        <div className="flex items-center justify-between gap-16">
          <button onClick={handleClickBack}>
            <WestOutlinedIcon sx={{ fontSize: 40 }} />
          </button>
          <Heading as="h1" className="first-letter:capitalize">
            Categories
          </Heading>
        </div>
        <HeaderMenu />
      </div>
    );
  } else if (pathName === "incomplete") {
    myChildren = (
      <div className="flex items-center justify-between text-neutral-0">
        <div className="flex items-center justify-between gap-16">
          <button onClick={handleClickBack}>
            <WestOutlinedIcon sx={{ fontSize: 40 }} />
          </button>
          <Heading as="h1" className="first-letter:capitalize">
            Incomplete
          </Heading>
        </div>
        <HeaderMenu />
      </div>
    );
  } else {
    myChildren = (
      <div className="flex items-center justify-between text-neutral-0">
        <Heading as="h1" className="first-letter:capitalize">
          {pathName}
        </Heading>
        <HeaderMenu />
      </div>
    );
  }

  return <MainContainer>{myChildren}</MainContainer>;
}

export default Header;
