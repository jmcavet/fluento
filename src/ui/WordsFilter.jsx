import FilterListIcon from "@mui/icons-material/FilterList";
import { useCategoriesPerUser } from "../features/category/useCategory";
import { useVocaFilterContext } from "../contexts/VocaFilterContext";
import ModalFilter from "../features/dictionary/ModalFilter";
import Modal from "./Modal";

export default function WordsFilter({ myVoca }) {
  const { categories, isLoading: categoriesIsLoading } = useCategoriesPerUser();

  const { state: stateVocaFilter } = useVocaFilterContext();
  const nbFiltersOn = stateVocaFilter.nbFiltersOn;

  return (
    !categoriesIsLoading && (
      <Modal>
        <Modal.Open opens="dictionary-filter">
          <a className="relative inline-block mr-4">
            <span className="text-neutral-0 dark:text-primary-500">
              <FilterListIcon sx={{ fontSize: 32 }} />
            </span>
            {nbFiltersOn > 0 ? (
              <span className="absolute -top-3 -right-6 rounded-full bg-primary-500 text-neutral-0 border border-neutral-0 w-10 h-10 flex items-center justify-center">
                {nbFiltersOn}
              </span>
            ) : null}
          </a>
        </Modal.Open>
        <Modal.Window name="dictionary-filter">
          <ModalFilter myVoca={myVoca} categories={categories} />
        </Modal.Window>
      </Modal>
    )
  );
}
