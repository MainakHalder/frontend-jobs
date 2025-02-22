import Header from "../components/header";
import { useState } from "react";
const JobPosting = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState(0);
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [qualification, setQualification] = useState([]);
  const [success, setSuccess] = useState("");
  const handleSubmit = (event) => {
    console.log(type);
    event.preventDefault();
    const postData = {
      name: name,
      role: title,
      location: location,
      salary: salary,
      jobType: type,
      jobDescription: desc,
      qualification: qualification.split("."),
    };
    console.log(postData);
    fetch("https://backend-jobs-chi.vercel.app/job", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setSuccess("Data uploaded successfully.");
        } else {
          setSuccess("Failed to add data");
        }
      })
      .catch((error) => {
        setSuccess(`Error: ${error}`);
      });
  };
  return (
    <>
      <Header />
      <main className="container my-3">
        <h2>Post a Job</h2>
        <p>{success}</p>
        <form onSubmit={handleSubmit}>
          <section className="my-3">
            <label>Job Title:</label>
            <input
              className="form-control"
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </section>
          <section className="my-3">
            <label>Company Name:</label>
            <input
              className="form-control"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </section>
          <section className="my-3">
            <label>Location:</label>
            <input
              className="form-control"
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </section>
          <section className="my-3">
            <label>Salary:</label>
            <input
              className="form-control"
              type="number"
              onChange={(event) => setSalary(event.target.value)}
              required
            />
          </section>
          <section className="my-3">
            <label>Job Type:</label>
            <select
              className="form-select"
              onChange={(event) => setType(event.target.value)}
              required
            >
              <option value="Full-time (On-site)">Full-time (On-site)</option>
              <option value="Part-time (On-site)">Part-time (On-site)</option>
              <option value="Full-time (Remote)">Full-time (Remote)</option>
              <option value="Part-time (Remote)">Part-time (Remote)</option>
            </select>
          </section>
          <section className="my-3">
            <label>Job Description:</label>
            <textarea
              className="form-control"
              onChange={(event) => setDesc(event.target.value)}
              required
            ></textarea>
          </section>
          <section className="my-3">
            <label>Job Qualifications:</label>
            <textarea
              className="form-control"
              onChange={(event) => setQualification(event.target.value)}
              placeholder="Please write your criteria in sentence with full stop"
              required
            ></textarea>
          </section>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
};
export default JobPosting;
