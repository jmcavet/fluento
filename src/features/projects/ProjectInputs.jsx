import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "./useCreateProject";
import { useUser } from "../authentification/useUser";
import { useProjectContext } from "../../contexts/ProjectContext";
import { useProject } from "./useProject";
import toast from "react-hot-toast";
import Button from "../../ui/Button";

export default function ProjectInputs() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const { projects } = useProject();
  const { createProject } = useCreateProject();
  const { state: stateProject, dispatch: dispatchProject } =
    useProjectContext();
  const { learningLanguage, motherLanguage } = stateProject;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateProject = () => {
    // Check if a project already exists with the same name provided by user
    const userProjectsDuplicates = projects?.filter(
      (project) => project.user_id === user.id && project.name === name,
    );

    if (userProjectsDuplicates.length > 0) {
      toast.error(`You have already created a project with name ${name}`);
      return;
    }

    const projectObj = {
      name,
      description,
      motherLanguage,
      learningLanguage,
      user_id: user.id,
    };

    // Create and store the project itself inside the database. Once created, it will be selected
    // as project per default (via dispatch to the Project Context. Refer to 'createProject' function)
    createProject(projectObj);

    // 1. Add the project's learning language to the list of languages selected (used in Home country flags).
    // Do it only if this language is not existing in the state (from a previous project for instance)
    // 2. Then, reset the whole project setup process, ready whenever users will create a new project
    if (
      !projects
        ?.map((project) => project.learningLanguage)
        .includes(learningLanguage)
    ) {
      dispatchProject({
        type: "project/created",
        payload: { language: learningLanguage, selected: true },
      });
    }

    // Go to the Home page
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-8 justify-center text-neutral-900 dark:text-neutral-0">
        <input
          type="text"
          id="project-name"
          className="block p-4 w-[20rem] sm:w-[30rem] md:w-[45rem] lg:w-[60rem] text-2xl rounded-lg bg-neutral-100 border border-neutral-300 placeholder-neutral-300 focus:bg-primary-100 dark:bg-neutral-800 dark:placeholder-neutral-400 dark:focus:bg-primary-800"
          placeholder="Name"
          autoComplete="off"
          autoFocus
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          id="project-description"
          className="block p-4 w-[20rem] sm:w-[30rem] md:w-[45rem] lg:w-[60rem] text-2xl rounded-lg bg-neutral-100 border border-neutral-300 placeholder-neutral-300 focus:bg-primary-100 dark:bg-neutral-800 dark:placeholder-neutral-400 dark:focus:bg-primary-800"
          placeholder="Description"
          autoComplete="off"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-12 flex items-center justify-center">
        <Button size="medium" disabled={!name} onClick={handleCreateProject}>
          Create Project
        </Button>
      </div>
    </div>
  );
}
