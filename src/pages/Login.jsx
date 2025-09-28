import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentification/LoginForm";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

const LoginLayout = tw.div`w-full h-screen grid grid-rows-[auto_1fr] items-center justify-center mx-auto max-w-5xl px-4 py-8`;

function Login() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
    return;
  };

  return (
    <LoginLayout>
      <div className="flex items-center justify-between gap-4 mb-16">
        <button onClick={handleClickBack}>
          <WestOutlinedIcon sx={{ fontSize: 40 }} />
        </button>
        <Heading as="h1" className="first-letter:capitalize">
          Log in to your account
        </Heading>
      </div>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
