import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import JudgmentPrediction from "../components/JudgmentPrediction";
import DecisionExplanation from "../components/DecisionExplanation";
import CaseLawTrends from "../components/CaseLawTrends";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ResponsePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [judgementData, setJudgementData] = useState(null);
  const [caseData, setCaseData] = useState(null);

  // Extract query params
  const queryParams = new URLSearchParams(location.search);
  const appellant = queryParams.get("appellant") || "Appellant";
  const appellee = queryParams.get("appellee") || "Appellee";
  const key = `${appellant}-${appellee}-final-result`;
  const key1 = `${appellant}-${appellee}-result`;

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setJudgementData(
          parsedData.output ? JSON.parse(parsedData.output) : null
        );
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }

    // Retrieve case data from localStorage
    const storedCaseData = localStorage.getItem(key1);
    if (storedCaseData) {
      try {
        const parsedCaseData = JSON.parse(storedCaseData);
        setCaseData(parsedCaseData);
      } catch (error) {
        console.error("Error parsing stored case data:", error);
      }
    }
  }, [key, key1]);

  const similarCases =
    caseData?.casesData?.results?.map((caseItem, index) => ({
      id: index + 1,
      caseName: caseItem.case_name,
      summary: caseItem.text,
      similarity: caseItem.similarity,
    })) || [];

  if (!judgementData) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-200 to-indigo-300 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700">Loading case data...</p>
        </div>
      </div>
    );
  }

  // Calculate probabilities based on confidence
  const petitionerProbability = judgementData.decision
    ? Math.round(judgementData.confidence * 100)
    : 100 - Math.round(judgementData.confidence * 100);
  const respondentProbability = 100 - petitionerProbability;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-200 to-indigo-300 p-8">
      <div className="container mx-auto grid gap-6">
        {/* First Row: Judgment Prediction Probability */}
        <JudgmentPrediction
          petitionerName={appellant}
          respondentName={appellee}
          petitionerProbability={petitionerProbability}
          respondentProbability={respondentProbability}
          winningParty={judgementData.winning_party}
          userQuery={caseData?.lawsData?.query || ""}
          date={caseData?.lawsData?.datetime || ""}
          filteredActs={caseData?.lawsData?.filtered_acts || []}
          method={caseData?.lawsData?.method || ""}
        />

        {/* Second Row: Graphs and Decision Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Graphs */}
          <CaseLawTrends
            graphData={caseData.casesData.graph_data}
            similarCases={similarCases}
          />

          {/* Right: Decision Explanation (moved from third row) */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Final Decision</h2>
            <div className="p-4 bg-blue-50 rounded-lg mb-4">
              <p className="text-lg font-semibold text-blue-800">
                The court is likely to rule in favor of the{" "}
                <span className="underline">{judgementData.winning_party}</span>{" "}
                with {Math.round(judgementData.confidence * 100)}% confidence.
              </p>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Detailed Explanation</h3>
            <div className="mt-2 space-y-3">
              {judgementData.reasoning.map((reason, index) => (
                <p key={index} className="text-gray-700 flex items-start">
                  <span className="inline-block mr-2 text-blue-500">•</span>
                  {reason.replace(/^- /, "")}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* DecisionExplanation component remains */}
        <DecisionExplanation />
      </div>

      {/* Modal - kept but no longer needed since Statistical Analysis was removed */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Detailed Statistical Analysis
            </h2>
            <p className="text-gray-700">
              Here are additional insights derived from extensive Supreme Court
              case data:
            </p>
            <ul className="mt-4 text-gray-700 list-disc list-inside space-y-2">
              <li>
                Cases with{" "}
                <span className="font-bold text-blue-600">
                  written contracts
                </span>{" "}
                had a{" "}
                <span className="font-bold text-blue-600">78% higher</span>{" "}
                chance of approval.
              </li>
              <li>
                If{" "}
                <span className="font-bold text-blue-600">
                  multiple parties
                </span>{" "}
                were involved, the case was{" "}
                <span className="font-bold text-blue-600">15% longer</span> on
                average.
              </li>
              <li>
                <span className="font-bold text-blue-600">
                  Historical trends
                </span>{" "}
                show an increase in{" "}
                <span className="font-bold">partial approvals</span> in
                commercial disputes.
              </li>
            </ul>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsePage;
