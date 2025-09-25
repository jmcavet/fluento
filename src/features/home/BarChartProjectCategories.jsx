import ReactECharts from "echarts-for-react";
import { useVocaCategories } from "../category/useCategory";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useGeneralSettingsContext } from "../../contexts/GeneralSettingsContext";

export default function BarChartProjectCategories({ vocabulary }) {
  const { state: stateGeneralSettings } = useGeneralSettingsContext();
  const darkMode = stateGeneralSettings.darkMode;
  const titleColor = darkMode ? "#d7dbed" : "#121837";
  const axisColor = darkMode ? "#81848e" : "#383e54";
  const colorPrimary = darkMode ? "hsl(210, 88%, 56%)" : "hsl(210, 88%, 46%)";

  const { state: stateProject } = useProjectContext();
  const projectSelected = stateProject.projectSelected;
  const vocaCategories = useVocaCategories(projectSelected, vocabulary);

  // Define the options for the plot
  const options = {
    title: {
      text: "Distribution of categories",
      textStyle: { color: titleColor },
      left: "center",
    },
    legend: {},
    grid: {
      left: "1%",
      right: "1%",
      bottom: "0%",
      top: "10%",
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
      data: vocaCategories ? Object.keys(vocaCategories) : null,
      axisLabel: {
        show: true,
        fontSize: 14,
        color: axisColor,
      },
    },
    series: [
      {
        type: "bar",
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
        data: vocaCategories ? Object.values(vocaCategories) : null,
        itemStyle: {
          color: colorPrimary,
        },
        // barWidth: "30rem",
      },
    ],
  };

  return (
    vocaCategories &&
    Object.keys(vocaCategories).length > 0 && (
      <div className="bg-neutral-0 dark:bg-neutral-800 px-8 py-2 rounded-3xl shadow dark:shadow-neutral-700">
        <ReactECharts option={options} />
      </div>
    )
  );
}
