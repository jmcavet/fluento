import tw from "tailwind-styled-components";
import Button from "./Button";

const MessageContainer = tw.div`flex justify-end gap-6`;

function ButtonsCancelConfirm({
  btnText,
  onConfirm,
  disabled,
  onCloseModal,
  size = "medium",
  variation = "primary",
}) {
  const onHandleClick = () => {
    onConfirm();
  };

  let variationCancel;
  if (variation === "primary") variationCancel = "primaryOutlined";
  else if (variation === "danger") variationCancel = "dangerOutlined";

  return (
    <MessageContainer>
      <Button size={size} variation={variationCancel} onClick={onCloseModal}>
        Cancel
      </Button>
      <Button
        size={size}
        variation={variation}
        disabled={disabled}
        onClick={() => onHandleClick()}
      >
        {btnText}
      </Button>
    </MessageContainer>
  );
}

export default ButtonsCancelConfirm;
