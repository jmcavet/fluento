import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentification/LoginForm";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-content: center;
  margin-left: 1.2rem;
  margin-right: 1.2rem;
  gap: 3.2rem;
`;

function Login() {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
    return;
  };

  return (
    <LoginLayout>
      <div className="flex items-center justify-between gap-16">
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
