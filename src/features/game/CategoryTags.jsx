import tw from "tailwind-styled-components";

export default function CategoryTags({ categories }) {
  const Tag = tw.div`bg-transparent text-neutral-600 border-[1px] border-neutral-600 dark:text-neutral-300 dark:border-neutral-300 p-2 rounded-2xl`;

  return categories?.map((item, index) => <Tag key={index}>{item.name}</Tag>);
}
