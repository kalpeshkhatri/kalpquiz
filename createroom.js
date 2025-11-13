const availableCredit=localStorage.getItem("Kalpquiz_credit")
console.log(availableCredit);
document.getElementById("availablecredit").innerHTML+=availableCredit;

const token=localStorage.getItem('kalpquiz_token')



document.getElementById('loginForm1').addEventListener('submit', async function (e) {
    e.preventDefault()
    const loader=document.getElementById('loader');
    loader.style.display='flex'

    const roomid1 = document.getElementById('roomid1').value;
    const password1 = document.getElementById('password1').value;
  })


function statusmessage1(sentence,color,display1){
    const status1=document.getElementById('statusmessage1');//html element
    status1.innerHTML=''
    status1.innerText=sentence;
    status1.style.color=color;

    // if(status1.innerHTML==''){
    //   status1.style.display='none';
      
    // }
    status1.style.display=display1;


}




// deduction credit :
document.getElementById('studentno').addEventListener('input',(e)=>{
    e.preventDefault();
    statusmessage1('','black','none')
    const Studentnos=Number(document.getElementById('studentno').value);
    const Questionnos=Number(document.getElementById('questionno').value);
    const deductcredit=document.getElementById('deductcredit') //html element
    const afterdeduction=document.getElementById('afterdeduction')//html element
    const deductioncredit=0.25*Studentnos*Questionnos;
    const afterdeductioncredit=availableCredit-deductioncredit;

    deductcredit.innerHTML=`Credit will Deduct:`
    deductcredit.innerHTML+=deductioncredit;

    afterdeduction.innerHTML=`After deduction Credit:`
    afterdeduction.innerHTML+=afterdeductioncredit;
// if (afterdeductioncredit<0 && Studentnos && Questionnos && Studentnos>0 && Questionnos>0){
//       if (Studentnos<=4){
//         statusmessage1(`Nos of students should be more than or equal to 5.`,'red');
      
      
//       }
//       else{
//         statusmessage1(`You are not elegible.You have to buy ${afterdeductioncredit*(-1)} more credits.`,'red')
//       }
//     }
//     if (afterdeductioncredit>0 && Studentnos && Questionnos  && Studentnos>0 && Questionnos>0){
//         statusmessage1('You have enough credit for creating this room.','green')
//     }
//       if(Studentnos>200 || Studentnos<=0){
//       alert('Enter nos of Students should be between 5 to 200.')
//       document.getElementById('studentno').value=5;
      
//     }
//     if(Questionnos>200 || Questionnos<0){
//       alert('Enter nos of Questions should be below 200.')
//       document.getElementById('questionno').value=0;
//     }
  if (Studentnos>=5 && Questionnos>=20 && afterdeductioncredit>0 ){
        statusmessage1('You have enough credit for creating this room and Valid Input.1','green','flex');
  }
  else if(Studentnos<=4 || Studentnos>200 ||afterdeductioncredit<0 ||Questionnos>200 || Questionnos<20){
    if(Studentnos<=4){
        statusmessage1('Student nos should be between 5 to 200.2','red','flex');

    }
    else if(Studentnos>200){
        statusmessage1('Student nos should be between 5 to 200.3','red','flex');

    }
    else if(afterdeductioncredit<0){
        statusmessage1(`You are not eligible.You have to buy ${afterdeductioncredit*(-1)} more credits.4`,'red','flex');

    }
    // else if(Questionnos>200){
    //   statusmessage1('Question nos should be between 1 to 200.5','red','flex');
    // }
    // else if(Questionnos<20){
    //   statusmessage1('Question nos should be between 1 to 200.6','red','flex');
    // }
  }



})


document.getElementById('questionno').addEventListener('input',(e)=>{
    e.preventDefault();
    statusmessage1('','black','none')
    

    const Studentnos=Number(document.getElementById('studentno').value);
    const Questionnos=Number(document.getElementById('questionno').value);
    console.log(Questionnos);
    const deductcredit=document.getElementById('deductcredit') //html element
    const afterdeduction=document.getElementById('afterdeduction')//html element
    const deductioncredit=0.25*Studentnos*Questionnos;
    const afterdeductioncredit=availableCredit-deductioncredit;

    deductcredit.innerHTML=`Credit will Deduct:`
    deductcredit.innerHTML+=deductioncredit;

    afterdeduction.innerHTML=`After deduction Credit:`    
    afterdeduction.innerHTML+=afterdeductioncredit;
    //  if (afterdeductioncredit<0 && Studentnos && Questionnos && Studentnos>0 && Questionnos>0){
    //   if (Studentnos<=4){
    //     statusmessage1(`Nos of students should be more than or equal to 5.`,'red');
      
      
    //   }
    //   else{
    //     statusmessage1(`You are not elegible.You have to buy ${afterdeductioncredit*(-1)} more credits.`,'red')
    //   }
    // }
    // if (afterdeductioncredit>0 && Studentnos && Questionnos  && Studentnos>0 && Questionnos>0){
    //     statusmessage1('You have enough credit for creating this room.','green')
    // }
    //   if(Studentnos>200 || Studentnos<=0){
    //   alert('Enter nos of Students should be between 5 to 200.')
    //   document.getElementById('studentno').value=5;
      
    // }
    // if(Questionnos>200 || Questionnos<0){
    //   alert('Enter nos of Questions should be below 200.')
    //   document.getElementById('questionno').value=0;
    // }
      if (Studentnos>=5 && Questionnos>=20 && afterdeductioncredit>0 ){
        
        statusmessage1('You have enough credit for creating this room and Valid Input.7','green','flex');
  }
  else if(Studentnos<=4 || Studentnos>200 ||afterdeductioncredit<0 ||Questionnos>200 || Questionnos<20){
    if(Questionnos<20){
      statusmessage1('Question nos should be between 20 to 200.8','red','flex');
    }
    else if(Questionnos>200){
      statusmessage1('Question nos should be between 20 to 200.9','red','flex');
    }
    // else if(Studentnos<=4){
    //     statusmessage1('Student nos should be between 5 to 200.10','red','flex');

    // }
    // else if(Studentnos>200){
    //     statusmessage1('Student nos should be between 5 to 200.11','red','flex');

    // }
    else if(afterdeductioncredit<0){
        statusmessage1(`You are not eligible.You have to buy ${afterdeductioncredit*(-1)} more credits.12`,'red','flex');

    }
   
  }
    

})

document.getElementById('loginForm2').addEventListener('submit', async function (e) {
    e.preventDefault()
    const loader=document.getElementById('loader');
    loader.style.display='flex'

    // const roomid2 = document.getElementById('roomid2').value;
    const PrivatePassword = document.getElementById('password2').value.trim();
    const PublicPassword = document.getElementById('password3').value.trim();
    const Studentnos=document.getElementById('studentno').value;
    const Questionnos=document.getElementById('questionno').value;

    const cutcredit=0.25*Studentnos*Questionnos

    if(PrivatePassword==PublicPassword){
        alert(`Room Private Password and Public Password should be different because you will give public password to your roommate. Please don't give private password`)
        loader.style.display='none'
        

    }

    if(cutcredit<=availableCredit){

        try {
      const res = await fetch('https://kalpquiz-backend.onrender.com/room/createRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({PrivatePassword,PublicPassword,Studentnos,Questionnos})
      });

      const data = await res.json();
      loader.style.display='none'
      console.log(data)

      if(data.redirectTo){
        window.location.href = './payment.html';
      }


      if (res.ok) {
       
        localStorage.setItem("Kalpquiz_credit",availableCredit-cutcredit)
        alert(`Room Created !Your room id is ${data.id}`);
        window.location.href = './roomownerquiz.html'; // Redirect to login page
      } else {
        alert(data.message || 'Room creation failed!');
        
      }
    } catch (error) {
      alert('Something went wrong. Please try again later.');
      console.error('Signup error:', error);
    }

    }
    else{
        const shouldhavecredit=0.25*Studentnos*Questionnos
        alert(`You have available credit is ${availableCredit}.You want to create room for ${Studentnos} students.In that Room you want to add ${Questionnos}. So You should have credit more than or equal to 25% of multiplication of Student nos and Question no. ==>0.25x${Studentnos}*${Questionnos}=${shouldhavecredit}.`)
        loader.style.display='none'
      
    }


    
  })



  //----------
//   const passwordInput = document.getElementById("password2");
// const togglePassword = document.getElementById("togglePassword");
// const eyeOpen = document.getElementById("eyeOpen");
// const eyeClose = document.getElementById("eyeClose");

// togglePassword.addEventListener("click", () => {
//   const isPassword = passwordInput.type === "password";
//   passwordInput.type = isPassword ? "text" : "password";

//   // Toggle icons
//   eyeOpen.style.display = isPassword ? "none" : "block";
//   eyeClose.style.display = isPassword ? "block" : "none";
// });


//-------------------------------------
// .input-container {
//   position: relative;
//   display: flex;
//   align-items: center;
// }

// .input-container input {
//   width: 100%;
//   padding: 10px 40px 10px 10px; /* space for button */
//   font-size: 16px;
//   border: 1px solid #ccc;
//   border-radius: 6px;
// }

// .input-container button {
//   width: 20%;
//   height: 100%;
//   position: absolute;
//   right: 5px;
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #555;
//   display: flex;
//   flex-direction: row-reverse;
//   align-items: center;
//   /* justify-content: center; */
// }

// .input-container button:hover {
//   color: #000;
// }

// .input-container svg {
//   pointer-events: none; /* icon won't block click */
// }


//------------------------------------------
document.querySelectorAll('.toggle-password').forEach(button => {
  button.addEventListener('click', () => {
    const container = button.closest('.input-container');
    const input = container.querySelector('.password-input');
    const eyeOpen = button.querySelector('.eye-open');
    const eyeClose = button.querySelector('.eye-close');

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    eyeOpen.style.display = isPassword ? 'none' : 'block';
    eyeClose.style.display = isPassword ? 'block' : 'none';
  });
});

