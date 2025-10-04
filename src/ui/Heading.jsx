import tw from "tailwind-styled-components";

const Heading = tw.h1`${(props) =>
  props.as === "h1" && "text-3xl md:text-4xl font-bold"} ${(props) =>
  props.as === "h2" && "text-2xl md:text-3xl font-semibold"} ${(props) =>
  props.as === "h3" && "text-xl md:text-2xl font-medium"}`;

export default Heading;
