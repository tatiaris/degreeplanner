import nextConnect from "next-connect";
import middleware from "../../../middleware/database";
import cheerio from "cheerio";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let doc = {};
  const dept = req.query.dept;
  const response = await fetch(
    `https://catalog.tamu.edu/undergraduate/course-descriptions/${dept}/`
  );
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const searchContext = `div[class='courseblock']`;

  let courses = [];
  $(searchContext).each(() => {
    let courseHtml = $(this);

    let courseFullTitle = courseHtml.find($(".courseblocktitle")).text();
    courseFullTitle = courseFullTitle.split(" ");

    let hoursData = courseHtml.find($(".hours")).text();
    let creditHours = hoursData.match(/Credits* [0-9]/g)[0];
    creditHours = parseInt(creditHours.substr(creditHours.length - 1));

    let courseDescription = courseHtml
      .find($(".courseblockdesc"))
      .text()
      .trim();

    let generalDescription = courseDescription.match(/[^.]*/g)[0] + ".";
    let prereqDescription = "";
    if (courseDescription.match(/Prerequisites*: .*\./g) != null) {
      prereqDescription = courseDescription.match(/Prerequisites*: [^.]*./g)[0];
    }
    let coreqDescription = "";
    if (courseDescription.match(/Corequisites*: .*./g) != null) {
      coreqDescription = courseDescription.match(/Corequisites*: [^.]*./g)[0];
    }
    const eqCourses = courseFullTitle[0].split("/");
    courseFullTitle.shift();
    const title = courseFullTitle.join(" ");
    for (let j = 0; j < 1; j++) {
      let deptName = eqCourses[j].substr(0, 4);
      let courseNum = eqCourses[j].substr(5);
      courses.push({
        id: deptName.toLowerCase() + "-" + courseNum,
        name: deptName + " - " + courseNum,
        title: title,
        department: deptName,
        course_num: parseInt(courseNum),
        credit_hours: creditHours,
        description: generalDescription,
        prereqDescription: prereqDescription,
        coreqDescription: coreqDescription,
      });
    }
  });

  for (let i = 0; i < courses.length; i++) {
    await req.db
      .collection("courses")
      .update({ id: courses[i].id }, courses[i], { upsert: true });
    // let r = await req.db.collection("courses").insertOne(courses[i]);
    console.log("inserted data", courses[i]);
  }

  doc.courseList = courses;
  res.json(doc);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  await req.db.collection("courses").insertOne(data);
  console.log("inserted data", data);
  res.json({
    insertedDataType: "Interaction",
    message: "success",
    data: data,
  });
});

export default handler;
