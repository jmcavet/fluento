import ReactECharts from "echarts-for-react";
import { useEffect } from "react";
import { useProjectContext } from "../../contexts/ProjectContext";
import {
  useNumberWordsPerProject,
  useProjectsNames,
} from "../projects/useProject";
import { useGeneralSettingsContext } from "../../contexts/GeneralSettingsContext";

export default function BarChartProjectsWordCount({ projects, vocabulary }) {
  const { state: stateGeneralSettings } = useGeneralSettingsContext();
  const darkMode = stateGeneralSettings.darkMode;
  const titleColor = darkMode ? "#d7dbed" : "#121837";
  const axisColor = darkMode ? "#81848e" : "#383e54";
  const colorPrimary = darkMode ? "hsl(225, 78%, 55%)" : "hsl(225, 78%, 55%)";
  const colorIncomplete = darkMode ? "hsl(1, 80%, 55%)" : "hsl(1, 84%, 42%)";
  const projectSelectedBorderColor = darkMode
    ? "hsl(216, 29%, 97%)"
    : "hsl(218, 38%, 16%)";

  const { state, dispatch: dispatchProject } = useProjectContext();
  const projectSelected = state.projectSelected;

  const projectsNames = useProjectsNames(projects);

  const { numberCompleteWordsPerProject, numberIncompleteWordsPerProject } =
    useNumberWordsPerProject(projects, vocabulary);

  const projectSelectedIndex = projects.findIndex(
    (project) => project === projectSelected
  );

  numberCompleteWordsPerProject[projectSelectedIndex] = {
    value: numberCompleteWordsPerProject[projectSelectedIndex],
    itemStyle: {
      borderWidth: 3,
      borderColor: projectSelectedBorderColor,
    },
  };

  numberIncompleteWordsPerProject[projectSelectedIndex] = {
    value: numberIncompleteWordsPerProject[projectSelectedIndex],
    itemStyle: {
      borderWidth: 3,
      borderColor: projectSelectedBorderColor,
    },
  };

  // Since projects has already been defined and passed to this component, define the
  // selected project when the component mounts (only once!) and if not yet defined.
  useEffect(() => {
    if (!projectSelected)
      dispatchProject({
        type: "project/selected",
        payload: projects[0],
      });
  }, []);

  // Define the options for the plot
  const options = {
    title: {
      text: "Distribution of words' count",
      textStyle: { color: titleColor },
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      orient: "horizontal",
      right: "center",
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
      type: "value",
      axisLabel: {
        show: true,
        fontSize: 14,
        color: axisColor,
      },
    },
    yAxis: {
      type: "category",
      data: projectsNames,
      axisLabel: {
        show: true,
        fontSize: 14,
        color: axisColor,
      },
    },
    series: [
      {
        name: "Words",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          fontSize: 16,
          formatter: (param) => {
            if (typeof param.data === "object" && param.data !== null) {
              return param.data.value == 0 ? "" : param.data.value;
            } else {
              return param.data == 0 ? "" : param.data;
            }
          },
        },
        emphasis: {
          focus: "series",
        },
        data: numberCompleteWordsPerProject,
        itemStyle: {
          color: colorPrimary,
        },
      },
      {
        name: "Incomplete",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          fontSize: 16,
          formatter: (param) => {
            if (typeof param.data === "object" && param.data !== null) {
              return param.data.value == 0 ? "" : param.data.value;
            } else {
              return param.data == 0 ? "" : param.data;
            }
          },
        },
        emphasis: {
          focus: "series",
        },
        data: numberIncompleteWordsPerProject,
        color: colorIncomplete,
      },
    ],
  };

  const onChartClick = (params) => {
    const projectSelected = projects.filter(
      (project) => project.name === params.name
    )[0];

    dispatchProject({
      type: "project/selected",
      payload: projectSelected,
    });
  };

  const onEvents = {
    click: onChartClick,
  };

  return (
    projectSelected && (
      <div className="bg-neutral-0 dark:bg-neutral-800 px-8 py-2 rounded-3xl shadow dark:shadow-neutral-700">
        <ReactECharts option={options} onEvents={onEvents} />
      </div>
    )
  );
}
