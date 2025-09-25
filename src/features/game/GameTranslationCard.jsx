import tw from "tailwind-styled-components";
import GameWordContext from "./GameWordContext";
import { useState } from "react";
import { useGameContext } from "../../contexts/GameContext";

const MainContainer = tw.div`grow flex flex-col m-4 bg-neutral-0 dark:bg-neutral-700 rounded-2xl shadow dark:shadow-neutral-600`;

export default function GameTranslationCard({ word, isLearningLanguage }) {
  const { state: stateGame, dispatch: dispatchGame } = useGameContext();
  const { isTranslationVisible } = stateGame;

  const titi = () => {
    dispatchGame({ type: "translationVisibility/displayed" });
  };

  return (
    <MainContainer
      style={{ filter: isTranslationVisible ? "" : "blur(4px)" }}
      onClick={titi}
    >
      <GameWordContext
        word={isLearningLanguage ? word.word : word.word_translation}
        context={isLearningLanguage ? word.context : word.context_translation}
      />
    </MainContainer>
  );
}
