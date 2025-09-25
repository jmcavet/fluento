import tw from "tailwind-styled-components";

export default function CategoryTagsTest({ categories, tags, setTags }) {
  const Tag = tw.div`${(p) =>
    p.$selected
      ? "bg-primary-500 text-neutral-100"
      : "text-neutral-900 dark:text-neutral-0 border border-[1px] border-neutral-900 dark:border-neutral-0"}
      p-4 rounded-2xl`;

  const handleSelectTag = (index) => {
    const tagsUpdated = tags.map((item, i) => (i === index ? !item : item));

    setTags(tagsUpdated);
  };

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
