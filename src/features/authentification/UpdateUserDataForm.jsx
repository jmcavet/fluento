import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  // const {
  //   user: {
  //     email,
  //     user_metadata: { fullName: currentFullName },
  //   },
  // } = useUser();

  const { user } = useUser();

  //   const { updateUser, isUpdating } = useUpdateUser();
  const isUpdating = false;
  const email = user.email;

  //   const [fullName, setFullName] = useState(currentFullName);
  const [fullName, setFullName] = useState("");

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     if (!fullName) return;
  //     updateUser(
  //       { fullName },
  //       {
  //         onSuccess: () => {
  //           e.target.reset();
  //         },
  //       }
  //     );
  //   }

  return (
    // <Form onSubmit={handleSubmit}>
    <Form className="bg-neutral-0 dark:bg-neutral-900">
      <FormRow label="Email address">
        <Input
          value={email}
          disabled
          className="dark:bg-neutral-800 dark:text-neutral-0"
        />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          className="dark:bg-neutral-800 dark:text-neutral-0"
          //   disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isUpdating}>Update</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
