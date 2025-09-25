import tw from "tailwind-styled-components";

const RadioButton = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="radio" checked={value} onChange={onChange} />
      <span className="ml-4">{label}</span>
    </label>
  );
};

export default RadioButton;
