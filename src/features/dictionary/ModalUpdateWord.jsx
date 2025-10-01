import tw from "tailwind-styled-components";
import ButtonsCancelConfirm from "../../ui/ButtonsCancelConfirm";
import Input from "../../ui/Input";
import { useEffect, useState } from "react";
import { useUpdateVocabulary } from "../vocabularies/useVocabulary";
import { useProject } from "../projects/useProject";
import { MySelect, Select } from "../../ui/Select";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useCategoriesFilteredByProject } from "../category/useCategory";
import CategoryTagsTest from "../category/CategoryTagsTest";
import { useDictionaryContext } from "../../contexts/DictionaryContext";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";

const MainContainer = tw.div`flex flex-col grow gap-8 max-h-[90vh] dark:bg-neutral-900 dark:text-neutral-0`;
const Header = tw.div`grow-0 md:text-2xl`;
const MainContent = tw.div`overflow-scroll flex flex-col gap-4`;
const SubContainer = tw.div`flex flex-col gap-4 bg-neutral-0 dark:bg-neutral-800 p-4 rounded-xl`;
const ContainerHeader = tw.div`flex items-center justify-between`;
const Label = tw.label`text-xl md:text-2xl text-neutral-300 dark:text-neutral-500`;
const TextArea = tw.textarea`text-base md:text-lg border-[1px] border-neutral-200 rounded-lg px-4 py-2 bg-transparent text-neutral-700 dark:text-neutral-200`;
const CategoriesContainer = tw.div`flex items-center justify-start flex-wrap gap-3 md:gap-6 bg-transparent rounded-xl`;
const Footer = tw.div`grow-0`;

function ModalUpdateWord({ language, objWord, onCloseModal }) {
  const [showProjectInput, setShowProjectInput] = useState(false);
  const [showTypeInput, setShowTypeInput] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const [word, setWord] = useState(objWord.word);
  const [context, setContext] = useState(objWord.context);
  const [wordType, setWordType] = useState(objWord.type);
  const [wordTranslation, setWordTranslation] = useState(
    objWord.word_translation,
  );
  const [contextTranslation, setContextTranslation] = useState(
    objWord.context_translation,
  );
  const [favorite, setFavorite] = useState(objWord.favorite);

  const [tags, setTags] = useState(null);

  const { updateVocabulary } = useUpdateVocabulary();

  const { state: stateVocaFilter } = useVocaFilterContext();
  const vocaTypes = stateVocaFilter.wordTypes;

  const { state: stateDictionary, dispatch: dispatchDictionary } =
    useDictionaryContext();
  const itemsChecked = stateDictionary.itemsChecked;

  const { projects } = useProject();
  const projectsByLanguage = projects?.filter(
    (project) => project.learningLanguage === language,
  );

  // Define the list of options for the <select> html tag
  const projectsOptions = projectsByLanguage?.map((project) => project.name);

  // If the word is a "quicky": initialise the project with the first of all available for the language selected
  // Else: retrieve the project object (using 'project_id') from the word to be updated
  const initialProjectSelected = objWord.project_id
    ? projectsByLanguage?.filter(
        (project) => project.id === objWord.project_id,
      )[0].name
    : projectsOptions[0];

  const [myProjectSelected, setMyProjectSelected] = useState(
    initialProjectSelected,
  );

  const projectSelectedTest = projectsByLanguage?.filter(
    (project) => project.name === myProjectSelected,
  )[0];
  const projectId = projectSelectedTest.id;

  const categoriesByProject =
    useCategoriesFilteredByProject(projectSelectedTest);

  useEffect(() => {
    const tagsSelected = categoriesByProject?.map((cat) =>
      objWord.category_ids.includes(cat.id),
    );

    if (tagsSelected) setTags(tagsSelected);
  }, [categoriesByProject, objWord.category_ids]);

  const handleUpdateWord = () => {
    const categoriesIdsSelected = categoriesByProject
      .filter((cat, index) => tags[index])
      .map((cat) => cat.id);

    const vocabularyObj = {
      id: objWord.id,
      word,
      context,
      word_translation: wordTranslation,
      context_translation: contextTranslation,
      type: wordType,
      project_id: projectId,
      category_ids: categoriesIdsSelected,
      favorite: favorite,
    };

    updateVocabulary(vocabularyObj);

    // Once updated, uncheck the item (actually, all items)
    dispatchDictionary({
      type: "items/allUnchecked",
      payload: itemsChecked.length,
    });
    onCloseModal();
  };

  return (
    tags && (
      <MainContainer>
        <Header>Update word</Header>
        <MainContent>
          <SubContainer>
            <ContainerHeader>
              <Label>Word</Label>
            </ContainerHeader>
            <Input
              type="text"
              id="word"
              className="bg-transparent text-neutral-700 dark:text-neutral-200"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <ContainerHeader>
              <Label>Context</Label>
            </ContainerHeader>
            <TextArea
              rows="3"
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            ></TextArea>
            <ContainerHeader>
              <Label>Word translation</Label>
            </ContainerHeader>
            <Input
              type="text"
              id="wordTranslation"
              className="bg-transparent text-neutral-700 dark:text-neutral-200"
              value={wordTranslation}
              onChange={(e) => setWordTranslation(e.target.value)}
            />
            <ContainerHeader>
              <Label>Context translation</Label>
            </ContainerHeader>
            <TextArea
              rows="3"
              id="contextTranslation"
              value={contextTranslation}
              onChange={(e) => setContextTranslation(e.target.value)}
            ></TextArea>
          </SubContainer>

          <SubContainer>
            <ContainerHeader>
              <Label>Type</Label>
            </ContainerHeader>
            <Select
              options={vocaTypes}
              value={wordType}
              onChange={(e) => setWordType(e.target.value)}
            />
          </SubContainer>

          <SubContainer>
            <ContainerHeader>
              <Label>Project</Label>
            </ContainerHeader>
            <MySelect
              options={projectsOptions}
              value={myProjectSelected}
              onChange={(e) => setMyProjectSelected(e.target.value)}
            />
          </SubContainer>

          <SubContainer>
            <ContainerHeader>
              <Label>Categories</Label>
            </ContainerHeader>
            <CategoriesContainer>
              <CategoryTagsTest
                categories={categoriesByProject}
                tags={tags}
                setTags={setTags}
              />
            </CategoriesContainer>
          </SubContainer>

          <SubContainer>
            <ContainerHeader>
              <Label>Favorites</Label>
            </ContainerHeader>
            {favorite ? (
              <FavoriteIcon
                sx={{ fontSize: 26 }}
                onClick={() => setFavorite((prev) => !prev)}
                className="text-favorites-500"
              />
            ) : (
              <FavoriteBorderIcon
                sx={{ fontSize: 26 }}
                onClick={() => setFavorite((prev) => !prev)}
              />
            )}
          </SubContainer>
        </MainContent>
        <Footer>
          <ButtonsCancelConfirm
            onCloseModal={onCloseModal}
            onConfirm={() => handleUpdateWord()}
            btnText="Update"
            variation="primary"
          />
        </Footer>
      </MainContainer>
    )
  );
}

export default ModalUpdateWord;
