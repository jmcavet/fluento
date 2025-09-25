import BarChartProjectCategories from "./BarChartProjectCategories";
import BarChartProjectWordTypes from "./BarChartProjectWordTypes";
import BarChartProjectsWordCount from "./BarChartProjectsWordCount";
import ButtonAddCategory from "./ButtonAddCategory";
import ButtonsAddComplete from "./ButtonsAddComplete";
import tw from "tailwind-styled-components";
import ChartWordsOverTime from "./ChartWordsOverTime";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useVocaCategories } from "../category/useCategory";

const MainContainer = tw.div`flex flex-col my-6 gap-16`;
const ConntainerPlot = tw.div`flex flex-col gap-4`;

const Dashboard = ({ projectsByLanguages, vocabulary }) => {
  const { state: stateProject } = useProjectContext();
  const projectSelected = stateProject.projectSelected;
  const vocaCategories = useVocaCategories(projectSelected, vocabulary);

  return (
    projectsByLanguages.length > 0 && (
      <MainContainer>
        <ChartWordsOverTime vocabulary={vocabulary} />

        <ConntainerPlot>
          <BarChartProjectsWordCount
            projects={projectsByLanguages}
            vocabulary={vocabulary}
          />

          <ButtonsAddComplete vocabulary={vocabulary} />
        </ConntainerPlot>

        <BarChartProjectWordTypes vocabulary={vocabulary} />

        {Object.keys(vocaCategories).length > 0 ? (
          <ConntainerPlot>
            <BarChartProjectCategories vocabulary={vocabulary} />
            <ButtonAddCategory
              projects={projectsByLanguages}
              vocabulary={vocabulary}
            />
          </ConntainerPlot>
        ) : null}
      </MainContainer>
    )
  );
};

export default Dashboard;
