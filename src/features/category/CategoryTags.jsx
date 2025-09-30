import tw from "tailwind-styled-components";
import { useVocaContext } from "../../contexts/VocaContext";
import { useEffect } from "react";

export default function CategoryTags({ categories }) {
  const { state: stateVoca, dispatch: dispatchVoca } = useVocaContext();
  const tags = stateVoca.tags;
  const Tag = tw.div`${(p) =>
    p.$selected
      ? "bg-primary-500 dark:bg-primary-500 text-neutral-0"
      : "text-neutral-900 dark:text-neutral-0"} border-[1px] border-neutral-700 dark:border-neutral-200 px-4 py-2 rounded-2xl`;

  const handleSelectTag = (index) => {
    const tagsUpdated = tags.map((item, i) => (i === index ? !item : item));

    dispatchVoca({
      type: "tags/selected",
      payload: tagsUpdated,
    });
  };

  useEffect(() => {
    dispatchVoca({
      type: "tags/selected",
      payload: new Array(categories?.length).fill(false),
    });
  }, [categories?.length, dispatchVoca]);

  return categories?.map((item, index) => (
    <Tag
      $selected={tags[index]}
      key={index}
      onClick={() => handleSelectTag(index)}
    >
      {item.name}
    </Tag>
  ));
}
