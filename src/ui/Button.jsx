import tw from "tailwind-styled-components";

const sizes = {
  small: "text-sm px-4 py-4 uppercase bold-semibold",
  medium: "text-base px-6 py-6 bold-medium",
  large: "text-2xl px-10 py-8 bold-medium",
  full: "text-2xl py-6 py-6 bold-medium w-full",
};

const variations = {
  primary: "bg-primary-500 text-neutral-0 hover:bg-primary-600",
  primaryOutlined:
    "bg-transparent dark:text-neutral-100 border-[1px] dark:border-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-700",
  accent: "bg-warning-500 text-neutral-0 hover:bg-warning-600",
  danger:
    "bg-error-500 text-neutral-0 hover:bg-error-600 dark:bg-error-500 dark:hover:bg-error-500",
  dangerOutlined:
    "text-neutral-400 border-[1px] border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700",
};

const isDisabled = {
  true: "cursor-not-allowed bg-neutral-200 text-neutral-300 hover:bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-600 dark:hover:bg-neutral-600",
  false: "cursor-auto",
};

const Button = tw.button`${(props) => sizes[props.size]} ${(props) =>
  variations[props.variation]} ${(props) => isDisabled[props.disabled]}
  flex items-center justify-center gap-4 rounded-xl shadow-xl cursor-pointer`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
  disabled: false,
};

export default Button;
