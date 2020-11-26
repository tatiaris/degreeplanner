import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
const { BASE_URL } = process.env

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let courseCategories = {
    'Major': {
      courses: '(math-(221|300|323|308|409|415|410|446|416|423|472|427|431|436|439|407|499))',
      hours: 37
    },
    'Supporting': {
      courses: '(math-(411|414)|csce-(110|121))',
      hours: 7
    },
    'Communication': {
      courses: '(engl-(103|104|210)|comm-(203|204|205))',
      hours: 6
    },
    'Mathematics': {
      courses: '(math-(171|172))',
      hours: 8
    },
    'Life and Physical Sciences': {
      courses: '(chem-(107|117|119|120)|phys-(206|226|207|227)|geol-(101|102)|astr-(111)|atmo(201|202)|biol-(111|112)|ocng-(251|252|451)|csce-(221|320|121))',
      hours: 26
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
    'General Electives': {
      courses: '(csce-(181|222)|engr-(102)|geog-(201)|hlth-(236)|math-(302|304)|phys-(216)|stat-(211|212))',
      hours: 15
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

  res.json({majorName: 'Mathematics', courses: applicableCourses, categories: courseCategories});
});

export default handler;