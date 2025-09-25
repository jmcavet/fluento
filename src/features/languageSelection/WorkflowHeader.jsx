import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { useNavigate } from "react-router-dom";
import { useProjectContext } from "../../contexts/ProjectContext";

export default function WorkflowHeader() {
  const navigate = useNavigate();
  const { state, dispatch } = useProjectContext();
  const currentStep = state.currentStep;
  const totalSteps = state.totalSteps;
  let stepDiv = [];
  for (let i = 0; i < totalSteps; i++) {
    const classname =
      i < currentStep
        ? "w-16 h-4 border-solid rounded-2xl bg-primary-700 dark:bg-primary-500"
        : "w-16 h-4 border-solid border-2 border-primary-700 dark:border-primary-500 rounded-2xl";
    stepDiv.push(<div className={classname} key={i}></div>);
  }

  const handleClickBack = () => {
    if (currentStep === 1) {
      navigate(-1);
      return;
    }

    dispatch({ type: "projectStep/previous" });
  };

  return (
    <div className="grid grid-cols-12 grid-rows-2 mt-8">
      <div className="col-start-1 col-end-3">
        <button onClick={handleClickBack}>
          <WestOutlinedIcon sx={{ fontSize: 40 }} />
        </button>
      </div>
      <div className="col-start-4 col-end-10 flex items-center justify-between">
        {stepDiv}
      </div>
    </div>
  );
}
