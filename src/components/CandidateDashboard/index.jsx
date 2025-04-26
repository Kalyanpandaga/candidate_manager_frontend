import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie"; // Import Cookies
import CandidateRow from "../CandidateRow";
import Pagination from "../Pagination";
import FilterPanel from "../FilterPanel";
import AddCandidateModal from "../AddCandidateModal";
import {
  API_BASE_URL,
  API_ENDPOINTS,
  IMAGE_URLS,
} from "../../config/constants";
import "./index.css";
import Header from "../Header";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const CandidateDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    experience: "",
    skills: [],
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const fetchCandidates = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const token = Cookies.get("jwt_token"); // Get token from cookies

      if (!token) {
        navigate("/login");
        return;
      }

      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(filters.gender && { gender: filters.gender }),
        ...(filters.experience && { experience: filters.experience }),
        ...(filters.skills.length > 0 && { skills: filters.skills.join(",") }),
      });

      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.CANDIDATES.VIEW}?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );

      if (response.status === 401) {
        // Unauthorized, token expired or invalid
        Cookies.remove("jwt_token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch candidates");
      }

      setCandidates(data.data);
      setTotalPages(data.pagination.totalPages);
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setApiStatus(apiStatusConstants.failure);
    }
  }, [currentPage, searchTerm, filters, navigate]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleAddCandidate = async (candidateData) => {
    try {
      const token = Cookies.get("jwt_token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.CANDIDATES.ADD}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
          body: JSON.stringify(candidateData),
        }
      );

      if (response.status === 401) {
        Cookies.remove("jwt_token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add candidate");
      }

      fetchCandidates();
      return data;
    } catch (error) {
      console.error("Error adding candidate:", error);
      throw error;
    }
  };

  const renderLoadingView = () => (
    <div className="loading-container">
      <div className="loading-spinner">Loading...</div>
    </div>
  );

  const renderFailureView = () => (
    <div className="error-container">
      <img
        src={IMAGE_URLS.FAILURE}
        alt="failure view"
        className="error-image"
      />
      <h2>Oops! Something Went Wrong</h2>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={fetchCandidates} className="retry-button">
        Retry
      </button>
    </div>
  );

  const renderNoResultsView = () => (
    <div className="no-candidates">
      <img
        src={IMAGE_URLS.NO_RESULTS}
        alt="no candidates"
        className="no-results-image"
      />
      <h2>No Candidates Found</h2>
      <p>We could not find any candidates. Try other filters.</p>
    </div>
  );

  const renderCandidatesListView = () => (
    <>
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Current Experience</th>
            <th className="skills-column">Skills/Technology</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <CandidateRow key={candidate._id} candidate={candidate} />
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <div className="page-info">
          {currentPage}/{totalPages}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );

  const renderCandidatesSection = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.success:
        return candidates.length === 0
          ? renderNoResultsView()
          : renderCandidatesListView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Candidates</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Candidate, Email, Phone..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="add-button" onClick={() => setShowAddModal(true)}>
            Add
          </button>
        </div>

        <div className="main-content">
          <div className="table-container">{renderCandidatesSection()}</div>

          <div className="filter-container">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        {showAddModal && (
          <AddCandidateModal
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddCandidate}
          />
        )}
      </div>
    </>
  );
};

export default CandidateDashboard;
