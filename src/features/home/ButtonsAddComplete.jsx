import AddIcon from "@mui/icons-material/Add";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useNavigate } from "react-router-dom";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Button from "../../ui/Button";
import { useVocaFilterContext } from "../../contexts/VocaFilterContext";

export default function ButtonsAddComplete({ vocabulary }) {
  const navigate = useNavigate();

  const { state, dispatch: dispatchProject } = useProjectContext();
  const projectSelected = state.projectSelected;

  const { dispatch: dispatchVocaFilter } = useVocaFilterContext();

  const vocaPerProject = vocabulary.filter(
    (voca) => voca.project_id === projectSelected?.id
  );

  const incompleteVoca = vocaPerProject.filter((obj) => {
    return (
      (obj.word && !obj.word_translation) ||
      (!obj.word && obj.word_translation) ||
      (obj.context && !obj.context_translation) ||
      (!obj.context && obj.context_translation)
    );
  });

  const handleIncomplete = () => {
    dispatchVocaFilter({
      type: "wordsToComplete/defined",
      payload: incompleteVoca,
    });
    navigate("/incomplete");
  };

  const handleAddWord = () => {
    dispatchProject({ type: "project/selected", payload: projectSelected });
    navigate("/voca");
  };

  return (
    projectSelected && (
      <div className="flex items-center justify-end gap-4">
        {incompleteVoca?.length > 0 && (
          <Button
            size="small"
            variation="primaryOutlined"
            onClick={handleIncomplete}
          >
            <BatteryChargingFullIcon sx={{ fontSize: 22 }} />
            Complete
          </Button>
        )}

        <Button
          size="small"
          disabled={false}
          variation="primary"
          onClick={handleAddWord}
        >
          <AddIcon sx={{ fontSize: 22 }} />
          Add word
        </Button>
      </div>
    )
  );
}
