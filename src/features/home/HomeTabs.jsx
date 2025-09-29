import tw from "tailwind-styled-components";
import { useGeneralSettingsContext } from "../../contexts/GeneralSettingsContext";

const MainContainer = tw.div`flex items-center justify-around w-full max-w-2xl mx-auto`;

export default function HomeTabs() {
  const { state, dispatch } = useGeneralSettingsContext();
  const homeTab = state.homeTab;

  const Tab = tw.button`w-full py-2 text-lg lg:text-xl lg:py-3 text-center`;

  const handleButtonClicked = (selection) => {
    dispatch({ type: "homeTab/selected", payload: selection });
  };

  return (
    <MainContainer>
      <Tab
        className={`rounded-l-xl ${
          homeTab === "projects"
            ? "bg-primary-500 text-neutral-0 border-[1px] border-primary-500 dark:bg-primary-500 "
            : "text-neutral-400 border-[1px] border-neutral-200 dark:border-neutral-600 dark:text-neutral-400"
        } `}
        onClick={() => handleButtonClicked("projects")}
      >
        Projects
      </Tab>
      <Tab
        className={`rounded-r-xl ${
          homeTab === "dashboard"
            ? "bg-primary-500 text-neutral-0 border-[1px] border-primary-500"
            : "text-neutral-400 border-[1px] border-neutral-200 dark:border-neutral-600 dark:text-neutral-400"
        } `}
        onClick={() => handleButtonClicked("dashboard")}
      >
        Dashboard
      </Tab>
    </MainContainer>
  );
}
