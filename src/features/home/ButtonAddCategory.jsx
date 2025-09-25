import AddIcon from "@mui/icons-material/Add";
import { useProjectContext } from "../../contexts/ProjectContext";
import Button from "../../ui/Button";

export default function ButtonAddCategory({ projects, vocabulary }) {
  const { state } = useProjectContext();
  const projectSelected = state.projectSelected;

  return (
    projectSelected && (
      <div className="flex items-center justify-end gap-4">
        <Button
          size="small"
          variation="primary"
          // onClick={handleAddItem}
        >
          <AddIcon sx={{ fontSize: 26 }} />
          Add categoriy
        </Button>
      </div>
    )
  );
}
