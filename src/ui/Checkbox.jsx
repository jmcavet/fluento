import tw from "tailwind-styled-components";

function Checkbox({
  checked,
  handleOnChange,
  index,
  disabled = false,
  id,
  children,
}) {
  const MainContainer = tw.div`flex items-center gap-2 ${(p) =>
    checked
      ? "text-neutral-700 dark:text-neutral-200"
      : "text-neutral-300 dark:text-neutral-500"}`;
  const InputContainer = tw.input`h-4 w-4 outline-offset-2`;
  const LabelContainer = tw.label`flex items-center gap-3 text-base md:text-lg`;

  return (
    <MainContainer>
      <InputContainer
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => handleOnChange(index)}
        disabled={disabled}
      />
      <LabelContainer>{children}</LabelContainer>
    </MainContainer>
  );
}

export default Checkbox;
