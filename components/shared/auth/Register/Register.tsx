"use client";

import { Button } from "@/components/ui/button";
import { registration } from "@/firebase/auth";
import { db } from "@/firebase/firebaseConfig";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    batchNo: "",
    deptName: "",
    emailAdd: "",
    firstName: "",
    lastName: "",
    pass: "",
    phoneNo: "",
    registrationNo: "",
    rollNo: "",
    semesterNo: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);

  //handel firebase create user

  // ✅ Create Data (Add User)
  const addDataToFirebase = async (
    firstName: string,
    lastName: string,
    department: string,
    batch: number,
    registrationNo: string,
    rollNo: number,
    semester: number,
    phone: number,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    try {
      // Add data to Firestore with Firestore collection reference

      const docRef = await addDoc(collection(db, "users"), {
        firstName,
        lastName,
        deptName: department,
        batchNo: batch,
        registrationNo,
        rollNo,
        semester,
        phone,
        emailAdd: email,
        pass: password,
      });

      if (docRef.id) {
        // ✅ Dispatch the correct user format
        dispatch(
          setUser({
            id: docRef.id,
            firstName,
            lastName,
            department,
            batch,
            registrationNo,
            rollNo,
            semester,
            phone,
            email,
          }),
        );
      }
    } catch (error) {
      console.error("Error adding document: ", error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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

    if (!formData.batchNo.trim()) {
      newErrors.batchNo = "Batch No is required.";
      isValid = false;
    }
    if (!formData.deptName.trim()) {
      newErrors.deptName = "Department Name is required.";
      isValid = false;
    }
    if (!formData.emailAdd.trim()) {
      newErrors.emailAdd = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAdd)) {
      newErrors.emailAdd = "Invalid email address.";
      isValid = false;
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
      isValid = false;
    }
    if (!formData.pass.trim()) {
      newErrors.pass = "Password is required.";
      isValid = false;
    } else if (formData.pass.length < 8) {
      newErrors.pass = "Password must be at least 8 characters.";
      isValid = false;
    }
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone Number is required.";
      isValid = false;
    } else if (!/^\d{10,15}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "Invalid phone number.";
      isValid = false;
    }
    if (!formData.registrationNo.trim()) {
      newErrors.registrationNo = "Registration No is required.";
      isValid = false;
    }
    if (!formData.rollNo.trim()) {
      newErrors.rollNo = "Roll No is required.";
      isValid = false;
    } else if (isNaN(Number(formData.rollNo))) {
      newErrors.rollNo = "Roll No must be a number.";
      isValid = false;
    }
    if (!formData.semesterNo.trim()) {
      newErrors.semesterNo = "Semester No is required.";
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

      const { user, error } = await registration(
        formData.emailAdd,
        formData.pass,
        `${formData.firstName} ${formData.lastName}`,
      );

      if (user) {
        // Add user data to Firestore
        addDataToFirebase(
          formData.firstName,
          formData.lastName,
          formData.deptName,
          Number(formData.batchNo),
          formData.registrationNo,
          Number(formData.rollNo),
          Number(formData.semesterNo),
          Number(formData.phoneNo),
          formData.emailAdd,
          formData.pass,
        );

        toast.success("Registration successful!");

        setLoading(false);

        router.push("/"); // Redirect to home page

        // Clear form data

        setFormData({
          batchNo: "",
          deptName: "",
          emailAdd: "",
          firstName: "",
          lastName: "",
          pass: "",
          phoneNo: "",
          registrationNo: "",
          rollNo: "",
          semesterNo: "",
        });
      }

      if (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="bg-white px-6 py-12 pt-28 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight primary-color">
          Registration
        </h1>
        <p className="mt-3 text-gray-600">
          Fill out the form to register for the university.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-2xl sm:mt-14"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* first name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Enter you last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Department Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Department Name
            </label>
            <input
              type="text"
              name="deptName"
              value={formData.deptName}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Department Name"
            />
            {errors.deptName && (
              <p className="text-red-500 text-xs mt-1">{errors.deptName}</p>
            )}
          </div>

          {/* Batch No */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Batch No
            </label>
            <input
              type="number"
              name="batchNo"
              value={formData.batchNo}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Batch No"
            />
            {errors.batchNo && (
              <p className="text-red-500 text-xs mt-1">{errors.batchNo}</p>
            )}
          </div>

          {/* Registration no */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Registration No
            </label>
            <input
              type="number"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Registration No"
            />
            {errors.registrationNo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.registrationNo}
              </p>
            )}
          </div>

          {/* Roll No */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Roll No
            </label>
            <input
              type="number"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Roll No"
            />
            {errors.rollNo && (
              <p className="text-red-500 text-xs mt-1">{errors.rollNo}</p>
            )}
          </div>

          {/* Semester no */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Semester No
            </label>
            <input
              type="number"
              name="semesterNo"
              value={formData.semesterNo}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Semester No"
            />
            {errors.semesterNo && (
              <p className="text-red-500 text-xs mt-1">{errors.semesterNo}</p>
            )}
          </div>

          {/* Phone No */}
          <div>
            <label className="block text-sm font-semibold text-gray-900">
              Phone No
            </label>
            <input
              type="number"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="block w-full rounded-md px-3.5 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-600"
              placeholder="Phone No"
            />
            {errors.phoneNo && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>
            )}
          </div>

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

          {/* Phone */}
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
            {loading ? "Loading..." : "Submit →"}
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?
          <Link
            href="/login"
            className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
          >
            Login!
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default Register;
