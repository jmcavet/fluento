import tw from "tailwind-styled-components";
import ButtonsCancelConfirm from "../../ui/ButtonsCancelConfirm";
import Heading from "../../ui/Heading";
import FormRow from "../../ui/FormRow";
// import Input from "../../ui/Input";
import { useState } from "react";
import { useUser } from "../authentification/useUser";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useCreateCategory } from "../category/useCategory";

const MainContainer = tw.div`flex flex-col gap-6 w-[30rem] p-6 rounded-xl bg-neutral-0 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200`;
const Input = tw.input`bg-neutral-100 dark:bg-neutral-700 text-2xl text-neutral-800 dark:text-neutral-100 border-[1px] border-neutral-300 rounded-xl p-4`;

function ModalCreateCategory({ onConfirm, onCloseModal }) {
  const [categoryName, setCategoryName] = useState("");

  const { user } = useUser();
  const { state } = useProjectContext();
  const projectSelected = state.projectSelected;
  const { createCategory, isPending } = useCreateCategory();
  const [errors, setErrors] = useState({
    name: { message: "" },
  });

  const handleAddCategory = () => {
    const categoryObj = {
      name: categoryName,
      project_id: projectSelected.id,
      user_id: user.id,
    };

    createCategory(categoryObj);

    onCloseModal();
  };

  return (
    <MainContainer>
      <Heading as="h2">Create new category</Heading>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </FormRow>
      <ButtonsCancelConfirm
        onCloseModal={onCloseModal}
        onConfirm={handleAddCategory}
        btnText="Create"
        variation="primary"
        disabled={categoryName.length === 0}
      />
    </MainContainer>
  );
}

export default ModalCreateCategory;
