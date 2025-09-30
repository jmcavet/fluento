import { useEffect, useState } from "react";
import { useProjectContext } from "../contexts/ProjectContext";
import {
  useUpdateVocabulary,
  useVocabularyPerUser,
} from "../features/vocabularies/useVocabulary";
import {
  useCategoriesPerUser,
  useDeleteCategory,
} from "../features/category/useCategory";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import tw from "tailwind-styled-components";
import ProjectSelection from "../features/projects/ProjectSelection";
import { useProject } from "../features/projects/useProject";
import { useLanguage } from "../features/languageSelection/useLanguages";
import LanguagesSingleSelection from "../features/languageSelection/LanguagesSingleSelection";
import Modal from "../ui/Modal";
import ModalDeleteCategory from "../features/category/ModalDeleteCategory";
import ModalEditCategory from "../features/category/ModalEditCategory";
import { useVocaFilterContext } from "../contexts/VocaFilterContext";

const MainContainer = tw.div`h-full flex flex-col items-align justify-between px-4 py-6 text-xl md:text-2xl`;
const Content = tw.div`flex flex-col items-align justify-between gap-6`;
const Category = tw.li`flex items-center justify-between bg-neutral-0 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 px-4 py-3 rounded-xl`;
const LanguageFilterContainer = tw.div`flex items-center justify-center`;

const Categories = () => {
  const { projects, isLoading: projectIsLoading } = useProject();
  const { vocabulary, isLoading: vocabularyIsLoading } = useVocabularyPerUser();
  const { categories, isLoading: categoryIsLoading } = useCategoriesPerUser();
  const [projectCategories, setProjectCategories] = useState(null);

  const { isUpdating, updateVocabulary } = useUpdateVocabulary();

  const { state: stateProject, dispatch: dispatchProject } =
    useProjectContext();
  const projectSelected = stateProject.projectSelected;

  const { dispatch: dispatchVocaFilter } = useVocaFilterContext();

  const { isDeleting, deleteCategory } = useDeleteCategory();

  const language = useLanguage();

  const languageNamesAll = projects?.map((project) => project.learningLanguage);
  const languageNames = [...new Set(languageNamesAll)];

  useEffect(() => {
    if (!projectSelected && projects) {
      const myProject = projects[0];
      dispatchProject({
        type: "project/selected",
        payload: myProject,
      });
    }

    const categoriesPerProject = categories?.filter(
      (cat) => cat.project_id === projectSelected.id,
    );

    setProjectCategories(categoriesPerProject);
  }, [projectSelected, projects, dispatchProject, categories]);

  // Define projects filtered by a specific language
  const projectsByLanguages = projects?.filter(
    (project) => project.learningLanguage === language,
  );

  // Handler when user clicks on a specific country flag
  const onHandleClickFlag = (index) => {
    const languageClicked = languageNames[index];

    dispatchVocaFilter({
      type: "language/selected",
      payload: languageClicked,
    });

    if (projectSelected.learningLanguage !== languageClicked) {
      const projectsByLanguages = projects?.filter(
        (project) => project.learningLanguage === languageClicked,
      );
      dispatchProject({
        type: "project/selected",
        payload: projectsByLanguages[0],
      });
    }
  };

  const getWordsToUpdate = (categoryId) => {
    const wordsToUpdate = vocabulary.filter((voca) =>
      voca.category_ids.includes(categoryId),
    );

    return wordsToUpdate;
  };

  const handleDeleteCategory = (categoryId) => {
    // 1. Delete the category by its id
    deleteCategory(categoryId);

    // 2. Remove the category id reference for all relevant words
    const wordsToUpdate = getWordsToUpdate(categoryId);

    wordsToUpdate.forEach((word) => {
      const index = word.category_ids.indexOf(categoryId);
      word.category_ids.splice(index, 1);
      const vocabularyObj = {
        id: word.id,
        category_ids: word.category_ids,
      };

      updateVocabulary(vocabularyObj);
    });
  };

  return (
    vocabulary &&
    projectSelected &&
    projectCategories && (
      <MainContainer>
        <Content>
          <LanguageFilterContainer>
            <LanguagesSingleSelection
              languageNames={languageNames}
              languageSelected={language}
              onHandleClickFlag={onHandleClickFlag}
            />
          </LanguageFilterContainer>

          <ProjectSelection projects={projectsByLanguages} />

          {projectCategories?.map((cat, index) => (
            <Category key={index}>
              {cat.name}
              <div className="flex items-center justify-between gap-6">
                <Modal>
                  <Modal.Open opens="edit-category">
                    <ModeEditOutlinedIcon
                      sx={{ fontSize: 28 }}
                      className="text-primary-500 dark:text-primary-500 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400"
                    />
                  </Modal.Open>
                  <Modal.Window name="edit-category">
                    <ModalEditCategory
                      categoryId={cat.id}
                      categoryName={cat.name}
                      projectCategories={projectCategories}
                    />
                  </Modal.Window>
                </Modal>

                <Modal>
                  <Modal.Open opens="delete-category">
                    <DeleteOutlineOutlinedIcon
                      sx={{ fontSize: 28 }}
                      className="text-error-500 dark:text-error-500 cursor-pointer hover:text-error-600 dark:hover:text-error-400"
                    />
                  </Modal.Open>
                  <Modal.Window name="delete-category">
                    <ModalDeleteCategory
                      wordsToUpdate={getWordsToUpdate(cat.id).length}
                      onConfirm={() => handleDeleteCategory(cat.id)}
                    />
                  </Modal.Window>
                </Modal>
              </div>
            </Category>
          ))}
        </Content>
      </MainContainer>
    )
  );
};

export default Categories;
