// import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import { useProjectContext } from "../contexts/ProjectContext";
import Logout from "../features/authentification/Logout";
import UpdateUserDataForm from "../features/authentification/UpdateUserDataForm";
import { useLogout } from "../features/authentification/useLogout";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SpinnerMini from "../ui/SpinnerMini";

function Account() {
  const { logout, isPending } = useLogout();
  const { dispatch: dispatchProject } = useProjectContext();

  const handleLogout = () => {
    dispatchProject({ type: "account/logout" });
    logout();
  };

  return (
    <div className="h-full m-8 flex flex-col items-center justify-around">
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        {/* <UpdatePasswordForm /> */}
      </Row>

      <Row>
        <Button
          size="medium"
          variation="primary"
          disabled={isPending}
          onClick={handleLogout}
        >
          {!isPending ? "Log out" : <SpinnerMini />}
        </Button>
      </Row>
    </div>
  );
}

export default Account;
