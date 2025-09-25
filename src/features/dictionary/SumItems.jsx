import FunctionsIcon from "@mui/icons-material/Functions";
import tw from "tailwind-styled-components";

const MainContainer = tw.div`flex items-center justify-between gap-2 text-3xl font-semibold dark:text-neutral-0`;

export default function SumItems({ nbItems }) {
  return (
    <MainContainer>
      <FunctionsIcon sx={{ fontSize: 26 }} color="black" />
      <p className="text-4xl">{nbItems}</p>
    </MainContainer>
  );
}
