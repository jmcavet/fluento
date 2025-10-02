import tw from "tailwind-styled-components";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

import { HappyFace, NeutralFace, SadFace } from "../../ui/SmileysIcons";
import GameWordCard from "./GameWordCard";
import GameTranslationCard from "./GameTranslationCard";
import { useGameContext } from "../../contexts/GameContext";
import { useState } from "react";
import ModalResult from "./ModalResult";
import {
  useUpdateWords,
  useVocabularyPerUser,
} from "../vocabularies/useVocabulary";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";
import { useLanguage } from "../languageSelection/useLanguages";
import { orderMyArray } from "../../utils/dataManipulation";

const MainContainer = tw.div`h-full flex flex-col dark:bg-neutral-800`;
const Header = tw.div`grow-0 text-xl md:text-2xl flex items-center justify-between py-4 bg-primary-500 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-0 px-4`;
const LinkReset = tw.div`flex items-center justify-between gap-4 w-fit text-neutral-0 dark:text-primary-500 text-xl md:text-2xl`;
const Target = tw.div`flex items-center justify-between gap-2 text-neutral-0 text-xl md:text-2xl`;

const ProgressContainer = tw.div`my-2`;
const ScoreBarContainer = tw.div`h-8 md:h-12 m-4 flex items-center justify-start bg-neutral-200 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-900 rounded-xl`;

export default function GamePlay() {
  const [wordsScored, setWordsScored] = useState([]);

  const { updateWords } = useUpdateWords();

  const { vocabulary } = useVocabularyPerUser();

  const { state: stateGame, dispatch: dispatchGame } = useGameContext();
  const {
    scoreToBeat,
    totalWords,
    myWordsIds,
    wordIncrement,
    pointsCumulated,
    scoreLive,
    wordIdsToDelete,
    isGameOver,
  } = stateGame;

  const { state: stateVocaFilter } = useVocaFilterContext();
  const {
    projectType,
    wordsIdsFilteredOut,
    singleProjectId,
    isLearningLanguage,
  } = stateVocaFilter;

  const progressPercent = Math.round((wordIncrement / totalWords) * 100);
  const ScoreBar = tw.div`h-full p-2 ${() =>
    progressPercent === 0
      ? "display-none text-transparent"
      : progressPercent === 100
        ? "flex items-center justify-center bg-primary-500 text-neutral-0 dark:bg-primary-500 rounded-2xl"
        : "flex items-center justify-center bg-primary-500 text-neutral-0 dark:bg-primary-500 rounded-l-2xl"}}`;

  // Define the whole vocabulary (project assigned or not (quickies)) for the language selected
  const language = useLanguage();
  const myVoca = vocabulary?.filter((obj) => obj.learningLanguage === language);

  let myVocaFiltered;
  if (projectType === "allProjects") {
    myVocaFiltered = myVoca?.filter(
      (obj) => obj.project_id && !wordsIdsFilteredOut.includes(obj.id),
    );
  } else if (projectType === "singleProject") {
    myVocaFiltered = myVoca?.filter(
      (obj) =>
        obj.project_id &&
        obj.project_id === singleProjectId &&
        !wordsIdsFilteredOut.includes(obj.id),
    );
  } else {
    // Quickies
    myVocaFiltered = myVoca?.filter(
      (obj) => !obj.project_id && !wordsIdsFilteredOut.includes(obj.id),
    );
  }

  // Redefine the array of words in the right order, depending on the list of words ids defined within the StartPage component
  const wordsBy = orderMyArray(myVocaFiltered, myWordsIds, "id");

  const handleReset = () => dispatchGame({ type: "game/reset" });

  const validate = (val) => {
    // Get the current word being reviewed
    const myWord = words[wordIncrement - 1];

    if (wordIncrement < totalWords) {
      // a. Game is still running...
      dispatchGame({
        type: "game/running",
        payload: {
          scoreUpdated: (pointsCumulated + val) / wordIncrement,
          scoreValue: val,
        },
      });

      // Define the word's properties you want to update: score and games_played
      const obj = {
        id: myWord.id,
        score: myWord.score + val / 100,
        games_played: myWord.games_played + 1,
      };
      // Append this new object to the wordsScored variable
      setWordsScored((prev) => [...prev, obj]);
    } else {
      // b. Game is over now
      dispatchGame({
        type: "game/over",
        payload: {
          scoreUpdated:
            (pointsCumulated + val) / (wordIncrement - wordIdsToDelete.length),
        },
      });

      // For the last word being reviewed, define again an object with the relevant properties to update
      const obj = {
        id: myWord.id,
        score: myWord.score + val / 100,
        games_played: myWord.games_played + 1,
      };

      // Append this new object to the wordsScored hook variable (make a copy of it first)
      // Using 'setWordsScored' would not work since the loop below would not take this last
      // element into account. Instead, make a copy of the 'wordsScored' variable and add manually (without hook)
      // this very last element. Iterating over this array will work.
      const wordsToUpdate = [...wordsScored];
      wordsToUpdate.push(obj);

      // Update all words with its respective 'score' and 'games_played' variables
      updateWords(wordsToUpdate);
    }
  };

  const words = wordsBy?.slice(0, totalWords);

  return (
    words && (
      <MainContainer>
        <Header>
          <LinkReset onClick={handleReset}>
            <RestartAltIcon sx={{ fontSize: 32 }} />
          </LinkReset>

          {wordIncrement > 1 && (
            <div className="flex items-center justify-between gap-16">
              <div className="flex items-center justify-between gap-2">
                {scoreLive > 66 ? (
                  <HappyFace size="36" filled={true} />
                ) : scoreLive < 33 ? (
                  <SadFace size="36" filled={true} />
                ) : (
                  <NeutralFace size="36" filled={true} />
                )}
                <p className="text-neutral-0">{Math.round(scoreLive)}%</p>
              </div>

              {scoreLive > scoreToBeat ? (
                <TrendingUpIcon
                  sx={{ fontSize: 32 }}
                  className="bg-success-500 text-success-900 border border-success-900 dark:bg-success-500 dark:text-success-900 dark:border-success-500 rounded-full"
                />
              ) : (
                <TrendingDownIcon
                  sx={{ fontSize: 32 }}
                  className="bg-error-500 text-error-900 border border-error-900 dark:bg-error-500 dark:text-error-900 dark:border-error-500 rounded-full"
                />
              )}
            </div>
          )}

          <Target>
            <SportsScoreIcon sx={{ fontSize: 32 }} />
            <div>&gt; {scoreToBeat}%</div>
          </Target>
        </Header>

        <ProgressContainer>
          <ScoreBarContainer>
            <ScoreBar
              style={{
                width: `${progressPercent}%`,
                height: "100%",
              }}
            >{`${progressPercent} %`}</ScoreBar>
          </ScoreBarContainer>

          <div className="flex items-center justify-center text-xl md:text-2xl mt-6">
            <span className="font-semibold mr-2">{wordIncrement}</span>/{" "}
            {totalWords}
            <span className="text-lg md:text-xl ml-4"> words</span>
          </div>
        </ProgressContainer>

        <GameWordCard
          word={words[wordIncrement - 1]}
          isLearningLanguage={isLearningLanguage}
        />

        <GameTranslationCard
          word={words[wordIncrement - 1]}
          isLearningLanguage={isLearningLanguage}
        />

        <div className="flex items-center justify-center gap-16 px-4 py-0">
          <button onClick={() => validate(0)}>
            <SadFace size="56" filled={true} />
          </button>
          <button onClick={() => validate(50)}>
            <NeutralFace size="56" filled={true} />
          </button>
          <button onClick={() => validate(100)}>
            <HappyFace size="56" filled={true} />
          </button>
        </div>

        <ModalResult
          isModalOpen={isGameOver}
          onClose={handleReset}
          scoreToBeat={scoreToBeat}
          scoreLive={scoreLive}
        />
      </MainContainer>
    )
  );
}
