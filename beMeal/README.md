# Welcome to BeMEAL!
CS35L Winter 2025 Project Developed By Team **Sn-Hackers**! See below for project information and setup instructions.

## Overview
1. [Members](#project-members)
2. [Description](#project-description)
3. [Features](#special-project-features)
4. [Requirements](#additional-project-requirements)
5. [SETUP INSTRUCTIONS: How To Run Project Locally](#how-to-run-project-locally)

## Project Members
Backend Developers: Lorelei Tang, Ava Gonick, Kayla Hamakawa

Frontend Developers: Lillian Gonick, Max Lee

## Project Description
Inspired by the spontaneity and authenticity of social media applications like BeReal, Beli, and Instagram, “BeMEAL” is a website application designed to bring young adults together through a shared love of food. BeMeal allows users to capture and share their meals in real time, encouraging a genuine and unfiltered view of what people are eating around the world. The app prompts users to take a photo of whatever meal they’re eating at that moment for two hour-long periods during mealtimes throughout the day which then appears on their friends’ feed. BeMeal also encourages community by enabling users to interact with others on the platform through the use of features such as following friends as well as scrolling through their friends' posts. Whether it’s a home-cooked dish, a restaurant meal, or a quick snack, the goal is to connect people through the universal experience of food while celebrating diversity in culinary habits.

## Special Project Features
1. Users can upload public photos of their food throughout the day in real time. (Other users can see their posts)
2. Users can update their personal information, including Username, Password, Bio, and Profile Picture.
3. Users can accumulate a "streak" if they continuously post during a designated time window every day.
4. Users can follow and unfollow other users, expanding their network and connections across the platform.
5. Users will be automatically logged out of their accounts after 1 hour for additional security.

## Additional Project Requirements
- ✔ App can display dynamic data to the user.
- ✔ App can upload data from the client to the back-end.
- ✔ User can meaningfully search through server data.
- ✔ Meaningful understanding of Git is exemplified through version control.
- ✔ Detailed README file that accurately and completely describes how to run the app locally.
- ✔ Project is generally visually pleasing and easy to navigate.

## SETUP INSTRUCTIONS: How to Run Project Locally
1. Clone this github repository.
    ```Bash
    git clone https://github.com/ltanggit/beMeal.git
    ```
2. Open a new Terminal Window if you don't already have one open already.
        
        In VSCode: **Ctrl-Shift-`**
3. Navigate to the correct directory with this command:
    ```Bash
    cd bemeal
    ```
4. *Ensure you have node.js downloaded on your local machine and install the correct dependencies:
    ```Bash
    npm install
    ```
5. Navigate to the "Server" directory:
    ```Bash
    cd Server
    ```
6. Run the backend:
    ```Bash
    node server.js
    ```
7. Open a new terminal concurrently.

        In VSCode: Ctrl-Shift-`
8. Run the frontend:
    ```Bash
    npm run dev
    ```
9. Open the outputted link on your local browser.

        In VSCode: Cmd-Click --> http://localhost:5174/
10. Have fun!


**Additional Notes:**

If you run into installation errors on **STEP 4**, you may have to run the following commands: 
- **"Cloudinary"-related** Errors:
    ```Bash
    npm install multer-storage-cloudinary --legacy-peer-deps
    ```
    **OR**
    ```Bash
    npm install --force
    ```
- **"Import Axios"-related** Errors:
    ```Bash
    npm install axios
    ```
- **"Node-Modules"-related** Errors:
    ```Bash
    rmdir node_modules
    npm install
    ```

## Credits
- [BeReal](https://bereal.com/)
- [MongoDB Documentation](https://mongoosejs.com/docs/)
- [Cloudinary Documentation](https://cloudinary.com/documentation/programmable_media_overview)
- [Getting Started With Vite](https://vite.dev/guide/)
- [Stack Flow](https://stackoverflow.com/questions)
- Eggert, Paul. Computer Science 35L Winter 2025 Lectures.


