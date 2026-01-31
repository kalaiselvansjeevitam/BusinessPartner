import { useState } from "react";
import { Input } from "../../app/components/ui/input";
import { Label } from "../../app/components/ui/label";
import { Button } from "../../app/components/ui/button";
import { Lock, Mail, LogIn, Eye, EyeOff, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "../../app/core/constants/coreUrl";
import { OtpScreen } from "./components/OtpScreen";
import { login } from "../../app/core/api/Login.service";

const Login = () => {
  const navigate = useNavigate();
  const [openOtp, setOpenOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const { mutateAsync: logIn, isPending } = login();
  const { mutateAsync: logIn, isPending } = login();

  console.log(logIn);
  const handleLogin = async () => {
  setSubmitted(true);

  if (!loginData.username || !loginData.password) return;

  const STATIC_USERNAME = "BusinessPartner1";
  const STATIC_PASSWORD = "BP@123";

  try {
    if (
      loginData.username !== STATIC_USERNAME ||
      loginData.password !== STATIC_PASSWORD
    ) {
      setErrorMessage("Invalid username or password");
      return;
    }

    setErrorMessage("");

    sessionStorage.setItem("session_token", "static_session_token");
    sessionStorage.setItem("username", STATIC_USERNAME);

    navigate(ROUTE_URL.dashboard);
  } catch (error: any) {
    setErrorMessage("Something went wrong. Please try again.");
  }
};

  // const handleLogin = async () => {
  //   setSubmitted(true);
  //   if (!loginData.username || !loginData.password) return;

  //   try {
  //     // const res = await logIn(loginData);
  //     // setOpenOtp(true)
  //     setErrorMessage("");
  //     // await sessionStorage.setItem("session_token", res.data.session_token);
  //     // await sessionStorage.setItem("admin_user_id", res.data.id);
  //     console.log("entered");
  //     await sessionStorage.setItem("session_token", "res.data.session_token");
  //     navigate(ROUTE_URL.dashboard);
  //     console.log("exited");
  //   } catch (error: any) {
  //     setErrorMessage(error?.response?.data?.message);
  //   }
  // };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Please Login to your account</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              User Name*
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                required
                value={loginData.username}
                id="email"
                type="email"
                placeholder="User Name"
                className="pl-10 py-2 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
              />
            </div>
            {submitted && !loginData.username && (
              <p className="text-cherryRed text-sm">This field is required</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Password*
              </Label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                required
                value={loginData.password}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 py-2 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
            {submitted && !loginData.password && (
              <p className="text-cherryRed text-sm">This field is required</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-cherryRed pt-1">{errorMessage}</p>
          )}

          <Button
            onClick={handleLogin}
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2  disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              <LogIn className="h-5 w-5" />
            )}
            Login
          </Button>
        </div>
      </div>
      <OtpScreen open={openOtp} setOpen={() => setOpenOtp(!openOtp)} />
    </div>
  );
};

export default Login;
