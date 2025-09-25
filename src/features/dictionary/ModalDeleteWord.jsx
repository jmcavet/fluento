import tw from "tailwind-styled-components";
import ButtonsCancelConfirm from "../../ui/ButtonsCancelConfirm";
import Heading from "../../ui/Heading";
import { useDeleteVocabulary } from "../vocabularies/useVocabulary";

const MainContainer = tw.div`flex flex-col gap-6 w-[30rem] p-6 rounded-xl bg-neutral-0 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200`;
const Title = tw.div`text-neutral-800 dark:text-neutral-200 mb-8`;

function ModalDeleteWord({ resourceName, wordsToDelete, onCloseModal }) {
  const { isDeleting, deleteVocabulary } = useDeleteVocabulary();

  const handleDeleteWord = () => {
    wordsToDelete.forEach((word) => deleteVocabulary(word.id));
    onCloseModal();
  };

  return (
    <MainContainer>
      <Heading as="h2">Delete words</Heading>
      <Title>Are you sure you want to delete {resourceName} permanently?</Title>
      <ButtonsCancelConfirm
        onCloseModal={onCloseModal}
        onConfirm={handleDeleteWord}
        btnText="Delete"
        variation="danger"
      />
    </MainContainer>
  );
}

export default ModalDeleteWord;
