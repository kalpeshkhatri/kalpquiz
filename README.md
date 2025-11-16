# KalpQuiz - Full-Stack Quiz Platform Documentation

Welcome to the comprehensive guide for KalpQuiz, an intelligent, AI-powered quiz generation and learning platform designed for interactive study, personalized quiz creation, and topic‑based knowledge enhancement. This document provides complete technical documentation covering architecture, implementation details, API usage, frontend logic, and overall system functionality.

## 🎯 Platform Overview

**KalpQuiz** KalpQuiz is an AI-powered quiz generation and learning platform designed to provide users with personalized quizzes across a wide variety of subjects. It combines a structured category system, user authentication, credit-based quiz creation, and intelligent question generation using Google Gemini. The platform supports dynamic topic and subtopic management, seamless UI interactions, and efficient caching to deliver fast, interactive, and customizable quiz experiences.

**KalpQuiz** is built as a full-stack application, with a JavaScript-based frontend deployed on Vercel and a Node.js backend hosted on Render. Through smart localStorage usage, retry-safe Gemini API requests, and modular topic rendering, KalpQuiz ensures smooth performance, even during high AI traffic conditions. The system is designed for scalability, ease of management, and intuitive user interaction, making it an effective platform for learners, educators, and quiz enthusiasts.

**Used IndexedDB**
**KalpQuizDB** – This IndexedDB store is used to cache fetched main topics and subtopics, significantly reducing backend API calls. The cached data automatically expires after 24 hours, after which a fresh request is made to the backend to ensure updated information.

**kalQuizQuestionDB** – This IndexedDB store holds previously attempted quiz questions, allowing users to retake quizzes at any time. Stored quizzes automatically expire after 4 months, and any quiz older than this period is automatically removed from the database to maintain optimal storage and performance.





#### **Private Room System**
- **Room Creation**: I have implemented a room-based system where a room owner can create a dedicated room and select quiz questions either by filtering from their previous quizzes or by manually adding or editing questions. These questions are stored in the room owner’s database. When a roommate logs into the room, they automatically receive the quiz questions associated with that specific room.

### **Create PDF of Quiz**
- Users can generate a printable PDF version of any quiz, allowing them to take the quiz in written form if preferred.


## **Payment Integration (Razorpay)**
- KalpQuiz integrates Razorpay to enable secure and seamless payment processing for users who wish to purchase additional quiz credits. Razorpay provides a reliable checkout flow with support for multiple payment methods, including UPI, cards, net banking, and wallets.

-KalpQuiz integrates Razorpay webhooks to ensure secure and reliable verification of all payment events. When a user completes a transaction, Razorpay sends a webhook notification to our backend, allowing the system to independently verify the payment status before updating the user’s quiz credits.



#### **Technical Implementation**
- **MongoDB Storage**: Used to store user information as well as all main topics and subtopics.
- **Redis Caching**: Utilized for caching IP addresses and enforcing rate limiting to enhance security and performance.
- **State Management**:LocalStorage is used on the client side to manage application state efficiently.
- **html2canvas (v1.4.1)** – Captures HTML content as a canvas image.
- **jsPDF (v3.0.1)** – Converts the captured canvas into a downloadable PDF file.
- **Rozarpay** - For payment integration
- **cloudnary** -Used for storing and managing the KalpQuiz logo and other static assets.
- **Brevo** - Utilized for sending verification emails and handling email-based communication.



### Main Topics Included in KalpQuiz
- **Engineering**:Computer Engineering, Civil Engineering, Mechanical Engineering, Electrical Engineering, Electronics & Communication, Chemical Engineering, Aerospace Engineering, Biotechnology, Industrial Engineering, Environmental Engineering, Automobile Engineering, Petroleum Engineering.
- **Data Structures & Algorithms (DSA)**:Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hashing, Recursion, Sorting, Searching, Dynamic Programming, Greedy Algorithms, Backtracking.
- **Programming Languages**:Python, JavaScript, Java, C, C++, C#, Go, Dart, Rust, PHP, Ruby, Kotlin, Swift, SQL, TypeScript.
- **Computer Engineering**:Operating Systems, DBMS, Computer Networks, Compiler Design, Software Engineering, Cloud Computing, Cybersecurity, AI/ML, IoT, Microprocessors, Embedded Systems.
- **Mathematics**:Algebra, Geometry, Calculus, Probability, Statistics, Trigonometry, Number System, Matrices, Vectors, Mensuration, Linear Algebra, Coordinate Geometry.
- **Physics**:Mechanics, Thermodynamics, Optics, Waves, Electricity, Magnetism, Modern Physics, Quantum Mechanics, Nuclear Physics, Astrophysics.
- **Chemistry**:Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Biomolecules, Chemical Reactions, Periodic Table, Electrochemistry, Thermochemistry, Environmental Chemistry.
- **Biology**:Botany, Zoology, Genetics, Evolution, Human Physiology, Microbiology, Biotechnology, Ecology, Cell Biology.
- **History**:Ancient History, Medieval History, Modern History, World Wars, Indian Freedom Movement, Civilizations, Empires, Cultural History, Political History.
- **Geography**:Physical Geography, Climate, Maps, Natural Resources, Oceans, Landforms, Atmosphere, Human Geography, Indian Geography, Environment.
- **Economics**:Microeconomics, Macroeconomics, Banking, Finance, Growth, Development, International Trade, Budget, Markets, Inflation, GDP.
- **Philosophy**:Ethics, Logic, Metaphysics, Epistemology, Political Philosophy, Aesthetics, Indian Philosophy, Western Philosophy.
- **Psychology**:Cognitive Psychology, Child Psychology, Abnormal Psychology, Social Psychology, Motivation, Learning, Memory, Personality, Emotions.
- **Literature**:Poetry, Novels, Drama, Literary Devices, Grammar, World Literature, Genres, Authors, Language Skills.
- **Mahabharat**:Characters, Wars, Teachings, Dharma, Kurukshetra Battle, Lineages, Stories, Lessons, Important Events.
- **. Ramayan**:Characters, Ayodhya Kand, Aranya Kand, Lanka War, Values, Stories, Lessons, Dharma, Key Events, etc.
- **Languages**:English, Hindi, Gujarati, Sanskrit, Tamil, Bengali, Urdu, Punjabi, Marathi, etc.
- **English Grammar**:Nouns, Pronouns, Verbs, Tenses, Adjectives, Adverbs, Conjunctions, Prepositions, Articles, Voice, Speech, Sentence Structure, etc.
- **Gujarati Grammar**:વ્યાકરણ, અક્ષરવિજ્ઞાન, સંધિ, સમાસ, વિભક્તિ, કાળ, વાક્યરચના, વાક્યપ્રકાર, અલોંકાર, શબ્દભંડોળ, etc.
- **Arts**:Painting, Drawing, Sculpture, Design, Craft, Handwork, Creative Art, Mixed Media, Art Styles, Creative Expression, etc.
- **Music**:Classical, Pop, Jazz, Hip-Hop, Rock, Blues, Folk, Instruments, Singing, Rhythm, Sound Production, etc.
- **Environmental Studies**:Ecology, Conservation, Biodiversity, Sustainability, Climate Change, Pollution, Resources, Energy, Environment Policy, etc.
- **Business Studies**:Management, Marketing, Finance, HRM, Entrepreneurship, Operations, Strategy, Business Law, Supply Chain, Analytics, etc.
- **Law & Legal Studies**:Constitutional Law, Criminal Law, Civil Law, Corporate Law, Family Law, Cyber Law, Property Law, Taxation, etc.
- **Astronomy & Space Science**:Astrophysics, Cosmology, Stars, Planets, Galaxies, Black Holes, Telescopes, Space Missions, Radiation, etc.
- **Sports & Physical Education**-Athletics, Football, Cricket, Yoga, Gymnastics, Swimming, Team Sports, Fitness, Outdoor Games, etc.
- **Fashion & Design**-Textile Design, Apparel Design, Styling, Digital Fashion, Couture, Accessories, Illustration, Trends, etc
- **Media & Film Studies**-Acting, Editing, Screenwriting, Cinematography, Film Theory, Journalism, VFX, Broadcasting, etc.
- **Photography & Visual Arts**-Portrait, Landscape, Wildlife, Digital Art, Painting, Sculpture, Mixed Media, Storytelling, etc.
- **Architecture & Interior Design**-Urban Planning, Sustainable Architecture, Interior Design, Furniture, Lighting, 3D Modeling, Construction, etc.
- **Meteorology & Weather Science**-Climatology, Cyclones, Forecasting, Instruments, Pressure Systems, Wind Patterns, Storms, etc.
- **Nanotechnology**-Nanomaterials, Nanomedicine, Nanoelectronics, Nanobiotech, Sensors, Nanorobotics, Thin Films, Quantum Dots, etc.
- **Public Administration & Governance**-Policy Making, Administration, Local Governance, Urban/Rural Systems, Finance, HRM, Ethics, Public Service, etc.
- **Hospitality & Hotel Management**-Front Office, Housekeeping, F&B, Tourism, Hotel Operations, Luxury Hospitality, CRM, Revenue Mgmt, etc.
- **Health & Nutrition**-Anatomy, Physiology, Dietetics, Vitamins, Fitness, Mental Health, Immunology, Public Health, etc.






### The Data Flow Story

1. **User Interaction**: The user opens the KalpQuiz application and chooses to generate or take a quiz.
2. **Authentication**: New users must sign up and register with their email.A verification link is sent to their email address.Only after clicking the verification link and completing verification can the user log in.
3. **Fetch Main Topics & Subtopics**: Main topics and subtopics are fetched from the backend and stored in IndexedDB for caching and faster subsequent loads.
4. **select Maintopic**: The user selects a main topic, which is temporarily stored in LocalStorage for quick access.
5. **select Subtopic**: Based on the chosen main topic, the user selects a subtopic retrieved from LocalStorage.
6. **select language, level**- The user chooses the preferred language, difficulty level, and whether repeated questions should be included.
7. **Type Number of Questions**- The user enters how many questions they want to generate, which deducts credits accordingly.
8. **Backend AI Processing (Gemini)**- The selected main topic, subtopic, difficulty level, repeated option, and question count are sent to the backend.The backend uses the Gemini API to generate quiz questions.
9. **Quiz Submission & Storage**- Upon submission, the generated quiz is saved locally in IndexedDB, allowing users to retake the quiz anytime.
10. **PDF Download**- Users can download the quiz as a PDF—with or without answers—using the integrated PDF generation feature.



## 🛠️ Complete Technology Stack

### Frontend Technologies

- **html2canvas (v1.4.1)**-Captures on-screen HTML elements as images for PDF generation.
- **jsPDF (v3.0.1)**-Converts captured content into downloadable, print-friendly PDF files
- **Parcel (v2.8.3)**-A zero-configuration web bundler used to compile, optimize, and serve the frontend code, ensuring fast builds and efficient asset management.
- **IndexedDB** -A browser-based database used to store cached main topics, subtopics, and previous quiz questions. This reduces backend API calls and allows users to reattempt quizzes even offline or without reloading data.
- **Local Storage**-KalpQuiz uses LocalStorage to manage essential client-side state and improve overall performance. It is used to store lightweight data such as:Authentication tokens,Token expiry timestamps,kalpquiz credit etc
- **Rozarpay** - Payment Integration







### Backend Technologies
- **Node.js + Express 5.1.0** – Server runtime environment and primary web framework used for building REST APIs.
- **MongoDB + Mongoose 8.17.0** – NoSQL database with schema-based ODM for managing users, topics, rooms, and quiz metadata.
- **Redis 5.8.0** – In-memory data store used for caching, rate limiting, and IP tracking.
- **JWT (jsonwebtoken 9.0.2)** – Stateless authentication mechanism used for secure login sessions.
- **bcrypt 6.0.0** – Secure password hashing for user authentication.
- **Google Gemini AI (@google/genai 1.13.0)** – AI engine used for generating quiz questions dynamically.
- **Razorpay 2.9.6** – Payment gateway integration for handling credit purchases, along with webhook verification.
- **Brevo Email API (sib-api-v3-sdk 8.5.0)** – Used for sending verification emails and transactional notifications.
- **CORS 2.8.5** – Enables secure cross-origin communication between the frontend and backend.
- **dotenv 17.2.1** – Manages sensitive configuration values through environment variables.
- **body-parser 2.2.0** – Middleware for parsing incoming JSON and form data requests.
- **express-rate-limit 8.0.1** – Protects the server from abuse by limiting repeated requests from the same IP.







## 🎨 Frontend Architecture (`frontend/`)


**Core Application Pages:**
- **`index.html`** - this is first page of website which is login 
- **`signup1.html`** - this is signup page
- **`zero.html`** - this this main topic page
- **`first.html`** - here user select subtopic
- **`second.html`** - this is quiz interface
- **`third.html`** - this is previous quiz page where user can give requiz
- **`fourth.html`** - here user requiz interface
- **`admin.html`** - this is admin panel for updating deleting maintopic, subtopic or change price and redis data.
- **`payment.html`**- payment interface where user can buy quiz credit
- **`createroom.html`**-here user can create quiz room
- **`forget.html`**- if user forget password
- **`reset`**- for reset password













## ⚙️ Backend Architecture (`backend/`)

The backend is a RESTful API server that handles all business logic, data persistence, and external integrations.

### Directory Structure Breakdown

### **`middlewares/`** - Contains all Express middleware functions used for authentication, authorization, and security controls.

- **`authMiddleware.js`** - Verifies JWT tokens and authenticates users before allowing access to protected routes
- **`isAdminMiddleware.js`** - Ensures only admin-level users can access admin-specific endpoints.
- **`rateLimiter.js`** - Custom rate-limiting logic powered by Redis to prevent API abuse and excessive requests.

**Why separate config?** These are critical system connections that need to be established before anything else runs. Keeping them separate makes the code more maintainable and testable.

#### `/models/` - Data Schemas

These define what our data looks like in MongoDB:

- **`maintopic.js`** - Stores main topics and their metadata.
- **`quizplancredit.js`** - Manages user quiz credits and purchased plans
- **`redisClient.js`** - Initializes and exports a reusable Redis client instance.
- **`room.js`** - Defines the Room structure for room-owner–roommate quiz sharing.
- **`user.js`** - User schema including email verification, password hashing, and roles.

**The Mongoose Magic**: These aren't just data definitions - they include validation, relationships, and business logic methods.







#### `routes/` - API Endpoints


- **`adminRoutes.js`** – Admin-specific operations such as adding main topics, subtopics, and managing data.
- **`auth.js`** – User registration, login, email verification, and authentication workflow.
- **`debugRate.js`** – Debug route for rate-limiting checks.
- **`protected.js`** – Routes accessible only to authenticated users.
- **`quiz.js`** – Quiz generation using Gemini AI, storing quizzes, managing quiz history.
- **`quizPlans.js`** – Handles credit purchase plans and pricing.
- **`razorpay.js`** – Creates Razorpay orders for payments.
- **`razorpaywebhook.js`** – Verifies Razorpay webhook events and securely updates user credits.
- **`Roommate.js`** – Roommate-specific APIs for fetching and solving shared quizzes.
- **`RoomOwner.js`** – APIs that allow room owners to create rooms and push quizzes to roommates.


### `.env`-Environment configuration
- API keys, database URIs, JWT secret, Razorpay keys, Brevo API key, Redis URL, etc.

### `server.js`-Entry point of the backend application















## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Redis server
- API keys for external services

### Environment Setup

Create `backend/.env` with:

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=

BREVO_API_KEY=

GEMINI_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

RAZORPAY_WEBHOOK_SECRET=
REDIS_URL= ```






### Running the Application

```bash
# Install dependencies
npm install

# Start backend (from backend/)
cd backend
npm start

# Start frontend (from frontend/)
cd frontend
npm run start
```

The frontend runs on `http://localhost:1234` and connects to the backend on `http://localhost:5000`.

## 🎯 Why This Architecture?

### Separation of Concerns

- **Frontend**: Focuses purely on user experience and interface
- **Backend**: Handles business logic, data, and external integrations
- **Database**: Optimized for data storage and retrieval

### Scalability Considerations

- **Stateless Backend**: JWT tokens mean any server instance can handle any request
- **Component Architecture**: Frontend components can be easily reused and tested



### Security Features

- **JWT Authentication**: Secure, stateless user sessions
- **Password Hashing**: bcrypt protects user credentials
- **CORS Configuration**: Controlled cross-origin requests

## 📊 Database Schema & Data Models

### User Model (`backend/models/user.js`)

```javascript
{
  username:{type:String,required:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: {type:String},
  resetPasswordExpires: {type:Number},
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSpecial:{type: Boolean,
    default: false,},
  creditQuiz:{type:Number,default:100},
  paymentHistory: [paymentSchema],  // <-- new array field
  roomHistory:[RoomHistorySchema]
}
```




### maintopic Model (`backend/models/maintopic.js`)

```javascript
const subtopicSchema = new mongoose.Schema({
  name: String,
  symbol: String
});

const mainTopicSchema = new mongoose.Schema({
  name: String,
  symbol:String,
  subtopics: [subtopicSchema]
});
```

### Quizplan Model (`backend/models/quizplancredit.js`)

```javascript
const quizPlanSchema = new mongoose.Schema({
  price: {type:Number,required:true},         // e.g. 100
  credits: {type:Number,required:true},      // e.g. 20
  title: {type:String,required:true},       // e.g. "20 Quiz Credits"
});

```


### Room Model (`backend/model/room.js`)
```javascript
const LoggedRoommateSchema = new mongoose.Schema({
  UserId: String,
  Username: String,
});

const SubmittedRoommateSchema = new mongoose.Schema({
  UserId: String,
  Username: String,
  Marks: String
});
const QuestionSchema = new mongoose.Schema({
  Question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  answer:String,
  
});




const RoomownerSchema = new mongoose.Schema({
  RoomOwnername:{type:String,required:true},
  RoomOwnerId:{type:String,required:true},
  PrivatePassword:{type:String,required:true},
  PublicPassword: { type: String, required: true},
  Studentnos:{ type: Number, required: true},
  RemainingStudentNos:{type:Number,required:true},
  Questionnos:{ type: Number, required: true},
  RoomcreatedDate:{type:Number,required:true},
  DurationofQuiz:{type:Number},//in seconds
  LoggedUserHistory: [LoggedRoommateSchema],
  SubmittedUserHistory: [SubmittedRoommateSchema],
  Testtiming:{type:Number},//time when test is live
  AllQuestions:[QuestionSchema],
  resetPasswordToken: {type:String},
  resetPasswordExpires: {type:Number},
  isOwner: {
    type: Boolean,
    default: true,
  }
});

```



## 🔌 Complete API Reference

### Authentication Endpoints (`/user`)

```javascript
POST    /add-main-topic          // Add new main topic
GET     /main-topics             // Get all main topics
DELETE  /main-topic/:id          // Delete a main topic by ID
PUT     /main-topic/:id          // Update a main topic by ID

GET     /adminplan               // Get all quiz credit plans
POST    /adminplan               // Create a new quiz credit plan
PUT     /adminplan/:id           // Update an existing quiz plan
DELETE  /adminplan/:id           // Delete a quiz plan by ID
```

```javascript
POST    /auth/signup                 // Register a new user + send email verification
POST    /auth/login                  // User login (with JWT token generation)
GET     /auth/verify                 // Verify email using token

POST    /auth/forgot-password        // Send password reset link to email
POST    /auth/reset-password         // Reset password using token

```


```javascript
GET   /debug/rate-limits      // View all Redis rate-limiter keys (Admin only)

```


```javascript
GET    /protected/profile                 // Get logged-in user's profile info
GET    /protected/main-topics-names       // Fetch only main topic names + symbols
GET    /protected/allmain&subtopic        // Fetch all main topics with all subtopics

```


```javascript
POST   /quiz/create                   // Create quiz with Gemini AI
POST   /quiz/createfornotreapeat      // Create quiz without repeating previous questions

```

```javascript
GET    /quizplan/plans       // Fetch all quiz credit plans (requires login)

```

```javascript
POST   /payment/create-order        // Create Razorpay order (requires login)
POST   /payment/verify-payment      // Verify signature & store payment history
POST   /payment/verifybywebhook     // (Handled internally by Razorpay webhook - commented)

```


```javascript
POST /payment/verifybywebhook   // Razorpay webhook to verify signature & add credits

```

```javascript
POST /room/createRoom      // Create a new quiz room (requires login)

```










## 📞 Support & Contributing

For technical support or contributions, please refer to the project repository and follow the established coding standards and practices outlined in this documentation.
