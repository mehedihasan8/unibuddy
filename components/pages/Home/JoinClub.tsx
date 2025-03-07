"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Image from "next/image";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/redux/hooks";
import { useSelectCurrentUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const JoinClub = () => {
    const [open, setOpen] = useState(false);
    const user = useAppSelector(useSelectCurrentUser);

    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        batch: "",
        semester: "",
        shift: "",
        roll: "",
        reg: "",
        clubName: "",
        expertIn: "",
        interestedIn: "",
        fbProfileLink: "",
        paymentType: "",
        transactionId: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({}); // Store validation errors

    // ✅ Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
    };

    // ✅ Validate Form Fields
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key] = "This field is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Handle Form Submission
    const handleSubmit = async () => {

        if (!validateForm()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "JoinClub"), {
                ...formData,
                timestamp: serverTimestamp(),
            });

            toast.success("Application submitted successfully!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                batch: "",
                semester: "",
                shift: "",
                roll: "",
                reg: "",
                clubName: "",
                expertIn: "",
                interestedIn: "",
                fbProfileLink: "",
                paymentType: "",
                transactionId: "",
            });

            setOpen(false);
        } catch (error) {
            console.error("Error submitting application:", error);
            toast.error("Failed to submit application.");
        } finally {
            setLoading(false);
        }
    };

    const handleJoinClubClick = () => {


        if (!user) {
            setOpen(false);
            toast.warning("You need to log in to join a club.");
            router.push("/login"); // Redirect to the login page
            return;
        } else {
            setOpen(true); // Open the dialog if the user exists
        }
    };

    return (
        <div className="max-w-7xl mx-auto pt-20">
            <SectionTitle title="Be Part of Something Bigger!" description="Clubs are the heart of university life! Whether you love tech, music, debate, or sports, there's a place for you. Join a university club today and take your university experience to the next level" />

            <div className=" flex flex-col md:flex-row items-center gap-8 pb-16 px-6  rounded-lg">

                {/* ✅ Left Side: Banner */}
                <div className="w-full md:w-1/2">
                    <Image
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVuaXZlcnNpdHklMjBjbHVifGVufDB8fDB8fHww"
                        alt="Join University Club"
                        className="w-full rounded-lg"
                        width={600}
                        height={400}
                    />
                </div>

                {/* ✅ Right Side: Text & Join Button */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-bold">Join a University Club</h2>
                    <p className="text-gray-600 mt-3">
                        Be part of something amazing! Join a club to enhance your university experience, network with like-minded people, and develop your skills.
                    </p>

                    {/* ✅ Modal Trigger Button */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleJoinClubClick} // Add the click event here
                                className="mt-4 w-[200px] text-lg py-5">Join Club</Button>
                        </DialogTrigger>

                        <DialogContent className="!max-w-[700px]">
                            <DialogHeader>
                                <DialogTitle>Apply to Join a Club</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className="md:h-[80vh] lg:h-[60vh] h-[500px] px-4">
                                {/* ✅ Application Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.keys(formData).map((field) => (
                                        <div key={field}>
                                            <label className="capitalize font-light text-sm">{field.replace(/([A-Z])/g, " $1").trim()}</label>
                                            <Input
                                                name={field}
                                                placeholder={field.replace(/([A-Z])/g, " $1").trim()} // Format label
                                                value={formData[field as keyof typeof formData]}
                                                onChange={handleChange}
                                            />
                                            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                                        </div>
                                    ))}
                                </div>

                                {/* ✅ Submit Button */}
                                <Button onClick={handleSubmit} className="mt-4 w-full" disabled={loading}>
                                    {loading ? "Submitting..." : "Submit Application"}
                                </Button>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default JoinClub;
