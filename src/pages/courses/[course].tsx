import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Mheader } from "../../components/Mheader";
import { Mnavbar } from "../../components/Mnavbar/";
import { MFooter } from "../../components/MFooter";
import { Col, Row, Button, Modal, Form, Table } from "react-bootstrap";
import { CollapsibleBtns } from "../../components/CollapsibleBtns";
import { CourseColumn } from "../../components/CourseColumn";
import { CompletionColumn } from "../../components/CompletionColumn";

const Course = (): React.ReactNode => {  
  const router = useRouter()
  const urlCourse = router.query.course;
  const [majorName, setMajorName] = useState('');
  const [courses, setCourses] = useState([]);
  const [chosenCourseObj, setChosenCourseObj] = useState({
    id: "",
    name: "",
    department: "",
    course_num: 0,
    credit_hours: 0,
    description: "",
    prereqDescription: "",
    coreqDescription: "",
  });
  const [courseCategories, setCourseCategories] = useState({});
  const [plannedCourses, setPlannedCourses] = useState([]);
  const [semesters, setSemesters] = useState([
    { name: "Pre-acquired credits", courses: [] },
    { name: "1st Semester", courses: [] },
  ]);
  const [chosenCourse, setChosenCourse] = useState("");
  const [chosenSemester, setChosenSemester] = useState("");

  let coursesIndexMap = {};
  for (let i = 0; i < courses.length; i++) {
    coursesIndexMap[courses[i].name] = i;
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCourseClick = (course = "nothing") => {
    setChosenCourse(course);
    setShow(true);
  };
  const handleTableCourseClick = (e) => {
    handleCourseClick(e.target.name);
  };
  const handleRemoveCourse = (e) => {
    let prevLocation = "";
    let coursesCopy = courses.map((c, i) => {
      if (c.name == chosenCourse) {
        prevLocation = c.location;
        c.location = c.type;
      }
      return c;
    });
    setPlannedCourses(plannedCourses.filter((c) => c.name !== chosenCourse));
    setCourses(coursesCopy);
    semesters.map((sem, j) => {
      if (sem.name == prevLocation) {
        for (let i = 0; i < sem.courses.length; i++) {
          if (sem.courses[i].name == chosenCourseObj.name) {
            sem.courses.splice(i, 1);
          }
        }
      }
      return sem;
    });

    setShow(false);
  };
  const handleMoveCourse = (e) => {
    let prevLocation = "";
    let allCoursesCopy = courses.map((c, i) => {
      if (c.name == chosenCourse) {
        prevLocation = c.location;
        c.location = chosenSemester;
      }
      return c;
    });
    setCourses(allCoursesCopy);
    setPlannedCourses([chosenCourseObj].concat(plannedCourses));
    semesters.map((sem, i) => {
      if (sem.name == prevLocation) {
        for (let i = 0; i < sem.courses.length; i++) {
          if (sem.courses[i].name == chosenCourseObj.name) {
            sem.courses.splice(i, 1);
          }
        }
      }
      return sem;
    });
    semesters.map((sem, i) => {
      if (sem.name == chosenSemester) {
        sem.courses.push(chosenCourseObj);
      }
    });
    setShow(false);
  };
  const [newSemester, setNewSemester] = useState("");
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const activateAddSemesterModal = (e) => setShowSemesterModal(true);
  const handleCloseSemesterModal = (e) => setShowSemesterModal(false);
  const handleAddSemester = (e) => {
    setSemesters(
      semesters.concat({
        name: newSemester,
        courses: [],
      })
    );
    setShowSemesterModal(false);
  };
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
        setCourses(updatedCourses);
      }
    }
    setSemesters(updatedSemesterList);
  };

  const loadCourses = async () => {
    const res = await fetch(`/api/${urlCourse}`);
    const allCourses = await res.json();
    setCourses(allCourses.courses);
    setCourseCategories(allCourses.categories);
    setMajorName(allCourses.majorName)
  };

  useEffect(() => {
    if (chosenCourse != "") {
      setChosenCourseObj(courses.filter((c) => c.name === chosenCourse)[0]);
    }
  }, [chosenCourse]);

  useEffect(() => {
    if (urlCourse) loadCourses();
  }, [urlCourse]);

  let semesterOptions = [];
  let semestersComponent = [];
  let tableComponent = <></>;
  let coursesComponent = [];
  if (semesters.length > 0) {
    coursesComponent = [];
    semesterOptions = semesters.map((sem, i) => (
      <option
        key={`semester-option-${sem.name}`}
        style={{
          textAlign: "center",
          fontSize: "1.5em",
          borderBottom: "1px solid white",
        }}
      >
        {sem.name}
      </option>
    ));
    semestersComponent = semesters.map((sem, i) => {
      let total_credit_hours = 0;
      coursesComponent = sem.courses.map((c, j) => {
        total_credit_hours += c.credit_hours;
        return (
          <tr key={`course-row-${c.id}`}>
            <td>{j + 1}</td>
            <td>{c.department}</td>
            <td>{c.course_num}</td>
            <td>{c.credit_hours}</td>
            <td style={{ padding: "0px" }}>
              <Button
                key={`course-btn-${c.id}`}
                onClick={handleTableCourseClick}
                name={c.name}
                variant="danger"
                style={{ width: "100%", height: "50px", borderRadius: "0px" }}
              >
                &#8942;
              </Button>
            </td>
          </tr>
        );
      });
      tableComponent = (
        <Table
          key={`course-table-${sem.name}`}
          hover
          variant="dark"
          style={{
            marginTop: "1em",
            marginBottom: "3em",
            background: "#2a2e33",
          }}
        >
          <thead>
            <tr style={{ background: "#1c1f22" }}>
              <th style={{ border: "none", width: "200px" }} colSpan={2}>
                {sem.name}
              </th>
              <th style={{ border: "none" }}>
                Courses Planned: {sem.courses.length}
              </th>
              <th style={{ border: "none" }}>
                Total Credit Hours: {total_credit_hours}
              </th>
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
          <tbody>{coursesComponent}</tbody>
        </Table>
      );
      return tableComponent;
    });
  }

  return (
    <>
      <Mheader title={`${majorName}`} />
      <Mnavbar theme={"dark"} />
      <Row id="page_container" style={{ margin: "0px" }}>
        <CourseColumn
          categories={courseCategories}
          handleCourseClick={handleCourseClick}
          courseList={courses}
          opposite={false}
        />
        <Col
          sm="7"
          style={{
            background: "#343a40",
            paddingTop: "1em",
            overflow: "scroll",
            height: "100%",
          }}
        >
          <Row
            style={{ margin: "0px", display: "flex", justifyContent: "right" }}
          >
            <Col
              sm="9"
              style={{
                padding: "0",
                fontSize: "2em",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {majorName}
            </Col>
            <Col
              sm="3"
              style={{
                padding: "0px",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <Button
                variant="success"
                style={{ borderRadius: "0px" }}
                onClick={activateAddSemesterModal}
              >
                Add/Remove Semesters
              </Button>
            </Col>
          </Row>
          {semestersComponent}
        </Col>
        <CompletionColumn
          categories={courseCategories}
          handleCourseClick={handleCourseClick}
          courseList={plannedCourses}
          opposite={true}
        />
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {chosenCourseObj.name}{" "}
            <span style={{ color: "#6c757d" }}>
              [{chosenCourseObj.credit_hours}]
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {chosenCourseObj.description}
          <br />
          <br />
          {chosenCourseObj.prereqDescription}
          {chosenCourseObj.coreqDescription}
          <br />
          <br />
          <Form>
            <Form.Group>
              <Form.Label style={{ fontSize: "1.5em" }}>
                Choose a semester:
              </Form.Label>
              <Form.Control
                onChange={(e) => setChosenSemester(e.target.value)}
                as="select"
                htmlSize={semesters.length}
                style={{ padding: "0px", background: "#b5ddff" }}
                custom
              >
                {semesterOptions}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveCourse}>
            Remove
          </Button>
          <Button variant="primary" onClick={handleMoveCourse}>
            Move
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSemesterModal} onHide={handleCloseSemesterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Semesters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label style={{ fontSize: "1.5em" }}>
              Enter semester name:
            </Form.Label>
            <Form.Control
              name="new-semester"
              onChange={(e) => setNewSemester(e.target.value)}
              placeholder="ex: Fall 2020"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSemesterModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveSemester}>
            Remove
          </Button>
          <Button variant="primary" onClick={handleAddSemester}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <MFooter />
    </>
  );
};

export default Course;
