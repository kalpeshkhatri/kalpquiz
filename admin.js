function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));

  return JSON.parse(jsonPayload);
}

const token = localStorage.getItem('kalpquiz_token');//

// const decoded = parseJwt(token);
// if (token) {
//     //   const decoded = jwt_decode(token);
//       if (decoded.isAdmin) {
//         document.getElementById('adminPanel').style.display = 'block';
//       }
//     }
// console.log(decoded_token);


   

    // document.getElementById('mainTopicForm').addEventListener('submit', async (e) => {
    //   e.preventDefault();

    //   const name = document.getElementById('name').value.trim();
    //   const symbol = document.getElementById('symbol').value.trim();
    //   const messageDiv = document.getElementById('message');

    //   try {
    //     const response = await fetch('/api/maintopics', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + token
    //       },
    //       body: JSON.stringify({ name, symbol })
    //     });

    //     const result = await response.json();

    //     if (response.ok) {
    //       messageDiv.textContent = 'Topic added successfully!';
    //       messageDiv.className = 'success';
    //       document.getElementById('mainTopicForm').reset();
    //     } else {
    //       messageDiv.textContent = result.message || 'Failed to add topic.';
    //       messageDiv.className = 'error';
    //     }

    //   } catch (err) {
    //     messageDiv.textContent = 'Error: ' + err.message;
    //     messageDiv.className = 'error';
    //   }
    // });




    // const token = localStorage.getItem('token');
///==============================================================================================
  // document.getElementById('mainTopicForm').addEventListener('submit', async (e) => {
  //   e.preventDefault();

  //   const name = document.getElementById('topicName').value;
  //   const subtopics = Array.from(document.querySelectorAll('.subtopic')).map(div => ({
  //     name: div.querySelector('.subtopic-name').value,
  //     symbol: div.querySelector('.subtopic-symbol').value
  //   }));

  //   const res = await fetch('http://localhost:3000/admin/add-main-topic', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({ name, subtopics })
  //   });

  //   const result = await res.json();
  //   alert(result.message || result.error);
  // });
  //======================================================================
//   document.getElementById('mainTopicForm').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const name = document.getElementById('topicName').value;
//   const symbol = document.getElementById('mainsymbol1').value;
//   const subtopics = Array.from(document.querySelectorAll('.subtopic')).map(div => ({
//     name: div.querySelector('.subtopic-name').value,
//     symbol: div.querySelector('.subtopic-symbol').value
//   }));
//   console.log(name,symbol,subtopics);

//   const res = await fetch('https://kalpquiz-backend.onrender.com/admin/add-main-topic', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({ name, symbol, subtopics })
//   });

//   const result = await res.json();
//   alert(result.message || result.error);
// });





function addSubtopicField() {
    // <div id="subtopicsContainer">
    //     <div class="subtopic">
    //       <input class="subtopic-name" placeholder="Subtopic Name" required />
    //       <input class="subtopic-symbol" placeholder="Symbol (emoji or entity)" required />
    //     </div>


    //     <div class="subtopic">
    //       <input class="subtopic-name" placeholder="Subtopic Name" required />
    //       <input class="subtopic-symbol" placeholder="Symbol (emoji or entity)" required />
    //     </div>

    // </div>


    const container = document.getElementById('subtopicsContainer');
    const subtopicDiv = document.createElement('div');
    subtopicDiv.classList.add('subtopic');
    subtopicDiv.innerHTML = `
      <input class="subtopic-name" placeholder="Subtopic Name" required />
      <input class="subtopic-symbol" placeholder="Symbol (emoji or entity)" required />
    `;
    container.appendChild(subtopicDiv);
  }


//-------------------------------------------------
// jyare +addSubtopic par click thay tyare aapne aa div add kari devani 6e.jenathi subtopic na input na box bani jay.
  document.getElementById('addsub').addEventListener('click',(e)=>{
      e.preventDefault()
      addSubtopicField()
  })
//----------------------------------------------


  //---------------------------------delete , change in topic -------------------
  async function loadTopics() {
  const res = await fetch('https://kalpquiz-backend.onrender.com/admin/main-topics', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const topics = await res.json();//aa detch thai ne je data aave 6e te JSON formate ma hoy 6e to tene JS object ma covert aa internally JSON.parse() internally thay 6e.
  console.log(topics)
  //aa topic ma badha array na form ma aavi jase.=>[{id: ,name: ,symbol:  ,subtopics:[{name:  ,symbol: },{} ]},{},{}]
  // have aapne aa data mathi te maintopic no symbol and tenu name dekhadisu.pa6i aapne aa ma button pan add karvana 6e jena par click karvathi te maintopic  delete thai jay and jo tene edit karvu hoy to edit par click kari edit pan kari sakay 6e.delet and edit kariye tyare aapne aanu main id par thi karisu.
  const container = document.getElementById('topicList');
  container.innerHTML = '';

  topics.forEach(topic => {
    const element = document.createElement('div');
    element.innerHTML = `
      <h4>${topic.symbol} ${topic.name}</h4>
      <button onclick="editTopic('${topic._id}')">✏️ Edit</button>
      <button onclick="deleteTopic('${topic._id}')">🗑️ Delete</button>
      <hr />
    `;
    container.appendChild(element);
  });
}

// async function deleteTopic(id) {
//   if (!confirm('Are you sure?')) return;
//   const res = await fetch(`https://kalpquiz-backend.onrender.com/admin/main-topic/${id}`, {
//     method: 'DELETE',
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const data = await res.json();
//   alert(data.message);
//   loadTopics();
// }


//---------------------




// async function editTopic(id) {
//   const res = await fetch(`https://kalpquiz-backend.onrender.com/admin/main-topics`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const topics = await res.json();
//   const topic = topics.find(t => t._id === id);
//   if (!topic) return;

//   // Fill form with existing data
//   document.getElementById('topicName').value = topic.name;
//   document.getElementById('topicSymbol').value = topic.symbol;

//   const subContainer = document.getElementById('subtopicsContainer');
//   subContainer.innerHTML = '';
//   topic.subtopics.forEach(sub => {
//     const subDiv = document.createElement('div');
//     subDiv.className = 'subtopic';
//     subDiv.innerHTML = `
//       <input class="subtopic-name" value="${sub.name}" placeholder="Subtopic Name" />
//       <input class="subtopic-symbol" value="${sub.symbol}" placeholder="Symbol" />
//     `;
//     subContainer.appendChild(subDiv);
//   });

//   // Change form submit behavior to update
//   const form = document.getElementById('mainTopicForm');
//   form.onsubmit = async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('topicName').value;
//     const symbol = document.getElementById('topicSymbol').value;
//     const subtopics = Array.from(document.querySelectorAll('.subtopic')).map(div => ({
//       name: div.querySelector('.subtopic-name').value,
//       symbol: div.querySelector('.subtopic-symbol').value
//     }));

//     const updateRes = await fetch(`https://kalpquiz-backend.onrender.com/admin/main-topic/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: JSON.stringify({ name, symbol, subtopics })
//     });

//     const result = await updateRes.json();
//     alert(result.message);
//     form.reset();
//     form.onsubmit = defaultSubmitHandler; // Reset to create handler
//     loadTopics();
//   };
// }

// Default form submit: create
// jyare aapne aa form sumit karso tyare aa database ma jatu rahse.
const defaultSubmitHandler = async (e) => {
  e.preventDefault();
  const name = document.getElementById('topicName').value;
  const symbol = document.getElementById('mainsymbol1').value;
  // aa subtopic na name and symbol ne ek array ma store kari ne database ma mokalva ma mokalva ma aave 6e.
  console.log(document.querySelectorAll('.subtopic'));//Nodelist() aapse.
  // aa darek element aa rite hase:aama queryselector (.subtopic-name) karvathi aa class first jya banyo hase te element aapse. apne aa element ni value levani 6e.
    // <div class="subtopic">
    //       <input class="subtopic-name" placeholder="Subtopic Name" required />
    //       <input class="subtopic-symbol" placeholder="Symbol (emoji or entity)" required />
    //     </div>
  // aapne aa nodelist par map lagaviye tyare te ek pa6i ek element tema jase. and return ma {name:  ,symbol: } aapse.aa 
  // niche map lagavathi array malse tema aa darek element pass thase tenu su arrray ma nakhvanu 6e [{name:  ,symbo:  },..] aa rite aaray malse.aa map ma ek j statement 6e to tema return lakhvani jarur nathi.
  const subtopics = Array.from(document.querySelectorAll('.subtopic')).map(element => ({
    name: element.querySelector('.subtopic-name').value,
    symbol: element.querySelector('.subtopic-symbol').value
  }));

  // aa subtopics e ek array aape 6e==>[{name:  ,symbol:  },{name:   ,symbol:  },{name:   ,symbol:   }]

  const res = await fetch('https://kalpquiz-backend.onrender.com/admin/add-main-topic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, symbol, subtopics })
    // aapne aa maintopic nu name ,tenu symbol, and tena subtopic aa badha ne ek object backend par mokaliye 6iye.
  });

  const result = await res.json();
  alert(result.message);
  // aa imput vali badhi detail jati rahi tyare aa form ma je input nakhel hase te jata rahse.
  e.target.reset();

  // aa loadTopics karvathi re database hase temathi fresh data aavse.
  loadTopics();
};



//--------------------------------------
document.getElementById('mainTopicForm').onsubmit = defaultSubmitHandler;


async function editTopic(id) {
  //je edit button par click karso teni id automatically aa function na id ma fit kareli j 6e.
  const res = await fetch(`https://kalpquiz-backend.onrender.com/admin/main-topics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const topics = await res.json();//aama data aapan ne json formate ma j male 6e  tyare aapne aa data jode ramva mate aapne data ne js object ma convert karvu padse. to aapne json.parse(json formate) karvu badse. te aapne manually karvanu nathi aa res.json() internally aa json ne js ma convert kari de 6e.that's why we don't use JSON.parse().

  // aanathi badha j main topic aavi jase.temathi aapne bas aa je id valu data 6e tene j data joiye 6e. to tena par aapne aa find() karavu pade.
  const topic = topics.find(t => t._id === id);
  if (!topic) return;

  // Fill form with existing data:
  document.getElementById('topicName').value = topic.name;
  document.getElementById('mainsymbol1').value = topic.symbol;

  const subContainer = document.getElementById('subtopicsContainer');
  subContainer.innerHTML = '';
  // aa topic ek object 6e=>{name: ,symbol:  ,subtopics=[...]}
  topic.subtopics.forEach(i => {
    const element2 = document.createElement('div');
    element2.className = 'subtopic';
    element2.innerHTML = `
      <input class="subtopic-name" value="${i.name}" placeholder="Subtopic Name" />
      <input class="subtopic-symbol" value="${i.symbol}" placeholder="Symbol" />
    `;
    subContainer.appendChild(element2);
  });

  // have aapne aa form bharay gayu to pa6i aapne aa submit vala button par click karso to new main topic bani jase pan aapne je pahla hatu tema  j update karvanu 6e. to tena mate aapne aa button nu behaviour change karvu padse.
  // Change form submit behavior to update
  const form = document.getElementById('mainTopicForm');
  form.onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('topicName').value;
    const symbol = document.getElementById('mainsymbol1').value;
    const subtopics = Array.from(document.querySelectorAll('.subtopic')).map(div => ({
      name: div.querySelector('.subtopic-name').value,
      symbol: div.querySelector('.subtopic-symbol').value
    }));

    const updateRes = await fetch(`https://kalpquiz-backend.onrender.com/admin/main-topic/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, symbol, subtopics })
    });

    const result = await updateRes.json();
    alert(result.message);
    form.reset();
    form.onsubmit = defaultSubmitHandler; // Reset to create handler
    loadTopics();
  };
}

//-------------
async function deleteTopic(id) {
  if (!confirm('Are you sure?')) return;
  const res = await fetch(`https://kalpquiz-backend.onrender.com/admin/main-topic/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  alert(data.message);
  loadTopics();
}




// aa niche valu lakhavu pade karan ke aapne aa editTopic,deleteTopic vala function ne aapne button ma onclick ma lakhya 6e. to aa function globally. ==>	Make editTopic() available to inline HTML like onclick="..."
window.editTopic = editTopic;
window.deleteTopic = deleteTopic;



window.onload = loadTopics;// page jyare load thay tyare aa automaticaly run thai jase.


//-----------------------------payment panel----------------------------



const apiURL = "https://kalpquiz-backend.onrender.com/admin/adminplan";
// const token = localStorage.getItem("token"); // JWT after login

// Elements
const plansTable = document.getElementById("plansTable");
const planForm = document.getElementById("planForm");
const planId = document.getElementById("planId");
const title = document.getElementById("title");
const price = document.getElementById("price");
const credits = document.getElementById("credits");

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
};

// Load all plans
async function loadPlans() {
  try {
    const res = await fetch(apiURL, { headers });
    if (!res.ok) return alert("Access denied: Admin only");
    console.log(res);//Response {type: 'cors', url: 'https://kalpquiz-backend.onrender.com/admin/adminplan', redirected: false, status: 200, ok: true, …}
    console.log(res.body);
    // console.log(await res.body.json())//error because  json method e only resposnse object jode j 6e.
    const plans = await res.json();//(3) [ {_id: '68974ddcc6ea1597a9f547bd', price: 100, credits: 400, title: 'Premium1', __v: 0},{_id: '6899b755dd2e4bfb564a095e', price: 200, credits: 900, title: 'Premium2', __v: 0},{_id: '6899b769dd2e4bfb564a0961', price: 300, credits: 1400, title: 'Premium', __v: 0}]
    console.log(plans);

    // aa plans vala par map lagavisu pa6i ek alag array malse jema [' ',' ',''] .aa array na badha j element ne  jodi ne ek moti string banavva mate aapne arry.join("") aano use karisu. tena thi arry na badhaj element ek sathe joday ne moti string banavi dese.
    plansTable.innerHTML = plans.map(p => `
      <tr>
        <td>${p.title}</td>
        <td>₹${p.price}</td>
        <td>${p.credits}</td>
        <td>
          <button onclick="editPlan('${p._id}','${p.title}',${p.price},${p.credits})">Edit</button>
          <button onclick="deletePlan('${p._id}')">Delete</button>
        </td>
      </tr>
    `).join("");

  } catch (err) {
    console.error(err);
  }
}

// Save (Add / Update) plan
planForm.onsubmit = async e => {
  e.preventDefault();
  const method = planId.value ? "PUT" : "POST";
  const url = planId.value ? `${apiURL}/${planId.value}` : apiURL;

  await fetch(url, {
    method,
    headers,
    body: JSON.stringify({
      title: title.value,
      price: price.value,
      credits: credits.value
    })
  });
  
  planForm.reset();
  planId.value = "";
  loadPlans();
};

// Fill form for edit
function editPlan(id, t, p, c) {
  planId.value = id;
  title.value = t;
  price.value = p;
  credits.value = c;
}

// Delete a plan
async function deletePlan(id) {
  if (confirm("Delete this plan?")) {
    await fetch(`${apiURL}/${id}`, { method: "DELETE", headers });
    loadPlans();
  }
}

// Initial load
loadPlans();
window.editPlan = editPlan;
window.deletePlan = deletePlan;





//-----------------------------------------watching redis data ----------------
// const token = localStorage.getItem("kalpquiz_token"); // assuming JWT stored here

fetch("https://kalpquiz-backend.onrender.com/debug/rate-limits", {
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
})
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById("rateLimitsTable");
    tbody.innerHTML = "";

    if (!data.data || data.data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4">No rate limiter data found</td></tr>`;
      return;
    }

    data.data.forEach(item => {
      const row = `
        <tr>
          <td>${item.key}</td>
          <td>${item.type}</td>
          <td>${item.count}</td>
          <td>${item.ttl}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
  })
  .catch(err => console.error("Error fetching rate limits:", err));


//-----------------------------
const token4 = localStorage.getItem('kalpquiz_token');
const expiry = localStorage.getItem('kalpquiz_token_expiry');

if (!token4 || !expiry || Date.now() > parseInt(expiry)) {
  // Session expired or no token
  localStorage.removeItem('kalpquiz_token');
  localStorage.removeItem('kalpquiz_token_expiry');
  // localStorage.removeItem('current_kalpquiz_user');
  alert('Session expired. Please log in again.');
  window.location.href = './index.html'; 
}