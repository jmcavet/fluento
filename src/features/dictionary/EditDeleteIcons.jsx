import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import tw from "tailwind-styled-components";
import Modal from "../../ui/Modal";
import ModalDeleteWord from "../../features/dictionary/ModalDeleteWord";
import ModalUpdateWord from "../../features/dictionary/ModalUpdateWord";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";
import { useNavigate } from "react-router-dom";

const MainContainer = tw.div`flex items-center justify-between gap-4 text-neutral-0 dark:text-primary-500`;

export default function EditDeleteIcons({
  language,
  wordsChecked,
  projectType,
}) {
  const navigate = useNavigate();

  const { state: stateVocaFilter, dispatch: dispatchVocaFilter } =
    useVocaFilterContext();

  const nbItemsChecked = wordsChecked?.length;

  const resourceName =
    nbItemsChecked > 1 ? `these ${nbItemsChecked} words` : "this word";

  const nbWordsIncomplete = wordsChecked.filter((obj) => {
    return (obj.word && !obj.word_translation) ||
      (!obj.word && obj.word_translation) ||
      (obj.context && !obj.context_translation) ||
      (!obj.context && obj.context_translation)
      ? true
      : false;
  }).length;

  return nbItemsChecked > 0 ? (
    <MainContainer>
      {nbItemsChecked === 1 ? (
        <Modal>
          <Modal.Open opens="edit-voca">
            <ModeEditOutlinedIcon sx={{ fontSize: 26 }} />
          </Modal.Open>
          <Modal.Window name="edit-voca">
            <ModalUpdateWord language={language} objWord={wordsChecked[0]} />
          </Modal.Window>
        </Modal>
      ) : null}

      {nbWordsIncomplete !== 0 &&
      nbWordsIncomplete === nbItemsChecked &&
      projectType !== "quickies" ? (
        <BatteryChargingFullIcon
          sx={{ fontSize: 26 }}
          onClick={() => {
            dispatchVocaFilter({
              type: "wordsToComplete/defined",
              payload: wordsChecked,
            });
            navigate("/incomplete");
          }}
        />
      ) : null}

      <Modal>
        <Modal.Open opens="delete-voca-confirmation">
          <DeleteOutlineOutlinedIcon sx={{ fontSize: 26 }} />
        </Modal.Open>
        <Modal.Window name="delete-voca-confirmation">
          <ModalDeleteWord
            resourceName={resourceName}
            wordsToDelete={wordsChecked}
          />
        </Modal.Window>
      </Modal>
    </MainContainer>
  ) : null;
}
