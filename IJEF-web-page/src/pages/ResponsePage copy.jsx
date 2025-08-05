import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import JudgmentPrediction from "../components/JudgmentPrediction";
import DecisionExplanation from "../components/DecisionExplanation";

const ResponsePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  // Extract query params
  const queryParams = new URLSearchParams(location.search);
  const appellant = queryParams.get("appellant") || "Appellant";
  const appellee = queryParams.get("appellee") || "Appellee";
  const key = `${appellant}-${appellee}-result`;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-200 to-indigo-300 p-8">
      <div className="container mx-auto grid gap-6">
        {/* First Row: Judgment Prediction Probability */}
        <JudgmentPrediction
          petitionerName="Mrs. Yoga Marimuthu"
          respondentName="State Govt. of Tamil Nadu"
          petitionerProbability={75} // Probability for Petitioner
          respondentProbability={25} // Probability for Respondent
        />

        {/* Second Row: Graphs and Statistical Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Graphs */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Case Law Trends</h2>
            <div className="h-56 bg-gray-200 rounded-lg">
              {/* Replace with actual graph */}
              <p className="text-center text-gray-600 p-20">
                Graph Placeholder
              </p>
            </div>
          </div>

          {/* Right: Statistical Analysis */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Statistical Analysis</h2>
            <ul className="text-gray-700 list-disc list-inside space-y-2">
              <li>
                <span className="font-bold text-blue-600">85%</span> of cases
                with similar facts were{" "}
                <span className="font-bold">Allowed</span>.
              </li>
              <li>
                <span className="font-bold text-blue-600">72%</span> of
                dismissed cases had{" "}
                <span className="font-bold">less than 3 witnesses</span>.
              </li>
              <li>
                <span className="font-bold text-blue-600">90%</span> of partly
                allowed cases had{" "}
                <span className="font-bold">
                  precedents supporting both parties
                </span>
                .
              </li>
              <li>
                Cases with{" "}
                <span className="font-bold text-blue-600">senior judges</span>{" "}
                were{" "}
                <span className="font-bold text-blue-600">20% more likely</span>{" "}
                to be disposed of.
              </li>
            </ul>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Know More
            </button>
          </div>
        </div>

        {/* Third Row: Decision Explanation */}
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Final Decision</h2>
          <p className="text-gray-800">
            Based on the analysis, the final decision aligns with the legal
            precedent set by similar cases.
          </p>
          <h3 className="mt-4 text-lg font-semibold">Detailed Explanation</h3>
          <p className="text-gray-700 mt-2">
            The AI model’s reasoning is derived from legal texts, citations, and
            case law, ensuring fairness. Key case laws cited:
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-800">
            <li className="font-semibold text-blue-600">
              <span className="font-bold">Case A v. Case B</span> - Judgement
              upheld due to similar circumstances involving contractual
              disputes.
            </li>
            <li className="font-semibold text-blue-600">
              <span className="font-bold">Case X v. Case Y</span> - Judgment was
              influenced by precedent regarding financial considerations and
              breach of contract.
            </li>
          </ul>
        </div>

        <DecisionExplanation />
      </div>

      {/* Modal */}
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
