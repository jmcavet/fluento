import { useNavigate } from "react-router-dom";

import tw from "tailwind-styled-components";
import styled from "styled-components";
import Button from "../../ui/Button";

import { HappyFace, NeutralFace, SadFace } from "../../ui/SmileysIcons";
import HomeIcon from "@mui/icons-material/Home";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { useGameContext } from "../../contexts/GameContext";
import { useDeleteMultipleVocabulary } from "../vocabularies/useVocabulary";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3.2rem 2rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const MainContainer = tw.div`flex flex-col items-center justify-center gap-16 w-[35rem] p-6 rounded-xl text-2xl bg-neutral-0 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200`;
const Header = tw.div`flex flex-col items-center justify-center gap-8`;
const Title = tw.p`text-4xl`;
const Message = tw.div`text-3xl mt-6 flex items-center justify-between gap-6`;
const ProgressContainer = tw.div`flex flex-col items-center justify-center`;
const Actions = tw.div`w-full flex items-center justify-end gap-6`;
const ValidateDeletion = tw.div`flex items-center justify-between gap-2`;

export default function ModalResult({
  isModalOpen,
  onClose,
  scoreToBeat,
  scoreLive,
}) {
  const [validateDeletion, setValidateDeletion] = useState(true);

  const { isDeleting: isDeletingMultipleVocabulary, deleteMultipleVocabulary } =
    useDeleteMultipleVocabulary();

  const { state: stateGame, dispatch: dispatchGame } = useGameContext();
  const wordIdsToDelete = stateGame.wordIdsToDelete;

  const navigate = useNavigate();

  const scoreDelta = scoreLive - scoreToBeat;

  const Progress = tw.div`${(p) =>
    p.$positive
      ? "text-success-500"
      : "text-error-500"} flex items-center justify-center gap-6 text-3xl font-semibold ml-2`;

  const handleGoHome = () => {
    completeDeletion();

    navigate("/");
  };

  const completeDeletion = () => {
    validateDeletion &&
      wordIdsToDelete.length > 0 &&
      deleteMultipleVocabulary(wordIdsToDelete);
  };

  const handlePlay = () => {
    completeDeletion();

    dispatchGame({ type: "game/reset" });

    onClose();
  };

  return (
    isModalOpen && (
      <Overlay>
        <Modal>
          <MainContainer>
            <Title>Final Score</Title>
            <Header>
              <Message>
                {scoreLive > 66
                  ? "Congratulations!"
                  : scoreLive < 33
                  ? "Oh noooo!"
                  : "You can do better!"}
              </Message>
              <div className="text-4xl font-semibold flex items-center justify-between gap-6">
                <span className="text-success-500">
                  {scoreLive > 66 ? (
                    <HappyFace filled={true} sx={{ fontSize: 32 }} />
                  ) : scoreLive < 33 ? (
                    <SadFace filled={true} sx={{ fontSize: 32 }} />
                  ) : (
                    <NeutralFace filled={true} sx={{ fontSize: 32 }} />
                  )}
                </span>
                {Math.round(scoreLive)}%
              </div>
            </Header>

            {!isNaN(scoreDelta) && (
              <ProgressContainer>
                <div className="leading-[3.5rem] px-12">
                  <p className="text-center mb-4">
                    Since your last game, you have
                    {scoreDelta > 0 ? " improved" : " worsened"} your score by
                  </p>
                  <Progress $positive={scoreDelta > 0}>
                    {Math.round(scoreDelta)}%
                    {scoreDelta > 0 ? (
                      <TrendingUpIcon
                        sx={{ fontSize: 32 }}
                        className="bg-success-200 text-success-500 border border-success-500 dark:bg-success-800 dark:text-success-500 dark:border-success-500 rounded-full"
                      />
                    ) : (
                      <TrendingDownIcon
                        sx={{ fontSize: 32 }}
                        className="bg-error-200 text-error-500 border border-error-500 dark:bg-error-800 dark:text-error-500 dark:border-error-500 rounded-full"
                      />
                    )}
                  </Progress>
                </div>
              </ProgressContainer>
            )}

            {wordIdsToDelete.length > 0 ? (
              <ValidateDeletion>
                <Checkbox
                  checked={validateDeletion}
                  handleOnChange={() => setValidateDeletion((prev) => !prev)}
                />
                <p
                  className={`${
                    validateDeletion ? "text-primary-500" : "text-neutral-300"
                  }`}
                >
                  Delete those {wordIdsToDelete.length} words?
                </p>
              </ValidateDeletion>
            ) : null}

            <Actions>
              <Button
                variation="primaryOutlined"
                onClick={() => handleGoHome()}
              >
                <HomeIcon sx={{ fontSize: 20 }} />
                Home
              </Button>

              <Button variation="primary" onClick={handlePlay}>
                <SportsEsportsIcon sx={{ fontSize: 20 }} />
                Play
              </Button>
            </Actions>
          </MainContainer>
        </Modal>
      </Overlay>
    )
  );
}
