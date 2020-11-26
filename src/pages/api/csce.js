import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import cheerio from "cheerio";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let courseCategories = {
    'Major': {
      courses: '(csce-(121|181|221|222|312|313|314|315|481|482))',
      hours: 30
    },
    'Supporting': {
      courses: '(engr-(102|216)|csce-(411)|stat-(211)|math-(304))',
      hours: 50
    },
    'Communication': {
      courses: '(engl-(103|104)|comm-(203|204|205))',
      hours: 6
    },
    'Mathematics': {
      courses: '(math-(151|152))',
      hours: 8
    },
    'Life and Physical Sciences': {
      courses: '(chem-(107|117)|phys-(206|207))',
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
      courses: '(econ-(203))',
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

    await fetch(`http://localhost:3000/api/courses?pattern=${courseCategories[category].courses}`, {
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

  res.json({courses: applicableCourses, categories: courseCategories});
});

export default handler;