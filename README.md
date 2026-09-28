### Online Resume Creator

A dynamic, user-friendly React application that allows users to build, customize, and view their professional resumes in real-time. Built with a focus on seamless state management and customizability. 

### Features

- **Real-Time Preview:** Watch your resume update instantly as you fill out your information.
- **Dynamic Content Management:** Add, update, and delete multiple entries for education, work experience, and technical skills.
- **Typography Customization:** Choose from a curated selection of professional fonts including: 
  - Sans-Serif: _Inter, DM Sans, Source Sans 3_
  - Monospace/Modern: _Space Grotesk_
  - Serif: _Times New Roman, Playfair Display, Noto Serif_

- **Theme Support:** Features a built-in Dark Mode toggle for comfortable viewing.
- **Smooth Navigation:** Includes a handy "Return to Top" button for seamless scrolling.

### Tech Stack

- **Frontend Framework:** React (Functional Components & Hooks)
- **Styling:** CSS3 (Custom themes and layout variables)
- **Icons:** FontAwesome (v6)

### Component Architecture

The application is structured into modular, reusable components managed via localized and lifted state: 

- Header: Displays the application title and author credits.
- Navbar: Houses configuration controls like theme toggles and font selection dropdowns.
- Form: Captures user inputs for Basic Info, Education, Experience, and Skills, passing compiled data upstream upon submission.
- Display: Renders the formatted resume and handles row deletion for dynamic lists (Education & Experience).
- ReturnBtn: A floating action button anchoring users back to the header layout.

### Core Logic

The application leverages centralized React state management within App.js: 

javascript

// State Hooks for Form Submission & Resume Render
const [BasicInfo, setBasicInfo] = useState({});
const [Education, setEducation] = useState([]);
const [Experience, setExperience] = useState([]);
const [Skills, setSkills] = useState([]);

// Modular Mutation Handlers
const handleDeleteEducation = (index) => {
const updatedEducationList = [...Education];
updatedEducationList.splice(index, 1);
setEducation(updatedEducationList);
};

Use code with caution.

### Getting Started

Follow these steps to set up the project locally: 

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine. 

### Installation

1. **Clone the repository:** 

bash

git clone https://github.com/your-username/online-resume-creator.git
cd online-resume-creator

Use code with caution. 2. **Install dependencies:** 

bash

npm install

Use code with caution. 3. **Start the development server:** 

bash

npm start

Use code with caution.

The app will run locally at http://localhost:3000.
