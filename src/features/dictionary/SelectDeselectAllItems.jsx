import tw from "tailwind-styled-components";

const MainContainer = tw.div`flex items-center justify-between gap-4`;
const ButtonSelectAll = tw.button`text-blue-800 hover:text-blue-500`;
const ButtonDeselectAll = tw.button`text-slate-400 hover:text-blue-500`;
const ParagraphNbItemsChecked = tw.p`border border-solid border-blue-900 rounded-3xl px-4 py-0`;

export default function SelectDeselectAllItems({
  nbTotalItems,
  itemsChecked,
  setItemsChecked,
}) {
  const nbItemsChecked = itemsChecked?.filter((state) => state === true).length;

  const onHandleSelectAll = (selectAll) => {
    setItemsChecked(new Array(nbTotalItems).fill(selectAll));
  };

  return (
    <MainContainer>
      <ButtonSelectAll onClick={() => onHandleSelectAll(true)}>
        Select all
      </ButtonSelectAll>
      <ButtonDeselectAll onClick={() => onHandleSelectAll(false)}>
        Deselect all
      </ButtonDeselectAll>

      {nbItemsChecked > 0 ? (
        <ParagraphNbItemsChecked>{nbItemsChecked}</ParagraphNbItemsChecked>
      ) : null}
    </MainContainer>
  );
}
