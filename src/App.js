import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

function App() {
  const [success, setSuccess] = useState("");
  const [showData, setShowData] = useState([]);
  const { data, loading, error } = useFetch(
    `https://backend-jobs-chi.vercel.app/job`
  );
  useEffect(() => {
    if (data?.length) {
      setShowData(data);
    }
  }, [data]);
  const deleteHandler = (jobId) => {
    fetch(`https://backend-jobs-chi.vercel.app/job/${jobId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuccess("Deleted successfully");
      })
      .catch((error) => setSuccess(`error occured ${error}`));
    window.location.reload();
  };
  const changeHandler = (val) => {
    console.log(val);
    if (!val) {
      setShowData(data);
    } else {
      setShowData(
        data?.filter(({ role }) =>
          role.toLowerCase().includes(val.toLowerCase())
        )
      );
    }
  };
  return (
    <div className="App">
      <Header />
      <main className="my-3 container">
        <div className="row my-3">
          <div className="col-md-6">
            <input
              placeholder="Search by job title..."
              className="form-control"
              onChange={(event) => {
                changeHandler(event.target.value);
              }}
            />
          </div>
          <div className="col-md-6"></div>
        </div>
        {success}
        <h2 className="fs-3 my-3">All Jobs</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error occured while fetching userData: {error}</p>}
        {data ? (
          <div className="row my-3">
            {showData?.map((job) => (
              <div className="col-md-4 my-3">
                <div className="card">
                  <div className="card-body">
                    <h2 className="card-title">{job.role}</h2>
                    <p>
                      <strong>Company name: </strong>
                      {job.name}
                    </p>
                    <p>
                      <strong>Location: </strong>
                      {job.location}
                    </p>
                    <p>
                      <strong>Job-Type:</strong> {job.jobType}
                    </p>
                    <div className="container">
                      <Link
                        className="btn btn-primary mb-2 mx-2"
                        to={`/job/${job._id}`}
                      >
                        See Details
                      </Link>
                      <Link
                        className="btn btn-danger"
                        onClick={() => {
                          deleteHandler(job._id);
                        }}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
