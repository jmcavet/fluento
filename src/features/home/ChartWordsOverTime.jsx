import ReactECharts from "echarts-for-react";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useProject } from "../projects/useProject";
import { useVocaContext } from "../../contexts/VocaContext";
import { useGeneralSettingsContext } from "../../contexts/GeneralSettingsContext";

export default function ChartWordsOverTime({ vocabulary }) {
  const { projects } = useProject();

  const { state: stateGeneralSettings } = useGeneralSettingsContext();
  const darkMode = stateGeneralSettings.darkMode;
  const titleColor = darkMode ? "#d7dbed" : "#121837";
  const axisColor = darkMode ? "#81848e" : "#383e54";

  const { state: stateProject } = useProjectContext();
  const { languages } = stateProject;

  const vocaSortedByDate = vocabulary.sort((a, b) => {
    const date1 = new Date(a.created_at);
    const date2 = new Date(b.created_at);

    return date1 - date2;
  });

  const created_at = vocaSortedByDate.map((voca) =>
    new Date(voca.created_at).toLocaleDateString()
  );
  const created_at_by_day = [...new Set(created_at)];

  const languagesAuthorised = languages
    .filter((obj) => obj.selected)
    .map((obj) => obj.language);

  const projectsAuthorised = projects.filter((project) => {
    return languagesAuthorised.includes(project.learningLanguage);
  });

  const mySeries = projectsAuthorised.map((project) => {
    const vocaPerProject = vocaSortedByDate.filter(
      (voca) => voca.project_id === project.id
    );

    let serie = [];
    created_at_by_day.forEach((element, index) => {
      const test1 = vocaPerProject.filter((voca) => {
        const dateTransformed = new Date(voca.created_at).toLocaleDateString();
        return dateTransformed === element;
      }).length;
      // serie.push(test1);
      serie.push([index, test1]);
      // serie.push([created_at_by_day[index], test1]);
    });

    return {
      name: project.name,
      type: "bar",
      stack: "total",
      data: serie,
    };
  });

  // Define the options for the plot
  const options = {
    title: {
      text: "Score over time",
      textStyle: { color: titleColor },
      left: "center",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    legend: {
      orient: "horizontal",
      top: "10%",
      textStyle: { color: "inherit" },
    },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "25%",
      containLabel: true,
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
      // data: created_at_by_day,
      axisLabel: {
        show: true,
        fontSize: 14,
        color: axisColor,
      },
    },
    // yAxis: {
    //   type: "value",
    //   axisLabel: {
    //     show: true,
    //     fontSize: 14,
    //     color: axisColor,
    //   },
    // },
    yAxis: {},
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
        height: 0,
        bottom: 0,
      },
      // {
      //   type: "slider",
      //   start: 50,
      //   end: 100,
      // },
    ],
    series: mySeries,
  };

  return (
    <div className="bg-neutral-0 dark:bg-neutral-800 px-8 py-2 rounded-3xl shadow dark:shadow-neutral-700">
      <ReactECharts option={options} notMerge={true} />
    </div>
  );
}
