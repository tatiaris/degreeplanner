import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
const { BASE_URL } = process.env;

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  let courseCategories = {
    Major: {
      courses: '(math-(221|300|323|308|409|415|410|446|416|423|472|427|431|436|439|407|499))',
      hours: 37
    },
    Supporting: {
      courses: '(math-(411|414)|csce-(110|121))',
      hours: 7
    },
    Communication: {
      courses: '(engl-(103|104|203|210)|comm-(203|205|243)|thar-(407))',
      hours: 6
    },
    Mathematics: {
      courses: '(math-(140|142|147|148|150|151|152|167|168|171|172)|phil-(240)|stat-(201))',
      hours: 8
    },
    'Life and Physical Sciences': {
      courses:
        '(chem-(106|107|116|117|119|120)|engr-(101)|ento-(322)|essm-(309)|fivs-(123)|geog-(203|205|213)|geol-(101|102|106|207|208|210)|hort-(201|202)|kine-(120|223)|nfsc-(222)|ocng-(251|252)|phys-(109|119|123|125|201|202|206|207|226|227)|posc-(201)|renr-(205|215)|scen-(101|102)|scsc-(105|301)|ansc-(107)|anth-(225|226)|astr-(101|102|103|104|109|111|119)|atmo-(201|202)|besc-(201|204)|biol-(101|107|111|112|113))',
      hours: 10
    },
    'Language, Philosophy & Culture': {
      courses:
        '(afst-(201|204|345)|anth-(204|205|210|316|317)|arab-(201|202|213)|arch-(213|346)|carc-(331)|chin-(201|202)|clas-(220|221|222|250|251|261|262|429)|comm-(301|327)|engl-(202|206|207|221|222|227|228|231|232|253|292|306|330|333|334|335|338|350|352|360|362|365|374|376)|engr-(482)|fren-(201|202)|geog-(202|301|305)|germ-(201|202)|hisp-(206)|hist-(101|102|103|104|210|213|214|220|221|222|234|242|347)|ints-(251)|ital-(201|202)|japn-(201|202)|land-(240)|mast-(270)|musc-(227)|nfsc-(300)|perf-(325|326)|phil-(111|251)|rels-(200|202|209|220|312)|russ-(201|202)|span-(201|202)|spmt-(220)|thar-(155|156)|wgst-(200))',
      hours: 3
    },
    'Creative Arts': {
      courses:
        '(afst-(327)|anth-(324)|arch-(249|250|350)|arts-(149|150)|carc-(311)|comm-(257|340)|dced-(202)|ends-(101|115)|engl-(212|219|251)|film-(215|299|425)|hisp-(204)|hort-(203)|kine-(210)|musc-(201|221|222|225|226|228)|perf-(223|301|328|386)|phil-(330|375)|thar-(201|281))',
      hours: 3
    },
    'Social and Behavioral Sciences': {
      courses:
        '(agec-(105|235|350)|alec-(450)|anth-(201|202)|arch-(212|458)|comm-(315|320|325|335|365)|econ-(202|203)|epsy-(320|312)|geog-(201)|hlth-(236)|hort-(335)|inst-(210|222|301)|jour-(102)|kine-(282)|mars-(210)|psyc-(107)|soci-(205|206|207|210|211|212|217|304|312|313|314|315|319)|spmt-(304|336|337)|urpn-(201|202|361|370))',
      hours: 3
    },
    Citizenship: {
      courses: '(hist-(105|106|226|230|232|258|300|301|304)|pols-(206|207))',
      hours: 12
    },
    'General Electives': {
      courses: '(csce-(181|222)|engr-(102)|geog-(201)|hlth-(236)|math-(302|304)|phys-(216)|stat-(211|212))',
      hours: 15
    },
    Other: {
      courses: '^(?:(?!(',
      hours: 12
    }
  };

  let samplePlan = {
    'Pre-acquired credits': [],
    '1st Semester': [],
    '2nd Semester': [],
    '3rd Semester': [],
    '4th Semester': [],
    '5th Semester': [],
    '6th Semester': [],
    '7th Semester': [],
    '8th Semester': []
  };

  let applicableCourses = [];
  for (let category in courseCategories) {
    if (category != 'Other') courseCategories.Other.courses += courseCategories[category].courses + '|';
    else courseCategories.Other.courses = courseCategories.Other.courses.slice(0, -1) + ')))';

    await fetch(`${BASE_URL}/api/courses?pattern=${courseCategories[category].courses}`, {
      method: 'get'
    })
      .then((response) => response.json())
      .then((data) => {
        data.courses.map((d) => {
          d.type = category;
          d.location = category;
        });
        applicableCourses = applicableCourses.concat(data.courses);
      })
      .catch((e) => console.log(e));
  }

  res.json({
    majorName: 'Mathematics',
    courses: applicableCourses,
    categories: courseCategories,
    samplePlan: samplePlan
  });
});

export default handler;
