import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useLocal from "../hooks/useLocal";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [allUsers, setAllUsers] = useLocal("allUsers", []);
  const [currentUser, setCurrentUser] = useLocal("currentUser", null);
  const navigate = useNavigate();

  const formData = z.object({
    loginID: z.string("Please enter").min(3, "min 3 char require"),
    password: z
      .string("Please dont enter")
      .min(8, "Password must contain at least 8 characters"),
  });
  type formSchema = z.infer<typeof formData>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formSchema>({
    resolver: zodResolver(formData),
  });
  const onSubmit = async (data: formSchema) => {
    try {
      if (allUsers?.length <= 0) {
        throw new Error("there are no users in the system");
      } else {
        const userData = allUsers?.find(
          (user) =>
            user.loginID === data.loginID && user.password === data.password
        );
        if (!userData) {
          throw new Error("Wrong Credintials");
        }
        await setCurrentUser(userData);
        // navigate("/");
        navigate(`/${userData.userType}`);
      }
    } catch (error) {
      if (error?.message) {
        alert(error.message);
      }
      console.error(error);
    }
  };
  return (
    <>
      Login Page
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="loginID"
          id="loginID"
          {...register("loginID")}
        />
        {errors?.loginID && <>{errors.loginID.message}</>}

        <input
          type="text"
          name="password"
          id="password"
          {...register("password")}
        />
        {errors?.password && <>{errors.password.message}</>}
        <input type="submit" value="submit" disabled={isSubmitting} />
      </form>
      <hr />
      <h3>Dont have login</h3>
      <Link to="/signup">Sign up</Link>
    </>
  );
};
export default Login;
