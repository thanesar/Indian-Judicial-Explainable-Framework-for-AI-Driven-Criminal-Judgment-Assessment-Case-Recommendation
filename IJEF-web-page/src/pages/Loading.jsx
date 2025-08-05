import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [progress, setProgress] = useState(0);

  const phrases = [
    "Searching the 15,283 case records...",
    "Analyzing legal precedents...",
    "Cross-referencing statutes...",
    "Compiling relevant judgments...",
    "Creating your comprehensive report...",
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const appellant = queryParams.get("appellant");
    const appellee = queryParams.get("appellee");
    const key = `${appellant}-${appellee}`;
    const caseData = JSON.parse(localStorage.getItem(key));

    if (!caseData) return;

    const fetchResults = async () => {
      try {
        // Step 1: Hit first two APIs
        const [lawsRes, casesRes] = await Promise.all([
          fetch("http://127.0.0.1:5000/api/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: caseData.caseDetails,
              acts: caseData.domains,
            }),
          }),
          fetch("http://127.0.0.1:5001/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: caseData.caseDetails }),
          }),
        ]);

        const lawsData = await lawsRes.json();
        const casesData = await casesRes.json();

        const resultKey = `${appellant}-${appellee}-result`;
        const resultData = { lawsData, casesData };

        localStorage.setItem(resultKey, JSON.stringify(resultData));

        // Step 2: Hit outcome prediction API
        const outcomeRes = await fetch(
          "http://127.0.0.1:5002/predict-case-outcome",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: localStorage.getItem(resultKey),
          }
        );

        const finalResult = await outcomeRes.json();
        localStorage.setItem(
          `${appellant}-${appellee}-final-result`,
          JSON.stringify(finalResult)
        );
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchResults();
  }, [location.search]);

  useEffect(() => {
    // Update progress
    const currentProgress = ((loopNum % phrases.length) / phrases.length) * 100;
    setProgress(currentProgress);

    // Redirect after completing all phrases twice
    if (loopNum >= phrases.length) {
      navigate(`/summary${location.search}`);
      return;
    }

    const handleType = () => {
      const currentPhrase = phrases[loopNum % phrases.length];

      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 800);
      } else if (isDeleting && text === "") {
        if (loopNum + 1 === phrases.length) {
          navigate(`/summary${location.search}`);
        } else {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(100);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, navigate, phrases.length]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Loading GIF - no additional animations */}
      <div className="mb-8">
        <img src="/loading-law-1.gif" alt="Loading..." className="w-32 h-32" />
      </div>

      {/* Typewriter Text */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          {text}
          <span className="animate-pulse">|</span>
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="w-64 md:w-96 bg-gray-200 rounded-full h-2.5 mt-8 overflow-hidden">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Tagline */}
      <div className="mt-12">
        <p className="text-gray-500 text-sm md:text-base">
          Powered by <span className="font-bold text-blue-600">NyayaBERT</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
