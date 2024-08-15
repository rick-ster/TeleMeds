TeleMeds - Telemedicine Platform
Overview
TeleMeds is a comprehensive telemedicine platform that enables users to access medical services online. The platform allows users to register, log in, view detailed information about medicines, book appointments, and explore doctor profiles—all while managing data through a MySQL database.

Features
1. User Authentication
Registration: Users can create an account by registering their credentials, which are securely stored in a MySQL database.
Login: Registered users can log in to access the platform's features.
2. Medicine Information
Medicine Page: Users can browse a list of medicines. Each medicine has detailed information retrieved from the database.
3. Appointment Booking
Appointment Page: Users can book appointments with doctors. The appointment details are stored in the database for future reference.
4. Doctor Profiles
Doctor Page: Users can view profiles of doctors, including their specialties and availability. All doctor information is managed through the database.
Technologies Used
Frontend:
React.js: A JavaScript library for building user interfaces.
HTML5 & CSS3: For structuring and styling the web pages.
Axios: For making HTTP requests from the frontend to the backend.
Backend:
Node.js & Express.js: A JavaScript runtime and framework for building server-side applications.
MySQL: A relational database management system for storing user data, medicine details, appointment bookings, and doctor information.
Sequelize: An ORM for Node.js to interact with MySQL.
Other:
Git: Version control system for tracking changes in the project.
GitHub: Hosting the project repository.
Database Structure
The platform uses a MySQL database named telemeds with the following tables:

users

sql
Copy code
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
appointments

sql
Copy code
CREATE TABLE appointments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    altPhone VARCHAR(20) DEFAULT NULL,
    comment TEXT DEFAULT NULL,
    date DATE DEFAULT NULL,
    time TIME DEFAULT NULL,
    firstVisit TINYINT(1) DEFAULT NULL,
    PRIMARY KEY (id)
);
doctorlist

sql
Copy code
CREATE TABLE doctorlist (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    rating DECIMAL(3,1) NOT NULL,
    image VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
doctordetail

sql
Copy code
CREATE TABLE doctordetail (
    id INT NOT NULL AUTO_INCREMENT,
    doctor_id INT NOT NULL,
    description TEXT DEFAULT NULL,
    qualifications TEXT DEFAULT NULL,
    experience INT DEFAULT NULL,
    contact_number VARCHAR(15) DEFAULT NULL,
    email VARCHAR(50) DEFAULT NULL,
    address TEXT DEFAULT NULL,
    hospital VARCHAR(100) DEFAULT NULL,
    languages TEXT DEFAULT NULL,
    specialties TEXT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (doctor_id) REFERENCES doctorlist(id)
);
medicines

sql
Copy code
CREATE TABLE medicines (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (id)
);
Setup and Installation
Prerequisites:
Node.js and npm installed on your machine.
MySQL installed and running.
Steps:
Clone the repository:

bash
Copy code
git clone https://github.com/rick-ster/TeleMeds.git
cd TeleMeds
Install backend dependencies:

bash
Copy code
cd backend
npm install
Configure the database:

In the backend/config directory, create a .env file with your database credentials:
plaintext
Copy code
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=telemeds
Run the backend server:

bash
Copy code
node server.js
Access the application:

Open your browser and navigate to http://localhost:3000 to access the TeleMeds platform.
Contact
For any inquiries or issues, please contact the project maintainer at mtrathore7@gmail.com.

