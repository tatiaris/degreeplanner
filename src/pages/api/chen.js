import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
const { BASE_URL } = process.env

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let courseCategories = {
    'Major': {
      courses: '(chen-(204|205|320|323|354|432|324|425|426|433|461|364|481|455|322|482))',
      hours: 47
    },
    'Supporting': {
      courses: '(engr-(102|216|217)|chem-(227|228|237|238|322)|math-(251|308))',
      hours: 32
    },
    'Communication': {
      courses: '(engl-(103|104|210))',
      hours: 6
    },
    'Mathematics': {
      courses: '(math-(151|152))',
      hours: 8
    },
    'Life and Physical Sciences': {
      courses: '(chem-(119|120)|phys-(206|207))',
      hours: 10
    },
    'Language, Philosophy & Culture': {
      courses: '(engr-482)',
      hours: 3
    },
    'Creative Arts': {
      courses: '(perf-(301))',
      hours: 3
    },
    'Social and Behavioral Sciences': {
      courses: '(econ-(203|202))',
      hours: 3
    },
    'Citizenship': {
      courses: '(hist-(105|106)|pols-(206|207))',
      hours: 12
    },
    'Other': {
      courses: '^(?:(?!(',
      hours: 12
    }
  }

  let applicableCourses = []
  for (let category in courseCategories) {
    if (category != 'Other') courseCategories.Other.courses += courseCategories[category].courses + '|';
    else courseCategories.Other.courses = courseCategories.Other.courses.slice(0, -1) + ')))'

    await fetch(`${BASE_URL}/api/courses?pattern=${courseCategories[category].courses}`, {
      method: 'get',
    }).then (
      response => response.json()
    ).then (
      (data) => {
        data.courses.map(d => {d.type = category; d.location = category})
        applicableCourses = applicableCourses.concat(data.courses)
      }
    ).catch((e) => console.log(e));
  }

  res.json({majorName: 'Chemical Engineering', courses: applicableCourses, categories: courseCategories});
});

export default handler;