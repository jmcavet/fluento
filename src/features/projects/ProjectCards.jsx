import tw from "tailwind-styled-components";
import ProjectCard from "./ProjectCard";

const MainContainer = tw.div`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16`;

export default function ProjectCards({
  projectsFilteredByLanguage,
  vocabulary,
  categories,
}) {
  const vocaQuickies = vocabulary.filter((voca) => !voca.project_id);

  return (
    <MainContainer>
      {projectsFilteredByLanguage?.map((project) => {
        const vocaPerProject = vocabulary.filter(
          (voca) => voca.project_id === project.id
        );

        const categoriesPerProject = categories.filter(
          (category) => category.project_id === project.id
        );

        return (
          <ProjectCard
            project={project}
            voca={vocaPerProject}
            vocaQuickies={vocaQuickies}
            categories={categoriesPerProject}
            key={project.id}
          />
        );
      })}
    </MainContainer>
  );
}
