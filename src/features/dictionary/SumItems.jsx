import FunctionsIcon from "@mui/icons-material/Functions";
import tw from "tailwind-styled-components";

const MainContainer = tw.div`flex items-center justify-between gap-2 text-xl md:text-2xl font-semibold dark:text-neutral-0`;

export default function SumItems({ nbItems }) {
  return (
    <MainContainer>
      <FunctionsIcon sx={{ fontSize: 26 }} color="black" />
      <p>{nbItems}</p>
    </MainContainer>
  );
}
