import tw from "tailwind-styled-components";

const Heading = tw.h1`${(props) =>
  // "text-3xl leading-tight text-center px-8 mb-4 md:text-5xl md:leading-snug"
  props.as === "h1" && "text-3xl md:text-4xl font-bold"} ${(props) =>
  props.as === "h2" && "text-4xl font-semibold"} ${(props) =>
  props.as === "h3" && "text-3xl font-medium"}`;

export default Heading;
