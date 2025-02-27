import { useCallback, useState } from "react";
import { IconEye, IconEyeOff } from "../common/Icons";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { CustomInput } from "../components/Inputs";
import axios from "axios";
import { toast } from "react-toastify";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleChange = useCallback((e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginRes = await axios.post("/api/method/login", {
        usr: credentials.email,
        pwd: credentials.password,
      });

      // if login response is successful, set the user in the context
      if (loginRes.status === 200) {
        // Navigate or perform post-login actions
        window.location.pathname = "/pos";
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white w-100  rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-[#080133] ">
          Sign In
        </h1>
        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-4">
            <CustomInput
              label="Email"
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
            />
            <CustomInput
              label="Password"
              icon={
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              }
              id="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <PrimaryButton
            type="submit"
            text={loading ? "Loading ..." : "Sign In"}
            disabled={loading}
          />
        </form>
        <p className="text-[#b3b4bb] mt-4 mx-auto text-center">
          Powerd by{" "}
          <a
            href="https://sowaanerp.com"
            target="_blank"
            className="text-[#0277fa]"
          >
            SowaanERP
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
