import tw from "tailwind-styled-components";

const sizes = {
  small: "text-sm px-2 py-2 uppercase font-medium md:px-3 md:py-3 md:text-base",
  medium: "text-base px-6 py-3 font-semibold",
  large: "text-2xl px-10 py-8 bold-medium",
  full: "text-2xl py-6 py-6 bold-medium w-full",
};

const variations = {
  primary: "bg-primary-500 text-neutral-0 hover:bg-primary-600",
  primaryOutlined:
    "bg-transparent border-[1px] border-neutral-300 hover:opacity-80",
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
  flex items-center justify-center gap-2 rounded-lg shadow-md cursor-pointer`;

Button.defaultProps = {
  variation: "primary",
  size: "medium",
  disabled: false,
};

export default Button;
