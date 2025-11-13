// aapne index2 ma evu rakhvanu ke save par click kare etle te quiz save thai jay local storage ma:

// mare aa niche mujab save karva 6e:
const allquiz100=[{
        maintopic:"geography"  ,
        subtopic:"mugal samrat",
        language:'gujarati',
        date:'22-22-11',
        Nos_of_question:"2",
        allquestion:[
            {question:"Which part of the airplane is responsible for propulsion?",
            option1:"Fuselage",
            option2:"Cockpit",
            option3:"Engine",
            option4:"Rudder",
            answer:"Engine"
            },
            {question:"Which part of the airplane is responsible for propulsion?",
            option1:"Fuselage",
            option2:"Cockpit",
            option3:"Engine",
            option4:"Rudder",
            answer:"Engine"
            }],
         level:"high",
         marks:20
  },
       

        ]

//----------------------------------------------------------------------------indexdb aapne second.js ma kaam lagase karan ke quiz te user e tya aapi hase.
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




//------------------------------aa addQuiz valu pan tya second.js ma hovu joiye.
//  have aapne aa quiz na data ne aapne indexed db ma store karvana 6e.
async function addQuizToKapDB(quizObject) {
  const db = await openQuestionDB();

  const tx = db.transaction('quizData', 'readwrite');
  const store = tx.objectStore('quizData');

  const quizWithTimestamp = {
    ...quizObject,
    createdAt: Date.now()
  };

  const request = store.add(quizWithTimestamp);

  request.onsuccess = () => console.log('✅ Quiz added to kapQuizQuestionDB');
  request.onerror = () => console.error('❌ Failed to add quiz');

  await tx.complete;
}
//-------------------
// async function getAllQuizzesFromKapDB() {
//   const db = await openQuestionDB();
//   const tx = db.transaction('quizData', 'readonly');
//   const store = tx.objectStore('quizData');

//   return new Promise((resolve, reject) => {
//     const request = store.getAll();

//     request.onsuccess = () => {
//       const result = request.result;
//       result.sort((a, b) => b.createdAt - a.createdAt); // newest first
//       resolve(result);
//     };

//     request.onerror = () => reject('❌ Failed to get quizzes');
//   });
// }
//-------------------------aa upar valu Getallquizz vaala ma 2months ni limit nathi to aapne ahiya 2month pahla je pan quiz hase te automatically delete thai jase.
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

//-------------------      
async function deleteQuizFromKapDB(id) {
  const db = await openQuestionDB();
  const tx = db.transaction('quizData', 'readwrite');
  const store = tx.objectStore('quizData');

  const request = store.delete(id);

  request.onsuccess = () => console.log(`🗑️ Deleted quiz with ID: ${id}`);
  request.onerror = () => console.error('❌ Failed to delete quiz');

  await tx.complete;
}

//---------------------------------aa updatequiz valu aapne forth.js ma kaam lagase
async function updateQuizById(id, updatedQuizData) {
  const db = await openQuestionDB(); // your kapQuizQuestionDB
  const tx = db.transaction('quizData', 'readwrite');
  const store = tx.objectStore('quizData');

  // Ensure we include the original ID in the update
  const updatedQuiz = {
    ...updatedQuizData,
    id,                // 👈 preserve the original ID
    updatedAt: Date.now() // optional: track update time
  };

  const request = store.put(updatedQuiz);

  request.onsuccess = () => console.log(`✏️ Quiz with ID ${id} updated successfully`);
  request.onerror = () => console.error(`❌ Failed to update quiz with ID ${id}`);

  await tx.complete;
}
//----------------------------------
async function clearKapQuizDB() {
  const db = await openQuestionDB();
  const tx = db.transaction('quizData', 'readwrite');
  const store = tx.objectStore('quizData');

  const request = store.clear();

  request.onsuccess = () => console.log('🧹 All quizzes cleared from kapQuizQuestionDB');
  request.onerror = () => console.error('❌ Failed to clear quizzes');

  await tx.complete;
}












//--------------------------------------------------------------------------

// const allquiz=JSON.parse(localStorage.getItem('alloldquiz')) || [];

let allquiz;


document.addEventListener('DOMContentLoaded', async () => {
  allquiz = await getAllQuizzesFromKapDB();
  console.log(allquiz);
  // console.log(allquiz[0].allquestion)
  // console.log(allquiz[18])
  // console.log(allquiz[8])
  await attachblock();
  await makearaystartanddelete()
  
});

// ==============

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


// ==============




// aapne aa allquiz jetli hoy tetli aapne quiz block banavvana 6e.
function makequizblock(quizblocknum,maintopic1,subtopic1,date1,language1,level1,marks){
    // <div class="card">
      
        //     <div class="card-title">Quiz-1</div>
        //         <div>
        //             <div>Main Topic:Geography</div>
        //             <div>Sub Topic:Mugal Samrat jhfhfghfgwgfwgugjgj fjkqwhfjqw qjfgqejk</div>
        //             <div>Date:27-2-2025</div>
        //             <div>Language:Gujarati</div>
        //             <div class="btndiv">
        //             <div class="btn1" id="start1" >Start Quiz</div>
        //             <div class="btn1" id="delete2" >Delete Quiz</div>
        //             </div>
        //         </div>
        
        // </div>
        const element=document.createElement('div')
        element.setAttribute('class','card')
        element.innerHTML=`<div class="card-title">Quiz-${quizblocknum}</div>
                 <div>
                     <div>Main Topic:${maintopic1}</div>
                     <div>Sub Topic:${subtopic1}</div>
                     <div>Date:${date1}</div>
                     <div>Language:${language1}</div>
                     <div>Language:${level1}</div>
                     <div class="btndiv">
                     <div class="btn1" id="start${quizblocknum}" >Start Quiz</div>
                     <div class="btn1" id="delete${quizblocknum}" >Delete Quiz</div>
                     <div class="btn1" id="marks" >Marks:${marks}</div>
                     </div>
                 </div>`

        return element

}


async function attachblock(){
    // const allquiz4=JSON.parse(localStorage.getItem('alloldquiz')) || [];
    const parentofallquizblock=document.getElementById('ALLQUIZ1');
    parentofallquizblock.innerHTML='';
    if (!allquiz){
    alert(`You don't have saved any quiz`);
    }

    else{
    
        // let k=1;
        // parentofallquizblock.innerHTML='';
        // console.log(typeof allquiz4);
        // console.log(allquiz4);
        // allquiz4.forEach((quizcontentobject)=>{
        //     console.log(quizcontentobject);
        //     let element2=makequizblock(k,quizcontentobject["maintopic"],quizcontentobject["subtopic"],quizcontentobject["date"],quizcontentobject["language"]);
        //     parentofallquizblock.innerHTML+=`${element2}`;
        //     console.log(element2);
        //     k++

        let k=1
        allquiz.forEach((quizcontentobject)=>{
            parentofallquizblock.innerHTML+=`<div class="card">
                                                <div class="card-title">Quiz-${k}</div>
                                                    <div>
                                                        <div class="maintopic">Main Topic:${quizcontentobject["maintopic"]}</div>
                                                        <div class="subtopic">Sub Topic:${quizcontentobject["subtopic"]}</div>
                                                        <div class="level">Level:${quizcontentobject["level"]}</div>
                                                        <div class="date">Date:${quizcontentobject["date"]}</div>
                                                        <div class="language">Language:${quizcontentobject["language"]}</div>
                                                        <div class="id">Id:${quizcontentobject["id"]}</div>
                                                        <div class="btndiv">
                                                        <div class="btn1" id="start${quizcontentobject["id"]}" >Start Quiz</div>
                                                        <div class="btn1" id="delete${quizcontentobject["id"]}" >Delete Quiz</div>
                                                        <div id="marks" >Letest High Marks:${quizcontentobject['marks']}</div>
                                                        </div>
                                                    </div>


                                            </div>`


                k++
        })


        
    
    }
    
    
    }

// attachblock()











// pa6i aapne aa third.js ma je pan quiz par click kariye evu aapne ne index4.html ma redirect karavse. tema Quiz1 par click kare to aapne aa allquiz na index 0 vala ne pass lai levanu.
let allquizoptionstart=[]
let allquizoptiondelete=[]
// const allquiz1 = JSON.parse(localStorage.getItem('alloldquiz')) || [];
// let i=1

async function makearaystartanddelete(){
    
    allquiz.forEach(element => {
    allquizoptionstart.push(`start${element['id']}`);
    allquizoptiondelete.push(`delete${element['id']}`);
    // i++
});
console.log(allquizoptionstart)
console.log(allquizoptiondelete)
}
// allquiz.forEach(element => {
//     allquizoptionstart.push(`start${i}`);
//     allquizoptiondelete.push(`delete${i}`);
//     i++
// });
// console.log(allquizoptionstart)
// console.log(allquizoptiondelete)




document.getElementById('ALLQUIZ1').addEventListener('click',async (e)=>{
        e.preventDefault()
        console.log(e.target.id);
        if(allquizoptionstart.includes(e.target.id)){ 

            // aa include vala logic thi jo jena par click karu teni jo id e aa allquizoptionstart ma hoy to j redirect thase.
            sessionStorage.setItem("Quiznumber",e.target.id);
            console.log(e.target.id);
            window.location.href = "index4.html";
        }

        if(allquizoptiondelete.includes(e.target.id)) {
            const deletequizname=e.target.id;//delete1
            // const allquiz3 = JSON.parse(localStorage.getItem('alloldquiz')) || [];
            const quiznum2=Number(deletequizname.slice(6,deletequizname.length))
            console.log(allquiz)
            // delete allquiz3[quiznum2-1]//aanathi array mathi aa element to nikali jatu hatu pan tya empty lakhelu aavtu hatu to tena mate splice no use karvo pade.
            // allquiz.splice(quiznum2-1,quiznum2-1);

            await deleteQuizFromKapDB(quiznum2)


            console.log(allquiz);


            // aapne farithi aa page ne reload karvu padse.
            window.location.reload()

            console.log(deletequizname)
            console.log(quiznum2)
 
        }
})


//----------------------------------
const token = localStorage.getItem('kalpquiz_token');
const expiry = localStorage.getItem('kalpquiz_token_expiry');

if (!token || !expiry || Date.now() > parseInt(expiry)) {
  // Session expired or no token
  localStorage.removeItem('kalpquiz_token');
  localStorage.removeItem('kalpquiz_token_expiry');
  // localStorage.removeItem('current_kalpquiz_user');
  alert('Session expired. Please log in again.');
  window.location.href = './index.html';
}
























// aapne index2 ma save pala button par 
// function savequestion(maintopic,subtopic,language,date,nosquestion,allquestion){
//     const allquiz1 = JSON.parse(localStorage.getItem('alloldquiz')) || [];

    
//     const newquiz = {maintopic:'',subtopic:'',language:'',date:'',nosquestion:'',allquestion:''};

//     allquiz1.push(newquiz)

//     localStorage.setItem('alloldquiz', JSON.stringify(allquiz1));
// }





//-------------------------


//-----------------------------------
// aa niche valu aapne index4.html na js ma lakhvanu 6e.
// const startquiznum=sessionStorage.getItem("Quiznumber");
// // aama string ma ==>start1 aa rite malse.
// const quiznum=Number(startquiznum.slice(5,startquiznum.length))
// console.log(quiznum)



// const allquiz2 = JSON.parse(localStorage.getItem('alloldquiz')) || [];

// const ourquiz=allquiz2[quiznum-1];

// const ourquizquestion=allquiz2[quiznum-1].allquestion;
// aam aapn ne ek array ni andar badha question mali jase.

//------------------------------------------------------







