import React from "react";

const JudgmentPrediction = ({
  date = new Date().toLocaleString(),
  method = "Hybrid",
  petitionerName,
  respondentName,
  petitionerImg = "https://img.freepik.com/premium-vector/illustration-vector-graphic-user-icon_717549-1636.jpg",
  respondentImg = "https://img.freepik.com/premium-vector/illustration-vector-graphic-user-icon_717549-1628.jpg?w=360",
  petitionerProbability = 50,
  respondentProbability = 50,
  winningParty,
  userQuery = "",
  filteredActs = [],
}) => {
  const calculateLeft = (prob) => `${prob}%`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full mx-auto">
      {/* Header Row: Method + Date */}
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span className="font-semibold uppercase">{method}</span>
        <span>{date}</span>
      </div>

      {/* Case Title */}
      <div className="text-center mb-2">
        <h2 className="text-2xl font-semibold mb-1">
          {petitionerName} vs. {respondentName}
        </h2>
      </div>

      {/* User Query */}
      {userQuery && (
        <p className="text-center text-gray-700 italic mb-2">"{userQuery}"</p>
      )}

      {/* Filtered Acts */}
      {filteredActs.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {filteredActs.map((act, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full border"
            >
              {act}
            </span>
          ))}
        </div>
      )}

      {/* Petitioner vs Respondent */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <div className="bg-gray-200 rounded-full w-16 h-16 mb-2">
            <img
              src={petitionerImg}
              alt="Petitioner"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="font-medium text-center">
            Petitioner / Appellant
          </span>
          <span className="font-medium text-gray-700 text-center">
            {petitionerName}
          </span>
        </div>

        <span className="text-gray-600 text-xl">VS</span>

        <div className="flex flex-col items-center mb-4 md:mb-0">
          <div className="bg-gray-200 rounded-full w-16 h-16 mb-2">
            <img
              src={respondentImg}
              alt="Respondent"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="font-medium text-center">Respondent / Appellee</span>
          <span className="font-medium text-gray-700 text-center">
            {respondentName}
          </span>
        </div>
      </div>

      <hr className="mb-4" />

      {/* Winning Party */}
      {winningParty && (
        <div className="text-center font-semibold text-green-600 mb-2">
          Predicted Winner: {winningParty}
        </div>
      )}

      {/* Judgment Prediction Probability */}
      <div>
        <h3 className="text-lg text-center font-semibold mb-2">
          JUDGMENT PREDICTION PROBABILITY
        </h3>
        <div className="bg-gray-200 rounded-md h-8 overflow-hidden relative">
          <div
            className="bg-green-500 h-full rounded-sm absolute left-0 top-0"
            style={{ width: `${petitionerProbability}%` }}
          >
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white font-medium">
              {petitionerProbability}%
            </span>
          </div>
          <div
            className="bg-blue-500 h-full rounded-sm absolute"
            style={{
              left: calculateLeft(petitionerProbability),
              width: `${respondentProbability}%`,
            }}
          >
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white font-medium">
              {respondentProbability}%
            </span>
          </div>
        </div>
        {/* Labels below the bar */}
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{petitionerName}</span>
          <span>{respondentName}</span>
        </div>
      </div>
    </div>
  );
};

export default JudgmentPrediction;
