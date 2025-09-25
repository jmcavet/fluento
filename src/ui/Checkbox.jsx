import tw from "tailwind-styled-components";

function Checkbox({
  checked,
  handleOnChange,
  index,
  disabled = false,
  id,
  children,
}) {
  const MainContainer = tw.div`flex items-center gap-4 ${(p) =>
    checked
      ? "text-neutral-700 dark:text-neutral-200"
      : "text-neutral-300 dark:text-neutral-500"}`;
  const InputContainer = tw.input`h-6 w-6 outline-offset-2`;
  const LabelContainer = tw.label`flex items-center gap-4`;

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
