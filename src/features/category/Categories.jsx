import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import tw from "tailwind-styled-components";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ModalCreateCategory from "../../features/vocabularies/ModalCreateCategory";

const MainContainer = tw.div`flex flex-col justify-between gap-4 dark:text-neutral-300 bg-neutral-0 dark:bg-neutral-800 text-3xl p-4 rounded-2xl`;
const CategoryHeader = tw.div`flex items-center justify-between`;
const ListCategories = tw.div`flex items-center justify-start flex-wrap gap-6 bg-white rounded-xl p-4`;

export default function Categories({ children }) {
  const navigate = useNavigate();
  const handleEditCategories = () => navigate("/categories");

  return (
    <MainContainer>
      <CategoryHeader>
        <div className="text-neutral-600 dark:text-neutral-400">Categories</div>
        <SettingsIcon
          sx={{ fontSize: 32 }}
          className="text-primary-500 dark:text-primary-500 cursor-pointer"
          onClick={handleEditCategories}
        />
      </CategoryHeader>
      <ListCategories>
        <Modal>
          <Modal.Open opens="create-category">
            <AddCircleOutlineIcon
              sx={{ fontSize: 42 }}
              className="text-primary-500 dark:text-primary-500 cursor-pointer"
            />
          </Modal.Open>
          <Modal.Window name="create-category">
            <ModalCreateCategory />
          </Modal.Window>
        </Modal>

        {children}
      </ListCategories>
    </MainContainer>
  );
}
