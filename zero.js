

//  const loggedInUser = JSON.parse(localStorage.getItem('kalpquiz_token'));
//   if (!loggedInUser) {
//     window.location.href = "./index.html";
//   }


//------------------
// only admin ne j admin panel dekhay tena mate aapne te token ne decode karisu.
function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));

  return JSON.parse(jsonPayload);
}

const token3 = localStorage.getItem('kalpquiz_token');
if (token3) {
  const decoded = parseJwt(token3);
  if (decoded.isAdmin) {
    document.getElementById('adminPanel').style.display = 'block';
  }
}


//-----------------jo admin hase to tene aa admin panel dekhase jo nahi hoy to tene nahi dekhay. jo dekhay to tene aa admin par click kare to te admin panel na html ma jato rahe tena mate aapne ahiya admin page banavyu 6e.

document.getElementById('adminPanel').addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = "/admin.html"
})







const element1=document.getElementById('categories1');

// <div class="card">
      

//         <div class="card-title" id="Sports">&#128250 Sports</div>
        
// </div>

// const maintopicobject=[{name:'Physics',symbol:'&#9881'},
//     {name:'Chemistry',symbol:'&#128167'},
//     {name:'Biology',symbol:'&#129410'},
//     {name:'Mathematics',symbol:'&#10135;'},
//     {name:'Engineering',symbol:'&#128295'},
//     {name:'Programming_Language',symbol:'&#128187'},
//     {name:'Computer_Engineering',symbol:'&#128421'},
//     {name:'Data_Structure_Algo',symbol:'&#128230'},
//     {name:'Civil_Engineering',symbol:'&#128679'},
//     {name:'Sports',symbol:'&#128250'},
//     {name:'Geography',symbol:'&#128506;&#65039;'},
//     {name:'Music',symbol:'&#127932'},
//     {name:'Movies',symbol:'&#127910'},
//     {name:'Television',symbol:'&#128250'},
//     {name:'Just_For_Fun',symbol:'&#128540'},
//     {name:'History',symbol:'&#128220'},
//     {name:'Literature',symbol:'&#129501'},
//     {name:'Language',symbol:'&#129311'},
//     {name:'Science',symbol:'&#129514'},
//     {name:'Gaming',symbol:'&#128377;&#65039'},
//     {name:'Entertainment',symbol:'&#127904'},
//     {name:'Religions',symbol:'&#128329;&#65039'},
//     {name:'Holiday',symbol:'&#129489;&#8205;&#127876'},
//     {name:"Novel" ,symbol:"&#128218;"},
//     {name:"Famous_Books" ,symbol:"&#128213;"},
//     {name:"Mythological_Book" ,symbol:"&#128330;"},
//     {name:"Indian_States" ,symbol:"&#127757;"},
//     {name:"Cars" ,symbol:"&#128663;"},
//     {name:"World_Culture" ,symbol:"&#127760;"},
//     {name:"Indian_Culture" ,symbol:"&#128966;"},
//     {name:"Tribes" ,symbol:"&#129492;"},
//     {name:"Countries" ,symbol:"&#127758;"}
    

// ]
let  maintopicobject;
let maintopic2=[];

const CACHE_Main_topic_KEY = 'maintopic_cache';
  const CACHE_Main_topic_KEY_EXPIRY = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

  const cached = localStorage.getItem(CACHE_Main_topic_KEY);

  if (cached) {
    const parsed = JSON.parse(cached);
    console.log(parsed);
    const isExpired = Date.now() - parsed.timestamp > CACHE_Main_topic_KEY_EXPIRY;

    if (!isExpired) {
      console.log('Using cached main topics');
      maintopicobject =parsed["data"];
      putallmaintopic();
      maintopicOnly(maintopicobject)
      putmaintopicinhinderburge()
    } 
  }
  console.log(maintopicobject)









//-----------------how to fetch this maintopics front database:-----------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('kalpquiz_token');
  console.log(token);

  if (!token) {
    alert('You are not logged in');
    return;
  }

  const quizpoint=localStorage.getItem('Kalpquiz_credit')
  document.getElementById('quizpoint').innerHTML=`Quiz Point:${quizpoint}`

  

  // If not cached or expired, fetch from server
  if (!maintopicobject) {

      try {
        const res = await fetch('https://kalpquiz-backend.onrender.com/user/main-topics-names', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // 👈 Send token here
            'Content-Type': 'application/json'
          }
        });

        const data = await res.json();
        console.log(data);//[{name: 'Geography', symbol: '&#128506;&#65039;'},{name: 'Sports', symbol: '&#128250'}{name: 'Music', symbol: '&#127932'}{name: 'Movies', symbol: '&#127910'}]

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch topics');
        }

        console.log('Topics:', data); // ✅ Do something with topics (render, etc.)
        
        // Example: render to HTML
        // const container = document.getElementById('topicsList');
        // container.innerHTML = data.map(topic => `
        //   <div>
        //     <h3>${topic.name} ${topic.symbol || ''}</h3>
        //   </div>
        // `).join('');
        maintopicobject=data;
        
        //have aa maintopic aavi jay pa6i aapne aa maintopic ne aapne website ma mukvana 6e.
          putallmaintopic()
          maintopicOnly(maintopicobject)
          putmaintopicinhinderburge()

        // Save to localStorage with timestamp
        localStorage.setItem(CACHE_Main_topic_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }));

        //{
//   "data": [
//     { "name": "Physics", "symbol": "&#9881;" },
//     { "name": "Chemistry", "symbol": "&#128167;" }
//   ],
//   "timestamp": 1691467535000
// }


      } catch (err) {
        console.error('Error fetching topics:', err);
        alert(err.message);
      }

  }
});

//------------------------------------------------------
document.getElementById('buyquizpoint').addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.href = "payment.html";
})

//-----------------------------------------------------








//-------------------------------------------------------------

// const maintopicobject=[{Sports:['&#128250']},{Geography:['&#128506']}]

// function makediv101(topicname,decimalofsymbol){
//     const element11=document.createElement('div');
//     element11.setAttribute('class','card')
//     const element2=document.createElement('div');
//     element2.setAttribute('class','card-title')
//     element2.setAttribute('id',`${topicname}`)
//     element2.innerText=`${decimalofsymbol} ${topicname}`
    
//     element11.append(element2)

//     return element1


// }

//------------------------------------
// const topiccontainer=document.getElementById('categories1')
// maintopicobject.forEach(obj=> {
//     // const element=makediv101(obj['name'],obj['symbol'])
//     // topiccontainer.append(element)
//     // topiccontainer.innerHTML+=`${element}`
//     topiccontainer.innerHTML+=`<div class="card"><div class="card-title" id=${obj['name']}>${obj['symbol']} ${obj['name']}</div></div>`
//     // console.log(element)
// });
//---------------------------make above foreach in async function which will call after maintopicobject come.
function putallmaintopic(){
  const topiccontainer=document.getElementById('categories1')
  maintopicobject.forEach(obj=> {
    // const element=makediv101(obj['name'],obj['symbol'])
    // topiccontainer.append(element)
    // topiccontainer.innerHTML+=`${element}`
    topiccontainer.innerHTML+=`<div class="card"><div class="card-title" id=${obj['name']}>${obj['symbol']} ${obj['name']}</div></div>`
    // console.log(element)
});
}

//======================================
// async function fetchMainTopics() {
//   const res = await fetch('http://localhost:3000/user/main-topics-names',{
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token3}`,
//         'Content-Type': 'application/json'
//       }
//     });
//   const data = await res.json();

//   const maintopicobject = data.map(topic => ({
//     name: topic.name,
//     symbol: topic.symbol,
//   }));

//   console.log(maintopicobject);
// }

// await fetchMainTopics()













//-----------------------------------------------------


//  const maintopic2=['Sports','Geography','Music','Television','Movies','Just_For_Fun','History','Literature','Language','Science','Gaming','Entertainment','Religions','Holiday','Physics','Chemistry','Biology','Mathematics','Engineering','Programming_Language','Computer_Engineering','Data_Structure_Algo','Civil_Engineering',"Novel","Famous_Books","Mythological_Book","Indian_States","Cars","World_Culture","Indian_Culture","Tribes","Countries"]

console.log(maintopicobject);
 function maintopicOnly(maintopicobject3){
  maintopicobject3.forEach((i)=>{
      maintopic2.push(`${i["name"]}`)
  })
 }
console.log(maintopic2);
//=================================================================




element1.addEventListener('click',(e)=>{
    e.preventDefault()

    // if (e.target.parentElement === element1) {
    // // console.log("Clicked child:", e.target.textContent);

    // sessionStorage.setItem("maintopic", e.target.id);
    // window.location.href = "index1.html";
    // }

    // console.log(e.currentTarget)
    // console.log(e.target)
   
    // sessionStorage.setItem("maintopic",e.target.id);

    if (maintopic2.includes(e.target.id)) {
    sessionStorage.setItem("maintopic",e.target.id);
    window.location.href = "index1.html";
  }
})


//  function logout() {
//     localStorage.removeItem('kalpquiz_token');
//     window.location.href = "./index.html";
//   }



// document.getElementById('logout').addEventListener('click',()=>{
//   logout()
// })
document.getElementById('logout').addEventListener('click',async ()=>{
    localStorage.removeItem('kalpquiz_token');
    localStorage.removeItem('maintopic_cache');
    localStorage.removeItem('kalpquiz_token_expiry');
    await clearAllMainTopics();
    
    window.location.href = "./index.html";
})


 function toggleDropdown() {
      document.getElementById("hamburgerMenu").classList.toggle("show");
    }

document.getElementById('hinderburgebutton').addEventListener('click',()=>{
  document.getElementById("hamburgerMenu").classList.toggle("show");
}) 
    

    // Close dropdown when clicking outside of hinderburge button mate.
    window.addEventListener("click", function(event) {
      const dropdown = document.getElementById("hamburgerMenu");
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });



//----------------------------------------------------    
//ahiya aapne anchor tag ne nakhvu padse:

// aane aapne function ma lakhiye:

// maintopic2.forEach(i=>{
//   const element=document.getElementById('alltopic-anchor')
//   element.innerHTML+=`<a class="${i}">${i}</a>`
// })
function putmaintopicinhinderburge(){
  maintopic2.forEach(i=>{
  const element=document.getElementById('alltopic-anchor')
  element.innerHTML+=`<a class="${i}">${i}</a>`
})
}
//------------------------------------------------------

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


//------------------------have aapne previous quiz vala par click kare to te redirect index3 par thai jay.
document.getElementById('Previousquiz').addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = "index3.html";

})



// setTimeout(() => {
//   localStorage.removeItem('kalpquiz_token');
//   // localStorage.removeItem('current_kalpquiz_user');
//   alert('Session expired. Please log in again.');
//   window.location.href = './index.html';
// }, 2 * 60 * 1000); // 2 minutes in milliseconds



//-------------------------for creating room
document.getElementById('CreateRoom').addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = "createroom.html";

})







//------------------------------------------------
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





//-----------------------------------------
async function clearAllMainTopics() {
  const db = await openDB();
  const tx = db.transaction('allMainTopics', 'readwrite');
  tx.objectStore('allMainTopics').clear();
  return tx.complete;
}

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