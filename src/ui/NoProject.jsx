import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const ContainerNoProject = tw.div`w-full h-full flex flex-col items-center justify-center gap-8 text-4xl text-neutral-900 dark:text-neutral-0`;

export default function NoProject() {
  const navigate = useNavigate();

  return (
    <ContainerNoProject>
      <p>Please, create a first project!</p>
      <a
        onClick={() => navigate("/")}
        className="cursor-pointer text-primary-500 dark: text-primary-500"
      >
        Go back home
      </a>
    </ContainerNoProject>
  );
}
