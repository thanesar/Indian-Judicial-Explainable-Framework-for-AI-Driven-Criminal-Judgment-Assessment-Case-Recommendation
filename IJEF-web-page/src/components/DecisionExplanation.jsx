import { useState } from "react";
import { useLocation } from "react-router-dom";

const DecisionExplanation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const appellant = queryParams.get("appellant");
  const appellee = queryParams.get("appellee");
  const key = `${appellant}-${appellee}-result`;

  // Get data from localStorage
  const resultData = JSON.parse(localStorage.getItem(key));

  // Extract laws and cases data
  const legalSections =
    resultData?.lawsData?.results?.map((law, index) => ({
      id: index + 1,
      section: `Section ${law.section_number}`,
      law: law.act_name,
      description: law.section_title,
      chapter: `Chapter ${law.chapter_number}: ${law.chapter_title}`,
      content: law.content,
      actLink: law.act_link,
    })) || [];

  const similarCases =
    resultData?.casesData?.results?.map((caseItem, index) => ({
      id: index + 1,
      caseName: caseItem.case_name,
      summary: caseItem.text,
      similarity: caseItem.similarity,
    })) || [];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">References</h2>
      <p className="text-gray-600">
        Below are the legal provisions and past judgments recommended by
        <span className="font-semibold text-blue-600"> NyayaBERT</span> to aid
        in understanding the case.
      </p>
      {/* Top Relevant Laws & Sections */}
      <h3 className="mt-6 text-lg font-semibold">
        Relevant Provisions from{" "}
        {resultData?.lawsData?.filtered_acts?.[0] || ""}
      </h3>
      <ul className="mt-2 space-y-4">
        {legalSections.map((law) => (
          <li
            key={law.id}
            className="text-gray-700 border-l-4 border-blue-500 pl-4 py-1"
          >
            <div className="font-bold text-blue-600 flex items-center gap-2">
              Section {law.section.split(" ")[1]}, {law.law}
              {law.actLink && (
                <a
                  href={"http://127.0.0.1:5000" + law.actLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 underline flex items-center gap-1"
                >
                  📄 PDF
                </a>
              )}
            </div>
            <div className="text-sm text-gray-500">{law.chapter}</div>
            <div className="mt-1">{law.description}</div>
            {law.content && law.content !== "<will be added>" && (
              <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                {law.content}
              </div>
            )}
            {law.actLink && (
              <a
                href={"http://127.0.0.1:5000" + law.actLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block text-sm"
              >
                View Full Act
              </a>
            )}
          </li>
        ))}
      </ul>
      {/* Similar Cases */}
      <h3 className="mt-6 text-lg font-semibold">Similar Case Precedents</h3>
      <ul className="mt-2 space-y-4">
        {similarCases.map((caseItem) => (
          <li
            key={caseItem.id}
            className="text-gray-700 border-l-4 border-purple-500 pl-4 py-2"
          >
            <div className="font-bold text-purple-600">
              {caseItem.caseName}
              <span className="ml-2 text-xs font-normal text-gray-500">
                (Similarity score: {caseItem.similarity.toFixed(2)})
              </span>
            </div>
            <div className="mt-1 text-sm">
              {caseItem.summary.length > 150
                ? `${caseItem.summary.substring(0, 150)}...`
                : caseItem.summary}
            </div>
          </li>
        ))}
      </ul>
      {/* Expandable Explanation */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isExpanded ? "Hide Legal Analysis" : "Show Detailed Legal Analysis"}
      </button>
      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800">Legal Analysis</h4>
          <p className="mt-2 text-gray-700">
            The reported incident involves several potential offenses under the
            POCSO Act, 2012:
          </p>
          <ul className="mt-2 list-disc pl-6 space-y-1">
            <li>Sexual harassment of a minor (Section 11)</li>
            <li>
              Possible aggravated penetrative sexual assault (given the position
              of trust as a professor)
            </li>
            <li>
              Potential abetment charges if others were involved (Sections
              16-17)
            </li>
          </ul>
          <p className="mt-3 text-gray-700">
            The case precedents demonstrate how courts have handled similar
            situations involving abuse of minors by authority figures,
            particularly in educational settings.
          </p>
          <p className="mt-3 text-gray-700 font-medium">
            Note: This analysis is based on the information provided and would
            require formal investigation to determine exact charges and
            liabilities.
          </p>
        </div>
      )}
    </div>
  );
};

export default DecisionExplanation;
