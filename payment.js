const plansContainer = document.querySelector(".plans");
const payBtn = document.getElementById("payBtn");
const selectedPrice = document.getElementById("selectedPrice");
const selectedCredits = document.getElementById("selectedCredits");
const statusMessage = document.getElementById("statusMessage");

const token = localStorage.getItem("kalpquiz_token"); // token from login

// Fetch available plans
fetch("https://kalpquiz-backend.onrender.com/payment/plans", {
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }
})
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch plans");
    return res.json();
  })
  .then(plans => {
    plansContainer.innerHTML = "";

    plans.forEach(plan => {
      const card = document.createElement("div");
      card.classList.add("plan-card");
      card.dataset.price = plan.price;
      card.dataset.credits = plan.credits;

      card.innerHTML = `
        <h3>${plan.title}</h3>
        <p class="rupees">₹${plan.price}</p>
        <span class="givencredit">${plan.credits}</span><span class="creditsentence"> Quiz Credits</span>
        <button>Select</button>
      `;

      plansContainer.appendChild(card);

      card.querySelector("button").addEventListener("click", () => {
        document.querySelectorAll(".plan-card").forEach(c => 
        c.classList.remove("selected"));
        card.classList.add("selected");

        selectedPrice.value = plan.price;
        selectedCredits.value = plan.credits;

        payBtn.disabled = false;
        showStatus(`Selected ₹${plan.price} for ${plan.credits} credits`, "#27ae60");
      });
    });
  })
  .catch(err => {
    console.error("Error fetching plans:", err);
    showStatus("Failed to load plans", "red");
  });

function showStatus(message, color) {
  statusMessage.textContent = message;
  statusMessage.style.color = color;
}

// ---------------------------
// Razorpay Payment Integration
// ---------------------------

// document.getElementById("paymentForm").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phone = document.getElementById("phone").value.trim();
//   const price = selectedPrice.value;
//   const credits = selectedCredits.value;

//   if (!name || !email || !phone || !price) {
//     showStatus("Please fill all fields and select a plan", "red");
//     return;
//   }

//   showStatus("Creating payment order...", "#555");

//   try {
//     // 1. Create order on backend
//     const orderRes = await fetch("https://kalpquiz-backend.onrender.com/kapquizpay/create-order", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ amount: price })
//     });

//     const orderData = await orderRes.json();
//     if (!orderRes.ok) {
//       throw new Error(orderData.error || "Failed to create order");
//     }

//     // 2. Open Razorpay Checkout
//     const options = {
//       key: "rzp_test_ppTUqKgkFdsz9E", // public key, not secret
//       amount: orderData.amount,
//       currency: "INR",
//       name: "KalpQuiz",
//       description: `${credits} Quiz Credits`,
//       order_id: orderData.id,
//       prefill: {
//         name: name,
//         email: email,
//         contact: phone
//       },
//       handler: async function (response) {
//         // 3. Verify payment on backend
//         const verifyRes = await fetch("https://kalpquiz-backend.onrender.com/kapquizpay/verify-payment", {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             ...response,
//             credits: credits
//           })
//         });

//         const verifyData = await verifyRes.json();
//         if (verifyData.success) {
//           showStatus(`Payment successful! 🎉 You received ${credits} quiz credits.`, "green");
//         } else {
//           showStatus("Payment verification failed!", "red");
//         }
//       },
//       theme: {
//         color: "#3399cc"
//       }
//     };

//     const rzp1 = new Razorpay(options);
//     rzp1.open();

//   } catch (error) {
//     console.error("Payment error:", error);
//     showStatus(error.message, "red");
//   }
// });

//-------------
document.getElementById("paymentForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();//aa trim() karvathi je vadharani aagal ke pa6al space hase te nikali jase.
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const price = selectedPrice.value;
  const credits = selectedCredits.value;

  if (!name || !email || !phone || !price) {
    showStatus("Please fill all fields and select a plan", "red");
    return;
  }

  try {
    // 1. Create order
    const orderRes = await fetch("https://kalpquiz-backend.onrender.com/kapquizpay/create-order", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: price, credits: credits })
    });

    const orderData = await orderRes.json();
    console.log(orderData);//
    if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");

    // 2. Open Razorpay
    const options = {
      //aa key ma aapne RAZORPAY_KEY_ID nakhvani 6e.
      key: "rzp_test_ppTUqKgkFdsz9E",
      amount: orderData.amount,
      currency: "INR",
      name: "KalpQuiz",
      description: `${credits} Quiz Credits`,
      order_id: orderData.id,
      prefill: { name, email, contact: phone },
      // handler: function () {
      //   showStatus(`Payment successful! 🎉 Credits will be added shortly after verification.`, "green");
      // },


      //aa handler ma rahel function tyare j call thase ke jyare payment successfull thai jase.
      handler: async function (response) {
        
        console.log(response);//{ "razorpay_payment_id": "pay_JyA1234567","razorpay_order_id": "order_9A33XWu170gUtm","razorpay_signature": "5f1b34d9a6db1b9b1d9c3e8f6f..."}
        
        const verifyRes = await fetch("https://kalpquiz-backend.onrender.com/kapquizpay/verify-payment", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...response,
            credits: credits,
            amount:price
          })
        });

        const verifyData = await verifyRes.json();
        if (verifyData.success) {
          showStatus(`Payment successful! 🎉 You received ${credits} quiz credits.`, "green");
          
          // aapne aa local storage ma  je credit store 6e teme aapne aatla credits increase karva padse.
          const oldcredit=localStorage.getItem('Kalpquiz_credit')
          localStorage.setItem('Kalpquiz_credit',Number(oldcredit)+Number(credits));
          console.log(localStorage.getItem('Kalpquiz_credit'));
        } else {
          showStatus("Payment verification failed!", "red");
        }
      },
      theme: { color: "#3399cc" }
    };

    const rzp1 = new Razorpay(options);
    console.log(rzp1);
    rzp1.open();
  } catch (error) {
    console.error(error);
    showStatus(error.message, "red");
  }
});





















//--------------------------------------------------before integrate rojarpay-------

// const planCards = document.querySelectorAll(".plan-card");
// const payBtn = document.getElementById("payBtn");
// const selectedPrice = document.getElementById("selectedPrice");
// const selectedCredits = document.getElementById("selectedCredits");
// const statusMessage = document.getElementById("statusMessage");


// //-----------------
// // const plansContainer = document.querySelector(".plans");

// // fetch("https://kalpquiz-backend.onrender.com/payment/plans") // Your backend route
// //   .then(res => res.json())
// //   .then(plans => {
// //     plansContainer.innerHTML = ""; // clear existing
// //     plans.forEach(plan => {
// //       const card = document.createElement("div");
// //       card.classList.add("plan-card");
// //       card.dataset.price = plan.price;
// //       card.dataset.credits = plan.credits;

// //       card.innerHTML = `
// //         <h3>₹${plan.price}</h3>
// //         <p>${plan.credits} Quiz Credits</p>
// //         <button>Select</button>
// //       `;

// //       plansContainer.appendChild(card);

// //       // Add click listener
// //       card.querySelector("button").addEventListener("click", () => {
// //         document.querySelectorAll(".plan-card").forEach(c => c.classList.remove("selected"));
// //         card.classList.add("selected");

// //         document.getElementById("selectedPrice").value = plan.price;
// //         document.getElementById("selectedCredits").value = plan.credits;

// //         document.getElementById("payBtn").disabled = false;
// //         showStatus(`Selected ₹${plan.price} for ${plan.credits} credits`, "#27ae60");
// //       });
// //     });
// //   })
// //   .catch(err => {
// //     console.error("Error fetching plans:", err);
// //     showStatus("Failed to load plans", "red");
// //   });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // const plansContainer = document.querySelector(".plans");
// // const token = localStorage.getItem("kalpquiz_token"); // token from login

// // fetch("https://kalpquiz-backend.onrender.com/payment/plans", {
// //   headers: {
// //     "Authorization": `Bearer ${token}`,  // if backend needs authentication
// //     "Content-Type": "application/json"
// //   }
// // })
// //   .then(res => {
// //     if (!res.ok) throw new Error("Failed to fetch plans");
// //     return res.json();
// //   })
// //   .then(plans => {
// //     console.log(plans)
// //     plansContainer.innerHTML = ""; // clear existing
// //     plans.forEach(plan => {
// //       const card = document.createElement("div");
// //       card.classList.add("plan-card");
// //       card.dataset.price = plan.price; // matches your MongoDB field
// //       card.dataset.credits = plan.credits; // matches your MongoDB field

// //       card.innerHTML = `
// //         <h3>₹${plan.price}</h3>
// //         <p>${plan.credits} Quiz Credits</p>
// //         <button>Select</button>
// //       `;

// //       plansContainer.appendChild(card);

// //       // Add click listener
// //       card.querySelector("button").addEventListener("click", () => {
// //         document.querySelectorAll(".plan-card").forEach(c => c.classList.remove("selected"));
// //         card.classList.add("selected");

// //         document.getElementById("selectedPrice").value = plan.payment;
// //         document.getElementById("selectedCredits").value = plan.quizCredit;

// //         document.getElementById("payBtn").disabled = false;
// //         showStatus(`Selected ₹${plan.payment} for ${plan.quizCredit} credits`, "#27ae60");
// //       });
// //     });
// //   })
// //   .catch(err => {
// //     console.error("Error fetching plans:", err);
// //     showStatus("Failed to load plans", "red");
// //   });

// // // helper function for showing status
// // function showStatus(message, color) {
// //   const status = document.getElementById("status");
// //   status.textContent = message;
// //   status.style.color = color;
// // }
// ////////////////////////////////////////////////////////////////////////////
// const plansContainer = document.querySelector(".plans");
// const token = localStorage.getItem("kalpquiz_token"); // token from login

// fetch("https://kalpquiz-backend.onrender.com/payment/plans", { // <-- backend route
//   headers: {
//     "Authorization": `Bearer ${token}`,  // if backend needs authentication
//     "Content-Type": "application/json"
//   }
// })
//   .then(res => {
//     if (!res.ok) throw new Error("Failed to fetch plans");
//     return res.json();
//   })
//   .then(plans => {
//     console.log(plans);
//     plansContainer.innerHTML = ""; // clear existing

//     plans.forEach(plan => {
//       const card = document.createElement("div");
//       card.classList.add("plan-card");
//       card.dataset.price = plan.price;    // from schema
//       card.dataset.credits = plan.credits; // from schema

//       card.innerHTML = `
//         <h3>${plan.title}</h3>
//         <p>₹${plan.price} — ${plan.credits} Quiz Credits</p>
//         <button>Select</button>
//       `;

//       plansContainer.appendChild(card);

//       // Add click listener
//       card.querySelector("button").addEventListener("click", () => {
//         document.querySelectorAll(".plan-card").forEach(c => c.classList.remove("selected"));
//         card.classList.add("selected");

//         document.getElementById("selectedPrice").value = plan.price;
//         document.getElementById("selectedCredits").value = plan.credits;

//         document.getElementById("payBtn").disabled = false;
//         showStatus(`Selected ₹${plan.price} for ${plan.credits} credits`, "#27ae60");
//       });
//     });
//   })
//   .catch(err => {
//     console.error("Error fetching plans:", err);
//     showStatus("Failed to load plans", "red");
//   });

// // helper function for showing status
// function showStatus(message, color) {
//   const status = document.getElementById("status");
//   status.textContent = message;
//   status.style.color = color;
// }



// //---------------


// planCards.forEach(card => {
//   card.querySelector("button").addEventListener("click", () => {
//     planCards.forEach(c => c.classList.remove("selected"));
//     card.classList.add("selected");

//     selectedPrice.value = card.dataset.price;
//     selectedCredits.value = card.dataset.credits;

//     payBtn.disabled = false;
//     showStatus(`Selected ₹${card.dataset.price} for ${card.dataset.credits} credits`, "#27ae60");
//   });
// });

// document.getElementById("paymentForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phone = document.getElementById("phone").value.trim();
//   const price = selectedPrice.value;
//   const credits = selectedCredits.value;

//   if (!name || !email || !phone || !price) {
//     showStatus("Please fill all fields and select a plan", "red");
//     return;
//   }

//   // Simulate Payment Process
//   showStatus("Processing payment...", "#555");

//   setTimeout(() => {
//     // Here you can integrate Razorpay/PayPal API call
//     showStatus(`Payment successful! 🎉 You received ${credits} quiz credits.`, "green");
//   }, 1500);
// });

// function showStatus(message, color) {
//   statusMessage.textContent = message;
//   statusMessage.style.color = color;
// }




















//----------------------------------------------
// document.getElementById("paymentForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phone = document.getElementById("phone").value.trim();

//   if (!name || !email || !phone) {
//     showStatus("Please fill all fields", "red");
//     return;
//   }

//   // Simulate Payment Process
//   showStatus("Processing payment...", "#555");

//   setTimeout(() => {
//     // Here you can integrate Razorpay/PayPal API call
//     showStatus("Payment successful! 🎉", "green");
//   }, 1500);
// });

// function showStatus(message, color) {
//   const statusMessage = document.getElementById("statusMessage");
//   statusMessage.textContent = message;
//   statusMessage.style.color = color;
// }
