import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputPage = () => {
  const navigate = useNavigate();

  const [currentDate] = useState(new Date().toISOString().split("T")[0]);
  const [domains, setDomains] = useState([]);
  const [domainInput, setDomainInput] = useState("");
  const [formData, setFormData] = useState({
    appellant: "",
    respondent: "",
    caseDetails: "",
  });

  const availableDomains = [
    "Protection of Children from Sexual Offences (POCSO) Act, 2012",
    "The Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989",
    "Narcotic Drugs and Psychotropic Substances Act, 1985",
  ];

  const [filteredDomains, setFilteredDomains] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDomainInputChange = (e) => {
    const value = e.target.value;
    setDomainInput(value);
    if (value.trim() !== "") {
      setFilteredDomains(
        availableDomains.filter(
          (domain) =>
            domain.toLowerCase().includes(value.toLowerCase()) &&
            !domains.includes(domain)
        )
      );
      setShowDropdown(true);
    } else {
      setFilteredDomains([]);
      setShowDropdown(false);
    }
  };

  const addDomain = (domain) => {
    if (!domains.includes(domain)) {
      setDomains([...domains, domain]);
      setDomainInput("");
      setFilteredDomains([]);
      setShowDropdown(false);
    }
  };

  const removeDomain = (domainToRemove) => {
    setDomains(domains.filter((domain) => domain !== domainToRemove));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = `${formData.appellant}-${formData.respondent}`;
    const dataToStore = {
      ...formData,
      domains,
      date: currentDate,
    };
    localStorage.setItem(key, JSON.stringify(dataToStore));

    // Encode parameters for URL
    const queryParams = new URLSearchParams({
      appellant: formData.appellant,
      appellee: formData.respondent,
    });

    navigate(`/loading?${queryParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-blue-100 p-8">
      <h1 className="text-5xl font-bold mb-10 text-gray-800 drop-shadow-md">
        Legal Case Assessment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl border w-full max-w-2xl space-y-6"
      >
        {/* Appellant & Respondent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="appellant"
            >
              Appellant / Petitioner
            </label>
            <input
              id="appellant"
              type="text"
              value={formData.appellant}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter appellant's name"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="respondent"
            >
              Appellee / Respondent
            </label>
            <input
              id="respondent"
              type="text"
              value={formData.respondent}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter respondent's name"
              required
            />
          </div>
        </div>

        {/* Case Details */}
        <div>
          <label
            className="text-gray-700 font-semibold mb-2 flex items-center"
            htmlFor="caseDetails"
          >
            Case Details
            <span className="ml-2 text-gray-500 cursor-pointer relative group text-sm">
              ℹ️
              <span className="absolute bottom-full left-0 w-72 p-2 text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                Provide case background (max 4000 characters)
              </span>
            </span>
          </label>
          <textarea
            id="caseDetails"
            value={formData.caseDetails}
            onChange={handleInputChange}
            rows="5"
            maxLength="4000"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter background of the case..."
            required
          />
          <p className="text-sm text-gray-500 mt-1">Max: 4000 characters</p>
        </div>

        {/* Domains */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="domains"
          >
            Legal Domains
          </label>

          {/* Selected Domains */}
          <div className="flex flex-wrap gap-2 mb-3">
            {domains.map((domain, index) => (
              <span
                key={index}
                className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
              >
                {domain}
                <button
                  type="button"
                  onClick={() => removeDomain(domain)}
                  className="ml-1 text-indigo-600 hover:text-indigo-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* Domain Search */}
          <div className="relative">
            <input
              type="text"
              id="domains"
              value={domainInput}
              onChange={handleDomainInputChange}
              onFocus={() => domainInput.trim() && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Search and select legal domains"
            />

            {showDropdown && filteredDomains.length > 0 && (
              <div className="absolute z-20 mt-1 w-full bg-white shadow-md rounded-lg border max-h-52 overflow-y-auto">
                {filteredDomains.map((domain, idx) => (
                  <div
                    key={idx}
                    onMouseDown={() => addDomain(domain)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {domain}
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Select one or more legal domains relevant to the case.
          </p>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition transform hover:scale-105 focus:ring-2 focus:ring-indigo-400"
          >
            Generate Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputPage;
