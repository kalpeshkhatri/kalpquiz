// aa allmaintopicname 6e tene aapne index db ma store karavi deso.
let allmaintopicname;
const maintopic1 = sessionStorage.getItem("maintopic");
// const subtopic1=allmaintopicname[maintopic1]
let subtopic1;
let maintopic2;


function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('KalpQuizDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('allMainTopics')) {
        db.createObjectStore('allMainTopics', { keyPath: 'key' });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = () => reject('IndexedDB open failed');
  });
}

// async function saveAllMainTopics(data) {
//   const db = await openDB();
//   const tx = db.transaction('allMainTopics', 'readwrite');
//   const store = tx.objectStore('allMainTopics');
//   await store.put({ key: 'mainTopics', data });
//   return tx.complete;
// }
async function saveAllMainTopics(data) {
  const db = await openDB();
  const tx = db.transaction('allMainTopics', 'readwrite');
  const store = tx.objectStore('allMainTopics');
  
  await store.put({
    key: 'mainTopics',
    data: data,
    timestamp: Date.now()
  });

  return tx.complete;
}




// async function getAllMainTopics() {
//   const db = await openDB();
//   const tx = db.transaction('allMainTopics', 'readonly');
//   const store = tx.objectStore('allMainTopics');

//   return new Promise((resolve, reject) => {
//     const request = store.get('mainTopics');
//     request.onsuccess = () => resolve(request.result ? request.result.data : null);
//     request.onerror = () => reject('Failed to get topics');
//   });
// }
const CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 24 hours
async function getAllMainTopics() {
  const db = await openDB();
  const tx = db.transaction('allMainTopics', 'readonly');
  const store = tx.objectStore('allMainTopics');

  return new Promise((resolve, reject) => {
    const request = store.get('mainTopics');
    request.onsuccess = () => {
      const result = request.result;
      if (!result) return resolve(null);

      const { data, timestamp } = result;
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

      if (isExpired) {
        console.log('⏰ IndexedDB cache expired');
        resolve(null); // tell caller to fetch fresh data
      } else {
        resolve(data); // use cached data
      }
    };

    request.onerror = () => reject('Failed to read cache');
  });
}

async function clearAllMainTopics() {
  const db = await openDB();
  const tx = db.transaction('allMainTopics', 'readwrite');
  tx.objectStore('allMainTopics').clear();
  return tx.complete;
}
//-------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('kalpquiz_token');
  if (!token) {
    alert('You are not logged in');
    return;
  }

  
  allmaintopicname = await getAllMainTopics();
  // console.log(allmaintopicname);//check kariye ke allmaintopicname e kya thi lave 6e.
  // subtopic1=allmaintopicname[maintopic1];
  // putsubtopics();
  // maintopic2 = Object.keys(allmaintopicname);
  // putallmaintopicintohinderburge()

  



  if (allmaintopicname) {
    console.log('✅ Loaded from IndexedDB:', allmaintopicname);
    // await putallmaintopic(allmaintopicname); // your rendering logic
    console.log(allmaintopicname);//check kariye ke allmaintopicname e kya thi lave 6e.
    subtopic1=allmaintopicname[maintopic1];
    putsubtopics();
    maintopic2 = Object.keys(allmaintopicname);
    putallmaintopicintohinderburge()
  }
   else {
    try {
      const res = await fetch('https://kalpquiz-backend.onrender.com/user/allmain&subtopic', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch from server');

      allmaintopicname = await res.json();
      console.log('🌐 Fetched from backend:', allmaintopicname);

      await saveAllMainTopics(allmaintopicname);
      subtopic1=allmaintopicname[maintopic1];
      putsubtopics();
      maintopic2 = Object.keys(allmaintopicname);
      putallmaintopicintohinderburge()

      // await putallmaintopic(allmaintopicname);
    } catch (err) {
      console.error('Fetch error:', err.message);
      alert(err.message);
    }
  }
});













//--------------------------------------------------------------
// const allmaintopicname={
//     Sports:[{ name: 'Athletes', symbol: '&#127936;' }, { name: 'MLB', symbol: '&#9918;' }, { name: 'NBA', symbol: '&#127936;' }, { name: 'NHL', symbol: '&#9971;' }, { name: 'NFL', symbol: '&#127944;' }, { name: 'Soccer', symbol: '&#9917;' }, { name: 'Hocky', symbol: '&#9971;' }, { name: 'Cricket', symbol: '&#127951;' }, { name: 'Sports team', symbol: '&#127936;' }, { name: 'WWE', symbol: '&#129354;' }, { name: 'NCAA', symbol: '&#127891;' }, { name: 'Football', symbol: '&#127944;' }],
//     Geography:[{ name: 'Country', symbol: '&#127758;' }, { name: 'Landmarks', symbol: '&#127963;' }, { name: 'City', symbol: '&#127961;' }, { name: 'State', symbol: '&#127466;&#127475;' }, { name: 'Population', symbol: '&#128101;' }, { name: 'World', symbol: '&#127757;' }, { name: 'Capital', symbol: '&#127960;' }, { name: 'Continent', symbol: '&#127760;' }, { name: 'Flag', symbol: '&#127988;&#65039;' }],
//     Music:[{ name: 'Pop Music', symbol: '&#127925;' }, { name: 'Taylor Shift', symbol: '&#127932;' }, { name: 'The Beatles', symbol: '&#127926;' }, { name: 'Song', symbol: '&#127897;' }, { name: 'Album', symbol: '&#128191;' }, { name: 'Lyrics', symbol: '&#128221;' }, { name: 'Bands', symbol: '&#129345;' }, { name: 'Singers', symbol: '&#127908;' }],

//     Movies:[{ name: 'Disney', symbol: '&#127902;' }, { name: 'Morvel Cinematics', symbol: '&#129333;' }, { name: 'Universe', symbol: '&#127765;' }, { name: 'Movies Resume', symbol: '&#127909;' }, { name: 'Movie Titles', symbol: '&#127916;' }, { name: 'Oscars', symbol: '&#127942;' }, { name: 'Actor', symbol: '&#127917;' }],

//     Television:[{ name: 'Tv Characters', symbol: '&#128250;' }, { name: 'Tv Show', symbol: '&#127909;' }, { name: 'Sitcom', symbol: '&#128253;' }, { name: 'Network', symbol: '&#128246;' }, { name: 'Fiends', symbol: '&#128101;' }, { name: 'Reality Show', symbol: '&#127917;' }, { name: 'Cast', symbol: '&#127902;' }],

//     Just_For_Fun:[{ name: 'Humor', symbol: '&#128514;' }, { name: 'Mini-crossword', symbol: '&#10060;' }, { name: 'Short-order', symbol: '&#128717;' }, { name: 'Word hunt', symbol: '&#128269;' }, { name: 'Word Search', symbol: '&#128270;' }, { name: 'Quick pick', symbol: '&#9203;' }, { name: 'Word Missing', symbol: '&#10067;' }, { name: 'Mixed Word', symbol: '&#128209;' }, { name: 'Minefield', symbol: '&#128163;' }, { name: 'Alphabet', symbol: '&#128196;' }, { name: 'Color', symbol: '&#127912;' }, { name: 'Logic', symbol: '&#128161;' }],

//     History: [{ name: 'Indian', symbol: '&#127757;' }, { name: 'Indian President', symbol: '&#128104;&#8205;&#127891;' }, { name: 'Us President', symbol: '&#128104;&#8205;&#127482;&#127480;' }, { name: 'World Leader', symbol: '&#129332;' }, { name: 'Politics', symbol: '&#128104;&#8205;&#9874;&#65039;' }, { name: 'Nation', symbol: '&#127960;' }, { name: 'Discovery', symbol: '&#128300;' }, { name: 'War', symbol: '&#128299;' }, { name: 'Year', symbol: '&#128197;' }, { name: 'Decade', symbol: '&#9200;' }, { name: 'Century', symbol: '&#8986;' }, { name: 'Biography', symbol: '&#128221;' }, { name: 'Art', symbol: '&#127912;' }],
//     Literature: [{ name: 'Harry Potter', symbol: '&#128214;' }, { name: 'Asong of Ice and Fire', symbol: '&#128218;' }, { name: 'The Hunger Games', symbol: '&#127916;' }, { name: 'Literacy', symbol: '&#128218;' }, { name: 'Shakespeare', symbol: '&#127917;' }, { name: 'Book', symbol: '&#128213;' }, { name: 'Author', symbol: '&#128221;' }, { name: 'Charater', symbol: '&#129489;' }, { name: 'Novel', symbol: '&#128218;' }, { name: 'Poem', symbol: '&#127908;' }, { name: 'Young Adult', symbol: '&#128104;' }, { name: 'Children Books', symbol: '&#128102;' }, { name: 'Lord of The Rings', symbol: '&#128142;' }],
//     Language: [{ name: 'Vocabulary', symbol: '&#128218;' }, { name: 'Definition', symbol: '&#128221;' }, { name: 'Spanish', symbol: '&#127466;&#127480;' }, { name: 'French', symbol: '&#127467;&#127479;' }, { name: 'German', symbol: '&#127465;&#127466;' }, { name: 'Italian', symbol: '&#127470;&#127481;' }, { name: 'Hindi', symbol: '&#127467;&#127475;' }, { name: 'Gujarati', symbol: '&#127473;&#127475;' }, { name: 'Latin', symbol: '&#127472;&#127476;' }, { name: 'Chinese', symbol: '&#127464;&#127475;' }, { name: 'Translation', symbol: '&#128483;' }, { name: 'Japanese', symbol: '&#127471;&#127477;' }],
//     Science: [{ name: 'Computer', symbol: '&#128187;' }, { name: 'Plants', symbol: '&#127793;' }, { name: 'Astronomy', symbol: '&#128171;' }, { name: 'Chemistry', symbol: '&#128167;' }, { name: 'Elements', symbol: '&#9883;' }, { name: 'Medical', symbol: '&#9877;' }, { name: 'Math', symbol: '&#10135;' }, { name: 'Animal', symbol: '&#128054;' }, { name: 'Physics', symbol: '&#9881;' }, { name: 'General Science', symbol: '&#129514;' }, { name: 'Anatomy', symbol: '&#129512;' }, { name: 'Biology', symbol: '&#129410;' }, { name: 'Geography', symbol: '&#128506;&#65039;' }],
//     Gaming: [{ name: 'Video Games', symbol: '&#127918;' }, { name: 'Board Games', symbol: '&#127922;' }, { name: 'Card Games', symbol: '&#127183;' }, { name: 'Pokemon', symbol: '&#128375;' }, { name: 'Mario', symbol: '&#127921;' }, { name: 'Nintendo', symbol: '&#127918;' }, { name: 'Minecraft', symbol: '&#127912;' }, { name: 'Console', symbol: '&#128377;&#65039;' }, { name: 'Toys', symbol: '&#127873;' }],
//     Entertainment: [{ name: 'Pop Cultures', symbol: '&#127912;' }, { name: 'Celebrity', symbol: '&#11088;' }, { name: 'Indian Cinema', symbol: '&#127902;' }, { name: 'Bollywood', symbol: '&#127916;' }, { name: 'Hollywood', symbol: '&#127909;' }, { name: 'Musical', symbol: '&#127925;' }, { name: 'Broadway', symbol: '&#127917;' }, { name: 'Show', symbol: '&#127917;' }, { name: 'Quote', symbol: '&#10077;' }, { name: 'Comic Book', symbol: '&#128218;' }, { name: 'Anime', symbol: '&#128064;' }, { name: 'Superhero', symbol: '&#129302;' }, { name: 'DC Comics', symbol: '&#128481;' }, { name: 'Marvel', symbol: '&#128400;&#65039;' }, { name: 'Cartoons', symbol: '&#127912;' }, { name: 'Animation', symbol: '&#127916;' }],
//     Religions: [{ name: 'Mythology', symbol: '&#128330;' }, { name: 'Religious Music', symbol: '&#127925;' }, { name: 'Wolrd Religious', symbol: '&#128331;' }, { name: 'Hinduism', symbol: '&#128329;&#65039;' }, { name: 'Bible', symbol: '&#128218;' }, { name: 'Cristianity', symbol: '&#9962;&#65039;' }, { name: 'Catholicism', symbol: '&#9925;' }, { name: 'Judaism', symbol: '&#9767;' }, { name: 'Church', symbol: '&#9962;&#65039;' }, { name: 'Scipture', symbol: '&#128213;' }, { name: 'Islam', symbol: '&#128720;' }, { name: 'Verse', symbol: '&#128221;' }],
//     Holiday: [{ name: 'Diwali', symbol: '&#128293;' }, { name: 'Indian Republic Day', symbol: '&#127475;&#127471;' }, { name: 'Indian Independence Day', symbol: '&#127757;' }, { name: 'Christmas Day', symbol: '&#127876;' }, { name: 'Eid al-Fitr', symbol: '&#128720;' }, { name: 'Mawlid', symbol: '&#128332;' }, { name: 'Ambedkar jayanti', symbol: '&#129489;&#8205;&#127891;' }, { name: 'Gandhi Jayanti', symbol: '&#129489;&#8205;&#9877;&#65039;' }, { name: 'Holi', symbol: '&#127912;' }, { name: 'Halloween', symbol: '&#127875;' }, { name: 'Cristmas', symbol: '&#127876;' }, { name: 'Valentine day', symbol: '&#10084;&#65039;' }, { name: 'Easter', symbol: '&#128026;' }, { name: 'ST Patricks Day', symbol: '&#127811;' }, { name: 'National Holiday', symbol: '&#127482;&#127480;' }, { name: 'Religious Holiday', symbol: '&#128329;&#65039;' }],
//     Physics: [{ name: 'Physical_World', symbol: '&#9881;' }, { name: 'Units_and_Measurements', symbol: '&#128202;' }, { name: 'Motion_in_a_Straight_Line', symbol: '&#8594;' }, { name: 'Motion_in_a_Plane', symbol: '&#8597;' }, { name: 'Laws_of_Motion', symbol: '&#10145;&#65039;' }, { name: 'Work,_Energy_and_Power', symbol: '&#9889;' }, { name: 'System_of_Particles_and_Rotational_Motion', symbol: '&#128260;' }, { name: 'Gravitation', symbol: '&#127756;' }, { name: 'Mechanical_Properties_of_Solids', symbol: '&#129521;' }, { name: 'Mechanical_Properties_of_Fluids', symbol: '&#128167;' }, { name: 'Thermal_Properties_of_Matter', symbol: '&#128293;' }, { name: 'Thermodynamics', symbol: '&#128165;' }, { name: 'Kinetic_Theory', symbol: '&#128171;' }, { name: 'Oscillations', symbol: '&#128336;' }, { name: 'Waves', symbol: '&#127754;' }, { name: 'Electric_Charges_and_Fields', symbol: '&#9889;' }, { name: 'Electrostatic_Potential_and_Capacitance', symbol: '&#128267;' }, { name: 'Current_Electricity', symbol: '&#128268;' }, { name: 'Moving_Charges_and_Magnetism', symbol: '&#129513;' }, { name: 'Magnetism_and_Matter', symbol: '&#129513;' }, { name: 'Electromagnetic_Induction', symbol: '&#128267;' }, { name: 'Alternating_Current', symbol: '&#8645;' }, { name: 'Electromagnetic_Waves', symbol: '&#128246;' }, { name: 'Ray_Optics_and_Optical_Instruments', symbol: '&#128301;' }, { name: 'Wave_Optics', symbol: '&#128248;' }, { name: 'Dual_Nature_of_Radiation_and_Matter', symbol: '&#9881;' }, { name: 'Atoms', symbol: '&#9883;' }, { name: 'Nuclei', symbol: '&#9883;' }, { name: 'Semiconductor_Electronics:_Materials,_Devices_and_Simple_Circuits', symbol: '&#128421;' }, { name: 'Communication_Systems', symbol: '&#128241;' }],
//     Chemistry: [{ name: 'Some Basic Concepts of Chemistry', symbol: '&#129516;' }, { name: 'Structure of Atom', symbol: '&#9883;' }, { name: 'Classification of Elements and Periodicity in Properties', symbol: '&#128210;' }, { name: 'Chemical Bonding and Molecular Structure', symbol: '&#129482;' }, { name: 'States of Matter: Gases and Liquids', symbol: '&#128167;' }, { name: 'Thermodynamics', symbol: '&#128165;' }, { name: 'Equilibrium', symbol: '&#9878;' }, { name: 'Redox Reactions', symbol: '&#128163;' }, { name: 'The s-Block Element', symbol: '&#128230;' }, { name: 'Some p-Block Elements', symbol: '&#128230;' }, { name: 'Organic Chemistry – Some Basic Principles and Techniques', symbol: '&#129518;' }, { name: 'Hydrocarbons', symbol: '&#9889;' }, { name: 'Environmental Chemistry', symbol: '&#127795;' }, { name: 'The Solid State', symbol: '&#129521;' }, { name: 'Solutions', symbol: '&#128167;' }, { name: 'Electrochemistry', symbol: '&#128267;' }, { name: 'Chemical Kinetics', symbol: '&#9203;' }, { name: 'Surface Chemistry', symbol: '&#128396;' }, { name: 'The p-Block Element', symbol: '&#128230;' }, { name: 'The d- and f-Block Elements', symbol: '&#128230;' }, { name: 'Coordination Compounds', symbol: '&#128760;' }, { name: 'Haloalkanes and Haloarenes', symbol: '&#129516;' }, { name: 'Alcohols, Phenols and Ethers', symbol: '&#127870;' }, { name: 'Aldehydes, Ketones and Carboxylic Acids', symbol: '&#128202;' }, { name: 'Organic Compounds Containing Nitrogen', symbol: '&#129518;' }, { name: 'Biomolecules', symbol: '&#129514;' }, { name: 'Polymers', symbol: '&#129526;' }, { name: 'Chemistry in Everyday Life', symbol: '&#127793;' }],
//     Biology: [{ name: 'Diversity of Living Organisms', symbol: '&#129410;' }, { name: 'Structural Organisation in Animals and Plants', symbol: '&#127807;' }, { name: 'Cell Structure and Function', symbol: '&#128302;' }, { name: 'Plant Physiology', symbol: '&#127793;' }, { name: 'Human Physiology', symbol: '&#129489;&#8205;&#9877;&#65039;' }, { name: 'Reproduction', symbol: '&#128118;' }, { name: 'Genetics and Evolution', symbol: '&#128300;' }, { name: 'Biology and Human Welfare', symbol: '&#129730;' }, { name: 'Biotechnology and Its Applications', symbol: '&#129526;' }, { name: 'Ecology and Environment', symbol: '&#127795;' }],
//     Mathematics: [{ name: 'Sets', symbol: '&#123;' }, { name: 'Relations and Functions', symbol: '&#8704;' }, { name: 'Trigonometric Functions', symbol: '&#8736;' }, { name: 'Principle of Mathematical Induction', symbol: '&#8707;' }, { name: 'Complex Numbers and Quadratic Equations', symbol: '&#8730;' }, { name: 'Linear Inequalities', symbol: '&#8804;' }, { name: 'Permutations and Combinations', symbol: '&#128504;' }, { name: 'Binomial Theorem', symbol: '&#10133;' }, { name: 'Sequences and Series', symbol: '&#931;' }, { name: 'Straight Lines', symbol: '&#9472;' }, { name: 'Conic Sections', symbol: '&#9711;' }, { name: 'Introduction to Three-dimensional Geometry', symbol: '&#8869;' }, { name: 'Limits and Derivatives', symbol: '&#8706;' }, { name: 'Mathematical Reasoning', symbol: '&#10227;' }, { name: 'Statistics', symbol: '&#128202;' }, { name: 'Probability', symbol: '&#9786;' }, { name: 'Inverse Trigonometric Functions', symbol: '&#8737;' }, { name: 'Matrices', symbol: '&#963;' }, { name: 'Determinants', symbol: '&#8730;' }, { name: 'Continuity and Differentiability', symbol: '&#8747;' }, { name: 'Application of Derivatives', symbol: '&#8706;' }, { name: 'Integrals', symbol: '&#8747;' }, { name: 'Application of Integrals', symbol: '&#8748;' }, { name: 'Differential Equations', symbol: '&#8706;' }, { name: 'Vector Algebra', symbol: '&#10145;' }, { name: 'Three-dimensional Geometry', symbol: '&#8869;' }, { name: 'Linear Programming', symbol: '&#8627;' }, { name: 'Probability', symbol: '&#9786;' }],
//     Engineering: [{ name: 'Mechanical Engineering', symbol: '&#128295;' }, { name: 'Civil Engineering', symbol: '&#128679;' }, { name: 'Electrical Engineering', symbol: '&#9889;' }, { name: 'Computer Engineering', symbol: '&#128187;' }, { name: 'Electronics and Communication Engineering', symbol: '&#128246;' }, { name: 'Information Technology', symbol: '&#128421;' }, { name: 'Chemical Engineering', symbol: '&#128167;' }, { name: 'Aerospace Engineering', symbol: '&#128640;' }, { name: 'Automobile Engineering', symbol: '&#128663;' }, { name: 'Biomedical Engineering', symbol: '&#129730;' }, { name: 'Biotechnology Engineering', symbol: '&#129514;' }, { name: 'Environmental Engineering', symbol: '&#127795;' }, { name: 'Agricultural Engineering', symbol: '&#127806;' }, { name: 'Petroleum Engineering', symbol: '&#128165;' }, { name: 'Mining Engineering', symbol: '&#9919;' }, { name: 'Marine Engineering', symbol: '&#128741;' }, { name: 'Industrial Engineering', symbol: '&#128736;' }, { name: 'Instrumentation and Control Engineering', symbol: '&#128304;' }, { name: 'Textile Engineering', symbol: '&#128090;' }, { name: 'Metallurgical Engineering', symbol: '&#9874;' }, { name: 'Production Engineering', symbol: '&#128736;' }, { name: 'Robotics Engineering', symbol: '&#129302;' }, { name: 'Artificial Intelligence and Machine Learning', symbol: '&#129518;' }, { name: 'Data Science Engineering', symbol: '&#128202;' }, { name: 'Mechatronics Engineering', symbol: '&#129302;' }, { name: 'Software Engineering', symbol: '&#128187;' }, { name: 'Structural Engineering', symbol: '&#128739;' }, { name: 'Geotechnical Engineering', symbol: '&#127758;' }, { name: 'Nanotechnology Engineering', symbol: '&#129526;' }, { name: 'Genetic Engineering', symbol: '&#128300;' }, { name: 'Food Technology Engineering', symbol: '&#127860;' }],
//     Programming_Language: [{ name: 'Python', symbol: '&#128013;' }, { name: 'JavaScript', symbol: '&#128187;' }, { name: 'Java', symbol: '&#9749;' }, { name: 'C', symbol: '&#67;' }, { name: 'C++', symbol: '&#67;&#43;&#43;' }, { name: 'C#', symbol: '&#67;&#35;' }, { name: 'TypeScript', symbol: '&#128736;' }, { name: 'Go', symbol: '&#128694;' }, { name: 'Rust', symbol: '&#129521;' }, { name: 'Ruby', symbol: '&#128141;' }, { name: 'PHP', symbol: '&#128187;' }, { name: 'Swift', symbol: '&#128038;' }, { name: 'Kotlin', symbol: '&#128187;' }, { name: 'Dart', symbol: '&#127919;' }, { name: 'R', symbol: '&#8477;' }, { name: 'Scala', symbol: '&#128187;' }, { name: 'Perl', symbol: '&#128300;' }, { name: 'Objective-C', symbol: '&#67;&#35;' }, { name: 'Haskell', symbol: '&#955;' }, { name: 'Lua', symbol: '&#127762;' }, { name: 'Shell', symbol: '&#128187;' }, { name: 'SQL', symbol: '&#128202;' }, { name: 'MATLAB', symbol: '&#120;' }, { name: 'Assembly', symbol: '&#128295;' }, { name: 'Visual Basic', symbol: '&#128187;' }, { name: 'Elixir', symbol: '&#129504;' }, { name: 'F#', symbol: '&#70;&#35;' }, { name: 'Groovy', symbol: '&#128187;' }, { name: 'Erlang', symbol: '&#128187;' }, { name: 'Fortran', symbol: '&#8497;' }, { name: 'COBOL', symbol: '&#128187;' }, { name: 'Prolog', symbol: '&#128211;' }, { name: 'Scheme', symbol: '&#8704;' }, { name: 'Julia', symbol: '&#127799;' }, { name: 'VHDL', symbol: '&#128187;' }, { name: 'Verilog', symbol: '&#128421;' }],
//     Computer_Engineering: [{ name: 'Computer Fundamentals', symbol: '&#128187;' }, { name: 'Operating Systems', symbol: '&#128187;' }, { name: 'Computer Hardware', symbol: '&#128421;' }, { name: 'Computer Software', symbol: '&#128187;' }, { name: 'Programming Languages', symbol: '&#128736;' }, { name: 'Data Structures', symbol: '&#128230;' }, { name: 'Algorithms', symbol: '&#129514;' }, { name: 'Database Management Systems', symbol: '&#128451;' }, { name: 'Computer Networks', symbol: '&#128246;' }, { name: 'Internet and Web Technologies', symbol: '&#127760;' }, { name: 'Cyber Security', symbol: '&#128274;' }, { name: 'Cloud Computing', symbol: '&#9729;&#65039;' }, { name: 'Artificial Intelligence', symbol: '&#129302;' }, { name: 'Machine Learning', symbol: '&#129526;' }, { name: 'Deep Learning', symbol: '&#128214;' }, { name: 'Data Science', symbol: '&#128202;' }, { name: 'Big Data', symbol: '&#128451;' }, { name: 'Blockchain', symbol: '&#128273;' }, { name: 'Computer Architecture', symbol: '&#128187;' }, { name: 'Compiler Design', symbol: '&#128187;' }, { name: 'Web Development', symbol: '&#128187;' }, { name: 'Mobile App Development', symbol: '&#128241;' }, { name: 'Game Development', symbol: '&#127918;' }, { name: 'IoT (Internet of Things)', symbol: '&#128241;' }, { name: 'Augmented Reality (AR)', symbol: '&#128064;' }, { name: 'Virtual Reality (VR)', symbol: '&#128300;' }, { name: 'Human-Computer Interaction', symbol: '&#128100;&#128187;' }, { name: 'Software Engineering', symbol: '&#128187;' }, { name: 'System Design', symbol: '&#128736;' }, { name: 'Version Control (Git/GitHub)', symbol: '&#128187;' }, { name: 'Ethical Hacking', symbol: '&#128373;' }, { name: 'Information Security', symbol: '&#128274;' }, { name: 'DevOps', symbol: '&#9881;' }, { name: 'Networking Protocols', symbol: '&#128246;' }, { name: 'Digital Logic Design', symbol: '&#128421;' }, { name: 'Operating System Scheduling', symbol: '&#9203;' }, { name: 'Artificial Neural Networks', symbol: '&#129504;' }, { name: 'Natural Language Processing (NLP)', symbol: '&#128172;' }, { name: 'Computer Graphics', symbol: '&#127912;' }, { name: 'Simulation and Modeling', symbol: '&#128187;' }],
//     Data_Structure_Algo: [{ name: 'Arrays', symbol: '&#128193;' }, { name: 'Strings', symbol: '&#128441;' }, { name: 'Linked List', symbol: '&#128279;' }, { name: 'Stacks', symbol: '&#128230;' }, { name: 'Queues', symbol: '&#128229;' }, { name: 'Deque (Double-Ended Queue)', symbol: '&#8646;' }, { name: 'Trees', symbol: '&#127795;' }, { name: 'Binary Trees', symbol: '&#127796;' }, { name: 'Binary Search Trees (BST)', symbol: '&#128269;' }, { name: 'Heaps', symbol: '&#128168;' }, { name: 'Hashing', symbol: '&#35;' }, { name: 'Graphs', symbol: '&#128220;' }, { name: 'Tries', symbol: '&#128270;' }, { name: 'Segment Tree', symbol: '&#127795;' }, { name: 'Fenwick Tree (Binary Indexed Tree)', symbol: '&#127794;' }, { name: 'Disjoint Set (Union-Find)', symbol: '&#10226;' }, { name: 'Priority Queue', symbol: '&#11088;' }, { name: 'Circular Linked List', symbol: '&#9851;' }, { name: 'Doubly Linked List', symbol: '&#8646;' }, { name: 'Sorting Algorithms', symbol: '&#128201;' }, { name: 'Searching Algorithms', symbol: '&#128269;' }, { name: 'Recursion', symbol: '&#9851;' }, { name: 'Backtracking', symbol: '&#128281;' }, { name: 'Divide and Conquer', symbol: '&#10134;' }, { name: 'Dynamic Programming', symbol: '&#128736;' }, { name: 'Greedy Algorithms', symbol: '&#128184;' }, { name: 'Bit Manipulation', symbol: '&#128296;' }, { name: 'Sliding Window', symbol: '&#128449;' }, { name: 'Two Pointers', symbol: '&#128073;&#128072;' }, { name: 'Binary Search', symbol: '&#128269;' }, { name: 'Depth First Search (DFS)', symbol: '&#128640;' }, { name: 'Breadth First Search (BFS)', symbol: '&#128270;' }, { name: 'Topological Sort', symbol: '&#128200;' }, { name: "Dijkstra's Algorithm", symbol: '&#128694;' }, { name: 'Bellman-Ford Algorithm', symbol: '&#128648;' }, { name: 'Floyd-Warshall Algorithm', symbol: '&#128663;' }, { name: "Kruskal's Algorithm", symbol: '&#9874;' }, { name: "Prim's Algorithm", symbol: '&#128736;' }, { name: 'KMP Algorithm (Pattern Matching)', symbol: '&#128209;' }, { name: 'Rabin-Karp Algorithm', symbol: '&#128218;' }, { name: 'Trie Algorithms', symbol: '&#128214;' }, { name: 'Minimum Spanning Tree', symbol: '&#127795;' }, { name: 'Graph Coloring', symbol: '&#127912;' }, { name: 'Strongly Connected Components (Kosaraju/Tarjan)', symbol: '&#128279;' }, { name: 'Longest Common Subsequence (LCS)', symbol: '&#128221;' }, { name: 'Knapsack Problem', symbol: '&#127873;' }, { name: 'Subset Sum Problem', symbol: '&#10133;' }],
//     Civil_Engineering: [{ name: 'Engineering Mechanics', symbol: '&#9874;' }, { name: 'Strength of Materials', symbol: '&#128736;' }, { name: 'Structural Analysis', symbol: '&#128202;' }, { name: 'Concrete Technology', symbol: '&#128679;' }, { name: 'Building Materials', symbol: '&#128736;' }, { name: 'Construction Technology', symbol: '&#128295;' }, { name: 'Building Planning and Drawing', symbol: '&#128221;' }, { name: 'Design of Reinforced Concrete Structures', symbol: '&#128679;' }, { name: 'Design of Steel Structures', symbol: '&#9876;' }, { name: 'Geotechnical Engineering', symbol: '&#127757;' }, { name: 'Soil Mechanics', symbol: '&#127793;' }, { name: 'Foundation Engineering', symbol: '&#128679;' }, { name: 'Fluid Mechanics', symbol: '&#128167;' }, { name: 'Hydraulics and Hydraulic Machines', symbol: '&#9881;' }, { name: 'Hydrology', symbol: '&#128167;' }, { name: 'Irrigation Engineering', symbol: '&#128703;' }, { name: 'Transportation Engineering', symbol: '&#128663;' }, { name: 'Highway Engineering', symbol: '&#128739;' }, { name: 'Railway Engineering', symbol: '&#128646;' }, { name: 'Airport Engineering', symbol: '&#9992;' }, { name: 'Tunnel Engineering', symbol: '&#128371;' }, { name: 'Environmental Engineering', symbol: '&#127795;' }, { name: 'Water Supply Engineering', symbol: '&#128703;' }, { name: 'Waste Water Engineering', symbol: '&#128166;' }, { name: 'Surveying', symbol: '&#128301;' }, { name: 'Advanced Surveying', symbol: '&#128506;&#65039;' }, { name: 'Quantity Surveying and Valuation', symbol: '&#128178;' }, { name: 'Construction Management', symbol: '&#128221;' }, { name: 'Project Planning and Control', symbol: '&#9201;' }, { name: 'Estimation and Costing', symbol: '&#128176;' }, { name: 'Remote Sensing and GIS', symbol: '&#128248;' }, { name: 'Disaster Management', symbol: '&#9888;' }, { name: 'Finite Element Method', symbol: '&#128202;' }, { name: 'Prestressed Concrete', symbol: '&#128679;' }, { name: 'Earthquake Engineering', symbol: '&#127786;&#65039;' }, { name: 'Bridge Engineering', symbol: '&#127760;' }, { name: 'Harbour and Dock Engineering', symbol: '&#9973;' }],
//     Novel: [{ name: 'Pride and Prejudice', symbol: '&#128218;' }, { name: 'To Kill a Mockingbird', symbol: '&#128218;' }, { name: '1984', symbol: '&#128218;' }, { name: 'The Great Gatsby', symbol: '&#128218;' }, { name: 'Moby-Dick', symbol: '&#128218;' }, { name: 'War and Peace', symbol: '&#128218;' }, { name: 'The Catcher in the Rye', symbol: '&#128218;' }, { name: 'Jane Eyre', symbol: '&#128218;' }, { name: 'Crime and Punishment', symbol: '&#128218;' }, { name: 'Wuthering Heights', symbol: '&#128218;' }, { name: 'Brave New World', symbol: '&#128218;' }, { name: 'The Lord of the Rings', symbol: '&#128218;' }, { name: 'Anna Karenina', symbol: '&#128218;' }, { name: 'The Alchemist', symbol: '&#128218;' }, { name: 'The Kite Runner', symbol: '&#128218;' }, { name: 'The Book Thief', symbol: '&#128218;' }, { name: 'The Hobbit', symbol: '&#128218;' }, { name: 'Les Misérables', symbol: '&#128218;' }, { name: 'The Picture of Dorian Gray', symbol: '&#128218;' }, { name: 'One Hundred Years of Solitude', symbol: '&#128218;' }, { name: 'The Brothers Karamazov', symbol: '&#128218;' }, { name: 'Life of Pi', symbol: '&#128218;' }, { name: 'The Da Vinci Code', symbol: '&#128218;' }, { name: 'Gone with the Wind', symbol: '&#128218;' }, { name: 'A Tale of Two Cities', symbol: '&#128218;' }, { name: 'Frankenstein', symbol: '&#128218;' }, { name: 'Dracula', symbol: '&#128218;' }, { name: 'The Fault in Our Stars', symbol: '&#128218;' }, { name: 'Little Women', symbol: '&#128218;' }, { name: 'The Chronicles of Narnia', symbol: '&#128218;' }],
//     Famous_Books: [{ name: 'The Diary of a Young Girl', symbol: '&#128213;' }, { name: 'Sapiens: A Brief History of Humankind', symbol: '&#128213;' }, { name: 'Wings of Fire', symbol: '&#128213;' }, { name: 'Think and Grow Rich', symbol: '&#128213;' }, { name: 'Rich Dad Poor Dad', symbol: '&#128213;' }, { name: 'Atomic Habits', symbol: '&#128213;' }, { name: 'The Power of Now', symbol: '&#128213;' }, { name: 'The 7 Habits of Highly Effective People', symbol: '&#128213;' }, { name: 'How to Win Friends and Influence People', symbol: '&#128213;' }, { name: 'The Subtle Art of Not Giving a F*ck', symbol: '&#128213;' }, { name: "Man's Search for Meaning", symbol: '&#128213;' }, { name: 'Ikigai: The Japanese Secret to a Long and Happy Life', symbol: '&#128213;' }, { name: 'The Psychology of Money', symbol: '&#128213;' }, { name: 'Start with Why', symbol: '&#128213;' }, { name: 'Deep Work', symbol: '&#128213;' }, { name: 'Becoming', symbol: '&#128213;' }, { name: 'The Monk Who Sold His Ferrari', symbol: '&#128213;' }, { name: 'You Can Win', symbol: '&#128213;' }, { name: 'The Secret', symbol: '&#128213;' }, { name: 'Zero to One', symbol: '&#128213;' }, { name: 'Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future', symbol: '&#128213;' }, { name: 'Steve Jobs', symbol: '&#128213;' }, { name: 'The Art of War', symbol: '&#128213;' }, { name: 'Meditations', symbol: '&#128213;' }, { name: 'A Brief History of Time', symbol: '&#128213;' }, { name: 'The Intelligent Investor', symbol: '&#128213;' }, { name: 'The Lean Startup', symbol: '&#128213;' }, { name: 'Can’t Hurt Me', symbol: '&#128213;' }, { name: 'Make Your Bed', symbol: '&#128213;' }, { name: 'Who Moved My Cheese?', symbol: '&#128213;' }],
//     Mythological_Book: [{ name: 'Mahabharat', symbol: '&#128330;' }, { name: 'Ramayan', symbol: '&#128330;' }, { name: 'Bhagavad Gita', symbol: '&#128330;' }, { name: 'Vedas', symbol: '&#128330;' }, { name: 'Upanishads', symbol: '&#128330;' }, { name: 'Puranas', symbol: '&#128330;' }, { name: 'Shiv Purana', symbol: '&#128330;' }, { name: 'Vishnu Purana', symbol: '&#128330;' }, { name: 'Skanda Purana', symbol: '&#128330;' }, { name: 'Brahma Purana', symbol: '&#128330;' }, { name: 'Manusmriti', symbol: '&#128330;' }, { name: 'Arthashastra', symbol: '&#128330;' }, { name: 'Yoga Vasistha', symbol: '&#128330;' }, { name: "Mahavira's Agamas", symbol: '&#128330;' }, { name: 'Jataka Tales', symbol: '&#128330;' }, { name: 'Tripitaka', symbol: '&#128330;' }, { name: 'Guru Granth Sahib', symbol: '&#128330;' }, { name: 'Quran', symbol: '&#128330;' }, { name: 'Bible', symbol: '&#128330;' }, { name: 'Torah', symbol: '&#128330;' }, { name: 'Iliad', symbol: '&#128330;' }, { name: 'Odyssey', symbol: '&#128330;' }, { name: 'Divine Comedy', symbol: '&#128330;' }, { name: 'Beowulf', symbol: '&#128330;' }, { name: 'Epic of Gilgamesh', symbol: '&#128330;' }, { name: 'Shahnameh', symbol: '&#128330;' }],
//     Indian_States: [{ name: 'Andhra Pradesh', symbol: '&#127757;' }, { name: 'Arunachal Pradesh', symbol: '&#127757;' }, { name: 'Assam', symbol: '&#127757;' }, { name: 'Bihar', symbol: '&#127757;' }, { name: 'Chhattisgarh', symbol: '&#127757;' }, { name: 'Goa', symbol: '&#127757;' }, { name: 'Gujarat', symbol: '&#127757;' }, { name: 'Haryana', symbol: '&#127757;' }, { name: 'Himachal Pradesh', symbol: '&#127757;' }, { name: 'Jharkhand', symbol: '&#127757;' }, { name: 'Karnataka', symbol: '&#127757;' }, { name: 'Kerala', symbol: '&#127757;' }, { name: 'Madhya Pradesh', symbol: '&#127757;' }, { name: 'Maharashtra', symbol: '&#127757;' }, { name: 'Manipur', symbol: '&#127757;' }, { name: 'Meghalaya', symbol: '&#127757;' }, { name: 'Mizoram', symbol: '&#127757;' }, { name: 'Nagaland', symbol: '&#127757;' }, { name: 'Odisha', symbol: '&#127757;' }, { name: 'Punjab', symbol: '&#127757;' }, { name: 'Rajasthan', symbol: '&#127757;' }, { name: 'Sikkim', symbol: '&#127757;' }, { name: 'Tamil Nadu', symbol: '&#127757;' }, { name: 'Telangana', symbol: '&#127757;' }, { name: 'Tripura', symbol: '&#127757;' }, { name: 'Uttar Pradesh', symbol: '&#127757;' }, { name: 'Uttarakhand', symbol: '&#127757;' }, { name: 'West Bengal', symbol: '&#127757;' }, { name: 'Andaman and Nicobar Islands', symbol: '&#127757;' }, { name: 'Chandigarh', symbol: '&#127757;' }, { name: 'Dadra and Nagar Haveli and Daman and Diu', symbol: '&#127757;' }, { name: 'Delhi', symbol: '&#127757;' }, { name: 'Jammu and Kashmir', symbol: '&#127757;' }, { name: 'Ladakh', symbol: '&#127757;' }, { name: 'Lakshadweep', symbol: '&#127757;' }, { name: 'Puducherry', symbol: '&#127757;' }],
//     Cars: [{ name: 'Maruti Suzuki Swift', symbol: '&#128663;' }, { name: 'Hyundai Creta', symbol: '&#128663;' }, { name: 'Tata Nexon', symbol: '&#128663;' }, { name: 'Kia Seltos', symbol: '&#128663;' }, { name: 'Honda City', symbol: '&#128663;' }, { name: 'Toyota Fortuner', symbol: '&#128663;' }, { name: 'Mahindra Thar', symbol: '&#128663;' }, { name: 'MG Hector', symbol: '&#128663;' }, { name: 'Renault Kwid', symbol: '&#128663;' }, { name: 'Skoda Slavia', symbol: '&#128663;' }, { name: 'Volkswagen Virtus', symbol: '&#128663;' }, { name: 'Ford Mustang', symbol: '&#128663;' }, { name: 'Jeep Compass', symbol: '&#128663;' }, { name: 'BMW X5', symbol: '&#128663;' }, { name: 'Audi Q7', symbol: '&#128663;' }, { name: 'Mercedes-Benz GLC', symbol: '&#128663;' }, { name: 'Tesla Model 3', symbol: '&#128663;' }, { name: 'Porsche 911', symbol: '&#128663;' }, { name: 'Jaguar XF', symbol: '&#128663;' }, { name: 'Lamborghini Huracan', symbol: '&#128663;' }, { name: 'Rolls-Royce Phantom', symbol: '&#128663;' }, { name: 'Nissan Magnite', symbol: '&#128663;' }, { name: 'Mahindra XUV700', symbol: '&#128663;' }, { name: 'Hyundai Verna', symbol: '&#128663;' }, { name: 'Tata Punch', symbol: '&#128663;' }, { name: 'Toyota Innova Crysta', symbol: '&#128663;' }, { name: 'Maruti Brezza', symbol: '&#128663;' }, { name: 'Citroën C3', symbol: '&#128663;' }, { name: 'Volvo XC60', symbol: '&#128663;' }, { name: 'Mini Cooper', symbol: '&#128663;' }],
//     World_Culture: [{ name: 'Indian', symbol: '&#127757;' }, { name: 'Chinese', symbol: '&#127464;&#127475;' }, { name: 'Japanese', symbol: '&#127471;&#127477;' }, { name: 'American', symbol: '&#127482;&#127480;' }, { name: 'British', symbol: '&#127468;&#127463;' }, { name: 'French', symbol: '&#127467;&#127479;' }, { name: 'German', symbol: '&#127465;&#127466;' }, { name: 'Italian', symbol: '&#127470;&#127481;' }, { name: 'Spanish', symbol: '&#127466;&#127480;' }, { name: 'Mexican', symbol: '&#127474;&#127485;' }, { name: 'Brazilian', symbol: '&#127463;&#127479;' }, { name: 'Russian', symbol: '&#127479;&#127482;' }, { name: 'Greek', symbol: '&#127468;&#127479;' }, { name: 'Turkish', symbol: '&#127481;&#127479;' }, { name: 'Persian', symbol: '&#127470;&#127466;' }, { name: 'Arab', symbol: '&#127462;&#127466;' }, { name: 'African', symbol: '&#127465;&#127487;' }, { name: 'Egyptian', symbol: '&#127466;&#127468;' }, { name: 'Thai', symbol: '&#127481;&#127469;' }, { name: 'Vietnamese', symbol: '&#127483;&#127475;' }, { name: 'Korean', symbol: '&#127472;&#127479;' }, { name: 'Mongolian', symbol: '&#127474;&#127476;' }, { name: 'Indonesian', symbol: '&#127470;&#127475;' }, { name: 'Australian Aboriginal', symbol: '&#127462;&#127482;' }, { name: 'Maori', symbol: '&#127475;&#127487;' }, { name: 'Inuit', symbol: '&#127464;&#127462;' }, { name: 'Native American', symbol: '&#127464;&#127479;' }, { name: 'Caribbean', symbol: '&#127472;&#127469;' }, { name: 'Tibetan', symbol: '&#127480;&#127464;' }, { name: 'Jewish', symbol: '&#128333;' }],
//     Indian_Culture: [{ name: 'Gujarati', symbol: '&#2404;' }, { name: 'Punjabi', symbol: '&#2565;' }, { name: 'Marathi', symbol: '&#2350;' }, { name: 'Bengali', symbol: '&#2437;' }, { name: 'Tamil', symbol: '&#2986;' }, { name: 'Telugu', symbol: '&#3105;' }, { name: 'Kannada', symbol: '&#3221;' }, { name: 'Malayali', symbol: '&#3333;' }, { name: 'Rajasthani', symbol: '&#2352;&#2366;&#2332;&#2360;&#2381;&#2341;&#2366;&#2344;&#2368;' }, { name: 'Kashmiri', symbol: '&#2325;&#2358;&#2381;&#2350;&#2368;&#2352;&#2368;' }, { name: 'Assamese', symbol: '&#2437;&#2488;&#2494;&#2478;&#2503;&#2480;' }, { name: 'Bodo', symbol: '&#2476;&#2509;&#2480;&#2494;&#2453;&#2494;' }, { name: 'Odia', symbol: '&#2821;' }, { name: 'Manipuri', symbol: '&#2478;&#2527;&#2496;&#2472;&#2503;' }, { name: 'Naga', symbol: '&#2344;&#2366;&#2327;&#2366;' }, { name: 'Mizo', symbol: '&#2350;&#2368;&#2332;&#2379;' }, { name: 'Sikkimese', symbol: '&#2360;&#2367;&#2325;&#2381;&#2325;&#2368;&#2350;&#2368;&#2332;' }, { name: 'Tripuri', symbol: '&#2340;&#2381;&#2352;&#2367;&#2346;&#2369;&#2352;&#2368;' }, { name: 'Santhali', symbol: '&#2946;' }, { name: 'Gondi', symbol: '&#2327;&#2379;&#2306;&#2342;&#2368;' }, { name: 'Bhili', symbol: '&#2349;&#2368;&#2354;&#2368;' }, { name: 'Sindhi', symbol: '&#2360;&#2367;&#2344;&#2381;&#2343;&#2368;' }, { name: 'Pahari', symbol: '&#2346;&#2361;&#2366;&#2395;&#2368;' }, { name: 'Ladakhi', symbol: '&#2354;&#2342;&#2366;&#2326;&#2368;' }, { name: 'Andamanese', symbol: '&#2309;&#2306;&#2342;&#2350;&#2366;&#2344;&#2368;' }, { name: 'Nicobarese', symbol: '&#2344;&#2367;&#2325;&#2379;&#2348;&#2366;&#2352;&#2368;&#2330;&#2375;' }],
//     Tribes: [{ name: 'Maasai', symbol: '&#129492;' }, { name: 'Zulu', symbol: '&#129493;' }, { name: 'San (Bushmen)', symbol: '&#129489;' }, { name: 'Berbers', symbol: '&#129490;' }, { name: 'Bedouins', symbol: '&#129491;' }, { name: 'Tuareg', symbol: '&#129494;' }, { name: 'Inuit', symbol: '&#129485;' }, { name: 'Cherokee', symbol: '&#129486;' }, { name: 'Navajo', symbol: '&#129487;' }, { name: 'Apache', symbol: '&#129488;' }, { name: 'Sioux', symbol: '&#129495;' }, { name: 'Aymara', symbol: '&#129496;' }, { name: 'Quechua', symbol: '&#129497;' }, { name: 'Guarani', symbol: '&#129498;' }, { name: 'Yanomami', symbol: '&#129499;' }, { name: 'Kayapo', symbol: '&#129500;' }, { name: 'Ashaninka', symbol: '&#129501;' }, { name: 'Maya', symbol: '&#129502;' }, { name: 'Mapuche', symbol: '&#129503;' }, { name: 'Ainu', symbol: '&#129504;' }, { name: 'Sami', symbol: '&#129505;' }, { name: 'Aboriginal Australians', symbol: '&#129506;' }, { name: 'Maori', symbol: '&#129507;' }, { name: 'Tibetans', symbol: '&#129508;' }, { name: 'Mongols', symbol: '&#129509;' }, { name: 'Kazakh Nomads', symbol: '&#129510;' }, { name: 'Chukchi', symbol: '&#129511;' }, { name: 'Hmong', symbol: '&#129512;' }, { name: 'Papuan', symbol: '&#129513;' }, { name: 'Toraja', symbol: '&#129514;' }],
// //    Countries: [{ name: 'India', symbol: '🇮🇳' }, { name: 'United States', symbol: '🇺🇸' }, { name: 'China', symbol: '🇨🇳' }, { name: 'Russia', symbol: '🇷🇺' }, { name: 'Brazil', symbol: '🇧🇷' }, { name: 'United Kingdom', symbol: '🇬🇧' }, { name: 'Germany', symbol: '🇩🇪' }, { name: 'France', symbol: '🇫🇷' }, { name: 'Japan', symbol: '🇯🇵' }, { name: 'Canada', symbol: '🇨🇦' }, { name: 'Australia', symbol: '🇦🇺' }, { name: 'Italy', symbol: '🇮🇹' }, { name: 'Mexico', symbol: '🇲🇽' }, { name: 'South Korea', symbol: '🇰🇷' }, { name: 'Indonesia', symbol: '🇮🇩' }, { name: 'Saudi Arabia', symbol: '🇸🇦' }, { name: 'South Africa', symbol: '🇿🇦' }, { name: 'Argentina', symbol: '🇦🇷' }, { name: 'Turkey', symbol: '🇹🇷' }, { name: 'Spain', symbol: '🇪🇸' }, { name: 'Nigeria', symbol: '🇳🇬' }, { name: 'Egypt', symbol: '🇪🇬' }, { name: 'Thailand', symbol: '🇹🇭' }, { name: 'Vietnam', symbol: '🇻🇳' }, { name: 'Pakistan', symbol: '🇵🇰' }, { name: 'Bangladesh', symbol: '🇧🇩' }, { name: 'Iran', symbol: '🇮🇷' }, { name: 'Iraq', symbol: '🇮🇶' }, { name: 'Afghanistan', symbol: '🇦🇫' }, { name: 'Ukraine', symbol: '🇺🇦' }, { name: 'Poland', symbol: '🇵🇱' }, { name: 'Netherlands', symbol: '🇳🇱' }, { name: 'Belgium', symbol: '🇧🇪' }, { name: 'Sweden', symbol: '🇸🇪' }, { name: 'Norway', symbol: '🇳🇴' }, { name: 'Denmark', symbol: '🇩🇰' }, { name: 'Finland', symbol: '🇫🇮' }, { name: 'Switzerland', symbol: '🇨🇭' }, { name: 'Austria', symbol: '🇦🇹' }, { name: 'Greece', symbol: '🇬🇷' }, { name: 'Portugal', symbol: '🇵🇹' }, { name: 'Israel', symbol: '🇮🇱' }, { name: 'New Zealand', symbol: '🇳🇿' }, { name: 'Singapore', symbol: '🇸🇬' }, { name: 'Malaysia', symbol: '🇲🇾' }, { name: 'Philippines', symbol: '🇵🇭' }, { name: 'Colombia', symbol: '🇨🇴' }, { name: 'Chile', symbol: '🇨🇱' }, { name: 'Peru', symbol: '🇵🇪' }, { name: 'Cuba', symbol: '🇨🇺' }, { name: 'Kenya', symbol: '🇰🇪' }]
// Countries: [
//   { name: 'India', symbol: '&#127757;' }, { name: 'United States', symbol: '&#127482;&#127480;' },
//   { name: 'China', symbol: '&#127464;&#127475;' }, { name: 'Russia', symbol: '&#127479;&#127482;' },
//   { name: 'Brazil', symbol: '&#127463;&#127479;' }, { name: 'United Kingdom', symbol: '&#127468;&#127463;' },
//   { name: 'Germany', symbol: '&#127465;&#127466;' }, { name: 'France', symbol: '&#127467;&#127479;' },
//   { name: 'Japan', symbol: '&#127471;&#127477;' }, { name: 'Canada', symbol: '&#127464;&#127462;' },
//   { name: 'Australia', symbol: '&#127462;&#127482;' }, { name: 'Italy', symbol: '&#127470;&#127481;' },
//   { name: 'Mexico', symbol: '&#127474;&#127485;' }, { name: 'South Korea', symbol: '&#127472;&#127479;' },
//   { name: 'Indonesia', symbol: '&#127470;&#127465;' }, { name: 'Saudi Arabia', symbol: '&#127480;&#127462;' },
//   { name: 'South Africa', symbol: '&#127487;&#127462;' }, { name: 'Argentina', symbol: '&#127462;&#127479;' },
//   { name: 'Turkey', symbol: '&#127481;&#127479;' }, { name: 'Spain', symbol: '&#127466;&#127480;' },
//   { name: 'Nigeria', symbol: '&#127475;&#127468;' }, { name: 'Egypt', symbol: '&#127466;&#127468;' },
//   { name: 'Thailand', symbol: '&#127481;&#127469;' }, { name: 'Vietnam', symbol: '&#127483;&#127475;' },
//   { name: 'Pakistan', symbol: '&#127477;&#127472;' }, { name: 'Bangladesh', symbol: '&#127463;&#127465;' },
//   { name: 'Iran', symbol: '&#127470;&#127466;' }, { name: 'Iraq', symbol: '&#127470;&#127472;' },
//   { name: 'Afghanistan', symbol: '&#127462;&#127467;' }, { name: 'Ukraine', symbol: '&#127482;&#127462;' },
//   { name: 'Poland', symbol: '&#127477;&#127473;' }, { name: 'Netherlands', symbol: '&#127475;&#127473;' },
//   { name: 'Belgium', symbol: '&#127463;&#127466;' }, { name: 'Sweden', symbol: '&#127480;&#127466;' },
//   { name: 'Norway', symbol: '&#127475;&#127476;' }, { name: 'Denmark', symbol: '&#127465;&#127472;' },
//   { name: 'Finland', symbol: '&#127467;&#127470;' }, { name: 'Switzerland', symbol: '&#127464;&#127469;' },
//   { name: 'Austria', symbol: '&#127462;&#127481;' }, { name: 'Greece', symbol: '&#127468;&#127479;' },
//   { name: 'Portugal', symbol: '&#127477;&#127481;' }, { name: 'Israel', symbol: '&#127470;&#127479;' },
//   { name: 'New Zealand', symbol: '&#127475;&#127487;' }, { name: 'Singapore', symbol: '&#127480;&#127468;' },
//   { name: 'Malaysia', symbol: '&#127474;&#127473;' }, { name: 'Philippines', symbol: '&#127477;&#127469;' },
//   { name: 'Colombia', symbol: '&#127464;&#127476;' }, { name: 'Chile', symbol: '&#127464;&#127473;' },
//   { name: 'Peru', symbol: '&#127477;&#127466;' }, { name: 'Cuba', symbol: '&#127464;&#127482;' },
//   { name: 'Kenya', symbol: '&#127472;&#127466;' }
// ]




// }


// const maintopic1 = sessionStorage.getItem("maintopic");
// const subtopic1=allmaintopicname[maintopic1]



const sub=document.getElementById('sub');
sub.innerText+=` ${maintopic1}`

let allsubtopic=[]


const topiccontainer=document.getElementById('categories1')

//---------------------------------make below in function--------------------------

// subtopic1.forEach(obj=> {
//     // const element=makediv101(obj['name'],obj['symbol'])
//     // topiccontainer.append(element)
//     // topiccontainer.innerHTML+=`${element}`

//     //jo id ma space hase to nahi chale tena mate aapne name mathi space ne nikaliye 6iye.
//     let input=obj['name']
//     const output = input.replace(/ /g, "_");
//     topiccontainer.innerHTML+=`<div class="card"><div class="card-title" id=${output}>${obj['symbol']} ${obj['name']}</div></div>`
//     // console.log(element)
//     allsubtopic.push(output)
// });

function putsubtopics(){
    subtopic1.forEach(obj=> {
    // const element=makediv101(obj['name'],obj['symbol'])
    // topiccontainer.append(element)
    // topiccontainer.innerHTML+=`${element}`

    //jo id ma space hase to nahi chale tena mate aapne name mathi space ne nikaliye 6iye.
    let input=obj['name']
    const output = input.replace(/ /g, "_");
    topiccontainer.innerHTML+=`<div class="card"><div class="card-title" id=${output}>${obj['symbol']} ${obj['name']}</div></div>`
    // console.log(element)
    allsubtopic.push(output)
});
}

//-------------------------------------------------------



const element1=document.getElementById('categories1');


element1.addEventListener('click',(e)=>{
    e.preventDefault()
    
    
        // const maintopic2=['Sports','Geography','Music','Television','Movies','Just_For_Fun','History','Literature','Language','Science','Gaming','Entertainment','Religions','Holiday','Physics','Chemistry','Biology','Mathematics','Engineering','Programming_Language','Computer_Engineering','Data_Structure_Algo','Civil_Engineering',"Novel","Famous_Books","Mythological_Book","Indian_States","Cars","World_Culture","Indian_Culture","Tribes","Countries"]
    // sessionStorage.setItem("maintopic",e.target.id);
    // console.log(allsubtopic);
    console.log(e.target.id)
    if (allsubtopic.includes(e.target.id)) {
    sessionStorage.setItem("subtopic",e.target.id);
    window.location.href = "index2.html";
  }
})


///////////////////////////////////////////////
//  const maintopic2=['Sports','Geography','Music','Television','Movies','Just_For_Fun','History','Literature','Language','Science','Gaming','Entertainment','Religions','Holiday','Physics','Chemistry','Biology','Mathematics','Engineering','Programming_Language','Computer_Engineering','Data_Structure_Algo','Civil_Engineering',"Novel","Famous_Books","Mythological_Book","Indian_States","Cars","World_Culture","Indian_Culture","Tribes","Countries"]

// const maintopic2 = Object.keys(allmaintopicname);
// console.log(maintopic2);

// aa upar vala ne maintopic2 ne aapne page load thay tyare banaviye.


//-------------------------------------




document.getElementById('logout').addEventListener('click',async()=>{
    localStorage.removeItem('kalpquiz_token');
    localStorage.removeItem('maintopic_cache');
    localStorage.removeItem('kalpquiz_token_expiry');

    await clearAllMainTopics();
    
    window.location.href = "./login1.html";
})


//  function toggleDropdown() {
//       document.getElementById("hamburgerMenu").classList.toggle("show");
//     }

document.getElementById('hinderburgebutton').addEventListener('click',(e)=>{
  e.preventDefault()
  document.getElementById("hamburgerMenu").classList.toggle("show");
  console.log(document.getElementById("hamburgerMenu"))
}) 
    

    // Close dropdown when clicking outside of hinderburge button mate.
    window.addEventListener("click", function(event) {
      const dropdown = document.getElementById("hamburgerMenu");
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });

//ahiya aapne anchor tag ne nakhvu padse:
//-----------------------------------------------------------------------------
//aa niche vala ne pan function banavi daiye:

// maintopic2.forEach(i=>{
//   const element=document.getElementById('alltopic-anchor')
//   element.innerHTML+=`<a class="${i}">${i}</a>`
// })
function putallmaintopicintohinderburge(){
  maintopic2.forEach(i=>{
  const element=document.getElementById('alltopic-anchor')
  element.innerHTML+=`<a class="${i}">${i}</a>`
})
}


//----------------------------------------------------------------

document.getElementById('alltopic-anchor').addEventListener('click',(e)=>{
    e.preventDefault()

    
  

    if (maintopic2.includes(e.target.classList[0])) {
    sessionStorage.setItem("maintopic",e.target.classList[0]);
    window.location.href = "index1.html";
  }
})


// have aapne navbar ma je topic 6e tene aapne clicable banaviya:
document.getElementById('differ').addEventListener('click',(e)=>{
    e.preventDefault()

    if (maintopic2.includes(e.target.classList[0])) {
    sessionStorage.setItem("maintopic",e.target.classList[0]);
    window.location.href = "index1.html";
  }
})


/////////////////////////////////////////

const token = localStorage.getItem('kalpquiz_token');
const expiry = localStorage.getItem('kalpquiz_token_expiry');

if (!token || !expiry || Date.now() > parseInt(expiry)) {
  // Session expired or no token
  localStorage.removeItem('kalpquiz_token');
  localStorage.removeItem('kalpquiz_token_expiry');
  localStorage.removeItem('Kalpquiz_credit');

  // localStorage.removeItem('current_kalpquiz_user');
  alert('Session expired. Please log in again.');
  window.location.href = './index.html';
}