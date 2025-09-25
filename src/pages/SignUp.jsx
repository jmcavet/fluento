import { useNavigate } from "react-router-dom";
import SignupForm from "../features/authentification/SignupForm";
import Heading from "../ui/Heading";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

function SignUp() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
    return;
  };

  return (
    <div className="h-screen p-16 flex flex-col items-center justify-around gap-16">
      <div className="flex items-center justify-between gap-16">
        <button onClick={handleClickBack}>
          <WestOutlinedIcon sx={{ fontSize: 40 }} />
        </button>
        <Heading as="h1" className="first-letter:capitalize">
          Welcome to Fluento
        </Heading>
      </div>
      <Heading as="h2">Please, sign up</Heading>
      <SignupForm />
    </div>
  );
}

export default SignUp;
