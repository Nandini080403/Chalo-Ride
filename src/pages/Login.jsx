import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

import {
  FiShield,
  FiCheckCircle,
  FiUsers,
} from "react-icons/fi";

import { FcGoogle } from "react-icons/fc";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

export default function Login() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // LOGIN SUBMIT
  const onSubmit = async (data) => {

    try {

      const res = await API.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

  
      toast.success("Login successful");

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = () => {

    /*
      FUTURE GOOGLE AUTH FLOW

      Firebase/Auth0/Google OAuth

      Steps:
      1. Open Google popup
      2. Select Google account
      3. Check @kristujayanti.com
      4. Check registered user
      5. Check admin approved
      6. Allow login
    */

    toast.success(
      "Google authentication integration ready"
    );
  };

  return (

    <div className="min-h-screen bg-[#f5f5f5]">

      {/* HEADER */}
      <div className="
        border-b
        bg-white
        h-20
        flex
        items-center
        justify-between
        px-7
      ">

        <div className="flex items-center gap-3">

          <div className="
            w-12
            h-12
            rounded-full
            bg-gradient-to-r
            from-indigo-500
            to-pink-500
            flex
            items-center
            justify-center
            text-white
            text-xl
          ">
            🛵
          </div>

          <h1 className="text-3xl font-bold">

            <span className="text-indigo-500">
              Chalo
            </span>

            <span className="text-pink-500">
              Ride
            </span>

          </h1>

        </div>

      </div>

      {/* MAIN */}
      <div className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-2
        gap-16
        px-10
        py-16
        items-center
      ">

        {/* LEFT SIDE */}
        <div className="
          rounded-[40px]
          bg-gradient-to-b
          from-indigo-500
          to-indigo-400
          p-14
          text-white
          min-h-[850px]
        ">

          <div className="
            w-24
            h-24
            rounded-3xl
            bg-white/20
            flex
            items-center
            justify-center
            text-3xl
          ">
            🚖
          </div>

          <h2 className="
            text-7xl
            font-bold
            mt-20
            leading-[90px]
          ">
            Welcome Back
          </h2>

          <p className="
            mt-10
            text-xl
            leading-[45px]
            text-indigo-100
          ">
            Continue your smart campus commuting
            experience with verified students.
          </p>

          {/* FEATURES */}
          <div className="
            mt-16
            space-y-8
            text-xl
          ">

            <div className="flex items-center gap-8">
              <FiCheckCircle />
              Verified college students only
            </div>

            <div className="flex items-center gap-8">
              <FiShield />
              Secure and trusted ride sharing
            </div>

            <div className="flex items-center gap-8">
              📍 Smart live ride matching
            </div>

            <div className="flex items-center gap-8">
              <FiUsers />
              Connect with your campus community
            </div>

            <div className="flex items-center gap-8">
              🌱 Eco-friendly commuting
            </div>

          </div>

          {/* STATS */}
          <div className="
            border-t
            border-white/20
            mt-16
            pt-10
            flex
            gap-16
          ">

            <div>

              <h3 className="text-3xl font-bold">
                5000+
              </h3>

              <p className="text-indigo-100 mt-2">
                Active Students
              </p>

            </div>

            <div>

              <h3 className="text-3xl font-bold">
                4.8★
              </h3>

              <p className="text-indigo-100 mt-2">
                Average Rating
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="
          bg-white
          rounded-[40px]
          border
          border-slate-200
          p-14
        ">

          <h2 className="
            text-3xl
            font-bold
            text-[#0F172A]
          ">
            Login to Your Account
          </h2>

          <p className="
            mt-4
            text-slate-500
            text-xl
          ">
            Access your student ride-sharing account
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12"
          >

            {/* EMAIL */}
            <div>

              <label className="font-semibold">
                College Email
              </label>

              <input
                type="email"
                placeholder="example@kristujayanti.com"
                className={`
                  w-full
                  mt-3
                  h-16
                  rounded-2xl
                  border
                  ${errors.email ? "border-red-500" : "border-slate-200"}
                  px-7
                  text-[14px]
                  outline-none
                  focus:border-indigo-500
                `}
                {...register("email", {

                  required:
                    "College email required",

                  pattern: {

                    value:
                      /^[a-zA-Z0-9._%+-]+@kristujayanti\.com$/,

                    message:
                      "Use only college email ID",
                  },

                  validate: (value) => {

                    if (
                      !value.endsWith("@kristujayanti.com")
                    ) {

                      return "Use only college email ID";
                    }

                    return true;
                  },
                })}
              />

              <p className="text-red-500 mt-2">
                {errors.email?.message}
              </p>

            </div>

            {/* PASSWORD */}
            <div className="mt-8">

              <label className="font-semibold">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className={`
                  w-full
                  mt-3
                  h-16
                  rounded-2xl
                  border
                  ${errors.password ? "border-red-500" : "border-slate-200"}
                  px-7
                  text-[14px]
                  outline-none
                  focus:border-indigo-500
                `}
                {...register("password", {

                  required:
                    "Password required",

                  minLength: {

                    value: 8,

                    message:
                      "Minimum 8 characters required",
                  },
                })}
              />

              <p className="text-red-500 mt-2">
                {errors.password?.message}
              </p>

            </div>

            {/* FORGOT PASSWORD */}
            <div className="
              flex
              justify-end
              mt-5
            ">

              <button
                type="button"
                className="
                  text-indigo-500
                  font-semibold
                  hover:underline
                "
              >
                Forgot Password?
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="
                w-full
                h-16
                mt-8
                rounded-2xl
                bg-gradient-to-r
                from-indigo-500
                to-indigo-400
                text-white
                text-xl
                font-bold
                hover:scale-[1.02]
                duration-300
              "
            >
              Login
            </button>

            {/* DIVIDER */}
            <div className="
              flex
              items-center
              gap-8
              my-10
            ">

              <div className="
                flex-1
                h-[1px]
                bg-slate-200
              "></div>

              <span className="text-slate-400">
                OR
              </span>

              <div className="
                flex-1
                h-[1px]
                bg-slate-200
              "></div>

            </div>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="
                w-full
                h-16
                rounded-2xl
                border
                border-slate-200
                flex
                items-center
                justify-center
                gap-4
                text-[14px]
                font-semibold
                hover:bg-slate-50
                duration-300
              "
            >

              <FcGoogle className="text-xl" />

              Continue with Google

            </button>

            {/* SECURITY NOTE */}
            <div className="
              mt-8
              text-slate-500
            ">
              🔒 Only verified college accounts can login
            </div>

            {/* REGISTER */}
            <p className="
              text-center
              mt-10
              text-slate-500
            ">

              Don't have an account?

              <Link
                to="/signup"
                className="
                  text-indigo-500
                  font-semibold
                "
              >
                {" "}Register here
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}