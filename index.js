
//old without mongobd data connected:


    // Auto redirect if already logged in
    // if (localStorage.getItem('current_kalpquiz_user')) {
    //   window.location.href = "./index0.html";
    // }
    // //Storage {kalpquiz_users: '[{"name":"123","email":"kalpesh@gmail.com","passwo…sh","email":"harsh@gmail.com","password":"1123"}]', current_kalpquiz_user: '{"name":"123","email":"kalpesh@gmail.com","password":"123"}', length: 2}

    // document.getElementById('loginForm').addEventListener('submit', function (e) {
    //   e.preventDefault();
    //   const email = document.getElementById('email').value;
    //   const password = document.getElementById('password').value;

    //   const users = JSON.parse(localStorage.getItem('kalpquiz_users')) || [];
    //   //ahiya jo localStorage.getItem('kalpquiz_users') aa key jo hase local storage ma to Json.parse() vala function ma json string aavse and tene json strin mathi ek array ma convert thai jase. j local strorage ma 'kalpeshquiz_users' e na male  to te null aapse. to json.parse(null) e null e null j thay =====>null || []==> aavi or vali condition bani jay 6e to ahiya users=[] khali array le 6e.

    //   // ahiya upar lakhel or condition 6e . jo condition1 ma kai return aavi gayu to te te lai lese. and jo condition1 ma kai na aavyu to te condition 2 valu lai lese.

    //   //aa 'kalpquiz_users' ma gana user aavi sake 6e. karan ke jetla pan signup karse te badha aama j aavse. to aa users vala  array ma ek thi vadhare objects hase te object mathi aapne find  karvanu ke je value aa email and password ma nakhi 6e te aavi jay.



    //   const user = users.find(u => u.email === email && u.password === password);
    //   //aa user aa return ma jo hase to tej user ni {email:  ,password:  } aapi dese. jo hase to direct tene redirect index0.html ma karvanu.and aa login thayo hoy te user nu email and password aapne aa local storage ma alag current_user key banse tema aa json.s  jo na hoy to tene alert aapvanu.ke tu invalid 6e.

    //   if (user) {
    //     localStorage.setItem('current_kalpquiz_user', JSON.stringify(user));
    //     alert("Login successful!");
    //     window.location.href = "./index0.html";
    //   } else {
    //     alert("Invalid email or password.");
    //   }
    // });
  

//--------------------------------------------------
//  // Redirect if already logged in
//   if (localStorage.getItem('current_kalpquiz_user')) {
//     window.location.href = "./index0.html";
//   }

//   document.getElementById('loginForm').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//       const res = await fetch('https://kalpquiz-backend.onrender.com/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Save user info in localStorage
//         localStorage.setItem('current_kalpquiz_user', JSON.stringify({ email: data.email }));
//         alert('Login successful!');
//         window.location.href = './index0.html';
//       } else {
//         alert(data.message || 'Login failed.');
//       }
//     } catch (error) {
//       alert('Something went wrong. Please try again later.');
//       console.error('Login error:', error);
//     }
//   });



//----------------------------------------
// Redirect if already logged in
//   if (localStorage.getItem('current_kalpquiz_user')) {
//     window.location.href = "./index0.html";
//   }

  document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const loader=document.getElementById('loader');
    loader.style.display='flex'

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    try {
      const res = await fetch('https://kalpquiz-backend.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
            });

      const data = await res.json();
      console.log(data);
      loader.style.display='none'
      console.log('Response Status:', res.status);
      console.log('Response Data:', data);

      




      if (res.ok) {
      // here res.ok is boolean value if response code is between 200 to 299. ==>res.ok === (res.status >= 200 && res.status < 300)

      
      localStorage.setItem('kalpquiz_token', data.token); // ✅ Save token

      localStorage.setItem('Kalpquiz_credit',data.creditQuiz);
      // localStorage.setItem('current_kalpquiz_user', JSON.stringify({ email: data.email }));
      const tokenExpiry = Date.now() + 60 * 60 * 1000 *30; //for normal user token valid for 30days 
      localStorage.setItem('kalpquiz_token_expiry', tokenExpiry.toString());
      alert('Login successful!');
      window.location.href = './index0.html';
      }
      
      
      
      else if (res.status === 401) {
          // ❌ Invalid credentials
          console.log(data)
          alert(data.message);
          } 
      
     
      else {
          // ❌ Other error (500, 400, etc.)
          alert(data.message || 'Something went wrong. Please try again.');
          }

    } catch (error) {
      alert('Something went wrong. Please try again later.');
      console.error('Login error:', error);
    }
  });



document.getElementById('forget1').addEventListener('click',(e)=>{
  e.preventDefault()
  window.location.href = './forget.html';
})
document.getElementById('reset1').addEventListener('click',(e)=>{
  e.preventDefault()
  window.location.href = './reset.html';
})





