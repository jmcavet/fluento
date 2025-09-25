import tw from "tailwind-styled-components";

const MainContainer = tw.div`grow grid grid-rows-6 grid-cols-1 gap-4 m-4 rounded-2xl`;
const Word = tw.div`px-4 row-start-1 row-end-3 flex items-center justify-center border border-neutral-100 dark:border-neutral-600`;
const Context = tw.div`px-4 row-start-3 row-end-7 flex items-center justify-center border border-neutral-100 dark:border-neutral-600`;

export default function GameWordContext({ word, context }) {
  return (
    <MainContainer>
      <Word>{word}</Word>
      <Context>{context}</Context>
    </MainContainer>
  );
}
