import Header from "../components/header";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
const JobDetails = () => {
  const { jobId } = useParams();
  const { data, loading, error } = useFetch(
    `https://backend-jobs-chi.vercel.app/job`
  );
  const jobData = data?.find((job) => job._id == jobId);
  console.log(jobId, jobData);
  return (
    <>
      <Header />
      {loading && <p>Loading...</p>}
      {error && <p>Error occured while fetching userData: {error}</p>}
      {jobData ? (
        <div className="container my-3">
          <h2>{jobData.role}</h2>
          <div className="card my-3">
            <div className="card-body">
              <p className="card-text">
                <strong>Company Name:</strong>
                {jobData.name}
              </p>
              <p className="card-text">
                <strong>Location: </strong>
                {jobData.location}
              </p>
              <p className="card-text">
                <strong>Salary: </strong>
                {jobData.salary}
              </p>
              <p className="card-text">
                <strong>Job Type:</strong>
                {jobData.jobType}
              </p>
              <p className="card-text">
                <strong>Description: </strong>
                {jobData.jobDescription}
              </p>
              <p className="card-text">
                <strong>Qualifications: </strong>
                <ul className="list-unstyled container">
                  {jobData.qualification.map((point, index) => (
                    <li>
                      {index + 1}. {point}
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default JobDetails;
