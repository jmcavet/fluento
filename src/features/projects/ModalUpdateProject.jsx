import tw from "tailwind-styled-components";
import ButtonsCancelConfirm from "../../ui/ButtonsCancelConfirm";
import Heading from "../../ui/Heading";
import FormRow from "../../ui/FormRow";
// import Input from "../../ui/Input";
import { useState } from "react";
import { useUpdateProject } from "./useProject";

const MainContainer = tw.div`flex flex-col gap-6 w-[30rem] p-6 rounded-xl bg-neutral-0 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200`;
const InputContainer = tw.div`flex flex-col`;
const Input = tw.input`bg-neutral-100 dark:bg-neutral-700 text-2xl text-neutral-800 dark:text-neutral-100 border-[1px] border-neutral-300 rounded-xl p-4`;
const Label = tw.label`text-neutral-300`;

function ModalUpdateProject({ project, onCloseModal }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const { isUpdating, updateProject } = useUpdateProject();

  const handleUpdateProject = () => {
    const projectObj = {
      id: project.id,
      name,
      description,
    };

    updateProject(projectObj);

    onCloseModal();
  };

  return (
    <MainContainer>
      <Heading as="h2">Update project</Heading>
      <FormRow label="project" className="bg-neutral-200 p-6">
        <InputContainer>
          <Label>Name</Label>
          <Input
            type="text"
            id="word"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Description</Label>
          <Input
            type="text"
            id="context"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputContainer>
      </FormRow>

      <ButtonsCancelConfirm
        onCloseModal={onCloseModal}
        onConfirm={() => handleUpdateProject()}
        btnText="Update"
        variation="primary"
      />
    </MainContainer>
  );
}

export default ModalUpdateProject;
