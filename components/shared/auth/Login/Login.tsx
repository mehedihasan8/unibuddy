"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

const fetchUserByEmail = async (email: string) => {

  try {
    const userQuery = query(
      collection(db, "users"),
      where("emailAdd", "==", email), // ✅ Search by email field
    );

    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // ✅ Get first matching document
      return { id: userDoc.id, ...userDoc.data() }; // ✅ Return user data with ID
    } else {
      return null; // ❌ No user found
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Form state
  const [formData, setFormData] = useState({
    emailAdd: "",
    pass: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState<boolean>(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!formData.emailAdd.trim()) {
      newErrors.emailAdd = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAdd)) {
      newErrors.emailAdd = "Invalid email address.";
      isValid = false;
    }

    if (!formData.pass.trim()) {
      newErrors.pass = "Password is required.";
      isValid = false;
    } else if (formData.pass.length < 8) {
      newErrors.pass = "Password must be at least 8 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      const { user, error } = await login(formData.emailAdd, formData.pass);


      if (user) {
        toast.success("Login successful!");

        setLoading(false);

        const fetchUser = await fetchUserByEmail(user?.email as string);

        if (!fetchUser) {
          toast.error("User not found.");

          setLoading(false);

          toast.warning("Please register first.");
          return;
        }

        dispatch(
          setUser({
            ...fetchUser,
          }),
        );

        router.push("/");

        // Clear form data

        setFormData({
          emailAdd: "",
          pass: "",
        });
      }

      if (error) {

        toast.error("Login failed. Please try again.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white px-6 py-12 pt-28 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight primary-color">
          Login
        </h1>
        <p className="mt-3 text-gray-600">
          Fill out the form to login for the university.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-14">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Email */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="emailAdd"
              value={formData.emailAdd}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
            {errors.emailAdd && (
              <p className="text-red-500 text-xs mt-1">{errors.emailAdd}</p>
            )}
          </div>

          {/* password */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-900">
              Password
            </label>
            <input
              type="password"
              name="pass"
              value={formData.pass}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
            {errors.pass && (
              <p className="text-red-500 text-xs mt-1">{errors.pass}</p>
            )}
          </div>
        </div>

        <div className="flex text-base flex-wrap -mx-4 my-4 items-center justify-between">
          <div className="w-full lg:w-auto px-4 lg:mb-0">
            <label className="flex items-center">
              <input className="accent-[#334155]" type="checkbox" />
              <span className="ml-1">Remember me</span>
            </label>
          </div>
          <div className="w-full lg:w-auto px-4">
            <a className="inline-block  hover:underline" href="#">
              Forgot your password?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <div className="">
          <Button
            className="w-full rounded-md !py-[21px] text-lg"
            type="submit"
          >
            {loading ? "Loading..." : "Login →"}
          </Button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don&#x27;t have an account yet?
          <Link
            href="/register"
            className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
          >
            Sign up
          </Link>
          .
        </p>
      </form>
    </div>
  );
};
export default Login;
