# 🌐 Aas-Paas | Find What’s Around You

We often miss out on local happenings — whether it's a community festival, a college event, or important alerts like unexpected weather changes.  
**Aas-Paas** is built to solve that.

It’s a simple yet practical web platform that keeps you informed about events, announcements, and live weather updates from your surroundings.  

This project was developed as part of our **capstone project**, with the aim of making local information easily accessible through a clean and user-friendly interface.


---

## 🚀 Live Website

👉 [Explore Aas-Paas Live](https://aas-pass-major-project.onrender.com/)

---

## 💡 Why We Built This

We noticed a recurring issue — important local updates were scattered across too many places: WhatsApp groups, notice boards, and posters that often went unnoticed.

This made it difficult for people to stay informed about what was happening around them.

So, we decided to build **Aas-Paas** — a single platform where users can simply choose their city and instantly access all relevant updates, events, and alerts in one place.


---

## 🔧 Technologies & Tools

This project is built using the **MERN stack** and some helpful external APIs:

- **Frontend:** HTML, CSS  
- **Templating Engine:** EJS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **Deployment:** Render  

**APIs Used:**
- 🌤 [AccuWeather API](https://developer.accuweather.com/) – For live weather updates  
- 📰 [Newsorg.in API](https://newsapi.org/) – To fetch local event-related news  

---

## 🔍 Main Features

- 🌇 City selection to personalize your local feed  
- 📅 Live event listings via APIs  
- 🌦️ Weather information for selected cities  
- 📢 Admin-controlled announcements via MongoDB  
- ⚡ Smooth UI for quick user access  

---

## 👨‍💻 Our Team

We are a team of 4 students who built Aas-Paas collaboratively:

| Name             | Contribution                  |
|------------------|-------------------------------|
| **Aryan Kartik** | Frontend design and styling         |
| **Vipul**         | Full-stack integration    |
| **Kaushal**       | Announcement database & layout |
| **Anurag**        | Announcement database & layout |

---

## 📖 What We Learned

Throughout the project, we gained hands-on experience in:

- Working with real-time APIs
- Applying the MERN stack in a real-world scenario
- Writing clean and reusable backend code
- Debugging and collaborating effectively
- Deploying a full-stack app to the web

---

## 📂 Project Structure

aas-pass-major-project/
├── data/ # Contains JSON-formatted static data
├── models/ # Mongoose schemas for MongoDB
├── node_modules/ # Auto-generated npm packages
├── public/ # Static files like CSS and images
│ └── CSS/ # Main stylesheet
├── routes/ # All the Express route handlers
├── utils/ # Utility functions
│ ├── errorHandler.js
│ └── wrapAsync.js
├── views/ # EJS templates for UI rendering
│ ├── *.ejs # Templates for all pages
├── .env # Environment variables (API keys, DB URI, etc.)
├── .gitignore # Ignored files/folders for Git
├── app.js # Main Express app entry point
├── middleware.js # Custom middleware functions
└── schema.js # Additional schemas

## 📬 Contact

Want to give feedback or collaborate?  
Feel free to [reach out](mailto:aryan_24a12res148@iitp.ac.in) or connect on [GitHub](https://github.com/aryankartik)!

---

> © 2025 Aas-Paas Team. Built with ❤️ as part of our college capstone project.


