import tw from "tailwind-styled-components";
import GameHeader from "../features/game/GameHeader";
import {
  useProject,
  useProjectSelected,
} from "../features/projects/useProject";
import { useLanguage } from "../features/languageSelection/useLanguages";
import Spinner from "../ui/Spinner";
import StartPage from "../features/game/StartPage";
import { useGameContext } from "../contexts/GameContext";
import GamePlay from "../features/game/GamePlay";
import { useEffect } from "react";
import NoProject from "../ui/NoProject";

const MainContainer = tw.div`h-full flex flex-col items-align justify-between text-neutral-900 dark:text-neutral-0`;

const Game = () => {
  // Get all projects per user and define project as the first one from the list
  const { projects } = useProject();
  useProjectSelected(projects);

  // Whenever there is a selected project, get its language
  const language = useLanguage();

  const { state: stateGame, dispatch: dispatchGame } = useGameContext();
  const gameStarted = stateGame.gameStarted;

  const languageNamesAll = projects?.map((project) => project.learningLanguage);
  const languageNames = [...new Set(languageNamesAll)];

  // Whenever user leaves the Game page and comes back, it will reset the whole page.
  // Otherwise, the page could still display a previous game not yet finished...
  useEffect(() => {
    dispatchGame({ type: "game/reset" });
  }, []);

  // If no projects are yet defined, return a warning
  if (projects?.length === 0) return <NoProject />;

  // While the languageNames and the language selected is not defined, display the Spinner
  if (!languageNames || !language) return <Spinner />;

  return (
    <MainContainer>
      {!gameStarted ? (
        <>
          <GameHeader languageNames={languageNames} />
          <StartPage />
        </>
      ) : (
        <GamePlay />
      )}
    </MainContainer>
  );
};

export default Game;
