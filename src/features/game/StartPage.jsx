import { useEffect, useState } from "react";

import Flag from "react-flagkit";

import tw from "tailwind-styled-components";
import Button from "../../ui/Button";

import SportsScoreIcon from "@mui/icons-material/SportsScore";

const MainContainer = tw.div`flex flex-col gap-2 px-4 py-4 justify-between h-full rounded-xl`;
const Container = tw.div`flex flex-col gap-6 text-neutral-900 dark:text-neutral-0`;
const ContainerTitle = tw.div`flex items-center justify-between gap-4 text-neutral-700 dark:text-neutral-300`;
const LanguageTested = tw.div`flex flex-col items-center justify-center gap-2`;
const FlagButton = tw.button`flex items-center gap-4 border-solid p-[1px] border-white border-[1px]`;
const MethodUsed = tw.div`flex flex-col items-center justify-center gap-2`;
const Slider = tw.div`flex items-center justify-between gap-6 dark:text-neutral-0`;
const SliderRange = tw.p``;
const SliderInput = tw.input`w-full`;
const ContainerNbWords = tw.div`flex items-center justify-center`;
const NbWords = tw.span`text-2xl md:text-3xl font-semibold mr-2`;
const Score = tw.div`flex flex-col items-center justify-center gap-4`;
const ScoreResult = tw.div`flex items-center justify-between gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-3xl`;

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { getLanguageCode } from "../../utils/languages";
import { useProjectContext } from "../../contexts/ProjectContext";
import { Select } from "../../ui/Select";
import { HappyFace, NeutralFace, SadFace } from "../../ui/SmileysIcons";
import BlockIcon from "@mui/icons-material/Block";
import { useGameContext } from "../../contexts/GameContext";
import { useVocabularyPerUser } from "../vocabularies/useVocabulary";
import { useLanguage } from "../languageSelection/useLanguages";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";

const methods = [
  { value: "random", label: "Random" },
  { value: "sortByDateLatest", label: "Sort by date (latest first)" },
  { value: "sortByDateOldest", label: "Sort by date (oldest first)" },
];

export default function StartPage() {
  const language = useLanguage();

  const { vocabulary } = useVocabularyPerUser();

  const { state: stateGame, dispatch: dispatchGame } = useGameContext();
  const method = stateGame.method;

  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();
  const {
    projectType,
    wordsIdsFilteredOut,
    singleProjectId,
    isLearningLanguage,
  } = stateVocaFilter;

  const { state: stateProject } = useProjectContext();
  const projectSelected = stateProject.projectSelected;

  // Define the whole vocabulary (project assigned or not (quickies)) for the language selected
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

  const min = 1;
  const nbWordsFiltered = myVocaFiltered?.length;
  const [nbWords, setNbWords] = useState(myVocaFiltered?.length);

  const handleSwitchLanguage = () => {
    dispatchVocaFilter({ type: "isLearningLanguage/toggled" });
  };

  const handleChangeSliderValue = (event) => {
    event.preventDefault();
    const value = Number(event.target.value);

    setNbWords(value);
  };

  useEffect(() => {
    setNbWords(nbWordsFiltered);
  }, [nbWordsFiltered]);

  let wordsBy;
  let randomValues = [];
  if (myVocaFiltered)
    wordsBy = myVocaFiltered.sort((a, b) => {
      const date1 = new Date(a.created_at);
      const date2 = new Date(b.created_at);

      const randomValue = Math.random() - 0.5;
      randomValues.push(randomValue);

      return method === methods[1].value
        ? date2 - date1
        : method === methods[2].value
          ? date1 - date2
          : randomValue;
    });

  const myWordsIds = wordsBy?.map((word) => word.id);

  const scoreSum =
    wordsBy?.slice(0, nbWords).length > 0
      ? wordsBy
          .slice(0, nbWords)
          .map((word) => word.score)
          .reduce((acc, curr) => acc + curr)
      : 0;
  const gamesPlayedSum =
    wordsBy?.slice(0, nbWords).length > 0
      ? wordsBy
          .slice(0, nbWords)
          .map((word) => word.games_played)
          .reduce((acc, curr) => acc + curr)
      : 0;

  const scoreToBeat = Math.round((scoreSum / gamesPlayedSum) * 100);

  const handlePlay = () => {
    dispatchGame({
      type: "test/TEST",
      payload: { scoreToBeat, nbWords, wordsBy, myWordsIds },
    });
  };

  return (
    language && (
      <MainContainer>
        <Container>
          <LanguageTested>
            <FlagButton onClick={handleSwitchLanguage}>
              <Flag
                country={getLanguageCode(
                  isLearningLanguage
                    ? language
                    : projectSelected["motherLanguage"],
                )}
                size={32}
              />
            </FlagButton>
          </LanguageTested>
        </Container>
        <Container>
          <MethodUsed>
            <ContainerTitle>Method used</ContainerTitle>
            <Select
              options={methods}
              value={method}
              onChange={(e) =>
                dispatchGame({
                  type: "method/selected",
                  payload: e.target.value,
                })
              }
            />
          </MethodUsed>
        </Container>
        <Container>
          <Slider>
            <SliderRange>{min}</SliderRange>
            <SliderInput
              type="range"
              value={nbWords}
              min={min}
              max={nbWordsFiltered}
              step={1}
              onChange={handleChangeSliderValue}
            />
            <SliderRange>{nbWordsFiltered}</SliderRange>
          </Slider>
          <ContainerNbWords>
            <NbWords>{nbWords}</NbWords>
            words
          </ContainerNbWords>
        </Container>
        <Container>
          <Score>
            <ContainerTitle>
              <SportsScoreIcon sx={{ fontSize: 28 }} />
              Score to beat
              <SportsScoreIcon sx={{ fontSize: 28 }} />
            </ContainerTitle>
            <ScoreResult>
              {gamesPlayedSum === 0 ? (
                <BlockIcon
                  sx={{ fontSize: 36 }}
                  className="text-neutral-800 dark:text-neutral-100"
                />
              ) : scoreToBeat > 66 ? (
                <HappyFace size="36" filled={true} />
              ) : scoreToBeat < 33 ? (
                <SadFace size="36" filled={true} />
              ) : (
                <NeutralFace size="36" filled={true} />
              )}

              {gamesPlayedSum !== 0 && (
                <div>
                  <span className="text-2xl md:text-3xl font-semibold">
                    {scoreToBeat}
                  </span>
                  %
                </div>
              )}
            </ScoreResult>
          </Score>
        </Container>
        <Button onClick={handlePlay} disabled={nbWords === 0}>
          <PlayCircleIcon sx={{ fontSize: 26 }} />
          Play
        </Button>
      </MainContainer>
    )
  );
}
