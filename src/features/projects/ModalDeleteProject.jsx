import tw from "tailwind-styled-components";
import ButtonsCancelConfirm from "../../ui/ButtonsCancelConfirm";
import Heading from "../../ui/Heading";
import Checkbox from "../../ui/Checkbox";
import { useDeleteProject, useProject } from "./useProject";
import {
  useDeleteMultipleVocabulary,
  useDeleteVocabulary,
} from "../vocabularies/useVocabulary";
import { useDeleteCategory } from "../category/useCategory";
import { useVocaContext } from "../../contexts/VocaContext";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useEffect, useState } from "react";

const MainContainer = tw.div`flex flex-col gap-6 w-[30rem] p-6 rounded-xl bg-neutral-0 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200`;
const Title = tw.div`text-neutral-800 dark:text-neutral-200 mb-8`;
const Span = tw.span`font-semibold`;

function ModalDeleteProject({
  onCloseModal,
  project,
  voca,
  vocaQuickies,
  categories,
}) {
  const { isDeleting: isDeletingProject, deleteProject } = useDeleteProject();
  const { deleteVocabulary } = useDeleteVocabulary();
  const { deleteMultipleVocabulary } = useDeleteMultipleVocabulary();
  const { deleteCategory } = useDeleteCategory();
  const { projects, isLoading: projectsIsLoading } = useProject();

  const { dispatch: dispatchProject } = useProjectContext();
  const [deletionEnabled, setDeletionEnabled] = useState(false);

  const projectsButSelected = projects.filter(
    (proj) =>
      proj.id !== project.id &&
      proj.learningLanguage === project.learningLanguage
  ).length;

  const quickiesToPotentiallyRemove = vocaQuickies?.filter(
    (voca) => voca.learningLanguage === project.learningLanguage
  );

  const handleDeleteProject = () => {
    // 1. Delete any words belonging to this project
    const vocaIdsToDelete = voca.map((obj) => obj.id);
    if (vocaIdsToDelete.length > 0) deleteMultipleVocabulary(vocaIdsToDelete);

    // 2. Delete any categories belonging to this project
    categories.forEach((obj) => deleteCategory(obj.id));

    // 3. Delete the project itself
    deleteProject(project.id);

    // 4. Remove our project's language from the languages state, only if the language of our project to be deleted is
    // nowhere to be found in all other projects
    // with the specific language
    const nbProjectsWithThisProjectLanguage = projects.filter(
      (obj) => obj.learningLanguage === project.learningLanguage
    ).length;

    // If our project to delete is the only one with this specific language, then reset the languages state
    if (nbProjectsWithThisProjectLanguage === 1) {
      dispatchProject({
        type: "languages/deleted",
        payload: project.learningLanguage,
      });
    }

    // When deleting the project with learningLanguage "German" for instance, it might happen that
    // none of the remaining projects will have this same learning language. If this is the case,
    // make sure to remove any quickies that still have this very same learningLanguage
    if (projectsButSelected === 0 && quickiesToPotentiallyRemove?.length > 0) {
      quickiesToPotentiallyRemove.forEach((obj) => deleteVocabulary(obj.id));
    }

    onCloseModal();
  };

  useEffect(() => {}, [isDeletingProject]);

  const spanWords =
    voca.length > 0 ? (
      <Span>
        {voca.length} {voca.length === 1 ? "word" : "words"}
      </Span>
    ) : null;
  const spanCategories =
    categories.length > 0 ? (
      <Span>
        {categories.length}{" "}
        {categories.length === 1 ? "category" : "categories"}{" "}
      </Span>
    ) : null;

  if (projectsIsLoading) return <p>LOADING...</p>;

  return (
    <MainContainer>
      <Heading as="h2">Delete Project</Heading>
      <Title>
        Are you sure you want to delete the
        <span className="text-error-600 dark:text-error-200 mx-2">
          {project.name}
        </span>
        project permanently?
      </Title>
      {(spanWords || spanCategories) && (
        <p className="bg-error-300 dark:bg-error-700 p-4 rounded-2xl">
          {spanWords} {spanWords && spanCategories ? "and" : null}{" "}
          {spanCategories} associated with this project will be removed
        </p>
      )}

      <Checkbox
        checked={deletionEnabled}
        handleOnChange={() => setDeletionEnabled((prev) => !prev)}
      >
        Enable deletion
      </Checkbox>

      <ButtonsCancelConfirm
        onCloseModal={onCloseModal}
        onConfirm={handleDeleteProject}
        disabled={!deletionEnabled}
        btnText="Delete"
        variation="danger"
      />
    </MainContainer>
  );
}

export default ModalDeleteProject;
