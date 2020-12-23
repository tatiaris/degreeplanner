import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Mheader } from '../../components/Mheader';
import { Mnavbar } from '../../components/Mnavbar';
import { MFooter } from '../../components/MFooter';
import { Col, Row, Button, Modal, Form, Table } from 'react-bootstrap';
import { CourseColumn } from '../../components/CourseColumn';
import { CompletionColumn } from '../../components/CompletionColumn';

const Course = (): React.ReactNode => {
  const router = useRouter();
  const majorCode = router.query.major;
  const [majorName, setMajorName] = useState('');
  const [courses, setCourses] = useState([]);
  const [samplePlan, setSamplePlan] = useState({});
  const [chosenCourseObj, setChosenCourseObj] = useState({
    id: '',
    name: '',
    title: '',
    department: '',
    course_num: 0,
    credit_hours: 0,
    description: '',
    prereqDescription: '',
    coreqDescription: ''
  });
  const [courseCategories, setCourseCategories] = useState({});
  const [plannedCourses, setPlannedCourses] = useState([]);
  const [semesters, setSemesters] = useState([
    { name: 'Pre-acquired credits', courses: [] },
    { name: '1st Semester', courses: [] }
  ]);
  const [chosenCourse, setChosenCourse] = useState('');
  const [chosenSemester, setChosenSemester] = useState('');
  const [loadSampleSemesters, setLoadSampleSemesters] = useState(false);
  const [loadSampleCourses, setLoadSampleCourses] = useState(false);

  const coursesIndexMap = {};
  for (let i = 0; i < courses.length; i++) {
    coursesIndexMap[courses[i].name] = i;
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCourseClick = (course) => {
    setChosenCourse(course);
    setShow(true);
  };
  const handleTableCourseClick = (e) => {
    handleCourseClick(e.target.name);
  };
  const handleRemoveCourse = () => {
    let prevLocation = '';
    const coursesCopy = courses.map((c) => {
      if (c.id == chosenCourse) {
        prevLocation = c.location;
        c.location = c.type;
      }
      return c;
    });
    setPlannedCourses(plannedCourses.filter((c) => c.id !== chosenCourse));
    setCourses(coursesCopy);
    semesters.map((sem) => {
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
  const moveCourse = (courseId, semesterId) => {
    let prevLocation = '';
    const allCoursesCopy = courses.map((c) => {
      if (c.id == courseId) {
        prevLocation = c.location;
        c.location = semesterId;
      }
      return c;
    });
    setCourses(allCoursesCopy);
    if (plannedCourses.indexOf(chosenCourseObj) < 0) {
      setPlannedCourses([chosenCourseObj].concat(plannedCourses));
    }
    semesters.map((sem) => {
      if (sem.name == prevLocation) {
        for (let i = 0; i < sem.courses.length; i++) {
          if (sem.courses[i].name == chosenCourseObj.name) {
            sem.courses.splice(i, 1);
          }
        }
      }
      return sem;
    });
    semesters.map((sem) => {
      if (sem.name == semesterId) {
        sem.courses.push(chosenCourseObj);
      }
    });
  };
  const handleMoveCourse = () => {
    moveCourse(chosenCourse, chosenSemester);
    setShow(false);
  };
  const [newSemester, setNewSemester] = useState('');
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const activateAddSemesterModal = () => setShowSemesterModal(true);
  const handleCloseSemesterModal = () => setShowSemesterModal(false);
  const addSemesters = (newSemesters) => {
    const updatedSemesters = [].concat(semesters);
    newSemesters.map((s) => {
      updatedSemesters.push({ name: s, courses: [] });
    });
    setSemesters(updatedSemesters);
  };
  const handleAddSemester = () => {
    addSemesters([newSemester]);
    setShowSemesterModal(false);
  };
  const removeSemester = (semesterNames) => {
    const updatedSemesterList = [];
    const updatedCourses = [].concat(courses);
    let updatedPlannedCourses = [];
    for (let i = 0; i < semesters.length; i++) {
      if (semesterNames.indexOf(semesters[i].name) < 0) {
        updatedSemesterList.push(semesters[i]);
        updatedPlannedCourses = updatedPlannedCourses.concat(semesters[i].courses);
      } else {
        let k = 0;
        for (let j = 0; j < semesters[i].courses.length; j++) {
          k = coursesIndexMap[semesters[i].courses[j].name];
          updatedCourses[k].location = updatedCourses[k].type;
        }
      }
    }
    setCourses(updatedCourses);
    setPlannedCourses(updatedPlannedCourses);
    setSemesters(updatedSemesterList);
  };
  const handleRemoveSemester = () => {
    removeSemester([newSemester]);
  };

  const addSampleCourses = () => {
    const updatedSemesters = [].concat(semesters);
    const updatedCourses = [].concat(courses);
    const updatedPlannedCourses = [].concat(plannedCourses);

    const sampleSemesters = Object.keys(samplePlan);
    for (let i = 0; i < sampleSemesters.length; i++) {
      const semesterId = sampleSemesters[i];
      for (let k = 0; k < samplePlan[semesterId].length; k++) {
        const courseId = samplePlan[semesterId][k];
        const courseObj = courses.filter((c) => c.id === courseId)[0];
        updatedPlannedCourses.push(courseObj);
        updatedSemesters.map((s) => {
          if (s.name == semesterId) {
            s.courses.push(courseObj);
          }
          return s;
        });
        updatedCourses.map((c) => {
          if (c.id == courseId) {
            c.location = semesterId;
          }
          return c;
        });
      }
    }

    setCourses(updatedCourses);
    setPlannedCourses(updatedPlannedCourses);
    setSemesters(updatedSemesters);
    setLoadSampleCourses(false);
  };

  const loadSamplePlan = () => {
    removeSemester(semesters.map((s) => s.name));
    setLoadSampleSemesters(true);
  };

  const loadCourses = async () => {
    const res = await fetch(`/api/${majorCode}`);
    const allCourses = await res.json();
    setCourses(allCourses.courses);
    setCourseCategories(allCourses.categories);
    setMajorName(allCourses.majorName);
    setSamplePlan(allCourses.samplePlan);
  };

  useEffect(() => {
    if (loadSampleSemesters) {
      addSemesters(Object.keys(samplePlan));
      setLoadSampleSemesters(false);
      setLoadSampleCourses(true);
    }
  }, [loadSampleSemesters]);

  useEffect(() => {
    if (loadSampleCourses) {
      addSampleCourses();
    }
  }, [loadSampleCourses]);

  useEffect(() => {
    if (chosenCourse != '') {
      setChosenCourseObj(courses.filter((c) => c.id === chosenCourse)[0]);
    }
  }, [chosenCourse]);

  useEffect(() => {
    if (majorCode) loadCourses();
  }, [majorCode]);

  let tableComponent = <></>;
  let coursesComponent = [];
  const semestersComponent = semesters.map((sem) => {
    let total_credit_hours = 0;
    coursesComponent = sem.courses.map((c, j) => {
      total_credit_hours += c.credit_hours;
      return (
        <tr key={`course-row-${c.id}`}>
          <td>{j + 1}</td>
          <td>{c.department}</td>
          <td>{c.course_num}</td>
          <td>{c.credit_hours}</td>
          <td style={{ padding: '0px' }}>
            <Button
              key={`course-btn-${c.id}`}
              onClick={handleTableCourseClick}
              name={c.id}
              variant="danger"
              style={{ width: '100%', height: '50px', borderRadius: '0px' }}>
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
          marginTop: '1em',
          marginBottom: '3em',
          background: '#2a2e33'
        }}>
        <thead>
          <tr style={{ background: '#1c1f22' }}>
            <th style={{ border: 'none', width: '200px' }} colSpan={2}>
              {sem.name}
            </th>
            <th style={{ border: 'none' }}>Courses Planned: {sem.courses.length}</th>
            <th style={{ border: 'none' }}>Total Credit Hours: {total_credit_hours}</th>
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

  return (
    <>
      <Mheader title={`${majorName}`} />
      <Mnavbar theme={'dark'} />
      <Row id="page_container" style={{ margin: '0px' }}>
        <CourseColumn
          categories={courseCategories}
          handleCourseClick={handleCourseClick}
          courseList={courses}
          opposite={false}
        />
        <Col
          sm="7"
          style={{
            background: '#343a40',
            paddingTop: '1em',
            overflow: 'scroll',
            height: '100%'
          }}>
          <Row style={{ margin: '0px', display: 'flex', justifyContent: 'right' }}>
            <Col
              sm="9"
              style={{
                padding: '0',
                fontSize: '2em',
                color: 'white',
                fontWeight: 'bold'
              }}>
              {majorName}
            </Col>
            <Col
              sm="3"
              style={{
                padding: '0px',
                display: 'flex',
                justifyContent: 'right'
              }}>
              <Button variant="success" style={{ borderRadius: '0px' }} onClick={activateAddSemesterModal}>
                Add/Remove Semesters
              </Button>
            </Col>
          </Row>
          {semestersComponent}
          <Button variant="info" style={{ borderRadius: '0px', marginBottom: '3em' }} onClick={loadSamplePlan}>
            Load Sample Plan
          </Button>
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
            {chosenCourseObj.name} <span style={{ color: '#6c757d' }}>[{chosenCourseObj.credit_hours}]</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ margin: '0px' }}>{chosenCourseObj.title}</h4>
          <br />
          {chosenCourseObj.description}
          <br />
          <br />
          {chosenCourseObj.prereqDescription}
          {chosenCourseObj.coreqDescription}
          <br />
          <br />
          <Form>
            <Form.Group>
              <Form.Label style={{ fontSize: '1.5em' }}>Choose a semester:</Form.Label>
              <Form.Control
                onChange={(e) => setChosenSemester(e.target.value)}
                as="select"
                htmlSize={semesters.length}
                style={{ padding: '0px' }}
                custom>
                {semesters.map((sem) => (
                  <option
                    key={`semester-option-${sem.name}`}
                    id={`${sem.name}`}
                    style={{
                      textAlign: 'center',
                      fontSize: '1.5em',
                      borderBottom: '1px solid white'
                    }}>
                    {sem.name}
                  </option>
                ))}
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
            <Form.Label style={{ fontSize: '1.5em' }}>Enter semester name:</Form.Label>
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
