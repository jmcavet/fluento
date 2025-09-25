import tw from "tailwind-styled-components";

const MainContainer = tw.select`w-full p-4 bg-neutral-0 dark:bg-neutral-800 dark:text-neutral-0 border border-neutral-700 dark:border-neutral-0 rounded-xl`;

export function Select({ options, value, onChange }) {
  return (
    <MainContainer value={value} onChange={onChange}>
      {options.map((option, index) => {
        return (
          <option
            value={option.value}
            key={index}
            // className="dark:bg-neutral-800 dark:text-neutral-0"
          >
            {option.label}
          </option>
        );
      })}
    </MainContainer>
  );
}

export function MySelect({ options, value, onChange }) {
  return (
    <MainContainer value={value} onChange={onChange}>
      {options.map((option, index) => {
        return (
          <option value={option} key={index}>
            {option}
          </option>
        );
      })}
    </MainContainer>
  );
}
