// const all=[{allquestion: [{question: 'What is the primary object hit by players in an NHL game?', option1: 'Ball', option2: 'Puck', option3: 'Disk', option4: 'Stone',answer:'Disk'},{question: 'How many players from one team are on the ice at o…during a standard NHL game, including the goalie?', option1: '5', option2: '6', option3: '7', option4: '8',answer:'8'}],
// createdAt: 1755508157060,
// date: "8/18/2025 2:39:17 PM",
// id: 66,
// language: "English",
// level: "Easy",
// maintopic: "SPORTS",
// marks: 0,
// nosquestion: 20,
// subtopic: "kabadi"},

// {allquestion: [{question: 'What is the primary object hit by players in an NHL game?', option1: 'Ball', option2: 'Puck', option3: 'Disk', option4: 'Stone',answer:'Disk'},{question: 'How many players from one team are on the ice at o…during a standard NHL game, including the goalie?', option1: '5', option2: '6', option3: '7', option4: '8',answer:'8'}],
// createdAt: 1755508154578,
// date: "8/18/2025 2:39:17 PM",
// id: 88,
// language: "Gujarati",
// level: "Hard",
// maintopic: "Geology",
// marks: 0,
// nosquestion: 20,
// subtopic: "Soil"},
// ]


const all = [
  {
    allquestion: [
      { question: 'What is the primary object hit by players in an NHL game?', option1: 'Ball', option2: 'Puck', option3: 'Disk', option4: 'Stone', answer: 'Disk' },
      { question: 'How many players from one team are on the ice at o…during a standard NHL game, including the goalie?', option1: '5', option2: '6', option3: '7', option4: '8', answer: '8' }
    ],
    createdAt: 1755508157060,
    date: "8/18/2025 2:39:17 PM",
    id: 66,
    language: "English",
    level: "Easy",
    maintopic: "SPORTS",
    marks: 0,
    nosquestion: 20,
    subtopic: "kabadi"
  },
  {
    allquestion: [
      { question: 'What is the primary object hit by players in an NHL game?', option1: 'Ball', option2: 'Puck', option3: 'Disk', option4: 'Stone', answer: 'Disk' },
      { question: 'How many players from one team are on the ice at o…during a standard NHL game, including the goalie?', option1: '5', option2: '6', option3: '7', option4: '8', answer: '8' }
    ],
    createdAt: 1755508154578,
    date: "8/18/2025 2:39:17 PM",
    id: 88,
    language: "Gujarati",
    level: "Hard",
    maintopic: "Geology",
    marks: 0,
    nosquestion: 20,
    subtopic: "Soil"
  }
];

// // ✅ Filters (multiple values allowed)
// const selectedIds = [66, 88];
// const selectedLanguages = ["English"];
// const selectedLevels = ["Easy", "Medium"];
// const selectedMainTopics = ["SPORTS"];
// const selectedSubTopics = ["kabadi"];

// const filtered = all.filter(item =>
//   (selectedIds.length === 0 || selectedIds.includes(item.id)) &&
//   (selectedLanguages.length === 0 || selectedLanguages.includes(item.language)) &&
//   (selectedLevels.length === 0 || selectedLevels.includes(item.level)) &&
//   (selectedMainTopics.length === 0 || selectedMainTopics.includes(item.maintopic)) &&
//   (selectedSubTopics.length === 0 || selectedSubTopics.includes(item.subtopic))
// );

// console.log("Filtered Data:", filtered);


// const questionListDiv = document.getElementById("question-list");
// filtered.forEach(item => {
//   item.allquestion.forEach(q => {
//     const div = document.createElement("div");
//     div.innerHTML = `
//       <label>
//         <input type="checkbox" value="${{"question":q.question,"option1":q.option1,"option2":q.option2,"option3":q.option3,"option4":q.option4}}">
//         ${q.question}
//       </label>
//     `;
//     questionListDiv.appendChild(div);
//   });
// });


// let selectedQuestions = [];


// function handleOk() {
//   const checkboxes = document.querySelectorAll("#question-list input[type='checkbox']:checked");
//   selectedQuestions = Array.from(checkboxes).map(cb =>(cb.value));
//   console.log(selectedQuestions);

//   console.log("Selected Questions:", selectedQuestions);
// }

// document.getElementById('selectedquestionok').addEventListener('click',(e)=>{
//     e.preventDefault();
//     handleOk()
// })
//===============================

function openQuestionDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('kapQuizQuestionDB', 1); // version 1

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create a store called 'quizData' (or any name you like)
      if (!db.objectStoreNames.contains('quizData')) {
        db.createObjectStore('quizData', {
          keyPath: 'id',
          autoIncrement: true
        });
        console.log('✅ Created store: quizData in kapQuizQuestionDB');
      }
    };

    request.onsuccess = (event) => {
      console.log('✅ kapQuizQuestionDB opened');
      resolve(event.target.result);
    };

    request.onerror = () => reject('❌ Failed to open kapQuizQuestionDB');
  });
}

async function getAllQuizzesFromKapDB() {
  const TWO_MONTHS = 1000 * 60 * 60 * 24 * 30 * 4; // 2 months in ms
  // const TWO_MONTHS = 1000 * 60 * 2 // 2 minutes in ms
  const db = await openQuestionDB();
  const tx = db.transaction('quizData', 'readonly'); // only reading for now
  const store = tx.objectStore('quizData');

  return new Promise((resolve, reject) => {
    const request = store.getAll();

    request.onsuccess = () => {
      const result = request.result || [];
      const now = Date.now();

      // Separate fresh & expired
      const freshQuizzes = [];
      const expiredIDs = [];

      result.forEach(q => {
        if (now - q.createdAt > TWO_MONTHS) {
          expiredIDs.push(q.id);
        } else {
          freshQuizzes.push(q);
        }
      });

      // Sort fresh quizzes by newest first
      freshQuizzes.sort((a, b) => b.createdAt - a.createdAt);

      // Resolve fresh quizzes immediately (no waiting for deletion)
      resolve(freshQuizzes);

      // Cleanup expired quizzes in background
      if (expiredIDs.length > 0) {
        (async () => {
          const cleanupTx = db.transaction('quizData', 'readwrite');
          const cleanupStore = cleanupTx.objectStore('quizData');
          expiredIDs.forEach(id => {
            console.log(`🗑️ Auto-deleting quiz ID: ${id} (older than 2 months)`);
            cleanupStore.delete(id);
          });
          await cleanupTx.complete;
          console.log('✅ Expired quizzes cleanup finished');
        })();
      }
    };

    request.onerror = () => reject('❌ Failed to get quizzes');
  });
}

//-----------------for main and subtopic.
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
    //   const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

    //   if (isExpired) {
    //     console.log('⏰ IndexedDB cache expired');
    //     resolve(null); // tell caller to fetch fresh data

    //   }
    //    else {
        resolve(data); // use cached data
    //   }
    };

    request.onerror = () => reject('Failed to read cache');
  });
}


//--------------
let allmaintopicname

let allquiz;
let ALLIds = [];
let ALLLanguages = ['English','Gujarati','Hindi'];
let ALLLevels = ['Easy','Medium','Hard'];
let ALLMainTopics = [];
let ALLSubTopics = [];



document.addEventListener('DOMContentLoaded', async () => {
  allquiz = await getAllQuizzesFromKapDB();
  allmaintopicname = await getAllMainTopics();

  console.log(allquiz);
  allquiz.forEach(i=>{
    console.log(i.id,i.language,i.level,i.maintopic,i.subtopic)
    if(!ALLIds.includes(`${i.id}`)){
    ALLIds.push(`${i.id}`);
    }
    // if(!ALLLanguages.includes(`${i.language}`)){
    // ALLLanguages.push(`${i.language}`);
    // }
    // if(!ALLLevels.includes(`${i.level}`)){
    // ALLLevels.push(`${i.level}`);
    // }

    // if(!ALLMainTopics.includes(`${i.maintopic}`)){
    // ALLMainTopics.push(`${i.maintopic}`);
    // }
    // if(!ALLSubTopics.includes(`${i.subtopic}`)){
    // ALLSubTopics.push(`${i.subtopic}`);
    // }

    // ALLLanguages.push(`${i.language}`);
    // ALLLevels.push(`${i.level}`);
    // ALLMainTopics.push(`${i.maintopic}`);
    // ALLSubTopics.push(`${i.subtopic}`);
  })


    console.log(allmaintopicname)
    for (const [key, value] of Object.entries(allmaintopicname)) {
        // console.log(`${key}: ${value}`);
        if(!ALLMainTopics.includes(`${key}`)){
            ALLMainTopics.push(`${key}`);
            }

        const sub={}
        const allsub=[]
        value.forEach(j=>{
            
            
            //  if(!ALLSubTopics.includes(j.name)){
            // ALLSubTopics.push(j.name);
            // }
            allsub.push(j.name)

        })
        sub[`${key}`]=allsub
        ALLSubTopics.push(sub);
       


        }
    console.log(ALLSubTopics);


    //   console.log(ALLIds);
    loopforquery(ALLIds,allquizid);
    loopforquery(ALLLanguages,allquizlanguage);
    loopforquery(ALLLevels,allquizlevel);
    loopforquery(ALLMainTopics,allquizmaintopic);
    loopforsubtopicquery(ALLSubTopics,allquizsubtopic);
  
  
});

//--------------------------


// Filters
// const ALLIds = [66, 88];
// const ALLLanguages = ["English","Gujarati"];
// const ALLLevels = ["Easy", "Hard"];
// const ALLMainTopics = ["SPORTS","Geology"];
// const ALLSubTopics = ["kabadi","Soil"];








const allquizid=document.getElementById('quizid')
const allquizlanguage=document.getElementById('quizlanguage')
const allquizlevel=document.getElementById('quizlevel')
const allquizmaintopic=document.getElementById('quizmaintopic')
const allquizsubtopic=document.getElementById('quizsubtopic')



function loopforquery(alltopicidArray1,locationdiv1){
    const alltopicidArray=alltopicidArray1;
    const locationdiv=locationdiv1
    alltopicidArray.forEach(i=>{
        const element=document.createElement('div');
        element.innerHTML=`
        <label>
        <input type="checkbox" topic='${capitalizeFirst(i)}'>
        ${i}
        </label>
        `
        locationdiv.appendChild(element);

    })
}




// loopforquery(ALLIds,allquizid);
// loopforquery(ALLLanguages,allquizlanguage);
// loopforquery(ALLLevels,allquizlevel);
// loopforquery(ALLMainTopics,allquizmaintopic);
// loopforquery(ALLSubTopics,allquizsubtopic);
function loopforsubtopicquery(alltopicidArray1, locationdiv1) {
  const alltopicidArray = alltopicidArray1;
  const locationdiv = locationdiv1;

  alltopicidArray.forEach(i => {
    const key = Object.keys(i)[0];//Object.keys(i) give me all key inside one array==>[key1,key2,key3,key4....]==> this is 1d array.     // "Geography" or "Sports"

    const values = Object.values(i)[0];//Object.values(i) give me saperate array of for all keys inside single array.==>[[key1 values],[key2 values],..]==>this is 2d array

    // hare aapne ahiya i object ma single object 6e to aapne key and value na array ma 0th index vala ne laiye 6iye.
    

    // Create main topic title
    const element1 = document.createElement('div');
    element1.innerHTML = `<div><strong>${key}</strong></div>`;
    locationdiv.appendChild(element1);

    // Loop subtopics
    values.forEach(j => {
      const element2 = document.createElement('div');
      element2.innerHTML = `<label><input type="checkbox" topic='${capitalizeFirst(j)}'>${j}</label>`;
      locationdiv.appendChild(element2);
    });
  });
}

let selectedIds1=[]
let selectedLanguages1 = [];
let selectedLevels1 = [];
let selectedMainTopics1 = [];
let selectedSubTopics1 = [];

async function filterqueryes1(idname){
  const checkboxes = document.querySelectorAll(`#${idname} input[type='checkbox']:checked`);
  const selectedarray = Array.from(checkboxes).map(cb => cb.getAttribute("topic"));
  return selectedarray
}

function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


let questionListDiv1 = document.getElementById("question-list");

document.getElementById('filterbutton').addEventListener('click',async (e)=>{
  e.preventDefault();
  questionListDiv1.innerHTML='';
  // const checkboxesid = document.querySelectorAll("#quizid input[type='checkbox']:checked");
  // selectedIds1 = Array.from(checkboxesid).map(cb => cb.getAttribute("topic"));
  // console.log("Selected id", selectedIds1);
  selectedIds1=await filterqueryes1('quizid')
  selectedLanguages1=await filterqueryes1('quizlanguage')
  selectedLevels1=await filterqueryes1('quizlevel')
  selectedMainTopics1=await filterqueryes1('quizmaintopic')
  selectedSubTopics1=await filterqueryes1('quizsubtopic')

  console.log(selectedIds1,selectedLanguages1,selectedLevels1,selectedMainTopics1,selectedSubTopics1);

  //   const filtered1 = await allquiz.filter(item =>
  //   selectedIds1.includes(item.id) || selectedLanguages1.includes(item.language) || selectedLevels1.includes(item.level)||selectedMainTopics1.includes(item.maintopic)||selectedSubTopics1.includes(item.subtopic)
  // );
  // const filtered1=Array.from(allquiz).filter(item=>(selectedIds1.length === 0 || selectedIds1.includes(item.id)))
  //---------------------------------------------
    console.log(allquiz);
    const filtered1 = allquiz.filter(item =>
      (selectedIds1.length === 0 || selectedIds1.includes(`${item.id}`)) &&
      (selectedLanguages1.length === 0 || selectedLanguages1.includes(item.language)) &&
      (selectedLevels1.length === 0 || selectedLevels1.includes(item.level)) &&
      (selectedMainTopics1.length === 0 || selectedMainTopics1.includes(capitalizeFirst(item.maintopic))) &&
      (selectedSubTopics1.length === 0 || selectedSubTopics1.includes(capitalizeFirst(item.subtopic)))
    );

    if(filtered1.length==0){
        document.getElementById('iffilteredempty').style.display='flex';
    }
    else{
        document.getElementById('iffilteredempty').style.display='none';

    }
    console.log(filtered1);
    //----------------------------------------------
    // let filtered1 = allquiz;


    // // Step 1: filter by IDs
    // if (selectedIds1.length > 0) {
    //   filtered1 = filtered1.filter(item => selectedIds1.includes((`${item.id}`)));
    // }

    // // Step 2: filter by Languages
    // if (selectedLanguages1.length > 0) {
    //   filtered1 = filtered1.filter(item => selectedLanguages1.includes(item.language));
    // }

    // // Step 3: filter by Levels
    // if (selectedLevels1.length > 0) {
    //   filtered1 = filtered1.filter(item => selectedLevels1.includes(item.level));
    // }

    // // Step 4: filter by Main Topics
    // if (selectedMainTopics1.length > 0) {
    //   filtered1 = filtered1.filter(item => selectedMainTopics1.includes(item.maintopic));
    // }

    // // Step 5: filter by Sub Topics
    // if (selectedSubTopics1.length > 0) {
    //   filtered1 = filtered1.filter(item => selectedSubTopics1.includes(item.subtopic));
    // }

    //-----------------------------------
    // const filtered2=filtered1.filter(item=>(selectedLanguages1.length === 0 || selectedLanguages1.includes(item.language)))

    // const filtered3=filtered2.filter(item=>(selectedLevels1.length === 0 || selectedLevels1.includes(item.level)))
    // const filtered4=filtered3.filter(item=>(selectedMainTopics1.length === 0 || selectedMainTopics1.includes(item.maintopic)))
    // const filtered5=filtered4.filter(item=>(selectedSubTopics1.length === 0 || selectedSubTopics1.includes(item.subtopic)))


    console.log(filtered1);

    // const questionListDiv1 = document.getElementById("question-list");

    filtered1.forEach(item => {
      const div1=document.createElement('div');
      div1.setAttribute('class','questionboxmain')
      div1.innerHTML=`<div class='descriptionofitem' style="display:flex; justify-content: space-around; ">
        <div>Id: ${item.id}</div>
        <div>Maintopic: ${item.maintopic}</div>
        <div>Subtopic: ${item.subtopic}</div>
      
      </div>`
      // questionListDiv1.appendChild(div1);

      
      item.allquestion.forEach((q, index) => {
        const div = document.createElement("div");
        const uniqueId = `${item.id}-${index}`; // unique key for input

        // <input type="checkbox" data-question='${encodeURIComponent(JSON.stringify(q))}'></input>
        // <input type="checkbox" data-answer="${q.answer}" data-option1="${q.option1}" data-option2="${q.option2}" data-option3="${q.option3}" data-option4="${q.option4}" data-question="${q.question}" />
        div.innerHTML = `
          <div class="questionboxsub" style="margin-bottom:10px;border:1px solid #ccc;padding:10px;">
            
            <label>
              <input type="checkbox" data-answer="${q.answer}" data-option1="${q.option1}" data-option2="${q.option2}" data-option3="${q.option3}" data-option4="${q.option4}" data-question='${q.question.replace(/'/g, "&apos;")}' />
              <strong>${q.question}</strong>
            </label>
            <ul>
              <li>A) ${q.option1}</li>
              <li>B) ${q.option2}</li>
              <li>C) ${q.option3}</li>
              <li>D) ${q.option4}</li>
            </ul>
          </div>
        `;
        // questionListDiv1.appendChild(div);
        div1.appendChild(div);
      });
      //=======================
    //   const horizontal = document.createElement("hr");
    //   horizontal.style.backgroundColor='blue';
    // //   horizontal.style.fontWeight='20px'
    // //   horizontal.style.backgroundColor='black';
    //   horizontal.style.border='3px dotted black'


    //   // questionListDiv1.appendChild(horizontal);
    //   div1.appendChild(horizontal);
      //=============================
      questionListDiv1.appendChild(div1);



    });

    // const element=document.createElement('button');
    // element.setAttribute('id','selectedquestionok');
    // element.innerText='Save In Question Bank';
    // questionListDiv1.appendChild(element);

    document.getElementById('selectedquestionok').style.display='flex';
    

    questionListDiv1.style.border='2px solid white';
    
    







})


// const selectedIds = [66, 88];
// const selectedLanguages = ["English","Gujarati"];
// const selectedLevels = ["Easy", "Hard"];
// const selectedMainTopics = ["SPORTS","Geology"];
// const selectedSubTopics = ["kabadi","Soil"];





// const filtered = all.filter(item =>
//   (selectedIds.length === 0 || selectedIds.includes(item.id)) &&
//   (selectedLanguages.length === 0 || selectedLanguages.includes(item.language)) &&
//   (selectedLevels.length === 0 || selectedLevels.includes(item.level)) &&
//   (selectedMainTopics.length === 0 || selectedMainTopics.includes(item.maintopic)) &&
//   (selectedSubTopics.length === 0 || selectedSubTopics.includes(item.subtopic))
// );

// console.log("Filtered Data:", filtered);

// const questionListDiv = document.getElementById("question-list");

// filtered.forEach(item => {
//   item.allquestion.forEach((q, index) => {
//     const div = document.createElement("div");
//     const uniqueId = `${item.id}-${index}`; // unique key for input
//     div.innerHTML = `
//       <div style="margin-bottom:10px;border:1px solid #ccc;padding:10px;">
//         <label>
//           <input type="checkbox" data-question='${JSON.stringify(q)}'>
//           <strong>${q.question}</strong>
//         </label>
//         <ul>
//           <li>A) ${q.option1}</li>
//           <li>B) ${q.option2}</li>
//           <li>C) ${q.option3}</li>
//           <li>D) ${q.option4}</li>
//         </ul>
//       </div>
//     `;
//     questionListDiv.appendChild(div);
//   });
//   const horizontal = document.createElement("hr");
//   horizontal.style.backgroundColor='blue';
// //   horizontal.style.fontWeight='20px'
// //   horizontal.style.backgroundColor='black';
//   horizontal.style.border='3px dotted black'


//   questionListDiv.appendChild(horizontal);

// });


let selectedQuestions = [];

function handleOk() {
  const checkboxes = document.querySelectorAll("#question-list input[type='checkbox']:checked");
  // selectedQuestions = Array.from(checkboxes).map(cb => JSON.parse(`${cb.getAttribute("data-question")}`));
  // selectedQuestions = Array.from(checkboxes).map(cb => JSON.parse(decodeURIComponent(cb.getAttribute("data-question"))));
  selectedQuestions = Array.from(checkboxes).map(cb => ({
      answer: cb.dataset.answer,
      option1: cb.dataset.option1,
      option2: cb.dataset.option2,
      option3: cb.dataset.option3,
      option4: cb.dataset.option4,
      question: cb.dataset.question,
    }));
  console.log("Selected Questions:", selectedQuestions);
  // aa selectedQuestion mali jay pa6i aapne tene question bank na table ma show  karavvana 6e.
   renderTable();
}

document.getElementById('selectedquestionok').addEventListener('click',(e)=>{
    e.preventDefault();
    handleOk()
})





//================================old css style:
// #allquery{
//         display: flex;
//         justify-content: center;
//         gap: 20px;
//     }
//     #quizid,#quizlanguage,#quizlevel,#quizmaintopic,#quizsubtopic{
//         border: 3px solid green;
//         display: flex;
//         flex-direction: column;
//         justify-content: flex-start;
//         /* align-items: center; */
//         padding: 20px;
//         height: 400px;
//         overflow-y: scroll;
//         /* scrollbar-width: 1px; */
//         /* -webkit-scrollbar:2px; */ 
//         padding-top: 20px;
        

//     }

//     /* #quizid::-webkit-scrollbar,
// #quizlanguage::-webkit-scrollbar,
// #quizlevel::-webkit-scrollbar,
// #quizmaintopic::-webkit-scrollbar,
// #quizsubtopic::-webkit-scrollbar {
//   width: 100px;   /* vertical scrollbar thickness */
//   /* height: 10px;  horizontal scrollbar thickness */
// /* } */ 

// .quizbox::-webkit-scrollbar {
//   width: 6px;
//   height: 6px;
// }

// .quizbox::-webkit-scrollbar-track {
//   background: #f1f1f1;
// }

// .quizbox::-webkit-scrollbar-thumb {
//   background: #888;
//   border-radius: 4px;
// }

// .quizbox::-webkit-scrollbar-thumb:hover {
//   background: #555;
// }
// #Filterall{
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   border: 3px solid black;
//   box-shadow: 2px skyblue;
//   padding: 20px;
//   gap: 10px;
//   width:100vw;

// }
// #filterbutton{
//   background-color: bisque;
//   padding: 3px;
//   font-size: 20px;
//   cursor: pointer;
//   border: 2px solid grey;


// }
// #iffilteredempty{
//   display: none;
//   border: 2px solid red;
//   width: 100vw;
//   height: 300px;
//   justify-content: center;
//   /* justify-content: space-around; */
//   align-items: center;
//   font-size: 20px;
// }
// #question-list{
//   display: flex;
//   flex-direction: column;
//   /* align-items: center; */
// }
// .questionboxmain{
//   background-color: rgb(211, 211, 210);
//   color: rgb(9, 9, 9);
// }
// .questionboxsub{
//   background-color: black;
//   color: white;
// }
// .descriptionofitem{
//   background-color: rgb(204, 196, 41);
//   color: rgb(15, 15, 15);
// }

//=================================== aa question je selected 6e tena aapne question bank ma show karavvana 6e.

//  let selectedQuestions = [
//       {
//         answer: "3",
//         option1: "2",
//         option2: "3",
//         option3: "4",
//         option4: "5",
//         question: "How many periods are in a standard NHL game?",
//         marks: "1"
//       },
//       {
//         answer: "Goalie",
//         option1: "Forward",
//         option2: "Defenseman",
//         option3: "Goalie",
//         option4: "Center",
//         question: "What is the name of the player who tries to stop the puck from entering the net?",
//         marks: "1"
//       }
//     ];

    function renderTable() {
      const tbody = document.querySelector("#questionTable tbody");
      tbody.innerHTML = "";
      selectedQuestions.forEach((q, index) => {
        const row = document.createElement("tr");

        // <td contenteditable="true">${q.marks || ""}</td>
        row.innerHTML = `
          <td class="serialnos">${index + 1}</td>
          <td contenteditable="true">${q.question}</td>
          <td contenteditable="true">${q.option1}</td>
          <td contenteditable="true">${q.option2}</td>
          <td contenteditable="true">${q.option3}</td>
          <td contenteditable="true">${q.option4}</td>
          <td contenteditable="true">${q.answer}</td>
          <td data-label="Marks">
              <input type="number" value="${q.marks || 1}" min="0" style="width:60px;" />
          </td>
          <td><button onclick="deleteRow(${index})">Delete</button></td>
        `;
        tbody.appendChild(row);
      });
    }

    // aa syncTableToArray() function needed when i click on add new question that previos change is gone and again rerender that table. so aapne je change karyo table ma te aapne selectedQuestio ma push karavi ne pa6i row add karisu. 
    function syncTableToArray() {
      const rows = document.querySelectorAll("#questionTable tbody tr");
      selectedQuestions = [];
      rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        selectedQuestions.push({
          question: cells[1].innerText.trim(),
          option1: cells[2].innerText.trim(),
          option2: cells[3].innerText.trim(),
          option3: cells[4].innerText.trim(),
          option4: cells[5].innerText.trim(),
          answer: cells[6].innerText.trim(),
          // marks: cells[7].innerText.trim()
          marks: cells[7].querySelector("input").value.trim()
        });
      });
    }

    function addRow() {
      syncTableToArray();
      selectedQuestions.push({
        answer: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        question: "",
        marks: ""
      });
      renderTable();
    }

    function deleteRow(index) {
      syncTableToArray();
      selectedQuestions.splice(index, 1);
      renderTable();
    }

    
let newData = [];


function finalize() {
      syncTableToArray();

       // Check for missing data
      for (let i = 0; i < selectedQuestions.length; i++) {
        const q = selectedQuestions[i];
        if (!q.question ||!q.option1 ||!q.option2 ||!q.option3 ||!q.option4 ||!q.answer ||!q.marks
        ) {
          alert(`Question ${i + 1} information is incomplete. Please fill all fields.`);
          return; // stop finalize
        }
      if (isNaN(q.marks)) {
          alert(`❌ Row ${i + 1}: Marks must be a number.`);
        return;
        }
    }
    
    

      const rows = document.querySelectorAll("#questionTable tbody tr");
      // const newData = [];
      newData = [];
      rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        newData.push({
          question: cells[1].innerText.trim(),
          option1: cells[2].innerText.trim(),
          option2: cells[3].innerText.trim(),
          option3: cells[4].innerText.trim(),
          option4: cells[5].innerText.trim(),
          answer: cells[6].innerText.trim(),
          // marks: cells[7].innerText.trim()
          marks: cells[7].querySelector("input").value.trim()

        });
      });
      console.log("✅ Final Data:", newData);
      // alert("Check console for final array");
    }
    

// Initial render
// renderTable();

    




document.getElementById('addnewquestion').addEventListener('click',(e)=>{
  e.preventDefault()
  addRow()

})


document.getElementById('finalquestions').addEventListener('click',(e)=>{
  e.preventDefault()
  finalize()
})
// aa deleterow vala function ne aapne html ma onclick ma lakhyu 6e to tena mate aapne te function ne aapne global banavvu padse.
window.deleteRow=deleteRow