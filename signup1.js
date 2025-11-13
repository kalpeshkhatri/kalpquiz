//----------------old without mongodb:-

    // // Auto redirect if already logged in:aa page ma aave tyare check karvanu ke current_kalpquiz_user ma koi 6e to jo hase to aa if vali condition true bani jase and te redirect karse index0.html par.
    // if (localStorage.getItem('current_kalpquiz_user')) {
    //   window.location.href = "./index0.html";
    // }

    // // jo current_kalpquiz_user kai ne kai na hoy to jo user e name, email, password nakhyu 6e te aa ign up vala butto par click karvathi teni aa information e kalpquiz_users vala ma jase. aa kalpquiz_users ma multiple user rahi sake 6e to aapne teni value ne set karvani pan tena mate old users hata tene array ma convert kari ne pa6i tema new user ne push kari ne pa6i te new array malyo trene JSon.stringfy() kari ne string ma convert kari ne teni value ne set karvani 6e.==>1.old users array by json.parse==>2.new user push in array==>3.add thayela array ne string ma json.stringfy kari ne ==> 4.aa string ne setItem kari devanu 6e.

    // //to pahla aapne check karisu ke aa email valo koi bijo user aa kalpquiz ma nathi ne jo hoy to tene alert aapi devanu ke aa name no user already 6e. to tena mate pahla kalpquiz_users melvisu and if condition lagavi ne check karisu ke aa email valo user 6e ke nahi find() lagavi ne aa object 6e.==>{kalpquiz_user:[{name: ,email:  password: },{name:  ,email:  ,password:  }]}


    // document.getElementById('signupForm').addEventListener('submit', function (e) {
    //   e.preventDefault();
    //   const name = document.getElementById('name').value;
    //   const email = document.getElementById('email').value;
    //   const password = document.getElementById('password').value;

    //   const users = JSON.parse(localStorage.getItem('kalpquiz_users')) || [];
    //   console.log(typeof localStorage.getItem('kalpquiz_users')) //aa string aapse. tene aapne array ma banavva mate aapne JSON.parse() no use thay 6e.

    //   // Check if email already exists
    //   const existingUser = users.find(user => user.email === email);
    //   if (existingUser) {
    //     alert("User already exists. Please login.");
    //     return;
    //   }
      
    //   //jo signup vala form ma lakhel user nahi hoy to tene aapne kalpquiz_users ma push kari deso.==>ahiya push karva mate ahiya aapne json.parse() thi je array banyo tema push karvanu.pa6i aa ne jsonstring ma convert kari ne aapne aapne aa kalpquiz_users ni value ne badali devali 6e.
    //   const newUser = { name, email, password };
    //   users.push(newUser);
    //   localStorage.setItem('kalpquiz_users', JSON.stringify(users));
    //   alert("Signup successful! You can now login.");
    //   window.location.href = "./index.html";
    // });

//----------------------------------------
// Redirect if already logged in
//   if (localStorage.getItem('current_kalpquiz_user')) {
//     window.location.href = "./index0.html";
//   }

  document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const loader=document.getElementById('loader');
    loader.style.display='flex'

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    try {
      const res = await fetch('https://kalpquiz-backend.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password,username })
      });

      const data = await res.json();
      loader.style.display='none'


      if (res.ok) {
       

        alert('Signup successful! You can now log in.');
        window.location.href = './index.html'; // Redirect to login page
      } else {
        alert(data.message || 'Signup failed.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.');
      console.error('Signup error:', error);
    }
  });
