import tw from "tailwind-styled-components";

const Heading = tw.h1`${(props) =>
  props.as === "h1" && "text-5xl font-semibold"} ${(props) =>
  props.as === "h2" && "text-4xl font-semibold"} ${(props) =>
  props.as === "h3" && "text-3xl font-medium"}`;

export default Heading;
