"use client";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import Image from "next/image";
import React, { useState } from "react";

const WhyChoose = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How does the academic schedule tracking feature work?",
      answer:
        "The app helps students manage their academic schedules by providing real-time updates on class timings, exams, and assignment deadlines.",
    },
    {
      question: "How does the campus navigation system work?",
      answer:
        "Students can navigate efficiently with real-time mapping and augmented reality (AR) directions, helping them find classrooms, libraries, and faculty offices quickly.",
    },
    {
      question: "What services are integrated into the university app?",
      answer:
        "The app consolidates essential university services, including cafeteria menus, bus schedules, class timetables, faculty contacts, and university policies, into a single platform.",
    },
    {
      question: "Does the app provide smart notifications?",
      answer:
        "Yes, the app includes AI-driven automation and smart notifications to remind students of important events, deadlines, and real-time campus updates.",
    },
    {
      question: "Can students collaborate using the app?",
      answer:
        "Yes, the app includes cloud-based collaboration tools, allowing students to interact with classmates, join discussion groups, and manage team projects efficiently.",
    },
    {
      question: "Does the app support real-time bus tracking?",
      answer:
        "Yes, students can track university buses in real-time, check arrival times, and receive notifications for delays or route changes.",
    },
    {
      question: "Is there an AI-powered support system?",
      answer:
        "The app features an AI-powered chat assistant that helps students get instant answers to common queries regarding university services and policies.",
    },
  ];

  return (
    <div className="bg-[#F9F8FF] py-20 mt-24">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="Find Answers to Common Questions" description="We've compiled a list of common questions to help you get the information you need, fast and hassle-free!" />
        <div className="px-8 max-w-5xl mx-auto flex flex-col items-center md:flex-row gap-12">
          {/* Left Image */}
          <div className="flex w-full md:w-[300px] md:h-[300px] flex-col text-left">
            <Image
              src="https://cdn.pixabay.com/photo/2017/10/08/19/55/magnifying-glass-2831367_640.png"
              alt="magnifying glass"
              width={800}
              height={1000}
              className="w-full h-full object-center"
            />
          </div>

          {/* FAQ Section */}
          <ul className="md:w-[50%]">
            {faqs.map((faq, index) => (
              <li key={index}>
                <button
                  className={`relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left md:text-lg border-b border-gray-300`}
                  aria-expanded={activeIndex === index}
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="flex-1 text-base-content">{faq.question}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${activeIndex === index ? "rotate-45" : "rotate-0"
                      }`}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="7" width="16" height="2" rx="1"></rect>
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      className="origin-center rotate-90"
                    ></rect>
                  </svg>
                </button>

                {/* FAQ Answer */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${activeIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="pb-5 leading-relaxed">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
