import React from "react";
import { useDictionaryContext } from "../../contexts/DictionaryContext";
import tw from "tailwind-styled-components";

const MainContainer = tw.div`flex items-center justify-center gap-2 text-2xl lg:gap-8`;

const WordButton = tw.button`${(p) =>
  p.$wordTagIsSelected
    ? "bg-blue-800 text-blue-100"
    : "bg-white text-blue-800 border-blue-800"} px-4 py-2 border border-solid rounded-2xl`;

const ContextButton = tw.button`${(p) =>
  p.$contextTagIsSelected
    ? "bg-blue-800 text-blue-100"
    : "bg-white text-blue-800 border-blue-800"} px-4 py-2 border border-solid rounded-2xl`;

export default function WordContextTags() {
  const { state, dispatch } = useDictionaryContext();
  const { wordTagIsSelected, contextTagIsSelected } = state;

  const onToggleWord = () => {
    const payload = { wordTagIsSelected: !wordTagIsSelected };

    // Both word and context Tags cannot be disactivated at the same time.
    if (
      (wordTagIsSelected && contextTagIsSelected) ||
      (!wordTagIsSelected && !contextTagIsSelected)
    )
      payload.contextTagIsSelected = contextTagIsSelected;
    else payload.contextTagIsSelected = true;

    dispatch({
      type: "wordContextTags/selected",
      selection: payload,
    });
  };

  const onToggleContext = () => {
    const payload = { contextTagIsSelected: !contextTagIsSelected };

    // Both word and context Tags cannot be disactivated at the same time.
    if (
      (wordTagIsSelected && contextTagIsSelected) ||
      (!wordTagIsSelected && !contextTagIsSelected)
    )
      payload.wordTagIsSelected = wordTagIsSelected;
    else payload.wordTagIsSelected = true;

    dispatch({
      type: "wordContextTags/selected",
      selection: payload,
    });
  };

  return (
    <MainContainer>
      <WordButton $wordTagIsSelected={wordTagIsSelected} onClick={onToggleWord}>
        Word
      </WordButton>
      <ContextButton
        $contextTagIsSelected={state.contextTagIsSelected}
        onClick={onToggleContext}
      >
        Context
      </ContextButton>
    </MainContainer>
  );
}
