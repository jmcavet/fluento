import tw from "tailwind-styled-components";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useVocaFilterContext } from "../contexts/VocaFilterContext";
import { useUpdateVocabulary } from "../features/vocabularies/useVocabulary";

const ProgressContainer = tw.div`my-6`;
const ScoreBarContainer = tw.div`h-12 m-4 flex items-center justify-start bg-neutral-200 text-neutral-900 dark:bg-neutral-600 dark:text-neutral-900 rounded-xl`;

const MainContainer = tw.div`flex flex-col gap-6 h-full px-4 py-12 dark:bg-neutral-900 dark:text-neutral-0`;
const SubContainer = tw.div`flex flex-col gap-6 bg-neutral-0 dark:bg-neutral-800 p-4 m-4 rounded-xl`;
const Header = tw.div`flex items-center justify-between`;
const Label = tw.label`text-neutral-300 dark:text-neutral-500`;

const Incomplete = () => {
  const navigate = useNavigate();

  const { updateVocabulary } = useUpdateVocabulary();

  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();
  const words = stateVocaFilter.wordsToComplete;

  const [wordIncrement, setWordIncrement] = useState(0);
  const [word, setWord] = useState(words[0].word);
  const [context, setContext] = useState(words[0].context);
  const [wordTranslation, setWordTranslation] = useState(
    words[0].word_translation
  );
  const [contextTranslation, setContextTranslation] = useState(
    words[0].context_translation
  );

  const totalWords = words.length;
  const progressPercent = Math.round(((wordIncrement + 1) / totalWords) * 100);
  const ScoreBar = tw.div`h-full p-2 ${() =>
    progressPercent === 0
      ? "display-none text-transparent"
      : progressPercent === 100
      ? "flex items-center justify-center bg-primary-500 text-neutral-0 dark:bg-primary-500 rounded-2xl"
      : "flex items-center justify-center bg-primary-500 text-neutral-0 dark:bg-primary-500 rounded-l-2xl"}}`;

  const wordIsIncomplete =
    (word && !wordTranslation) ||
    (!word && wordTranslation) ||
    (context && !contextTranslation) ||
    (!context && contextTranslation);

  const handleCancel = () => navigate(-1);

  const handleNextWord = () => {
    const vocabularyObj = {
      id: words[wordIncrement].id,
      word,
      context,
      word_translation: wordTranslation,
      context_translation: contextTranslation,
    };

    updateVocabulary(vocabularyObj);

    if (wordIncrement + 1 === words.length) {
      navigate(-1);
      return;
    }

    setWordIncrement((prev) => prev + 1);
    setWord(words[wordIncrement + 1].word);
    setWordTranslation(words[wordIncrement + 1].word_translation);
    setContext(words[wordIncrement + 1].context);
    setContextTranslation(words[wordIncrement + 1].context_translation);
  };

  return (
    <MainContainer>
      <p className="text-4xl">Complete words</p>

      <ProgressContainer>
        <ScoreBarContainer>
          <ScoreBar
            style={{
              width: `${progressPercent}%`,
              height: "100%",
            }}
          >{`${progressPercent} %`}</ScoreBar>
        </ScoreBarContainer>

        <div className="flex items-center justify-center text-4xl mt-6">
          <span className="font-semibold mr-2">{wordIncrement + 1}</span>/
          {totalWords}
          <span className="text-2xl ml-4"> words</span>
        </div>
      </ProgressContainer>

      <SubContainer>
        <Header>
          <Label>Word</Label>
        </Header>
        <Input
          type="text"
          id="word"
          className="bg-transparent text-neutral-700 dark:text-neutral-200"
          autoComplete="off"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <Header>
          <Label>Context</Label>
        </Header>
        <Input
          type="text"
          id="context"
          className="bg-transparent text-neutral-700 dark:text-neutral-200"
          autoComplete="off"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <Header>
          <Label>Word translation</Label>
        </Header>
        <Input
          type="text"
          id="wordTranslation"
          className="bg-transparent text-neutral-700 dark:text-neutral-200"
          autoComplete="off"
          value={wordTranslation}
          onChange={(e) => setWordTranslation(e.target.value)}
        />
        <Header>
          <Label>Context translation</Label>
        </Header>
        <Input
          type="text"
          id="contextTranslation"
          className="bg-transparent text-neutral-700 dark:text-neutral-200"
          autoComplete="off"
          value={contextTranslation}
          onChange={(e) => setContextTranslation(e.target.value)}
        />
      </SubContainer>
      <div className="flex items-center justify-end gap-6">
        <Button
          size="medium"
          variation="primaryOutlined"
          disabled={false}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          variation="primary"
          disabled={wordIsIncomplete}
          onClick={handleNextWord}
        >
          Next
        </Button>
      </div>
    </MainContainer>
  );
};

export default Incomplete;
