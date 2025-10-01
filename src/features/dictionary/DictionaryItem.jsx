import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EmojiEmotionsSharpIcon from "@mui/icons-material/EmojiEmotionsSharp";
import SentimentNeutralSharpIcon from "@mui/icons-material/SentimentNeutralSharp";
import { useDictionaryContext } from "../../contexts/DictionaryContext";
import tw from "tailwind-styled-components";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useProject } from "../projects/useProject";
import Checkbox from "../../ui/Checkbox";
import { HappyFace, NeutralFace, SadFace } from "../../ui/SmileysIcons";
import Battery3BarIcon from "@mui/icons-material/Battery3Bar";
import BlockIcon from "@mui/icons-material/Block";

const CardContainer = tw.div`shadow-md shadow-neutral-200 dark:shadow-neutral-700 w-full bg-neutral-0 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-3xl md:text-lg`;
const CardHeader = tw.div`grid grid-cols-12 grid-rows-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-0 p-2 rounded-t-2xl`;
const FavoriteContainer = tw.div`col-start-1 col-end-3 flex items-center justify-left gap-2`;
const WordType = tw.div`col-start-4 col-end-7 italic md:text-lg font-light text-neutral-500 dark:text-neutral-400`;
const ProgressContainer = tw.div`col-start-8 cold-end-10 text-error-500 dark:text-error-500`;
const ScoreContainer = tw.div`col-start-11 col-end-13 flex items-center justify-end gap-4`;
const VocaContainer = tw.div`flex flex-col gap-2 px-4 py-2`;
const WordContainer = tw.div`font-bold`;
const ContextContainer = tw.div`italic text-neutral-600 dark:text-neutral-300`;
const Divider = tw.div`w-full h-[1px] bg-neutral-200 dark:bg-neutral-600`;
const WordTranslationContainer = tw.div``;

export default function DictionaryItem({ data, index }) {
  const projectId = data.project_id;
  const word = data.word;
  const context = data.context;
  const wordTranslation = data.word_translation;
  const contextTranslation = data.context_translation;
  const wordType = data.type;

  const { projects, isLoading: projectsIsLoading, error } = useProject();
  const projectName =
    projectId &&
    projects?.filter((project) => project.id === projectId)[0].name;

  const { state, dispatch: dispatchDictionary } = useDictionaryContext();
  const { wordContextIndex, itemsChecked, toggleUpdateIsOn } = state;

  const scorePercent = Math.round((data.score / data.games_played) * 100);

  const iconFavorite = data.favorite ? (
    <FavoriteIcon
      className="text-favorites-500 dark:text-favorites-500"
      sx={{ fontSize: 26 }}
    />
  ) : (
    <FavoriteBorderIcon
      className="text-neutral-300 dark:text-neutral-500"
      sx={{ fontSize: 26 }}
    />
  );

  const getColoredText = (_string, _substring) => {
    let coloredText = _string;
    if (!_substring) return _string;

    const stringPos = _string.toLowerCase().indexOf(_substring.toLowerCase());
    let middle = _substring;
    if (stringPos !== -1) {
      const start = _string.slice(0, stringPos);
      const middle = _string.slice(stringPos, stringPos + _substring.length);
      const end = _string.slice(stringPos + _substring.length, _string.length);
      coloredText = (
        <>
          {start}
          <span className="font-bold text-blue-700">{middle}</span>
          {end}
        </>
      );
    }

    return coloredText;
  };

  const wordIsIncomplete =
    (word.length > 0 && !wordTranslation.length > 0) ||
    (!word.length > 0 && wordTranslation.length > 0) ||
    (context.length > 0 && !contextTranslation.length > 0) ||
    (!context.length > 0 && contextTranslation.length > 0);

  const handleToggleUpdate = (position) => {
    const updatedCheckedStates = itemsChecked.map((item, index) =>
      index === position ? !item : item,
    );

    dispatchDictionary({
      type: "items/checked",
      payload: updatedCheckedStates,
    });
  };

  const ScoreResult = tw.p`${(p) =>
    scorePercent > 65
      ? "text-success-600 dark:text-success-500"
      : scorePercent < 33
        ? "text-error-600 dark:text-error-500"
        : "text-warning-600 dark:text-warning-500"}`;

  return (
    <CardContainer>
      <CardHeader>
        <FavoriteContainer>
          {toggleUpdateIsOn && (
            <Checkbox
              checked={itemsChecked[index]}
              index={index}
              handleOnChange={handleToggleUpdate}
            />
          )}
          {iconFavorite}
        </FavoriteContainer>

        <WordType>{wordType}</WordType>

        {wordIsIncomplete ? (
          <ProgressContainer>
            <Battery3BarIcon sx={{ fontSize: 26 }} />
          </ProgressContainer>
        ) : null}

        <ScoreContainer>
          {isNaN(scorePercent) ? (
            <BlockIcon
              sx={{ fontSize: 26 }}
              className="text-neutral-600 dark:text-neutral-400"
            />
          ) : scorePercent > 65 ? (
            <HappyFace filled={true} size={28} />
          ) : scorePercent < 35 ? (
            <SadFace filled={true} size={28} />
          ) : (
            <NeutralFace filled={true} size={28} />
          )}

          {!isNaN(scorePercent) && (
            <ScoreResult>{`${scorePercent}%`}</ScoreResult>
          )}
        </ScoreContainer>
      </CardHeader>
      <VocaContainer>
        {(wordContextIndex === 0 || wordContextIndex === 1) && (
          <WordContainer>{word.length > 0 ? word : null}</WordContainer>
        )}
        {(wordContextIndex === 0 || wordContextIndex === 2) && (
          <ContextContainer>
            {context.length > 0 ? context : null}
          </ContextContainer>
        )}
      </VocaContainer>
      <Divider />
      <VocaContainer>
        {(wordContextIndex === 0 || wordContextIndex === 1) && (
          <WordTranslationContainer>
            {wordTranslation.length > 0 ? wordTranslation : null}
          </WordTranslationContainer>
        )}

        {(wordContextIndex === 0 || wordContextIndex === 2) && (
          <ContextContainer>
            {contextTranslation.length > 0 ? contextTranslation : null}
          </ContextContainer>
        )}
      </VocaContainer>
    </CardContainer>
  );
}
