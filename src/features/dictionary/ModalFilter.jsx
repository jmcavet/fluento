import tw from "tailwind-styled-components";
import ButtonsCancelConfirm from "../../ui/ButtonsCancelConfirm";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";

import { HappyFace, NeutralFace, SadFace } from "../../ui/SmileysIcons";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import BlockIcon from "@mui/icons-material/Block";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import Battery3BarIcon from "@mui/icons-material/Battery3Bar";

import { Favorite } from "../../ui/FavoriteIcons";
import { useGameContext } from "../../contexts/GameContext";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";

const MainContainer = tw.div`flex flex-col gap-6 min-w-[85vw] max-h-[95vh] overflow-scroll`;
const LinkReset = tw.div`flex items-center justify-between gap-4 w-fit text-primary-500 dark:text-primary-500 text-4xl`;
const SubContainer = tw.div`flex flex-col gap-6 bg-neutral-0 dark:bg-neutral-800 p-4 rounded-xl`;
const Header = tw.div`flex items-center justify-between`;
const Label = tw.label`text-neutral-400 dark:text-neutral-300`;
const TagsContainer = tw.div`flex items-center flex-wrap gap-4`;
const Container = tw.div`flex items-center gap-6`;
const IncompletesContainer = tw.div`flex items-center gap-6`;
const TwoItemsContainer = tw.div`flex items-center justify-between gap-10`;
const ScoreContainer = tw.div`flex items-center gap-10`;
const ScoreBarContainer = tw.div`w-full h-14 flex items-center justify-start bg-neutral-200 dark:bg-neutral-700 rounded-xl mt-8 mb-2`;

function ModalFilter({ myVoca, onCloseModal }) {
  const { state: stateGame } = useGameContext();

  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();

  // Define your vocabulary filtered by the project type ("allProjects", "singleProject", "quickies")
  let vocaByProjectType;
  if (stateGame.projectType === "allProjects") {
    vocaByProjectType = myVoca?.filter((obj) => obj.project_id);
  } else {
    vocaByProjectType = myVoca?.filter((obj) => !obj.project_id);
  }

  const Tag = tw.div`${(props) =>
    props.$selected ? "bg-primary-500 text-neutral-0" : "bg-transparent"}
    border border-primary-500 border-[1px] px-4 py-2 w-fit rounded-2xl`;

  // Define the states with the useState hook. No need here for the dispatch method, since it will
  // be actually used at the end, when the user confirms the filter selection
  const [myTypes, setMyTypes] = useState(stateVocaFilter.wordTypes);

  const [myCategories, setMyCategories] = useState(
    stateVocaFilter.categoriesFiltered
  );

  const [scoreIcon, setScoreIcon] = useState(stateVocaFilter.scoresFiltered);
  const [favoriteIcon, setFavoriteIcon] = useState(
    stateVocaFilter.favoriteFiltered
  );
  const [progressIcon, setProgressIcon] = useState(
    stateVocaFilter.progressFiltered
  );

  const [allTypesIsChecked, setAllTypesIsChecked] = useState(true);
  const [allCategoriesIsChecked, setAllCategoriesIsChecked] = useState(true);
  const [allScoresAreChecked, setAllScoresAreChecked] = useState(true);

  const handleClickTypeTag = (index) => {
    const newArray = [...myTypes];
    newArray[index].selected = !newArray[index].selected;
    setMyTypes(newArray);

    const nbTagsChecked = newArray.filter((obj) => obj.selected).length;
    const nbTagsNotChecked = newArray.filter((obj) => !obj.selected).length;
    if (nbTagsChecked === 0) setAllTypesIsChecked(false);
    if (nbTagsNotChecked === 0) setAllTypesIsChecked(true);
  };

  const handleSelectAllTypes = () => {
    setAllTypesIsChecked((prev) => !prev);
    const newArray = [...myTypes];
    newArray.forEach((obj) => (obj.selected = !allTypesIsChecked));
    setMyTypes(newArray);
  };

  const handleClickCategoryTag = (index) => {
    // For the specific index, update (toggle) the 'selected' property of the corresponding category object
    // For all other objects, return them as they are
    const categoriesFiltered = myCategories.map((el, arrayIndex) => {
      return index === arrayIndex ? { ...el, selected: !el.selected } : el;
    });

    setMyCategories(categoriesFiltered);

    const nbTagsChecked = categoriesFiltered.filter(
      (obj) => obj.selected
    ).length;
    const nbTagsNotChecked = categoriesFiltered.filter(
      (obj) => !obj.selected
    ).length;
    if (nbTagsChecked === 0) setAllCategoriesIsChecked(false);
    if (nbTagsNotChecked === 0) setAllCategoriesIsChecked(true);
  };

  const handleSelectAllCategories = () => {
    setAllCategoriesIsChecked((prev) => !prev);
    const newArray = [...myCategories];
    newArray.forEach((obj) => (obj.selected = !allCategoriesIsChecked));
    setMyCategories(newArray);
  };

  const handleSelectAllScores = () => {
    setAllScoresAreChecked((prev) => !prev);

    setScoreIcon((prev) => ({
      ...prev,
      ["happy"]: !allScoresAreChecked,
      ["neutral"]: !allScoresAreChecked,
      ["sad"]: !allScoresAreChecked,
      ["none"]: !allScoresAreChecked,
    }));
  };

  const myTypesSelected = myTypes
    .filter((obj) => obj.selected)
    .map((obj) => obj.label.toLowerCase());

  const myCategoriesSelected = myCategories
    ?.filter((obj) => obj.selected)
    .map((obj) => obj.id);

  const wordsFiltered = vocaByProjectType?.filter((obj) => {
    // 1. Calculate the intersection between the categories selected by user and those for each word.
    // If user has not defined a category, consider it to be shown ('999' is just to make the intersection length > 0)
    const intersection =
      obj.category_ids?.length === 0
        ? [999]
        : myCategoriesSelected?.filter((x) => obj.category_ids.includes(x));

    // 2. Get the intersection's length: if > 0, at least 1 category could be found
    const atLeastOneCategoryExists = intersection?.length > 0;

    //3. Check whether the word's type can be found in the list of types selected by user
    const typeExists = myTypesSelected?.includes(obj.type);

    // 4. Check whether the word's score (in % of games played) corresponds to the score range selected (via emoticons)
    const scorePercent = (obj.score / obj.games_played) * 100;
    const checkScoreHappy = scoreIcon.happy ? scorePercent > 66 : false;
    const checkScoreNeutral = scoreIcon.neutral
      ? scorePercent > 33 && scorePercent < 66
      : false;
    const checkScoreSad = scoreIcon.sad ? scorePercent < 33 : false;
    const checkScoreNone = scoreIcon.none ? obj.games_played === 0 : false;

    const scoreMatchesSelection =
      checkScoreHappy || checkScoreNeutral || checkScoreSad || checkScoreNone;

    // 5. Check whether favorites are included or/and included
    let favoriteIsChecked;
    if (favoriteIcon.included && favoriteIcon.excluded) {
      favoriteIsChecked = true;
    } else if (favoriteIcon.included && !favoriteIcon.excluded) {
      favoriteIsChecked = obj.favorite ? true : false;
    } else if (!favoriteIcon.included && favoriteIcon.excluded) {
      favoriteIsChecked = obj.favorite ? false : true;
    } else {
      favoriteIsChecked = false;
    }

    //6. Check whether the progress icons are complete and/or incomplete
    const wordIsComplete =
      (obj.word && !obj.word_translation) ||
      (!obj.word && obj.word_translation) ||
      (obj.context && !obj.context_translation) ||
      (!obj.context && obj.context_translation)
        ? false
        : true;

    let progressIsChecked;
    if (progressIcon.complete && progressIcon.incomplete) {
      progressIsChecked = true;
    } else if (progressIcon.complete && !progressIcon.incomplete) {
      progressIsChecked = wordIsComplete ? true : false;
    } else if (!progressIcon.complete && progressIcon.incomplete) {
      progressIsChecked = wordIsComplete ? false : true;
    } else {
      progressIsChecked = false;
    }

    // 7. Return true if both conditions above are met
    return stateVocaFilter.projectType === "quickies"
      ? true // Quickies have neither types nor categories defined!
      : typeExists &&
          atLeastOneCategoryExists &&
          scoreMatchesSelection &&
          favoriteIsChecked &&
          progressIsChecked;
  });

  const progressPercent = Math.round(
    (wordsFiltered.length / vocaByProjectType.length) * 100
  ).toFixed(0);

  const handleApplyFilter = () => {
    const filterTypesIsOn =
      myTypes?.length !== myTypes?.filter((obj) => obj.selected).length;

    const filterCategoriesIsOn =
      myCategories?.length !==
      myCategories?.filter((obj) => obj.selected).length;

    const filterFavoriteIsOn =
      favoriteIcon.included && favoriteIcon.excluded ? false : true;

    const filterScoreIsOn =
      scoreIcon.happy && scoreIcon.neutral && scoreIcon.sad && scoreIcon.none
        ? false
        : true;

    const filterProgressIsOn =
      progressIcon.complete && progressIcon.incomplete ? false : true;

    const nbFiltersOn =
      filterTypesIsOn +
      filterCategoriesIsOn +
      filterFavoriteIsOn +
      filterScoreIsOn +
      filterProgressIsOn;

    // Define those words that are filtered out by the user selection of types, categories, etc.
    const wordsIdsFiltered = wordsFiltered.map((obj) => obj.id);
    const wordsIdsFilteredOut = vocaByProjectType
      .filter((obj) => !wordsIdsFiltered.includes(obj.id))
      .map((obj) => obj.id);

    const payload = {
      wordTypes: myTypes,
      categories: myCategories,
      favoriteIcon,
      progressIcon,
      scoreIcon,
      nbFiltersOn,
      wordsIdsFilteredOut,
    };

    dispatchVocaFilter({ type: "filter/applied", payload: payload });

    onCloseModal();
  };

  const handleResetModal = () => {
    const typesClone = [...myTypes];
    typesClone.forEach((obj) => (obj.selected = true));
    setMyTypes((prev) => typesClone);

    const categoriesClone = [...myCategories];
    categoriesClone.forEach((obj) => (obj.selected = true));

    dispatchVocaFilter({
      type: "categories/filtered",
      payload: categoriesClone,
    });

    scoreIcon.happy = true;
    scoreIcon.neutral = true;
    scoreIcon.sad = true;
    scoreIcon.none = true;
    setScoreIcon(scoreIcon);

    favoriteIcon.included = true;
    favoriteIcon.excluded = true;
    setFavoriteIcon(favoriteIcon);

    progressIcon.complete = true;
    progressIcon.incomplete = true;
    setProgressIcon(progressIcon);

    if (!allTypesIsChecked) handleSelectAllTypes();
    if (!allCategoriesIsChecked) handleSelectAllCategories();
    if (!allScoresAreChecked) handleSelectAllScores();
  };

  const handleClickFace = (emotion) => {
    const gerard = { ...scoreIcon };
    gerard[emotion] = !gerard[emotion];
    setScoreIcon(gerard);

    const toto = Object.values(gerard);
    const nbScoresChecked = toto.filter((val) => val === true).length;
    const nbScoresNotchecked = toto.filter((val) => val === false).length;
    if (nbScoresChecked === 0) setAllScoresAreChecked(false);
    if (nbScoresNotchecked === 0) setAllScoresAreChecked(true);
  };

  const handleClickFavorite = (type) => {
    const gerard = { ...favoriteIcon };
    gerard[type] = !gerard[type];
    setFavoriteIcon(gerard);
  };

  const handleClickProgress = (type) => {
    const gerard = { ...progressIcon };
    gerard[type] = !gerard[type];
    setProgressIcon(gerard);
  };

  return (
    <MainContainer>
      {stateVocaFilter.projectType !== "quickies" && (
        <>
          <SubContainer>
            <Header>
              <Label>Type</Label>
              <Checkbox
                checked={allTypesIsChecked}
                handleOnChange={handleSelectAllTypes}
              >
                All
              </Checkbox>
            </Header>
            <TagsContainer>
              {myTypes.map((obj, index) => (
                <Tag
                  $selected={obj.selected}
                  key={index}
                  onClick={() => handleClickTypeTag(index)}
                >
                  {obj.label}
                </Tag>
              ))}
            </TagsContainer>
          </SubContainer>
          <SubContainer>
            <Header>
              <Label>Category</Label>
              <Checkbox
                checked={allCategoriesIsChecked}
                handleOnChange={handleSelectAllCategories}
              >
                All
              </Checkbox>
            </Header>
            <TagsContainer>
              {myCategories.map((obj, index) => (
                <Tag
                  $selected={obj.selected}
                  key={index}
                  onClick={() => handleClickCategoryTag(index)}
                >
                  {obj.name}
                </Tag>
              ))}
            </TagsContainer>
          </SubContainer>
          <SubContainer>
            <Header>
              <Label>Score</Label>
              <Checkbox
                checked={allScoresAreChecked}
                handleOnChange={handleSelectAllScores}
              >
                All
              </Checkbox>
            </Header>
            <ScoreContainer>
              <HappyFace
                filled={scoreIcon.happy}
                handleClick={() => handleClickFace("happy")}
              />
              <NeutralFace
                filled={scoreIcon.neutral}
                handleClick={() => handleClickFace("neutral")}
              />
              <SadFace
                filled={scoreIcon.sad}
                handleClick={() => handleClickFace("sad")}
              />

              {/* <NoScore
                  filled={scoreIcon.none}
                  handleClick={() => handleClickFace("none")}
                /> */}
              <div onClick={() => handleClickFace("none")}>
                <BlockIcon
                  sx={{ fontSize: 42 }}
                  className={`${
                    scoreIcon.none
                      ? "text-neutral-800 dark:text-neutral-100"
                      : "text-neutral-300 dark:text-neutral-600"
                  }`}
                />
              </div>
            </ScoreContainer>
          </SubContainer>
          <SubContainer>
            <Header>
              <Label>Favorites</Label>
              <Label>Completion</Label>
            </Header>
            <TwoItemsContainer>
              <Container>
                <Favorite
                  type="included"
                  selected={favoriteIcon.included}
                  handleClick={() => handleClickFavorite("included")}
                />
                <Favorite
                  type="excluded"
                  selected={favoriteIcon.excluded}
                  handleClick={() => handleClickFavorite("excluded")}
                />
              </Container>
              <IncompletesContainer>
                <BatteryFullIcon
                  sx={{ fontSize: 42 }}
                  className={`${
                    progressIcon.complete
                      ? "text-success-500 dark:text-success-500"
                      : "text-neutral-200 dark:text-neutral-600"
                  }`}
                  onClick={() => handleClickProgress("complete")}
                />
                <Battery3BarIcon
                  sx={{ fontSize: 42 }}
                  className={`${
                    progressIcon.incomplete
                      ? "text-error-500 dark:text-error-500"
                      : "text-neutral-200 dark:text-neutral-600"
                  }`}
                  onClick={() => handleClickProgress("incomplete")}
                />
              </IncompletesContainer>
            </TwoItemsContainer>
          </SubContainer>

          <ScoreBarContainer>
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
              }}
              className={
                progressPercent === "0"
                  ? "display-none text-transparent"
                  : "flex items-center justify-center bg-accent-500 text-neutral-0 dark:bg-accent-500 dark:text-neutral-0 rounded-xl"
              }
            >
              {`${progressPercent} %`}
            </div>
          </ScoreBarContainer>
        </>
      )}

      <div className="flex items-center justify-center mb-2 text-neutral-600 dark:text-neutral-200 text-4xl">
        <span className="font-bold text-primary-500 dark:text-primary-500 mr-2">
          {wordsFiltered.length}
        </span>
        <span className="ml-2">/ {vocaByProjectType.length}</span>
        <span className="text-2xl ml-2">
          {wordsFiltered.length === 1 ? " word" : " words"}
        </span>
      </div>

      <LinkReset onClick={handleResetModal}>
        <RestartAltIcon sx={{ fontSize: 26 }} />
        <p>Reset</p>
      </LinkReset>

      <ButtonsCancelConfirm
        onCloseModal={onCloseModal}
        onConfirm={handleApplyFilter}
        btnText="Apply"
        variation="primary"
      />
    </MainContainer>
  );
}

export default ModalFilter;
