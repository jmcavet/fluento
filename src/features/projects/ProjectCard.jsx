import Flag from "react-flagkit";
import { getLanguageCode } from "../../utils/languages";
import AddIcon from "@mui/icons-material/Add";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import FunctionsIcon from "@mui/icons-material/Functions";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Battery3BarIcon from "@mui/icons-material/Battery3Bar";
import BlockIcon from "@mui/icons-material/Block";

import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import { useProjectContext } from "../../contexts/ProjectContext";
import Modal from "../../ui/Modal";
import ModalUpdateProject from "./ModalUpdateProject";
import ModalDeleteProject from "./ModalDeleteProject";
import { HappyFace, NeutralFace, SadFace } from "../../ui/SmileysIcons";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";
import Button from "../../ui/Button";

const CardContainer = tw.div`rounded-2xl bg-neutral-0 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 flex flex-col items-center justify-between gap-6 p-4 shadow dark:shadow-neutral-700`;
const Header = tw.div`flex items-center justify-start w-full`;
const ProjectName = tw.div`text-xl lg:text-2xl font-semibold m-auto`;
const Footer = tw.div`flex items-center justify-between w-full`;
const FooterButtons = tw.div`flex items-center justify-between gap-4`;
const FooterFilter = tw.div`flex items-center gap-4`;

export default function ProjectCard({
  project,
  voca,
  vocaQuickies,
  categories,
}) {
  const { dispatch: dispatchVocaFilter } = useVocaFilterContext();

  const navigate = useNavigate();

  const { dispatch: dispatchProject } = useProjectContext();
  const { id, name, learningLanguage } = project;

  // Get only the set of vocabulary already played at least once by user
  const vocaPlayed = voca.filter((item) => item.games_played !== 0);

  const nbFavoritesPerProject = voca.filter((obj) => obj.favorite).length;

  let scorePercent = null;

  if (vocaPlayed.length > 0) {
    const sumScores = vocaPlayed.reduce(
      (acc, currVoca) => acc + currVoca.score,
      0,
    );
    const sumGamesPlayed = vocaPlayed.reduce(
      (acc, currVoca) => acc + currVoca.games_played,
      0,
    );
    scorePercent = Math.round((sumScores / sumGamesPlayed) * 100);
  }

  // Get the number of vocabulary that is missing at least one field
  const incompleteVoca = voca.filter((obj) => {
    return (
      (obj.word && !obj.word_translation) ||
      (!obj.word && obj.word_translation) ||
      (obj.context && !obj.context_translation) ||
      (!obj.context && obj.context_translation)
    );
  });

  const handleAddItem = () => {
    dispatchProject({ type: "project/selected", payload: project });
    navigate("/voca");
  };

  const handleIncomplete = () => {
    dispatchVocaFilter({
      type: "wordsToComplete/defined",
      payload: incompleteVoca,
    });
    navigate("/incomplete");
  };

  const handlePlay = () => {
    // First, set up the right flag
    dispatchVocaFilter({
      type: "language/selected",
      payload: project.learningLanguage,
    });

    const categoriesFilteredByIds = getCategoriesFileredByIds(voca);

    dispatchVocaFilter({
      type: "btnSingleProject/selected",
      payload: categoriesFilteredByIds,
    });

    // Store the ID of the single project selected
    dispatchVocaFilter({
      type: "singleProjectId/selected",
      payload: id,
    });

    navigate("/game");
  };

  const getCategoriesFileredByIds = (myArray) => {
    const arrCategoriesIds = myArray?.map((obj) => obj.category_ids);
    const newArr = [];
    arrCategoriesIds?.forEach((arr) => {
      arr.forEach((el) => newArr.push(el));
    });
    const uniqueCategoryIds = [...new Set(newArr)];

    const categoriesFilteredByIds = categories?.filter((cat) =>
      uniqueCategoryIds.includes(cat.id),
    );
    categoriesFilteredByIds?.forEach((obj) => (obj.selected = true));

    return categoriesFilteredByIds;
  };

  const handleDeleteProject = (projectId) => {
    console.log("Deleting project id: ", projectId);

    onCloseModal();
  };

  return (
    <CardContainer>
      <Header>
        <Flag country={getLanguageCode(learningLanguage)} size={40} />
        <ProjectName>{name}</ProjectName>
        <Button variation="primaryOutlined" size="small" onClick={handlePlay}>
          <SportsEsportsOutlinedIcon sx={{ fontSize: "1.4rem" }} />
          Play
        </Button>
      </Header>
      <div className="w-full grid grid-cols-12 grid-rows-2 gap-y-12 text-neutral-900 border border-neutral-200 dark:text-neutral-0 dark:border-neutral-600 py-8 rounded-2xl">
        <div className="col-row-1 col-start-2 col-end-6 flex items-center justify-start gap-4 text-3xl font-semibold">
          <FunctionsIcon
            sx={{ fontSize: 26 }}
            className="text-neutral-500 dark:text-neutral-300"
          />
          <p>
            {voca.length} <span className="text-xl">words</span>
          </p>
        </div>
        <div className="col-row-1 col-start-6 col-end-12 flex items-center justify-end gap-4 text-3xl font-semibold">
          {scorePercent === null ? (
            <BlockIcon sx={{ fontSize: 26 }} />
          ) : scorePercent > 66 ? (
            <HappyFace filled={true} size={28} />
          ) : scorePercent < 33 ? (
            <SadFace filled={true} size={28} />
          ) : (
            <NeutralFace filled={true} size={28} />
          )}

          <p>
            {scorePercent !== null && (
              <>
                {scorePercent} <span className="text-2xl">%</span>
              </>
            )}
          </p>
        </div>
        <div className="col-row-2 col-start-2 col-end-6 flex items-center justify-start gap-4 text-3xl font-semibold">
          {incompleteVoca.length > 0 ? (
            <>
              <Battery3BarIcon
                sx={{ fontSize: 26 }}
                className="text-error-500 dark:text-error-300"
              />
              <p>
                {incompleteVoca.length}
                <span className="text-xl ml-2">words</span>
              </p>
            </>
          ) : (
            <>
              <BatteryChargingFullIcon
                sx={{ fontSize: 26 }}
                className={"text-success-500 dark:text-success-500"}
              />
              <p>
                <span className="text-2xl">Complete</span>
              </p>
            </>
          )}
        </div>
        <div className="col-row-2 col-start-6 col-end-12 flex items-center justify-end gap-4 text-3xl font-semibold">
          <FavoriteIcon
            sx={{ fontSize: 26 }}
            className={
              nbFavoritesPerProject
                ? "text-favorites-500 dark:text-favorites-500"
                : "text-neutral-300 dark:text-neutral-500"
            }
          />
          <p>{nbFavoritesPerProject ? nbFavoritesPerProject : null}</p>
        </div>
      </div>
      <Footer>
        <FooterButtons>
          <Button variation="primary" size="small" onClick={handleAddItem}>
            <AddIcon sx={{ fontSize: 22 }} />
            Add word
          </Button>
          {incompleteVoca.length !== 0 ? (
            <Button
              variation="primaryOutlined"
              size="small"
              onClick={handleIncomplete}
            >
              <BatteryChargingFullIcon
                sx={{ fontSize: 22 }}
              ></BatteryChargingFullIcon>
              Complete
            </Button>
          ) : null}
        </FooterButtons>
        <FooterFilter>
          <Modal>
            <Modal.Open opens="edit-project">
              <ModeEditOutlinedIcon
                sx={{ fontSize: 26 }}
                className="text-primary-500 dark:text-primary-500"
              />
            </Modal.Open>
            <Modal.Window name="edit-project">
              <ModalUpdateProject project={project} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open opens="delete-project">
              <DeleteOutlineOutlinedIcon
                sx={{ fontSize: 26 }}
                className="text-error-500"
              />
            </Modal.Open>
            <Modal.Window name="delete-project">
              <ModalDeleteProject
                project={project}
                voca={voca}
                vocaQuickies={vocaQuickies}
                categories={categories}
              />
            </Modal.Window>
          </Modal>
        </FooterFilter>
      </Footer>
    </CardContainer>
  );
}
