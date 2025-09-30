import tw from "tailwind-styled-components";

const MainContainer = tw.div`flex flex-col gap-8 w-full rounded-2xl`;
const StyleTitle = tw.label`text-xl md:text-2xl font-medium`;
const StyleError = tw.span`text-lg md:text-xl text-red-600`;

function FormRow({ label, error, children }) {
  return (
    <MainContainer>
      {label && <StyleTitle>{label}</StyleTitle>}
      {children}
      {error && <StyleError>{error}</StyleError>}
    </MainContainer>
  );
}

export default FormRow;
