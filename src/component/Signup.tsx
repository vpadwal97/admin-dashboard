import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

// const userTypeList = ["admin", "employee", "other"];

const Signup = () => {
  const navigate = useNavigate();

  const formData = z.object({
    loginID: z.string().trim().min(3, "min 3 char require"),
    password: z
      .string()
      .trim()
      .min(6, "Password must contain at least 6 characters"),
    // userType: z.enum(userTypeList),
    userType: z.string().trim().min(3, "Please enter at least 3 characters"),
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
      const resp = await API.post("/auth/register", {
        username: data.loginID,
        password: data.password,
        userType: data.userType,
      });
      if (resp?.data?.message) {
        alert(resp?.data?.message);
      }
      navigate("/login");
    } catch (error) {
      alert("something went wrong see the console for erors");
      console.error(error);
    }
  };
  return (
    <div className="container">
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            className={`${errors?.loginID ? "input-error" : ""} input`}
            name="loginID"
            id="loginID"
            {...register("loginID")}
          />
          {errors?.loginID && (
            <span className="error">{errors.loginID.message}</span>
          )}
        </div>

        <div>
          <input
            type="text"
            className={`${errors?.password ? "input-error" : ""} input`}
            name="password"
            id="password"
            {...register("password")}
          />
          {errors?.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            className={`${errors?.userType ? "input-error" : ""} input`}
            name="userType"
            id="userType"
            {...register("userType")}
          />
          {errors?.userType && (
            <span className="error">{errors.userType.message}</span>
          )}
        </div>

        {/* <select name="userType" id="userType" {...register("userType")}>
          {userTypeList &&
            userTypeList.map((uType, i) => (
              <option key={i} value={uType}>
                {uType.toUpperCase()}
              </option>
            ))}
        </select> */}
        <input type="submit" value="submit" disabled={isSubmitting} />
      </form>
      <hr />
      <h3>Ohh have a Login</h3>
      <Link to="/login">Login</Link>
    </div>
  );
};
export default Signup;
