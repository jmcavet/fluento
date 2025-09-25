import tw from "tailwind-styled-components";
import ButtonsCancelConfirm from "../../ui/ButtonsCancelConfirm";
import Heading from "../../ui/Heading";

const MainContainer = tw.div`flex flex-col gap-6 w-[30rem] p-6 rounded-xl bg-neutral-0 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200`;
const Title = tw.div`text-neutral-800 dark:text-neutral-200 mb-8`;

function ModalDeleteCategory({ onConfirm, onCloseModal, wordsToUpdate }) {
  return (
    <MainContainer>
      <Heading as="h2">Delete category</Heading>
      <Title>Are you sure you want to delete this category permanently?</Title>
      {wordsToUpdate > 0 && (
        <p className="text-error-600 dark:text-error-200">
          This category will be removed from
          <span className="font-semibold">{wordsToUpdate}</span>
          {wordsToUpdate === 1 ? " word" : " words"}
        </p>
      )}
      <ButtonsCancelConfirm
        onCloseModal={onCloseModal}
        onConfirm={onConfirm}
        btnText="Delete"
        variation="danger"
      />
    </MainContainer>
  );
}

export default ModalDeleteCategory;
