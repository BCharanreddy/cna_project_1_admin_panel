import { Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";


function Card({ title, cnt }) {
    return (
        <div className="card shadow" style={{ width: "23%", textAlign: "center" }}>
            <p>{title}</p>
            <h2>{cnt}</h2>
        </div>
    )
}
function StudentRow({ student }) {
    let date = new Date(student.createdAt);
    date = date.toLocaleDateString();
    return (
        <tr>
            <td>{student.fullName}</td>
            <td>{student.email}</td>
            <td>{date}</td>
            <td>
                <button className="btn btn-outline-primary btn-sm w-50">
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger btn-sm w-50">
                    <i className="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>
    )
}
function CourseRow({ course }) {
    return (
        <tr>
            <td>{course.courseName}</td>
            <td>{course.duration}</td>
            <td>{course.Mode}</td>
            <td>{course.type}</td>
            <td>
                <button className="btn btn-outline-primary btn-sm w-50">
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-outline-danger btn-sm w-50">
                    <i className="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>
    )
}

function AdminDashboard() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [enrolls, setEnrolls] = useState([]);
    const [studentsCnt, setStudentCnt] = useState(0);
    const [courseCnt, setCourseCnt] = useState(0);
    const [enrollCnt, setEnrollCnt] = useState(0);
    useEffect(() => {
        fetch("http://localhost:5000/api/courses")
            .then(response => response.json())
            .then(result => {
                setCourses(result.data);
                setCourseCnt(result.count);
            })
            .catch((error) => {
                console.log("courses loading Failed..")
            })
    }, []);
    useEffect(() => {
        fetch("http://localhost:5000/api/getStudents")
            .then(response => response.json())
            .then(result => {
                setStudents(result.data);
                setStudentCnt(result.count);
            })
            .catch((error) => {
                console.log("students loading Failed..")
            })
    }, []);
    useEffect(() => {
        fetch("http://localhost:5000/api/studentCourses")
            .then(response => response.json())
            .then(result => {
                setEnrolls(result.data);
                setEnrollCnt(result.count);
            })
            .catch((error) => {
                console.log("enrolls loading Failed..", error)
            })
    }, []);




    return (
        <div className="bootstrap-scope p-4" style={{ width: "100%" }}>
            {/* <h1>This is Admin Dashboard</h1>
            <button onClick={()=>{navigate('/admindashboard/students')}}>Get Students</button>
            <button onClick={()=>{navigate('/adminDashboard/courses')}}>Get Courses</button> */}
            <div className="d-flex justify-content-between" >
                <Card title="Total Students:" cnt={studentsCnt} />
                <Card title="Total Courses:" cnt={courseCnt} />
                <Card title="Total Enrollments:" cnt={enrollCnt} />
                <Card title="Total Students:" cnt="10" />
            </div>
            <div className="d-flex justify-content-between mt-4">
                <div className="students card p-2" style={{ width: "48%" }}>
                    <div className="head d-flex justify-content-between">
                        <h2>Students</h2>
                        <button className="btn btn-md bg-primary w-25">+ Add Student</button>
                    </div>
                    <input className="search w-50 mb-4" type="text" placeholder="Search Student..." />
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Registered On</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => {
                                return <StudentRow student={student} />
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="courses card p-2" style={{ width: "48%" }}>
                    <div className="head d-flex justify-content-between">
                        <h2>Courses</h2>
                        <button className="btn btn-md bg-primary w-25">+ Add Course</button>
                    </div>
                    <input className="search w-50 mb-4" type="text" placeholder="Search Courses..." />
                    <table className="table">
                        <thead>
                            <tr>
                                <td>CourseName</td>
                                <td>Duration</td>
                                <td>Mode</td>
                                <td>Type</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => {
                                return <CourseRow course={course} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
export default AdminDashboard;

