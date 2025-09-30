import tw from "tailwind-styled-components";
import ButtonsCancelConfirm from "../../ui/ButtonsCancelConfirm";
import Heading from "../../ui/Heading";
import FormRow from "../../ui/FormRow";
import { useState } from "react";
import { useUpdateCategory } from "./useCategory";

const MainContainer = tw.div`flex flex-col gap-6 mx-auto p-6 rounded-xl bg-neutral-0 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200`;
const InputContainer = tw.div`flex flex-col`;
const Input = tw.input`bg-neutral-100 dark:bg-neutral-700 text-2xl text-neutral-800 dark:text-neutral-100 border-[1px] border-neutral-300 rounded-xl p-4`;
const Label = tw.label`text-neutral-300`;

function ModalEditCategory({
  onCloseModal,
  categoryId,
  categoryName,
  projectCategories,
}) {
  const [name, setName] = useState(categoryName);
  const [errors, setErrors] = useState({
    name: { message: "" },
  });

  const { isUpdating, updateCategory } = useUpdateCategory();

  const handleUpdateCategory = () => {
    const categoryObj = {
      id: categoryId,
      name,
    };

    const projectCategoriesNames = projectCategories?.map((cat) => cat.name);
    if (projectCategoriesNames?.includes(name)) {
      setErrors({
        name: { message: `${name} already exists. Provide another name.` },
      });
    } else {
      updateCategory(categoryObj);
      onCloseModal();
    }
  };

  return (
    <MainContainer>
      <Heading as="h2">Update category</Heading>
      <FormRow
        label=""
        className="bg-neutral-200 p-6"
        error={errors?.name?.message}
      >
        <InputContainer>
          <Label>Name</Label>
          <Input
            type="text"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>
      </FormRow>

      <ButtonsCancelConfirm
        onCloseModal={onCloseModal}
        onConfirm={() => handleUpdateCategory()}
        btnText="Update"
        variation="primary"
      />
    </MainContainer>
  );
}

export default ModalEditCategory;
