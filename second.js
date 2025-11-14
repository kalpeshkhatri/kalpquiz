import { GoogleGenAI, Language } from "@google/genai";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


//get main topic from local storage session:
const maintopic1 = sessionStorage.getItem("maintopic");
console.log('i am from session',maintopic1);

const subtopic2 = sessionStorage.getItem("subtopic");
const subtopic1 = subtopic2.replace(/_/g, " ").toUpperCase()


console.log('i am from session',subtopic1);

// main topic ne pan aapne uppercase ma kari daiye:
const maintopic2= maintopic1.replace(/_/g, " ").toUpperCase()


const sub=document.getElementById('sub');
sub.innerText+=`${maintopic2}:${subtopic1}`



// const allmaintopicname={
//     Sports:['Athletes','MLB','NBA','NHL','NFL','Soccer','Hocky','Cricket','Sports team','WWE','NCAA','Football'],
//     Geography:['Country','Landmarks','City','State','Population','World','Capital','Continent','Flag'],
//     Music:['Pop Music','Taylor Shift','The Beatles','Song','Album','Lyrics','Bands','Singers'],
//     Movies:['Disney','Morvel Cinematics','Universe','Movies Resume','Movie Titles','Oscars','Actor'],
//     Television:['Tv Characters','Tv Show','Sitcom','Network','Fiends','Reality Show','Cast'],
//     Just_For_Fun:['Humor','Mini-crossword','Short-order','Word hunt','Word Search','Quick pick','Word Missing','Mixed Word','Minefield','Alphabet','Color','Logic'],
//     History:['Indian','Indian President','Us President','World Leader','Politics','Nation','Discovery','War','Year','Decade','Century','Biography','Art'],
//     Literature:['Harry Potter','Asong of Ice and Fire','The Hunger Games','Literacy','Shakespeare','Book','Author','Charater','Novel','Poem','Young Adult','Children Books','Lord of The Rings'],
//     Language:['Vocabulary','Definition','Spanish','French','German','Italian','Hindi','Gujarati','Latin','Chinese','Translation','Japanese'],
//     Science:['Computer','Plants','Astronomy','Chemistry','Elements','Medical','Math','Animal','Physics','General Science','Anatomy','Biology','Geography'],
//     Gaming:['Video Games','Board Games','Card Games','Pokemon','Mario','Nintendo','Minecraft','Console','Toys'],
//     Entertainment:['Pop Cultures','Celebrity','Indian Cinema','Bollywood','Hollywood','Musical','Broadway','Show','Quote','Comic Book','Anime','Superhero','DC Comics','Marvel','Cartoons','Animation'],
//     Religions:['Mythology','Religious Music','Wolrd Religious','Hinduism','Bible','Cristianity','Catholicism','Judaism','Church','Scipture','Islam','Verse'],
//     Holiday:['Diwali','Indian Republic Day','Indian Independence Day','Christmas Day','Eid al-Fitr','Mawlid','Ambedkar jayanti','Gandhi Jayanti','Holi','Halloween','Cristmas','Valentine day','Easter','ST Patricks Day','National Holiday','Religious Holiday'],
//     Physics:["Physical World","Units and Measurements","Motion in a Straight Line","Motion in a Plane","Laws of Motion","Work, Energy and Power","System of Particles and Rotational Motion","Gravitation","Mechanical Properties of Solids","Mechanical Properties of Fluids","Thermal Properties of Matter","Thermodynamics","Kinetic Theory","Oscillations","Waves","Electric Charges and Fields","Electrostatic Potential and Capacitance","Current Electricity","Moving Charges and Magnetism","Magnetism and Matter","Electromagnetic Induction","Alternating Current","Electromagnetic Waves","Ray Optics and Optical Instruments","Wave Optics","Dual Nature of Radiation and Matter","Atoms","Nuclei","Semiconductor Electronics: Materials, Devices and Simple Circuits","Communication Systems"],
//     Chemistry:["Some Basic Concepts of Chemistry","Structure of Atom","Classification of Elements and Periodicity in Properties","Chemical Bonding and Molecular Structure","States of Matter: Gases and Liquids","Thermodynamics","Equilibrium","Redox Reactions","The s-Block Element","Some p-Block Elements","Organic Chemistry – Some Basic Principles and Techniques","Hydrocarbons","Environmental Chemistry","The Solid State","Solutions","Electrochemistry","Chemical Kinetics","Surface Chemistry","The p-Block Element","The d- and f-Block Elements","Coordination Compounds","Haloalkanes and Haloarenes","Alcohols, Phenols and Ethers","Aldehydes, Ketones and Carboxylic Acids","Organic Compounds Containing Nitrogen","Biomolecules","Polymers","Chemistry in Everyday Life"],
//     Biology:["Diversity of Living Organisms","Structural Organisation in Animals and Plants","Cell Structure and Function","Plant Physiology","Human Physiology","Reproduction","Genetics and Evolution","Biology and Human Welfare","Biotechnology and Its Applications","Ecology and Environment"],
//     Mathematics:["Sets","Relations and Functions","Trigonometric Functions","Principle of Mathematical Induction","Complex Numbers and Quadratic Equations","Linear Inequalities","Permutations and Combinations","Binomial Theorem","Sequences and Series","Straight Lines","Conic Sections","Introduction to Three-dimensional Geometry","Limits and Derivatives","Mathematical Reasoning","Statistics","Probability","Relations and Functions","Inverse Trigonometric Functions","Matrices","Determinants","Continuity and Differentiability","Application of Derivatives","Integrals","Application of Integrals","Differential Equations","Vector Algebra","Three-dimensional Geometry","Linear Programming","Probability"],
//     Engineering:["Mechanical Engineering","Civil Engineering","Electrical Engineering","Computer Engineering","Electronics and Communication Engineering","Information Technology","Chemical Engineering","Aerospace Engineering","Automobile Engineering","Biomedical Engineering","Biotechnology Engineering","Environmental Engineering","Agricultural Engineering","Petroleum Engineering","Mining Engineering","Marine Engineering","Industrial Engineering","Instrumentation and Control Engineering","Textile Engineering","Metallurgical Engineering","Production Engineering","Robotics Engineering","Artificial Intelligence and Machine Learning","Data Science Engineering","Mechatronics Engineering","Software Engineering","Structural Engineering","Geotechnical Engineering","Nanotechnology Engineering","Genetic Engineering","Food Technology Engineering"],
//     Programming_Language:[ "Python","JavaScript","Java","C","C++","C#","TypeScript","Go","Rust","Ruby","PHP","Swift","Kotlin","Dart","R","Scala","Perl","Objective-C","Haskell","Lua","Shell","SQL","MATLAB","Assembly","Visual Basic","Elixir","F#","Groovy","Erlang","Fortran","COBOL","Prolog","Scheme","Julia","VHDL","Verilog"],
//     Computer_Engineering:["Computer Fundamentals","Operating Systems","Computer Hardware","Computer Software","Programming Languages","Data Structures","Algorithms","Database Management Systems","Computer Networks","Internet and Web Technologies","Cyber Security","Cloud Computing","Artificial Intelligence","Machine Learning","Deep Learning","Data Science","Big Data","Blockchain","Computer Architecture","Compiler Design","Web Development","Mobile App Development","Game Development","IoT (Internet of Things)","Augmented Reality (AR)","Virtual Reality (VR)","Human-Computer Interaction","Software Engineering","System Design","Version Control (Git/GitHub)","Ethical Hacking","Information Security","DevOps","Networking Protocols","Digital Logic Design","Operating System Scheduling","Artificial Neural Networks","Natural Language Processing (NLP)","Computer Graphics","Simulation and Modeling"],
//     Data_Structure_Algo:["Arrays","Strings","Linked List","Stacks","Queues","Deque (Double-Ended Queue)","Trees","Binary Trees","Binary Search Trees (BST)","Heaps","Hashing","Graphs","Tries","Segment Tree","Fenwick Tree (Binary Indexed Tree)","Disjoint Set (Union-Find)","Priority Queue","Circular Linked List","Doubly Linked List","Sorting Algorithms","Searching Algorithms","Recursion","Backtracking","Divide and Conquer","Dynamic Programming","Greedy Algorithms","Bit Manipulation","Sliding Window","Two Pointers","Binary Search","Depth First Search (DFS)","Breadth First Search (BFS)","Topological Sort","Dijkstra's Algorithm","Bellman-Ford Algorithm","Floyd-Warshall Algorithm","Kruskal's Algorithm","Prim's Algorithm","KMP Algorithm (Pattern Matching)","Rabin-Karp Algorithm","Trie Algorithms","Minimum Spanning Tree","Graph Coloring","Strongly Connected Components (Kosaraju/Tarjan)","Longest Common Subsequence (LCS)","Knapsack Problem","Subset Sum Problem"],
//     Civil_Engineering:[ "Engineering Mechanics", "Strength of Materials","Structural Analysis","Concrete Technology","Building Materials","Construction Technology","Building Planning and Drawing","Design of Reinforced Concrete Structures","Design of Steel Structures","Geotechnical Engineering","Soil Mechanics","Foundation Engineering","Fluid Mechanics","Hydraulics and Hydraulic Machines","Hydrology","Irrigation Engineering","Transportation Engineering","Highway Engineering","Railway Engineering","Airport Engineering","Tunnel Engineering","Environmental Engineering","Water Supply Engineering","Waste Water Engineering","Surveying","Advanced Surveying","Quantity Surveying and Valuation","Construction Management","Project Planning and Control","Estimation and Costing","Remote Sensing and GIS","Disaster Management","Finite Element Method","Prestressed Concrete","Earthquake Engineering","Bridge Engineering","Harbour and Dock Engineering"],
//     Novel:["Pride and Prejudice","To Kill a Mockingbird","1984","The Great Gatsby","Moby-Dick","War and Peace","The Catcher in the Rye","Jane Eyre","Crime and Punishment","Wuthering Heights","Brave New World","The Lord of the Rings","Anna Karenina","The Alchemist","The Kite Runner","The Book Thief","The Hobbit","Les Misérables", "The Picture of Dorian Gray","One Hundred Years of Solitude","The Brothers Karamazov","Life of Pi","The Da Vinci Code","Gone with the Wind","A Tale of Two Cities","Frankenstein","Dracula","The Fault in Our Stars","Little Women","The Chronicles of Narnia"],
//     Famous_Books:["The Diary of a Young Girl","Sapiens: A Brief History of Humankind","Wings of Fire","Think and Grow Rich","Rich Dad Poor Dad","Atomic Habits","The Power of Now","The 7 Habits of Highly Effective People","How to Win Friends and Influence People","The Subtle Art of Not Giving a F*ck","Man's Search for Meaning","Ikigai: The Japanese Secret to a Long and Happy Life","The Psychology of Money","Start with Why","Deep Work","Becoming","The Monk Who Sold His Ferrari","You Can Win","The Secret","Zero to One","Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future","Steve Jobs","The Art of War","Meditations","A Brief History of Time","The Intelligent Investor","The Lean Startup",`Can’t Hurt Me","Make Your Bed`,"Who Moved My Cheese?"],
//     Mythological_Book:["Mahabharat", "Ramayan", "Bhagavad Gita", "Vedas", "Upanishads", "Puranas", "Shiv Purana", "Vishnu Purana", "Skanda Purana", "Brahma Purana", "Manusmriti", "Arthashastra", "Yoga Vasistha", "Mahavira's Agamas", "Jataka Tales", "Tripitaka", "Guru Granth Sahib", "Quran", "Bible", "Torah", "Iliad", "Odyssey", "Divine Comedy", "Beowulf", "Epic of Gilgamesh", "Shahnameh"],
//     Indian_States:["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"],
//     Cars:["Maruti Suzuki Swift", "Hyundai Creta", "Tata Nexon", "Kia Seltos", "Honda City", "Toyota Fortuner", "Mahindra Thar", "MG Hector", "Renault Kwid", "Skoda Slavia", "Volkswagen Virtus", "Ford Mustang", "Jeep Compass", "BMW X5", "Audi Q7", "Mercedes-Benz GLC", "Tesla Model 3", "Porsche 911", "Jaguar XF", "Lamborghini Huracan", "Rolls-Royce Phantom", "Nissan Magnite", "Mahindra XUV700", "Hyundai Verna", "Tata Punch", "Toyota Innova Crysta", "Maruti Brezza", "Citroën C3", "Volvo XC60", "Mini Cooper"],
//     World_Culture:["Indian", "Chinese", "Japanese", "American", "British", "French", "German", "Italian", "Spanish", "Mexican", "Brazilian", "Russian", "Greek", "Turkish", "Persian", "Arab", "African", "Egyptian", "Thai", "Vietnamese", "Korean", "Mongolian", "Indonesian", "Australian Aboriginal", "Maori", "Inuit", "Native American", "Caribbean", "Tibetan", "Jewish"],
//     IndianCultures:["Gujarati", "Punjabi", "Marathi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayali", "Rajasthani", "Kashmiri", "Assamese", "Bodo", "Odia", "Manipuri", "Naga", "Mizo", "Sikkimese", "Tripuri", "Santhali", "Gondi", "Bhili", "Sindhi", "Pahari", "Ladakhi", "Andamanese", "Nicobarese"],
//     Tribes:["Maasai", "Zulu", "San (Bushmen)", "Berbers", "Bedouins", "Tuareg", "Inuit", "Cherokee", "Navajo", "Apache", "Sioux", "Aymara", "Quechua", "Guarani", "Yanomami", "Kayapo", "Ashaninka", "Maya", "Mapuche", "Ainu", "Sami", "Aboriginal Australians", "Maori", "Tibetans", "Mongols", "Kazakh Nomads", "Chukchi", "Hmong", "Papuan", "Toraja"],
//     Countries:["India", "United States", "China", "Russia", "Brazil", "United Kingdom", "Germany", "France", "Japan", "Canada", "Australia", "Italy", "Mexico", "South Korea", "Indonesia", "Saudi Arabia", "South Africa", "Argentina", "Turkey", "Spain", "Nigeria", "Egypt", "Thailand", "Vietnam", "Pakistan", "Bangladesh", "Iran", "Iraq", "Afghanistan", "Ukraine", "Poland", "Netherlands", "Belgium", "Sweden", "Norway", "Denmark", "Finland", "Switzerland", "Austria", "Greece", "Portugal", "Israel", "New Zealand", "Singapore", "Malaysia", "Philippines", "Colombia", "Chile", "Peru", "Cuba", "Kenya"]




// }




// function makeoption(value1){
//     const element64=document.createElement('option');
//     element64.value=value1;
//     element64.innerHTML=value1
//     return element64
// }

// const element54=document.getElementById('topic');

// allmaintopicname[maintopic1].forEach((i)=>{
//             // const element65=makeoption(i);
//             let element55=makeoption(i)
//             element54.append(element55)
        
//                  })




let arr;

let History=[]


let ANS={}




// function createquestion(topic,number){
//     const questions=[{question:"",
//     option1:"",
//     option2:"",
//     option3:"",
//     option4:"",
//     }]
//     return questions
// }

// const createquestiondeclaration={
// //      name:'createquestion',
   
// //     description:'by using this function return questions array inside that array its include object. in this object keys is question,option1,option2,option3,option4,answer. you have to make question related to that topic.',
    
// //     parameters:{
// //         type:'OBJECT',

// //         properties:{
// //             topic:{
// //                 type:'STRING',
// //                 description:'you have to make question related to this topic. for example:plane crash'
// //             },
// //             number:{
// //                 type:'NUMBER',
// //                 description:'how many number of question you have to make is this number for example 10'
// //             }
            
// //         },
       
// //         required:['topic','number']
// //     }

// }

const ai = new GoogleGenAI({apiKey:"AIzaSyD5pT3K8AY4GO_EVn5lwSktps1vHIwIBNw"});






// const element51=document.getElementById('topic');
// const topic1=element51.value;
// console.log(topic1)

// const element52=document.getElementById('numquestion');
// const nos1=element52.value;

// aa variable jyare aaple start Quiz par click kariye tyare j aapne ai ne aapvana 6e tena sivay nahi aapvana.

async function createquestionbyai(number,Language,Level){
    return new Promise(async (resolve,reject)=>{

        // jo previous question na aave tevu right karyu hoy to previous na aa sub topic na question kathava pade tena mate funtion banavelu j 6e.
        // const allpreviousquestion=previousquestion(subtopic1);
        const allpreviousquestion=await getQuestionTextsBySubtopic(subtopic1);
        console.log(allpreviousquestion);

        const repeat=document.getElementById('repeat').value;

        if (repeat=='Yes'){
                History.push({
                role:'user',
                parts:[{text:`create ${number} Question related to this main topic  is ${maintopic1} and its sub topic is  ${subtopic1}.Question level should be ${Level}.Give me in ${Language}.`}]
            })
        }
        else{
            History.push({
                role:'user',
                parts:[{text:`create ${number} Question related to this main topic  is ${maintopic1} and its sub topic is  ${subtopic1}.Question level should be ${Level}.Give me in ${Language}.Dont repeat these questions:${allpreviousquestion}.`}]
            })
        }

       const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:History,
        config:{
         systemInstruction: `
        if someone asks question that create questions related to any that topic then  you have to give then in array where element is object like {question:'',option1:'',option2:'',option3:'',option4:'',answer:''}. 
         for example someone want 1 question related to plane crash.your output should be: [{question:"Which part of the airplane is responsible for propulsion?",
         option1:"Fuselage",
        option2:"Cockpit",
        option3:"Engine",
        option4:"Rudder",
        answer:"Engine"
        }]

        don't do mistake give the full question.

        In mathematical question if question include something like this (a+b)^n then convert it to (a + b)ⁿ.
        In mathematical question if question include something like this  **a** = 2**i** + 3**j** then convert it to  a = 2i + 3j.


        sticktly don't ask me any question. if i give you topic and number you have to give question array in the form of json.
        `,
        // tools:[{
        //     functionDeclarations:[createquestiondeclaration]
        // }]
    }
       })

       resolve(response.text)

       reject(`this is some erro`)

})

}

//////////////////////////////////////////////
async function startQuiz(number, Language, Level, maintopic1, subtopic1,previousquestion2) {
  const token = localStorage.getItem('kalpquiz_token');

  const repeat=document.getElementById('repeat').value;
  let res;

  if(repeat=='Yes'){
  previousquestion2;
  res = await fetch('https://kalpquiz-backend.onrender.com/quiz/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ number, Language, Level, maintopic1, subtopic1,previousquestion2 })
  });
}

  else{
    previousquestion2=await getQuestionTextsBySubtopic(subtopic1);
    res = await fetch('https://kalpquiz-backend.onrender.com/quiz/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ number, Language, Level, maintopic1, subtopic1,previousquestion2 })
  });
  }

  const data = await res.json();

  if (data.redirectTo) {
    window.location.href = data.redirectTo;
    return;
  }

  return data
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
element53.addEventListener('click',async (event)=>{
        // aa function start thay tyare aapne aa loader ne dekhadisu.
        document.getElementById('loader').style.display = 'flex';

        History=[];
        ANS=[]
        marks=0
        element7.innerHTML=`MARKS:${marks}`;

        let allque=document.getElementById('all_question');
        allque.innerHTML='';

        
        event.preventDefault()
        // const element51=document.getElementById('topic');
        // const topic1=element51.value;
        // console.log(topic1);


        const Language=document.getElementById('Language').value
        const Level=document.getElementById('Level').value

        const element52=document.getElementById('numquestion');
        const nos1=Number(element52.value);
        console.log(nos1)

        //lets make numberbox inside mainnumberbox by function:
        makedivfornumberbox(nos1)

        
        const balance=localStorage.getItem('Kalpquiz_credit');
        console.log('balance:',balance)

    // event.preventDefault()
        if(!nos1|| nos1>51 || nos1<0 ){
            document.getElementById('loader').style.display = 'none';
            alert(`Please Enter Number Between 1 to 50. Number should be less than ${balance},because your Remaining Quiz credit is ${balance}.`)
            
            return
        }
        

        
        if(!Language){
            alert('Please Select any Language.')
            return
        }
        if(!Level){
            alert('Please Select Level')
            return
        }



        if (Language && Level && balance>0 && nos1>0 && nos1<=50 && nos1<=balance)
          {

        const  previousquestion2=await getQuestionTextsBySubtopic(subtopic1);
        const token6 = localStorage.getItem('kalpquiz_token');
        
        // const arr1=await createquestionbyai(nos1,Language,Level)
        // const arr1=await startQuiz(nos1, Language, Level, maintopic1, subtopic1,previousquestion2)
        const repeat=document.getElementById('repeat').value;
        let res;
        console.log(Language, Level, maintopic1, subtopic1,nos1);
        if(repeat=='Yes'){
            res = await fetch('https://kalpquiz-backend.onrender.com/quiz/create', {
          method: 'POST',
          headers: {
         'Content-Type': 'application/json',
          Authorization: `Bearer ${token6}`
          },
         body: JSON.stringify({ Language, Level, maintopic1, subtopic1 ,nos1})
        });
        }
        else{
            res = await fetch('https://kalpquiz-backend.onrender.com/quiz/createfornotreapeat', {
          method: 'POST',
          headers: {
         'Content-Type': 'application/json',
          Authorization: `Bearer ${token6}`
          },
         body: JSON.stringify({ Language, Level, maintopic1, subtopic1 ,previousquestion2,nos1})
        });
        }

        const data=await res.json()
        if (data.redirectTo) {
            // window.location.href = data.redirectTo;
            window.location.href = './payment.html';

            return;
          }
        console.log(data);

        const arr1=data.questions;
        console.log(arr1)

        // update credit in localstorage:
        localStorage.setItem('Kalpquiz_credit',data.creditQuiz);
        // // const arr2=JSON.parse(arr1)
        // // const arr2=[...arr1]
        // // const arr2=arr1.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "")
        // console.log(typeof arr1)
        // // const arr2=`${arr1}`
        const arr2= new String(arr1)

        let cleaned = arr2.replace(/^(```|''')[a-zA-Z]*\n?/, '').replace(/(```|''')$/, '');       

        // console.log('hello')
        let finalquestionArray1= JSON.parse(cleaned);
        arr=finalquestionArray1
        console.log(finalquestionArray1)
        //----------------------
        // console.log(data);
        // arr=await JSON.parse(data.questions);
        // console.log(arr);
        //----------------
        // arr=data;
        // console.log(arr);
        ////-----------------------

        

        //loader aa array ma convert thai jay pa6i aapne aa loader ne gayab kari deso:
        document.getElementById('loader').style.display = 'none';
        
        


        // console.log(typeof finalquestionArray1);//its array now Object.
        // // finalquestionArray1.push({name:'kalpesh'})// array j 6e ne e check thay gayu.

        // console.log(finalquestionArray1) //////

        // aa finalquestionArray ma answer ne nikaliye.and ANS ma push kariye.
        
        async function putanswertoANS(){
        let p=1;
        arr.forEach((obj1)=>{
            ANS[`answer${p}`]=obj1['answer']
            p++
        })
      }

      await putanswertoANS()






        // arr= await finalquestionArray1;


        // console.log(arr2)
        // if (typeof arr2 === "string" && arr2.trim() !== "") {
        //     try {
        //     const data = JSON.parse(arr2);
        //     console.log(data);
        //     } 
        //     catch (e) {
        //          console.error("Invalid JSON:", e.message);
        //          }
        //     }

        // else {
        //     console.error("Input is not a valid JSON string:", arr2);
        //     }        

        
        //aa niche ni process start thay tena pahla aapne ahiya all question ne clean kari daisu:
        cleanallquestion()

        //------------------------
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

        



            // have aapne formData object no use karisu.
            // aa all question id par event listener lagavyu.
            // const element4=document.getElementById('all_question')
            // let marks=0


            // aapne aa submit button ne disabled kari nakhyu hatu to tene aa startquiz par click karvathi farithi te chalu thai jay tena mate disabled=false karvu pade.
            document.getElementById('btnfinal').disabled=false;



            let submitted = false;//variable laiye jo ek var submit karya pa6i farithi submit karse to te nahi kari sake.

            formfinal.addEventListener('submit',async (e)=>{
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

                if(allque.innerHTML.trim() === ""){
                    alert('Before submitting atleast start Quiz.')
                    console.log('atleast start quiz')
                    return
                }
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
                // aapan ne aa question no array mali gaya pa6i tene aapne localstorage ma mokli daiye jethi te aapne aa quiz puri thaya pa6i pan access kri sakiye.
                const date1=new Date();
                // aapne ahiya date and time local no save karisu.
                const dateandtimestring=date1.toLocaleDateString()+" "+date1.toLocaleTimeString();
                // savequestion(maintopic2,subtopic1,Language,dateandtimestring,nos1,finalquestionArray1,Level,marks);
                await savequestion(maintopic2,subtopic1,Language,dateandtimestring,nos1,finalquestionArray1,Level,marks);

                // marks vala ma marks edit karva padse.
                element7.innerHTML=`MARKS:${marks}`;

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
            You scored ${marks} out of ${20}!<br><br>
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





            //now download button par javascript lagaviye
            
                    // document.getElementById('downloadPdf').addEventListener('click', async () => {
                    // const element = document.getElementById("all_question");
                    // const canvas = await html2canvas(element);
                    // const imgData = canvas.toDataURL('image/png');

                    // const pdf = new jsPDF();
                    // pdf.addImage(imgData, 'PNG', 10, 10);
                    // pdf.save('All Question.pdf');
                    // });
                document.getElementById('downloadPdf').addEventListener('click', async (e) => {
                    e.preventDefault()
                    // const element66=document.getElementById('all_question')
                    //ahiya aapne question-block class nathi karan ke aa class e only jyare aapne answer91 id vala ma innerhtml add kariye tyare j banavelu 6e. have mare aane class aapvo j pade tena mate me ahiya index2.html ma all_question vala no class 'allquestion-block' kari nakhyu.
                    const element91=document.getElementById('answer91');
                    element91.innerHTML=''
                    element91.innerHTML+=document.getElementById('form4').innerHTML
                    // const pdf1=await makepdfincludeimage('answer91','.allquestion-block');
                    console.log(element91);
                    const pdf1=await makepdfincludeimage('answer91','.question');
                    pdf1.save(`${maintopic1}_${subtopic1}_with_answer.pdf`);
                    element91.innerHTML='';

                    });



            // if(document.getElementById('restart')){
            // const restart1=document.getElementById('restart')
            // restart1.addEventListener('DOMContentLoaded',()=>{
            //  console.log('quiz restart thase.')
            //     window.location.reload()
            // // window.location.href = "index1.html";

            // // restartQuiz()
            //         })
            //     }
            
            


            },{once:true})
            // aa submit button ek j vaar thai sake tena mate aapne ahiya "{ once: true }" karyu 6e.aa karvathi ek j vaar click thai sake.

        }

        else{
            document.getElementById('loader').style.display = 'none';
            if(nos1>balance){
            alert(`Your remaiming Quiz credits is ${balance}.Enter number below or equal to ${balance}.`);
            }
            else{
            alert(`Your Quiz balance is ${balance}.`)
            }
            window.location.href = './payment.html';

          
            
        }
        //=====================
        // formfinal.removeEventListener('click')

})












function restartQuiz() {
    location.reload(); // Reloads the page
  }


// if(document.getElementById('restart')){
// const restart1=document.getElementById('restart')
// restart1.addEventListener('DOMContentLoaded',()=>{
//     console.log('quiz restart thase.')
//     window.location.reload()
//     // window.location.href = "index1.html";

//     restartQuiz()
// })
// }





// document.addEventListener('DOMContentLoaded', () => {
//   document.getElementById('restart')?.addEventListener('click', () => {
//             const markbox=document.getElementById("marksBox")
//             markbox.style.display = "none";


//     console.log('Restart clicked');
//     window.location.reload();
//   });
// });



// document.getElementById('downloadpdf1').addEventListener('click', async () => {
//             const element = document.getElementById("all_question");
//             const canvas = await html2canvas(element);
//             const imgData = canvas.toDataURL('image/png');

//             const pdf = new jsPDF();
//             pdf.addImage(imgData, 'PNG', 0, 0);
//             pdf.save('All Question.pdf');
//             });


//--------------------------------
// async function makepdfincludeimage(elementid){
//     return new Promise(async (resolve,reject)=>{
//     const element = document.getElementById(elementid);
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL('image/png');

//     const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size in mm

//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = pageWidth - 20; // Leave 10mm margin on both sides
//     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Keep aspect ratio

//     pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
//     // pdf.save(`${maintopic1}${subtopic1}.pdf`);
//     resolve(pdf)
//     reject(console.log('please select topic first and make pdf'))
    
//     })

    
// }

// async function makepdfincludeimage(elementid){
//     return new Promise(async (resolve,reject)=>{

//     const element = document.getElementById(elementid);
//         if (element.innerHTML.trim() === "") {
//         alert("No content available to download!");
//         return; // Stop the function here
//     }

    
//     const canvas = await html2canvas(element, { scale: 2 }); // Higher scale for better quality
//     const imgData = canvas.toDataURL('image/png');

//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = pageWidth;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let position = 0;

//     // If content height is more than one page, loop to add pages
//     while (position < imgHeight) {
//         pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
//         position += pageHeight;

//         if (position < imgHeight) {
//             pdf.addPage();
//         }
//     }

//     resolve(pdf)
        
    



    
//     reject(
//         console.log('please select topic first and make pdf')
//         // alert('Fisrt start Quiz...then Download.')
//     )
    
//     })

    
// }
// async function makepdfincludeimage(elementid) {
//   return new Promise(async (resolve, reject) => {
//     const element = document.getElementById(elementid);

//     if (!element || element.innerHTML.trim() === "") {
//       alert("No content available to download!");
//       reject("Empty content");
//       return;
//     }

//     try {
//       // Increase scale for higher quality image
//       const canvas = await html2canvas(element, { scale: 5 });
//       const imgData = canvas.toDataURL('image/png');

//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();

//       const imgWidth = pageWidth;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       let position = 0;

//       while (position < imgHeight) {
//         pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
//         position += pageHeight;

//         if (position < imgHeight) {
//           pdf.addPage();
//         }
//       }

//       resolve(pdf);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       reject(error);
//     }
//   });
// }

// async function makepdfincludeimage(elementid) {
//   return new Promise(async (resolve, reject) => {
//     const element = document.getElementById(elementid);

//     if (element.innerHTML.trim() === "") {
//       alert("No content available to download!");
//       return;
//     }

//     // 1. Store original styles
//     const questions = document.querySelectorAll('.question');
//     const originalStyles = [];
//     questions.forEach(el => {
//       originalStyles.push({
//         el,
//         backgroundColor: el.style.backgroundColor,
//         color: el.style.color
//       });
//       el.style.backgroundColor = 'white';
//       el.style.color = 'black';
//     });

//     // 2. Generate canvas and PDF
//     const canvas = await html2canvas(element, { scale: 6 });
//     const imgData = canvas.toDataURL('image/png');

//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();

//     const imgWidth = pageWidth;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let position = 0;

//     while (position < imgHeight) {
//       pdf.addImage(imgData, 'PNG', 0, -position, imgWidth, imgHeight);
//       position += pageHeight;

//       if (position < imgHeight) {
//         pdf.addPage();
//       }
//     }

//     // 3. Restore original styles
//     originalStyles.forEach(({ el, backgroundColor, color }) => {
//       el.style.backgroundColor = backgroundColor;
//       el.style.color = color;
//     });

//     resolve(pdf);
//   });
// }

// async function makepdfincludeimage(elementid) {
//     return new Promise(async (resolve, reject) => {
//         const element = document.getElementById(elementid);
//         if (!element || element.innerHTML.trim() === "") {
//             alert("No content available to download!");
//             return;
//         }

//         // Save and apply temporary styles to .question elements
//         const originalStyles = [];
//         const questions = document.querySelectorAll('.question');
//         questions.forEach(el => {
//             originalStyles.push({
//                 element: el,
//                 backgroundColor: el.style.backgroundColor,
//                 color: el.style.color
//             });
//             el.style.backgroundColor = 'white';
//             el.style.color = 'black';
//             el.style.fontWeight='800';

//         });

//         // Wait for styles to apply, then render
//         await new Promise(r => setTimeout(r, 100));

//         const canvas = await html2canvas(element, { scale: 3,useCORS: true });
//         const imgData = canvas.toDataURL('image/png');

//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pageWidth = pdf.internal.pageSize.getWidth();
//         const pageHeight = pdf.internal.pageSize.getHeight();

//         const margin = 20;
//         const imgWidth = pageWidth - margin * 2;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;

//         let position = 0;

//         while (position < imgHeight) {
//             pdf.addImage(imgData, 'PNG', margin, -position + margin, imgWidth, imgHeight);
//             position += pageHeight - margin * 2;

//             if (position < imgHeight) {
//                 pdf.addPage();
//             }
//         }

//         // Restore original styles
//         originalStyles.forEach(obj => {
//             obj.element.style.backgroundColor = obj.backgroundColor;
//             obj.element.style.color = obj.color;
//         });

//         resolve(pdf);
//     });
// }


//You want to render elements with class .question-block into the PDF.
// But you want to apply temporary styles to elements with class .question (likely inside .question-block or elsewhere).
//--------------
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
//     console.log(questions)

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

//-----------------------
async function makepdfincludeimage(elementid, blockid) {
  return new Promise(async (resolve, reject) => {
    const container = document.getElementById(elementid);
    if (!container || container.innerHTML.trim() === "") {
      alert("No content available to download!");
      return;
    }

    //Search only inside the container
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












// document.getElementById('downloadpdfquestions').addEventListener('click', async () => {
//     // const element66=document.getElementById('all_question')
//     // const element = document.getElementById('all_question');
//     //     if (element.innerHTML.trim() === "") {
//     //     alert("No content available to download!");
//     //     return; // Stop the function here
//     //     }

//         // else{
//             // aapne dekhiye tyare page ma font white dekhay tene mate aapne aa property change karvi padse to canvas ma barabar dekhase.
//             // const questions = document.querySelectorAll('.question');
//             // questions.forEach(element => {
//             // element.style.backgroundColor = 'white';
//             // element.style.color = 'black';
//             // });


//             const pdf1=await makepdfincludeimage('answer91');
//              pdf1.save(`${maintopic1}_${subtopic1}_only_Questions.pdf`);

//             // questions.forEach(element => {
//             // element.style.backgroundColor = 'white';
//             // element.style.color = 'black';
//             // });
//         // }

    

// });



//jo user only answer ne j download karva mangto hoy to aapne tene answer ni j pdf aapso:
//jo user aa download answer pdf par click kare to aapne ek div banavyu 6e teno content mali jase.





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


// async function makeANSpdf(string1){
//     return new Promise(async (resolve,reject)=>{
//             try{
//                 const pdf = new jsPDF();
//                 const margin = 10;
//                 const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;

//                 // Split text into lines that fit the page width
//                 const lines = pdf.splitTextToSize(string1, pageWidth);

//             // Add lines to PDF
//                 pdf.text(lines, margin, 20);


//                 resolve(pdf)
//             }
//             catch(error){
//                 console.log("something wrong i can't make ANS's pdf")
//                 reject(error)
//             }
//         })
// }

//jo user only answer ne j download karva mangto hoy to aapne tene answer ni j pdf aapso:
//jo user aa download answer pdf par click kare to aapne ek div banavyu 6e teno content mali jase.


                


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
            pdf1.save(`${maintopic1}_${subtopic1}_only_Answer.pdf`);
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
            pdf1.save(`${maintopic1}_${subtopic1}_only_questions.pdf`);
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





//-----------------------------------------------------------------------
// aapne quiz ne store rakhva mate aapne ahiya aa savequestion name nu function banavyu 6e.
// function savequestion(maintopicx,subtopicx,languagex,datex,nosquestionx,allquestionx,levelx,marksx){
//     const allquiz1 = JSON.parse(localStorage.getItem('alloldquiz')) || [];

    
//     const newquiz = {maintopic:maintopicx,subtopic:subtopicx,language:languagex,date:datex,nosquestion:nosquestionx,allquestion:allquestionx,level:levelx,marks:marksx};

//     // allquiz1.push(newquiz)
//     allquiz1.unshift(newquiz)

//     localStorage.setItem('alloldquiz', JSON.stringify(allquiz1));
// }
//-----------------
// have aapne aa upar valu local storage ma kariye tena badle aapne indexdb ma kariye.


//-----------------------------------------------------------------------
async function savequestion(maintopicx,subtopicx,languagex,datex,nosquestionx,allquestionx,levelx,marksx){
        const newquiz = {maintopic:maintopicx,subtopic:subtopicx,language:languagex,date:datex,nosquestion:nosquestionx,allquestion:allquestionx,level:levelx,marks:marksx};

        await addQuizToKapDB(newquiz)


}



//---------------------------------------------------
// aapne aa subtopic na related je pan question previous ma aavi gaya hoy tene nikalva mate :
// function previousquestion(subtopicname){
//     const previousquestion=[]
//     const allquiz2 = JSON.parse(localStorage.getItem('alloldquiz')) || [];
//     //aa allquiz aavi hase:==>[{..,subtopic:  ,allquestion:  ,...},{},{}]
//     allquiz2.forEach((quizobj)=>{
//         if (quizobj["subtopic"]==subtopicname){
//             const allquestionarray=quizobj["allquestion"];
//             allquestionarray.forEach((questionobj)=>{
//                 const question=questionobj['question'];
//                 previousquestion.push(question)
//             })
//         }

//     })

//     return previousquestion
// }

async function getQuestionTextsBySubtopic(subtopicName) {
  const db = await openQuestionDB(); // KapQuizDB with quizData store
  const tx = db.transaction('quizData', 'readonly');
  const store = tx.objectStore('quizData');

  const questionTexts = [];

  return new Promise((resolve, reject) => {
    const request = store.openCursor();

    request.onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        const quiz = cursor.value;

        if (quiz.subtopic === subtopicName && Array.isArray(quiz.allquestion)) {
          const questionsOnly = quiz.allquestion.map(q => q.question);
          questionTexts.push(...questionsOnly);
        }

        cursor.continue();
      } else {
        resolve(questionTexts); // Done reading
      }
    };

    request.onerror = () => reject('❌ Failed to read questions');
  });
}




///////////////////////////old quiz data ne aapne aa indexdb ma store kariye 6iye///////////////////////////////////////////////////
// function openQuizDB() {
//   return new Promise((resolve, reject) => {
//     const request = indexedDB.open('KalpQuizDB', 1);

//     request.onupgradeneeded = function (event) {
//       const db = event.target.result;
//       if (!db.objectStoreNames.contains('quizData')) {
//         db.createObjectStore('quizData', {
//           keyPath: 'id',
//           autoIncrement: true
//         });
//       }
//     };

//     request.onsuccess = event => resolve(event.target.result);
//     request.onerror = () => reject('❌ Failed to open DB');
//   });
// }
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
// async function addQuiz(quizObject) {
//   const db = await openQuizDB();
  
//   const tx = db.transaction('quizData', 'readwrite');
//   const store = tx.objectStore('quizData');

//   const quizWithTimestamp = {
//     ...quizObject,
//     createdAt: Date.now()
//   };

//   const request = store.add(quizWithTimestamp);
//   request.onsuccess = () => console.log('✅ Quiz added');
//   request.onerror = () => console.error('❌ Failed to add quiz');

//   await tx.complete;
// }
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



//--------------------------------------------------
const token5 = localStorage.getItem('kalpquiz_token');
const expiry = localStorage.getItem('kalpquiz_token_expiry');

if (!token5 || !expiry || Date.now() > parseInt(expiry)) {
  // Session expired or no token
  localStorage.removeItem('kalpquiz_token');
  localStorage.removeItem('kalpquiz_token_expiry');
  // localStorage.removeItem('current_kalpquiz_user');
  alert('Session expired. Please log in again.');
  window.location.href = './index.html';
}






