import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

import {
  FiUploadCloud,
  FiCheckCircle,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

export default function Signup() {

  const [selectedFile, setSelectedFile] = useState(null);

  const [fileError, setFileError] = useState("");

  const [availableYears, setAvailableYears] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const selectedDepartment = watch("department");

  /*
    FUTURE ADMIN CONFIG
    Later backend admin panel can fetch this from database
  */

  const departments = [
    "BCA",
    "MCA",
    "BCom",
    "BBA",
    "MBA",
    "BSc Computer Science",
    "BSc Biotechnology",
    "BSc Psychology",
    "BA Journalism",
    "BTech",
    "MTech",
    "LLB",
    "BA LLB",
    "BBA LLB",
    "LLM",
  ];

  // DYNAMIC YEARS
  useEffect(() => {

    const lawDepartments = [
      "LLB",
      "BA LLB",
      "BBA LLB",
      "LLM",
    ];

    if (lawDepartments.includes(selectedDepartment)) {

      setAvailableYears([
        "1st Year",
        "2nd Year",
        "3rd Year",
        "4th Year",
        "5th Year",
      ]);

    } else {

      setAvailableYears([
        "1st Year",
        "2nd Year",
        "3rd Year",
      ]);
    }

  }, [selectedDepartment]);

  // FILE VALIDATION
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {

      toast.error(
        "Only PNG, JPG, JPEG or PDF allowed"
      );

      return;
    }

    // FILE SIZE LIMIT 5MB
    if (file.size > 5 * 1024 * 1024) {

      toast.error(
        "File size should be less than 5MB"
      );

      return;
    }

    setSelectedFile(file);

    setFileError("");

    toast.success(
      "Student proof uploaded successfully"
    );
  };

  // FORM SUBMIT
  const onSubmit = async (data) => {

    try {

      if (!selectedFile) {

        toast.error(
          "Please upload student ID proof"
        );

        return;

      }

      const formData =
        new FormData();

      formData.append(
        "name",
        data.name
      );

      formData.append(
        "email",
        data.email
      );

      formData.append(
        "password",
        data.password
      );

      formData.append(
        "department",
        data.department
      );

      formData.append(
        "year",
        data.year
      );

      formData.append(
        "studentIdProof",
        selectedFile
      );

      const res =
        await API.post(
          "/auth/signup",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      toast.success(
        "Signup successful"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Signup failed"
      );

    }

  };

  return (

  <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER */}
      <div className="border-b bg-white h-20 flex items-center justify-between px-7">

        <div className="flex items-center gap-3">

          {/* TEMP LOGO */}
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

        {/* LEFT PANEL */}
        <div className="
          rounded-[40px]
          bg-gradient-to-b
          from-indigo-500
          to-indigo-400
          p-14
          text-white
          min-h-[900px]
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
            👨‍🎓
          </div>

          <h2 className="
            text-7xl
            font-bold
            mt-20
            leading-[90px]
          ">
            Join ChaloRide Today
          </h2>

          <p className="
            mt-10
            text-xl
            leading-[45px]
            text-indigo-100
          ">
            Start your journey towards affordable,
            sustainable and social campus commuting.
          </p>

          {/* FEATURES */}
          <div className="
            mt-16
            space-y-8
            text-xl
          ">

            <div className="flex items-center gap-8">
              <FiCheckCircle />
              Verified student-only community
            </div>

            <div className="flex items-center gap-8">
              <FiShield />
              Safe and secure ride sharing
            </div>

            <div className="flex items-center gap-8">
              📉 Save up to 70% on daily commute
            </div>

            <div className="flex items-center gap-8">
              <FiUsers />
              Build your campus network
            </div>

            <div className="flex items-center gap-8">
              🌱 Reduce your carbon footprint
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

        {/* RIGHT FORM */}
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
            Create Your Account
          </h2>

          <p className="
            mt-4
            text-slate-500
            text-xl
          ">
            Fill in your details to get started
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12"
          >

            {/* ROW 1 */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* NAME */}
              <div>

                <label className="font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="John Doe"
                  className={`
                    w-full
                    mt-3
                    h-16
                    rounded-2xl
                    border
                    ${errors.name ? "border-red-500" : "border-slate-200"}
                    px-7
                    text-[14px]
                    outline-none
                    focus:border-indigo-500
                  `}
                  {...register("name", {

                    required:
                      "Enter your full name",

                    pattern: {

                      value: /^[A-Za-z\s]+$/,

                      message:
                        "Only alphabets allowed",
                    },

                    minLength: {

                      value: 3,

                      message:
                        "Minimum 3 letters required",
                    },

                    validate: (value) =>
                      !/\d/.test(value) ||
                      "Numbers are not allowed",
                  })}
                />

                <p className="text-red-500 mt-2">
                  {errors.name?.message}
                </p>

              </div>

              {/* PHONE */}
              <div>

                <label className="font-semibold">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  inputMode="numeric"
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                  }}
                  className={`
                    w-full
                    mt-3
                    h-16
                    rounded-2xl
                    border
                    ${errors.phone ? "border-red-500" : "border-slate-200"}
                    px-7
                    text-[14px]
                    outline-none
                    focus:border-indigo-500
                  `}
                  {...register("phone", {

                    required:
                      "Phone number required",

                    pattern: {

                      value: /^[0-9]{10}$/,

                      message:
                        "Enter valid 10 digit mobile number",
                    },
                  })}
                />

                <p className="text-red-500 mt-2">
                  {errors.phone?.message}
                </p>

              </div>

            </div>

            {/* REGISTER NUMBER */}
            <div className="mt-8">

              <label className="font-semibold">
                Register Number
              </label>

              <input
                type="text"
                placeholder="23MCA102"
                className={`
                  w-full
                  mt-3
                  h-16
                  rounded-2xl
                  border
                  ${errors.registerNumber ? "border-red-500" : "border-slate-200"}
                  px-7
                  text-[14px]
                  outline-none
                  focus:border-indigo-500
                `}
                {...register("registerNumber", {

                  required:
                    "Register number required",

                  pattern: {

                    value: /^[A-Za-z0-9]+$/,

                    message:
                      "Only letters and numbers allowed",
                  },

                  minLength: {

                    value: 5,

                    message:
                      "Invalid register number",
                  },
                })}
              />

              <p className="text-red-500 mt-2">
                {errors.registerNumber?.message}
              </p>

            </div>

            {/* EMAIL */}
            <div className="mt-8">

              <label className="font-semibold">
                College Email
              </label>

              <input
                type="email"
                placeholder="Enter Email"
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
                        {/* ROW 2 */}
            <div className="
              grid
              md:grid-cols-2
              gap-6
              mt-8
            ">

              {/* DEPARTMENT */}
              <div>

                <label className="font-semibold">
                  Department
                </label>

                <select
                  className={`
                    w-full
                    mt-3
                    h-16
                    rounded-2xl
                    border
                    ${errors.department ? "border-red-500" : "border-slate-200"}
                    px-7
                    text-[14px]
                    outline-none
                    focus:border-indigo-500
                  `}
                  {...register("department", {
                    required:
                      "Department required",
                  })}
                >

                  <option value="">
                    Select Department
                  </option>

                  {departments.map((dept) => (
                    <option
                      key={dept}
                      value={dept}
                    >
                      {dept}
                    </option>
                  ))}

                </select>

                <p className="text-red-500 mt-2">
                  {errors.department?.message}
                </p>

              </div>

              {/* YEAR */}
              <div>

                <label className="font-semibold">
                  Year
                </label>

                <select
                  className={`
                    w-full
                    mt-3
                    h-16
                    rounded-2xl
                    border
                    ${errors.year ? "border-red-500" : "border-slate-200"}
                    px-7
                    text-[14px]
                    outline-none
                    focus:border-indigo-500
                  `}
                  {...register("year", {
                    required:
                      "Year required",
                  })}
                >

                  <option value="">
                    Select Year
                  </option>

                  {availableYears.map((year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}

                </select>

                <p className="text-red-500 mt-2">
                  {errors.year?.message}
                </p>

              </div>

            </div>

            {/* PASSWORDS */}
            <div className="
              grid
              md:grid-cols-2
              gap-6
              mt-8
            ">

              {/* PASSWORD */}
              <div>

                <label className="font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Min. 8 characters"
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

              {/* CONFIRM PASSWORD */}
              <div>

                <label className="font-semibold">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Re-enter password"
                  className={`
                    w-full
                    mt-3
                    h-16
                    rounded-2xl
                    border
                    ${errors.confirmPassword ? "border-red-500" : "border-slate-200"}
                    px-7
                    text-[14px]
                    outline-none
                    focus:border-indigo-500
                  `}
                  {...register("confirmPassword", {
                    required:
                      "Confirm your password",

                    validate: (value) =>
                      value === password ||
                      "Passwords do not match",
                  })}
                />

                <p className="text-red-500 mt-2">
                  {errors.confirmPassword?.message}
                </p>

              </div>

            </div>

            {/* FILE UPLOAD */}
            <div className="mt-10">

              <label className="font-semibold">
                Student Verification Document
              </label>

              <label className="
                mt-4
                border-2
                border-dashed
                border-indigo-300
                rounded-[30px]
                p-14
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:bg-indigo-50
                duration-300
              ">

                <FiUploadCloud className="
                  text-3xl
                  text-indigo-500
                " />

                <h3 className="
                  mt-6
                  text-xl
                  font-bold
                ">
                  Upload Student ID or College Proof
                </h3>

                <p className="
                  mt-3
                  text-slate-500
                ">
                  Drag and drop or click to browse
                </p>

                <div className="
                  flex
                  gap-4
                  mt-6
                ">

                  <span className="
                    px-4
                    py-2
                    bg-slate-100
                    rounded-full
                    text-base
                  ">
                    JPG
                  </span>

                  <span className="
                    px-4
                    py-2
                    bg-slate-100
                    rounded-full
                    text-base
                  ">
                    PNG
                  </span>

                  <span className="
                    px-4
                    py-2
                    bg-slate-100
                    rounded-full
                    text-base
                  ">
                    PDF
                  </span>

                </div>

                {selectedFile && (
                  <p className="
                    mt-6
                    text-green-600
                    font-semibold
                  ">
                    {selectedFile.name}
                  </p>
                )}

                {fileError && (
                  <p className="
                    mt-5
                    text-red-500
                    font-medium
                  ">
                    {fileError}
                  </p>
                )}

                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />

              </label>

            </div>

            {/* INFO */}
            <div className="
              mt-8
              text-slate-500
            ">
              🔒 Your information is encrypted and secure
            </div>

            {/* TERMS */}
            <p className="text-slate-500 text-[14px]">

              I agree to ChaloRide's{" "}

              <Link
                to="/legal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366f1] font-semibold hover:underline"
              >
                Terms of Service
              </Link>

              {" "}and{" "}

              <Link
                to="/legal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6366f1] font-semibold hover:underline"
              >
                Privacy Policy
              </Link>

            </p>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full
                h-16
                mt-10
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
              Create Account
            </button>

            {/* LOGIN */}
            <p className="
              text-center
              mt-10
              text-slate-500
            ">

              Already have an account?

              <Link
                to="/login"
                className="
                  text-indigo-500
                  font-semibold
                "
              >
                {" "}Login here
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}