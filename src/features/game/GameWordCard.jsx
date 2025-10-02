import tw from "tailwind-styled-components";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Battery3BarIcon from "@mui/icons-material/Battery3Bar";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BlockIcon from "@mui/icons-material/Block";

import { HappyFace, NeutralFace, SadFace } from "../../ui/SmileysIcons";
import Modal from "../../ui/Modal";
import GameWordContext from "./GameWordContext";
import CategoryTags from "./CategoryTags";
import { useCategoriesPerUser } from "../category/useCategory";
import ModalUpdateWord from "../dictionary/ModalUpdateWord";
import ModalDeleteWord from "../dictionary/ModalDeleteWord";
import { useDeleteVocabulary } from "../vocabularies/useVocabulary";
import { useGameContext } from "../../contexts/GameContext";

const MainContainer = tw.div`grow flex flex-col mx-4 my-2 bg-neutral-0 dark:bg-neutral-700 rounded-2xl shadow dark:shadow-neutral-600`;

const Header = tw.div`grow-0 grid grid-cols-12 grid-rows-1 p-2 text-neutral-600 dark:text-neutral-300 border-b border-b-neutral-100 dark:border-b-neutral-500 rounded-t-xl`;
const Favorite = tw.div`col-start-1 col-end-5`;
const Incomplete = tw.div`col-start-5 col-end-9 flex items-center justify-center text-error-500 dark:text-error-500`;
const Score = tw.div`col-start-9 col-end-13 flex items-center justify-end`;

const Footer = tw.div`grow-0 grid grid-cols-12 grid-rows-1 items-center p-4 text-neutral-600 dark:text-neutral-300 border-t border-t-neutral-100 dark:border-t-neutral-500 rounded-b-xl`;
const WordType = tw.div`col-start-1 col-end-5`;
const Categories = tw.div`col-start-5 col-end-9 flex items-center justify-center gap-6`;
const Actions = tw.div`col-start-9 col-end-13 flex items-center justify-end gap-4`;

export default function GameWordCard({ word, isLearningLanguage }) {
  const { categories, isLoading: categoriesIsLoading } = useCategoriesPerUser();

  const { state: stateGame, dispatch: dispatchGame } = useGameContext();
  const { wordIncrement, totalWords } = stateGame;

  const iconFavorite = word.favorite ? (
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

  const score = (word.score / word.games_played) * 100;

  const wordIsIncomplete =
    (word.word.length > 0 && !word.word_translation.length > 0) ||
    (!word.word.length > 0 && word.word_translation.length > 0) ||
    (word.context.length > 0 && !word.context_translation.length > 0) ||
    (!word.context.length > 0 && word.context_translation.length > 0);

  const wordCategories = categories?.filter((category) =>
    word.category_ids.includes(category.id),
  );

  const handleDeleteWord = () => {
    dispatchGame({ type: "word/deleted", payload: word.id });
  };

  return (
    <MainContainer>
      <Header>
        <Favorite>{iconFavorite}</Favorite>

        {wordIsIncomplete && (
          <Incomplete>
            <Battery3BarIcon sx={{ fontSize: 26 }} />
          </Incomplete>
        )}

        <Score>
          {isNaN(score) ? (
            <BlockIcon
              sx={{ fontSize: 26 }}
              className="text-neutral-600 dark:text-neutral-400"
            />
          ) : score > 66 ? (
            <HappyFace size="26" filled={true} />
          ) : score < 33 ? (
            <SadFace size="26" filled={true} />
          ) : (
            <NeutralFace size="26" filled={true} />
          )}

          {!isNaN(score) && <div>{Math.round(score)}%</div>}
        </Score>
      </Header>

      <GameWordContext
        word={isLearningLanguage ? word.word_translation : word.word}
        context={isLearningLanguage ? word.context_translation : word.context}
      />

      <Footer>
        <WordType>{word.type}</WordType>
        <Categories>
          <CategoryTags categories={wordCategories} />
        </Categories>
        <Actions>
          <Modal>
            <Modal.Open opens="edit-game-word">
              <ModeEditOutlinedIcon
                sx={{ fontSize: 26 }}
                className="text-primary-500 dark:text-primary-500"
              />
            </Modal.Open>
            <Modal.Window name="edit-game-word">
              <ModalUpdateWord
                language={word.learningLanguage}
                objWord={word}
              />
            </Modal.Window>
          </Modal>
          {/* <Modal>
            <Modal.Open opens="delete-game-word">
              <DeleteOutlineOutlinedIcon
                sx={{ fontSize: 26 }}
                className="text-error-500"
              />
            </Modal.Open>
            <Modal.Window name="delete-game-word">
              <ModalDeleteWord
                resourceName={"this word"}
                wordsToDelete={[word]}
              />
            </Modal.Window>
          </Modal> */}
          <DeleteOutlineOutlinedIcon
            sx={{ fontSize: 26 }}
            className="text-error-500"
            onClick={handleDeleteWord}
          />
        </Actions>
      </Footer>
    </MainContainer>
  );
}
