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

async function getQuizById(id) {
  const db = await openQuestionDB(); // your DB opener
  const tx = db.transaction('quizData', 'readonly');
  const store = tx.objectStore('quizData');

  return new Promise((resolve, reject) => {
    const request = store.get(id);

    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result); // ✅ Found quiz
      } else {
        resolve(null); // ❌ No quiz with that ID
      }
    };

    request.onerror = () => {
      reject('❌ Failed to fetch quiz by ID');
    };
  });
}




//------------------------------------------------------











// aa niche valu aapne index4.html na js ma lakhvanu 6e.
// const startquiznum=sessionStorage.getItem("Quiznumber");
// aama string ma ==>start1 aa rite malse.
// const quiznum=Number(startquiznum.slice(5,startquiznum.length))
// console.log(quiznum)



// const allquiz2 = JSON.parse(localStorage.getItem('alloldquiz')) || [];


// const ourquiz=allquiz2[quiznum-1];
////////////////////////////
let ourquiz;
let ourquizquestion;
let subtopic1;
let maintopic2;
let arr;
let quiznum;

document.addEventListener('DOMContentLoaded', async () => {
    const startquiznum=sessionStorage.getItem("Quiznumber");
    quiznum=Number(startquiznum.slice(5,startquiznum.length));
    console.log(quiznum);
    ourquiz=await getQuizById(quiznum);
    console.log(ourquiz);
    console.log(ourquiz.allquestion);
    ourquizquestion=ourquiz.allquestion;
    subtopic1 =ourquiz['subtopic']

    maintopic2= ourquiz['maintopic']
    putmainandsubtopic()
    arr=ourquizquestion;
    extractanswerfromallquestion()
    
  
  
  
});


///////////////////////////////



// const ourquizquestion=allquiz2[quiznum-1].allquestion;
// aam aapn ne ek array ni andar badha question mali jase.

// const ourquizquestion=ourquiz.allquestion;













//------------------------------------------------------------------

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



// const subtopic1 =ourquiz['subtopic']

// const maintopic2= ourquiz['maintopic']


function putmainandsubtopic(){
const sub=document.getElementById('sub');
sub.innerText+=`${maintopic2}:${subtopic1}`
}








// let arr=ourquiz["allquestion"];
console.log(arr)




let ANS={}

let p=1;


function extractanswerfromallquestion(){
arr.forEach((obj1)=>{
    ANS[`answer${p}`]=obj1['answer']
            p++
    })
}







/////////////////////////////////////////////
function makingdiv(num1){
    const element1=document.createElement('div')
    element1.setAttribute('class','question')
    element1.setAttribute('id',`question${num1}`)
    return element1
}
function makingpara(num1){
    const paragraph=document.createElement('p');
    paragraph.innerText=`Q.${num1+1}  ${arr[num1].question}`;
    return paragraph
}
function makinginput(num1,num2){
    const input3=document.createElement('input');
    input3.setAttribute('type','radio');
    input3.setAttribute('id',`option${num1}${num2}`);
    input3.setAttribute('name',`answer${num1+1}`);
    input3.setAttribute('value',`${arr[num1][`option${num2}`]}`)
    // label2.setAttribute('class',`option${num2}`)

    return input3

}
// num1 e kaya number no question 6e te.
//num2 e kaya number no option 6e te.

function makinglabel(num1,num2){
    const label2=document.createElement('label');
    label2.setAttribute('for',`option${num1}${num2}`);
    // label2.setAttribute('class',`option${num2}`)
    label2.innerText=arr[num1][`option${num2}`]
    return label2
}

function makingbrack(){
    const brake2=document.createElement('br');
    return brake2
}
// console.log(makinginput(1,2))

// adding button for correct or wrong:
function addbutton(){
    const element=document.createElement('BUTTON');
    element.innerHTML='';
    return element

}






/////////////////////////

const element6=document.createElement('button');
            element6.setAttribute('type','submit');
            element6.innerHTML='submit';
            element6.style.width='80px'
            element6.style.height='50px'
            element6.setAttribute('id','btnfinal')
            // element6.style.marginBottom='100px';

            // aa element6 ne form ma append karaviye.
        const formfinal=document.getElementById('form4');

        formfinal.append(element6);
        



         let marks=0
        //aa marks ne aapne div aaoisu tema aapisu.
        const element7=document.createElement('div')
        element7.innerHTML=`MARKS:${marks}`;
        
        element7.setAttribute('id','finalmarks')


        document.getElementById('marksanddownload').append(element7);
        //----------------------------------

        const element8=document.createElement('div')
        element8.innerHTML=`Download PDF Without Answers`;
        
        element8.setAttribute('id','downloadpdfquestions')
        // document.body.append(element8);
        document.getElementById('marksanddownload').append(element8);

        //-----------------------------------
        const element9=document.createElement('div')
        element9.innerHTML=`Download PDF Only Answers`;
        
        element9.setAttribute('id','downloadpdfanswer')
        // document.body.append(element8);
        document.getElementById('marksanddownload').append(element9);
        //------------------------------------
        const element10=document.createElement('div')
        element10.innerHTML=`Refresh Page`;
        
        element10.setAttribute('id','Refresh_Page')
        // document.body.append(element8);
        document.getElementById('marksanddownload').append(element10);




        









////////////////////////




const element53=document.getElementById('startquiz');
element53.addEventListener('click', (event)=>{
       
        
        marks=0
        element7.innerHTML=`MARKS:${marks}`;

        let allque=document.getElementById('all_question');
        // allque.innerHTML='';

        
        event.preventDefault()
       
        let nos=arr.length
        makedivfornumberbox(nos)


        



        let i=0;
            arr.forEach((obj)=>{
            // console.log(i)
            let div=makingdiv(i)
            let para=makingpara(i)
            let inp1=makinginput(i,1)
            let lab1=makinglabel(i,1)
            let brack1=makingbrack()

            let inp2=makinginput(i,2)
            let lab2=makinglabel(i,2)
            let brack2=makingbrack()

            let inp3=makinginput(i,3)
            let lab3=makinglabel(i,3)
            let brack3=makingbrack()

            let inp4=makinginput(i,4)
            let lab4=makinglabel(i,4)
            let brack4=makingbrack()

            // add button:
            let but=addbutton()

            // lets append this into div
            div.append(para,inp1,lab1,brack1,inp2,lab2,brack2,inp3,lab3,brack3,inp4,lab4,brack4,but);

            // aa div 6e tene 'all_question' id vala jode append karavi pade.
            let allque=document.getElementById('all_question');
            allque.append(div)
            i+=1
        }
        )


        ////////////////////////////////////////

        
            // aapne aa submit button ne disabled kari nakhyu hatu to tene aa startquiz par click karvathi farithi te chalu thai jay tena mate disabled=false karvu pade.
            document.getElementById('btnfinal').disabled=false;



            let submitted = false;//variable laiye jo ek var submit karya pa6i farithi submit karse to te nahi kari sake.

            formfinal.addEventListener('submit',(e)=>{
                e.preventDefault()// aa sauthi upar aavvu joiye aanathi page refresh nahi thay.

                // jo form pahla j submit karelu hase to te farithi submit button par click kare to tene return kari devano
                if(submitted){
                    alert('You have already Submitted.')
                    return
                }

                //  formfinal.removeEventListener('click')
                // have aapne ek variable levano to te true hase to aa submit vala button par farithi click nahi thay.
                submitted = true;

                // pa6i aapne click event aa submit button par bandh kari daiye.
                document.getElementById('btnfinal').disabled=true;

                // if(allque.innerHTML.trim() === ""){
                //     alert('Before submitting atleast start Quiz.')
                //     console.log('atleast start quiz')
                //     return
                // }
                // aa form na data jyare submit par click karish tyare aa formData object ma jata rahe tevu karvanu 6e.page submit karya pa6i te display par rahvu joiye.
                e.preventDefault();
                const form5=document.getElementById('form4');
                
                // aa form ne formdata object ma pass karvanu 6e.
                const data=new FormData(form5);

                // have aa ma object ni rup ma key and value na form ma data aavi gaya hase. key je aapne name hase and value e value hase.
                //{answer1:   ,answer2:   ,answer3:   }
                // have aa form data par aapna ANS object ni value jode compare kari devanu.
                // let marks=0;
                console.log(data.entries())
                
                marks=0;
                for (let [key,value] of data.entries()){
                    
                    console.log(key,value)
                    // key e answer{num} aapse temthi aa number ne kathvano 6e.
                    console.log(key)
                    let n1=key.slice(6,key.length)
                    console.log(n1)
                    let parent1=document.getElementById(`question${n1-1}`);
                    // aa element ma correct 6e ke wrong evu nakhvanu 6e.
                    let element9=parent1.children[13]

                    if(value===ANS[key]){
                        element9.innerHTML='CORRECT';
                        marks+=1;
                    }
                    else{
                        element9.innerHTML='WRONG';
                    }
                    parent1.append(element9)
                    
                }
                console.log(marks)
                console.log(data)
                

                // marks vala ma marks edit karva padse.
                element7.innerHTML=`MARKS:${marks}`;
                const date1=new Date();
                // aapne ahiya date and time local no save karisu.
                const dateandtimestring=date1.toLocaleDateString()+" "+date1.toLocaleTimeString();
                updateMarksIfHigher(quiznum, marks,dateandtimestring )
                // aa marks jo vadhare hase to te change thai jase:
                // changemarksinlocal(marks);

                // aapne aa quiz farithi aapva mate aavyo 6e to teni date aapne change kari nakhiye:
                // changedatetime()


                // ahiya aapne correct answer par green color karvano 6e.
                const all_question1=document.getElementsByClassName('question');
                let k=1;
                console.log(all_question1)
                for (let question of all_question1){
                    // console.log(question)
                    let element=question;
                    for (let j of element.children){
                        // console.log(j)
                        if (j.innerHTML===ANS[`answer${k}`]){
                            j.style.backgroundColor='green';
                        }
                    }
                    k+=1;
                }
            

            
            const markbox=document.getElementById("marksBox")
            // markbox.innerHTML=`You scored ${marks} out of ${nos1}!<br><br><button id="restart">Restart Quiz</button>`
            // markbox.style.display = "block";

            // const markbox = document.getElementById("marksBox");
            markbox.innerHTML = `
            You scored ${marks} out of ${nos}!<br><br>
            <button id="restart">Restart Quiz</button>
            <button id="downloadPdf">Download PDF </button>
            <button id="cancel">Cancel</button>
            `;
            markbox.style.display = "block";

            //Now add event listener here
            document.getElementById('restart').addEventListener('click', () => {
            console.log('Restart clicked');
            markbox.style.display = "none";
            window.location.reload();
            });

            document.getElementById('cancel').addEventListener('click', () => {
            console.log('Cancel clicked');
            markbox.style.display = "none";
            // window.location.reload();
            });





        
                document.getElementById('downloadPdf').addEventListener('click', async (e) => {
                    e.preventDefault()
                    // const element66=document.getElementById('all_question')
                    //ahiya aapne question-block class nathi karan ke aa class e only jyare aapne answer91 id vala ma innerhtml add kariye tyare j banavelu 6e. have mare aane class aapvo j pade tena mate me ahiya index2.html ma all_question vala no class 'allquestion-block' kari nakhyu.
                    // const pdf1=await makepdfincludeimage('all_question','.allquestion-block');
                    // pdf1.save(`${maintopic2}_${subtopic1}_with_answer.pdf`);
                    const element91=document.getElementById('answer91');
                    element91.innerHTML=''
                    element91.innerHTML+=document.getElementById('form4').innerHTML
                    // const pdf1=await makepdfincludeimage('answer91','.allquestion-block');
                    console.log(element91);
                    const pdf1=await makepdfincludeimage('answer91','.question');
                    pdf1.save(`${maintopic2}_${subtopic1}_with_answer.pdf`);
                    element91.innerHTML='';

                    });

            },{once:true})
            
        })




function restartQuiz() {
    location.reload(); // Reloads the page
  }


//You want to render elements with class .question-block into the PDF.
// But you want to apply temporary styles to elements with class .question (likely inside .question-block or elsewhere).
//=======================
// async function makepdfincludeimage(elementid,blockid) {
//   return new Promise(async (resolve, reject) => {
//     const container = document.getElementById(elementid);
//     if (!container || container.innerHTML.trim() === "") {
//       alert("No content available to download!");
//       return;
//     }

//     const questionBlocks = document.querySelectorAll(blockid);
//     console.log(questionBlocks)
//     const questions = document.querySelectorAll('.question');

//     if (questionBlocks.length === 0) {
//       alert("No '.question-block' or '.answer-block' elements found!");
//       return;
//     }

//     // Backup and apply temporary styles to .question elements
//     const originalStyles = [];
//     questions.forEach(el => {
//       originalStyles.push({
//         element: el,
//         backgroundColor: el.style.backgroundColor,
//         color: el.style.color,
//         fontWeight: el.style.fontWeight
//       });
//       el.style.backgroundColor = 'white';
//       el.style.color = 'black';
//       el.style.fontWeight = 'bold';
//     });

//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();
//     const margin = 20;
//     const usableHeight = pageHeight - margin * 2;
//     let y = margin;

//     for (let i = 0; i < questionBlocks.length; i++) {
//       const el = questionBlocks[i];

//       // Ensure element is visible
//       const originalDisplay = el.style.display;
//       el.style.display = 'block';

//       await new Promise(r => setTimeout(r, 50)); // wait for style render

//       const canvas = await html2canvas(el, { scale: 3, useCORS: true });

//       if (!canvas || canvas.height === 0 || canvas.width === 0) {
//         console.warn(`Skipping question-block ${i + 1}, empty canvas.`);
//         continue;
//       }

//       const imgData = canvas.toDataURL('image/png');
//       const imgWidth = pageWidth - margin * 2;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       if (y + imgHeight > pageHeight - margin) {
//         pdf.addPage();
//         y = margin;
//       }

//       pdf.addImage(imgData, 'PNG', margin, y, imgWidth, imgHeight);
//       y += imgHeight + 10;

//       el.style.display = originalDisplay; // Restore
//     }

//     // Restore styles of .question elements
//     originalStyles.forEach(obj => {
//       obj.element.style.backgroundColor = obj.backgroundColor;
//       obj.element.style.color = obj.color;
//       obj.element.style.fontWeight = obj.fontWeight;
//     });

//     resolve(pdf);
//   });
// }
//==============
async function makepdfincludeimage(elementid, blockid) {
  return new Promise(async (resolve, reject) => {
    const container = document.getElementById(elementid);
    if (!container || container.innerHTML.trim() === "") {
      alert("No content available to download!");
      return;
    }

    // ✅ Search only inside the container
    const questionBlocks = container.querySelectorAll(blockid);
    const questions = container.querySelectorAll('.question');

    if (questionBlocks.length === 0) {
      alert("No matching elements found!");
      return;
    }

    // Backup styles
    const originalStyles = [];
    questions.forEach(el => {
      originalStyles.push({
        element: el,
        backgroundColor: el.style.backgroundColor,
        color: el.style.color,
        fontWeight: el.style.fontWeight
      });
      el.style.backgroundColor = 'white';
      el.style.color = 'black';
      el.style.fontWeight = 'bold';
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let y = margin;

    for (let i = 0; i < questionBlocks.length; i++) {
      const el = questionBlocks[i];
      const originalDisplay = el.style.display;
      el.style.display = 'block';

      await new Promise(r => setTimeout(r, 50)); // let styles apply

      const canvas = await html2canvas(el, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (y + imgHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }

      pdf.addImage(imgData, 'PNG', margin, y, imgWidth, imgHeight);
      y += imgHeight + 10;

      el.style.display = originalDisplay;
    }

    // Restore styles
    originalStyles.forEach(obj => {
      obj.element.style.backgroundColor = obj.backgroundColor;
      obj.element.style.color = obj.color;
      obj.element.style.fontWeight = obj.fontWeight;
    });

    resolve(pdf);
  });
}






async function makeARRstring(ARRAY1){
        return new Promise(async (resolve,reject)=>{
            try{
                // const result5 =await Object.entries(ansobject)
                // .map(([key, value]) => `<div style="padding-bottom: 10px">${key}: ${value}</div>`)
                // .join('');
                // const htmlString = await ARRAY1.map(q => {
                //             return `
                //                 <div class="question-block">
                //                 <pre><p><strong>Q:</strong> ${q.question}</p></pre>
                //                 <ol type="1">
                //                     <li>${q.option1}</li>
                //                     <li>${q.option2}</li>
                //                     <li>${q.option3}</li>
                //                     <li>${q.option4}</li>
                //                 </ol>
                //                 </div>
                //             `;
                //             }).join('');

                const htmlString = await ARRAY1.map((q, index) => {
                        return `
                            <div class="question-block">
                            <pre style="font-family: Arial, sans-serif;";><p><strong >Q${index + 1}: ${q.question}</strong></p></pre>
                            <ol type="1">
                                <li>${q.option1}</li>
                                <li>${q.option2}</li>
                                <li>${q.option3}</li>
                                <li>${q.option4}</li>
                            </ol>
                            </div>
                        `;
                        }).join('');

                resolve(htmlString)
            }
            catch(error){
                console.log("something wrong i can't make ANS to string")
                reject(error)
            }
        })
}



                


async function makeANSstring(ansobject){
        return new Promise(async (resolve,reject)=>{
            try{
                const result5 =await Object.entries(ansobject)
                .map(([key, value]) => `<div class="answer-block">
                            <pre style="font-family: Arial, sans-serif;";>${key}: ${value}<p><strong ></strong></p></pre></div>`)
                .join('');

                resolve(result5)
            }
            catch(error){
                console.log("something wrong i can't make ANS to string")
                reject(error)
            }
        })
}





document.getElementById('downloadpdfanswer').addEventListener('click',async (e)=>{
            const element91=document.getElementById('answer91');
            console.log(ANS)//[answer1: 'Michael Jordan', answer2: '1 point']
            console.log(typeof ANS)
            console.log(element91.innerHTML)

            // const innerhtml1=new String(`${element91.innerHTML}`)
            // element91.innerHTML=innerhtml1+`${ANS}`
            // console.log(element91.innerHTML)
            const result =await makeANSstring(ANS)
            console.log(result)

            element91.innerHTML+=`<div>${result}<div>`

            // const anspdf1=await makeANSpdf(result)

            // element91.innerHTML=result
            // console.log(element91.innerHTML)

            // const originalDisplay = element91.style.display;
            // if (originalDisplay == 'none') {
            //          element91.style.display = 'block';
            //         }

            

            const pdf1=await makepdfincludeimage('answer91','.answer-block');
            pdf1.save(`${maintopic2}_${subtopic1}_only_Answer.pdf`);
            element91.innerHTML=''
            // element91.style.display = originalDisplay;
})



//have aapne jo koi refresh button par click kare tyare aapne page ne reload karvano 6e.
document.getElementById('Refresh_Page').addEventListener('click', () => {
            console.log('Restart clicked');
            window.location.reload();
            });


document.getElementById('downloadpdfquestions').addEventListener('click',async (e)=>{
            const element91=document.getElementById('answer91');
            

            
            const htmlstring1 =await makeARRstring(arr)
            console.log(htmlstring1)

            element91.innerHTML+=`${htmlstring1}`

        
            const pdf1=await makepdfincludeimage('answer91','.question-block');
            pdf1.save(`${maintopic2}_${subtopic1}_only_questions.pdf`);
            element91.innerHTML=''
            
})





// aapne koi question par javu hoy to aapne tena  href ma id nakhi devani:
function makedivfornumberbox(n){
    const element67= document.getElementById('numbermainbox');
    // aapne pahla khali kari ne aapne tema aa div ne add karvanu 6e to pahla na number box na aave.
    element67.innerHTML='';
    for(let i=0;i<n;i++){
            element67.innerHTML+=`<div id="1" class="numberbox" ><a href="#question${i}" style="text-decoration: none;">${i+1}</a></div>`
    }
    // AAPNE AA NUMBER NE aa function ma add karvanu 6e.
    // const element52=document.getElementById('numquestion');
    // const nos1=Number(element52.value);
    // element67.innerHTML+=`<div><a></a></div>`
}



// clean question before again click on startquiz:
function cleanallquestion(){
    const allque=document.getElementById('all_question');
    allque.innerHTML='';
}




// aapne quiz ne store rakhva mate aapne ahiya aa savequestion name nu function banavyu 6e.
// function savequestion(maintopicx,subtopicx,languagex,datex,nosquestionx,allquestionx,levelx){
//     const allquiz1 = JSON.parse(localStorage.getItem('alloldquiz')) || [];

    
//     const newquiz = {maintopic:maintopicx,subtopic:subtopicx,language:languagex,date:datex,nosquestion:nosquestionx,allquestion:allquestionx,level:levelx};

//     allquiz1.push(newquiz)

//     localStorage.setItem('alloldquiz', JSON.stringify(allquiz1));
// }



// jo aa ma marks vadhare aavya to aapne te local databese ma  marks change lari levana:
function changemarksinlocal(newmarks1){
    // const allquiz2 = JSON.parse(localStorage.getItem('alloldquiz')) || [];

    const ourquiz=allquiz2[quiznum-1];
    if (newmarks1>ourquiz['marks']){
        allquiz2[quiznum-1]['marks']=newmarks1
        localStorage.setItem('alloldquiz', JSON.stringify(allquiz2));
    }

    
    
}


// aa quiz ni tarikh and time pan badhli nakhiye latest kari nakhiye:
function changedatetime(){
        const date1=new Date();
        // aapne ahiya date and time local no save karisu.
        const dateandtimestring=date1.toLocaleDateString()+" "+date1.toLocaleTimeString();
        allquiz2[quiznum-1]['date']=dateandtimestring;
        localStorage.setItem('alloldquiz', JSON.stringify(allquiz2));

}



//--------------------------------------------------------------


async function updateMarksIfHigher(id, newMarks, newDate) {
  const db = await openQuestionDB();
  const tx = db.transaction('quizData', 'readwrite');
  const store = tx.objectStore('quizData');

  const existingQuiz = await new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('❌ Failed to fetch quiz');
  });

  if (!existingQuiz) {
    console.warn(`❌ Quiz with ID ${id} not found`);
    return;
  }

  const currentMarks = Number(existingQuiz.marks || 0);

  if (newMarks > currentMarks) {
    existingQuiz.marks = newMarks;
    existingQuiz.date = newDate; // or Date.now() or formatted date

    const updateRequest = store.put(existingQuiz);

    updateRequest.onsuccess = () =>
      console.log(`✅ Updated marks to ${newMarks} and date to ${newDate} for quiz ID ${id}`);

    updateRequest.onerror = () =>
      console.error(`❌ Failed to update marks for quiz ID ${id}`);
  } else {
    console.log(`ℹ️ Not updating. New marks (${newMarks}) ≤ current marks (${currentMarks})`);
  }

  await tx.complete;
}



//----------------------------------------------
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




