import React, { useEffect, useState } from "react";
import { Mheader } from "../components/Mheader";
import { Mnavbar } from "../components/Mnavbar/";
import { MFooter } from "../components/MFooter";
import { Col, Row, Button, Modal, Form, Table } from "react-bootstrap";
import { CollapsibleBtns } from "../components/CollapsibleBtns";
import { CourseColumn } from "../components/CourseColumn";
import { CompletionColumn } from "../components/CompletionColumn";

const allCourses = [
  {
    id: 'tamu-engr-102',
    name: 'ENGR - 102',
    department: "ENGR",
    course_num: 102,
    credit_hours: 3,
    type: 'Major Coursework',
    location: 'Major Coursework'
  },
  {
    id: 'tamu-chem-107',
    name: 'CHEM - 107',
    department: "CHEM",
    course_num: 107,
    credit_hours: 3,
    type: 'Major Coursework',
    location: 'Major Coursework'
  },
  {
    id: 'tamu-chem-117',
    name: 'CHEM - 117',
    department: "CHEM",
    course_num: 117,
    credit_hours: 1,
    type: 'Major Coursework',
    location: 'Major Coursework'
  },
  {
    id: 'tamu-math-152',
    name: 'MATH - 152',
    department: "MATH",
    course_num: 152,
    credit_hours: 3,
    type: 'Major Coursework',
    location: 'Major Coursework'
  },
  {
    id: 'tamu-csce-121',
    name: 'CSCE - 121',
    department: "CSCE",
    course_num: 121,
    credit_hours: 3,
    type: 'Supporting Coursework',
    location: 'Supporting Coursework'
  },
  {
    id: 'tamu-csce-222',
    name: 'CSCE - 222',
    department: "CSCE",
    course_num: 222,
    credit_hours: 3,
    type: 'Supporting Coursework',
    location: 'Supporting Coursework'
  }
]

const Home = (): React.ReactNode => {
  const [courses, setCourses] = useState(allCourses);
  const [plannedCourses, setPlannedCourses] = useState([]);
  const [semesters, setSemesters] = useState([
    {name: "Pre-acquired credits", courses: []}, {name: "1st Semester", courses: []}
  ]);
  const [chosenCourse, setChosenCourse] = useState("");
  const [chosenSemester, setChosenSemester] = useState("");

  let coursesIndexMap = {};
  for (let i = 0; i < courses.length; i++){
    coursesIndexMap[courses[i].name] = i;
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCourseClick = (course="nothing") => {
    setChosenCourse(course);
    setShow(true);
  }
  const handleTableCourseClick = (e) => {
    handleCourseClick(e.target.name);
  }
  const handleRemoveCourse = (e) => {
    let prevLocation = "";
    let chosenCourseObject;
    let coursesCopy = courses.map((c, i) => {
      if (c.name == chosenCourse) {
        prevLocation = c.location;
        c.location = c.type;
        chosenCourseObject = c;
      }
      return c;
    })
    setPlannedCourses(plannedCourses.filter((c) => c.name !== chosenCourse));
    setCourses(coursesCopy);
    semesters.map((sem, j) => {
      if (sem.name == prevLocation) {
        for (let i = 0; i < sem.courses.length; i++) {
          if (sem.courses[i].name == chosenCourseObject.name) {
            sem.courses.splice(i, 1)
          }
        }
      }
      return sem;
    })

    setShow(false);
  }
  const handleMoveCourse = (e) => {
    let prevLocation = "";
    let chosenCourseObject;
    let allCoursesCopy = allCourses.map((c, i) => {
      if (c.name == chosenCourse) {
        prevLocation = c.location;
        c.location = chosenSemester;
        chosenCourseObject = c;
      }
      return c;
    })
    setCourses(allCoursesCopy);
    setPlannedCourses([chosenCourseObject].concat(plannedCourses))
    semesters.map((sem, i) => {
      if (sem.name == prevLocation) {
        for (let i = 0; i < sem.courses.length; i++) {
          if (sem.courses[i].name == chosenCourseObject.name) {
            sem.courses.splice(i, 1)
          }
        }
      }
      return sem;
    })
    semesters.map((sem, i) => {
      if (sem.name == chosenSemester) {
        sem.courses.push(chosenCourseObject)
      }
    })
    setShow(false);
  }
  const [newSemester, setNewSemester] = useState("");
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const activateAddSemesterModal = (e) => setShowSemesterModal(true);
  const handleCloseSemesterModal = (e) => setShowSemesterModal(false);
  const handleAddSemester = (e) => {
    setSemesters(semesters.concat({
      name: newSemester,
      courses: []
    }))
    setShowSemesterModal(false);
  }
  const handleRemoveSemester = (e) => {
    let updatedSemesterList = [];
    for (let i = 0; i < semesters.length; i++) {
      if (semesters[i].name != newSemester) {
        updatedSemesterList.push(semesters[i]);
      } else {
        let updatedCourses = [].concat(courses);
        let k = 0;
        for (let j = 0; j < semesters[i].courses.length; j++) {
          k = coursesIndexMap[semesters[i].courses[j].name];
          updatedCourses[k].location = updatedCourses[k].type;
        }
        setCourses(updatedCourses)
      }
    }
    setSemesters(updatedSemesterList);
  }

  let semesterOptions = [];
  let semestersComponent = [];
  let tableComponent = (<></>);
  let coursesComponent = [];
  if (semesters.length > 0) {
    coursesComponent = [];
    semesterOptions = semesters.map((sem, i) => (
        <option key={`semester-option-${sem.name}`} style={{ textAlign: "center", fontSize: "1.5em", borderBottom: "1px solid white" }}>{sem.name}</option>
    ))
    semestersComponent = semesters.map((sem, i) => {
      coursesComponent = sem.courses.map((c, j) => (
          <tr key={`course-row-${c.id}`}>
            <td>{j+1}</td>
            <td>{c.department}</td>
            <td>{c.course_num}</td>
            <td>{c.credit_hours}</td>
            <td style={{ padding: "0px" }}>
              <Button key={`course-btn-${c.id}`} onClick={handleTableCourseClick} name={c.name} variant="danger" style={{ width: "100%", height: "50px", borderRadius: "0px" }}>&#8942;</Button>
            </td>
          </tr>
      ));
      tableComponent = (
          <Table key={`course-table-${sem.name}`} striped hover variant="dark" style={{ marginTop: "1em", marginBottom: "3em", border: "1px solid #454d55" }}>
            <thead>
              <tr style={{ background: "#282c31" }}>
                <th style={{ border: "none" }} colSpan={2}>{sem.name}</th>
                <th style={{ border: "none" }}>Courses Planned: {sem.courses.length}</th>
                <th style={{ border: "none" }}>Total Credit Hours: 0</th>
                <th></th>
              </tr>
              <tr>
                <th>#</th>
                <th>Department</th>
                <th>Course #</th>
                <th>Credit Hours</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {coursesComponent}
            </tbody>
          </Table>
      );
      return tableComponent
    })
  }

  return (
    <>
      <Mheader title={"Home"} />
      <Mnavbar theme={"dark"} />
      <Row style={{ margin: "0px", height: "calc(90vh)" }}>
        <CourseColumn handleCourseClick={handleCourseClick} courseList={courses} opposite={false}/>
        <Col sm="8" style={{ background: "#343a40", paddingTop: "1em", overflow: "scroll", height: "100%" }}>
          <Row style={{ margin: "0px", display: "flex", justifyContent: "right" }}>
            <Button variant="success" style={{ borderRadius: "0px" }} onClick={activateAddSemesterModal}>Add/Remove Semesters</Button>
          </Row>
          {semestersComponent}
        </Col>
        <CompletionColumn handleCourseClick={handleCourseClick} courseList={plannedCourses} opposite={true}/>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Details about course
          <Form>
            <Form.Group>
              <Form.Label style={{ fontSize: "1.5em" }}>Choose a semester:</Form.Label>
              <Form.Control onChange={e => setChosenSemester(e.target.value)} as="select" htmlSize={semesters.length} style={{ padding: "0px", background: "#b5ddff" }} custom>
                {semesterOptions}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleRemoveCourse}>Remove</Button>
          <Button variant="primary" onClick={handleMoveCourse}>Move</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSemesterModal} onHide={handleCloseSemesterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Semesters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label style={{ fontSize: "1.5em" }}>Enter semester name:</Form.Label>
            <Form.Control name="new-semester" onChange={e => setNewSemester(e.target.value)} placeholder="ex: Fall 2020" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSemesterModal}>Cancel</Button>
          <Button variant="danger" onClick={handleRemoveSemester}>Remove</Button>
          <Button variant="primary" onClick={handleAddSemester}>Add</Button>
        </Modal.Footer>
      </Modal>
      <MFooter />
    </>
  );
};

export default Home;
