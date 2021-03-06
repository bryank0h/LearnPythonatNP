# ID Assignment 2:<br>Learn Python at Ngee Ann Polytechnic / LearnPythonatNP
**Team Members: Bryan Koh, Lee Wei Jun Nicholas**

For this assignment, we will be working on a website which educates and teaches students in Ngee Ann Polytechnic about the fundamentals/basics of Python. Our goal is set out to enhance and gamify the experience of learning the Python language, while being able to hone their skills via our web application. Our target audience would be to benefit students of Information Technology, or any related courses that will make use of the language.

## Design Process

### Login / Logout
As students would want their progress to be saved, it is important that a login/logout feature to exist. Students would be able to use their email to log in to our website or create an account with an unregistered email.

### Tutorial Mode
As we wanted to create a page where students are able to visit and study the different basic Python concepts at their own pace, we have complied the lessons from Programming I syllabus into an all-in-one page. Students are able to read the chapters to learn/revise the content. Their progress is also saved and completed chapters are highlighted green, making this an intuitive mode of learning.<br>

### Speed Training Mode
Learning should not stop at memorising concepts, but should be further enhanced with exposure and experience. This is where Speed Training Mode come into play. In Speed Training Mode, it is assumed that students have already aquired the basic knowledge and this is the mode to challenge themselves. They have an option of two difficulties, easy and standard. Easy mode will be in the form of MCQ questions, while Standard mode will be in the form of Fill-in-the-Blank coding questions. The students' task will be to answer a set of 10 randomized questions correctly under a set time. They will also earn points depending on the time spent for each question (Points become less when more time is used to answer the questions).<br><br>
With this form of learning, not only will students be exposed to many different questions, they will also train their minds to think critically and solve problems quickly. After all, programming heavily relies on one's capability to come up with solutions to problems.

### Other considerations to gamify the experience
Since learning should not be a miserable experience, we have come up with ways which will enhance their learning experience.<br><br>
The profile picture feature is a fun way for users to customize their online identity and this will be shown off in the leaderboard in speed training. The leaderboard in speed training consist of easy mode and standard mode. Users can view how they fare against other students who have attempted either easy mode or standard mode. A healthy competition and rivalry takes learning to a new level! Lastly, a certificate will be presented upon getting maximum points for either difficulty in Speed Training Mode. Nothing feels better than a sense of achievement!

## Features

- **Feature 1**: Users must log in into their accounts to get started, or create an account with a unique username and an unregistered email.<br>
<img src="Images/README/login.png" width="300px;">

- **Feature 2**: Users can select a random profile picture upon clicking the "Change profile picture" button or the profile picture itself.<br>
<img src="Images/README/profilepic.png" width="200px;">

- **Feature 3**: In Tutorial Mode, upon completing a chapter and clicking the mark chapter as complete button, their progress will be saved. In the chapter selection menu, completed chapters will be marked green.<br>
<img src="Images/README/completedchapter.png" width= "300px;">

- **Feature 4**: In Speed Training mode, the user's points and time spent will be recorded and saved. This will be utilized in the leaderboard feature which will be explained next.<br>
<img src="Images/README/trainingtime.png" width="300px;">

- **Feature 5**: The leaderboard in speed training mode displays two categories, Easy mode and Standard mode. The leaderboard is ranked based on number of points earned, then the timing.<br>
<img src="Images/README/leaderboard.png" width="600px;">

- **Feature 6**: In Speed Training mode, if the user scores the maximum amount of points possible in either Easy mode or Standard mode, a customized certificate will be available for the user to view and download. Design of the certificate differ between Easy mode and Standard mode.<br>
<img src="Images/README/certificate.png" width="400px;">

- **Feature 7**: If the user wants to view their certificates again, they can do so in the main menu page. A button "Download Certificates" is available for the user to download his/her certificates.<br>
<img src="Images/README/downloadcert.png" width="400px;">

- **Feature 8**: A 'Report a Problem' page is available for users to report issues encoutered, as well as to find contact details.<br>
<img src="Images/README/report.png" width="300px;">

## Technologies Used
- <a href="https://www.adobe.com/sg/products/xd.html">Adobe XD</a> <br>
For creating a wireframe of the website.

- <a href="https://www.adobe.com/sg/products/illustrator.html">Adobe Illustrator</a> <br>
Used to design the backgrounds of the website.

- <a href="https://code.visualstudio.com/">Visual Studio Code</a> -> HTML, CSS & JavaScript <br>
Used to code the website.

- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">HTML Web Storage API: LocalStorage</a> <br>
Used to store user data locally within the user's browser.

- <a href="https://jquery.com/">jQuery</a> <br>
Used to simplify HTML document traversal, manipulation, event handling, animation and Ajax.

- <a href="https://sweetalert2.github.io/">sweetalert2</a> <br>
Used for responsive and customizable popup boxes in the website.

- <a href="https://unsplash.com/developers">Unsplash Image API</a> <br>
Used for getting images based on the collections from Unsplash. This is used for the profile picture feature on the website.

- <a href="https://lottiefiles.com/">LottieFiles</a> <br>
Used for some animations in the website.

- <a href="https://restdb.io/">restdb.io</a> <br>
Used to store important data of users.

## Testing 

**1. Login Validation**
   1. Key in non-existing email address/wrong password/wrong email.
   2. Ensure that an error message appears indicating that invalid credentials has been keyed in, hence denying login.

**2. Login Success**
   1. Key in correct email and password.
   2. Ensure that user is successfully logged in and led to main menu page.

**3. Create Account Validation, Part 1**
   1. Key in email address / usernames that has already been registered.
   2. Ensure that error messages appear indicating that email address has been registered, or username has already been taken.

**4. Create Account Validation, Part 2**
   1. Enter password.
   2. Enter non-matching password in the 're-enter password' field.
   3. Ensure that an error message appear indicating that password does not match.

**5. Create Account Validation, Part 3**
   1. Leave any fields blank.
   2. Ensure that there is a popup indicating that required fields must be entered.

**6. Create Account Success**
   1. Fill in a username that has not been taken, as well as an unregistered email.
   2. Enter password and re-enter password correctly.
   3. Ensure that account is created successfully, and user is taken to the main menu.

**7. Entering into website via other pages without logging in**
   1. Enter URL of any pages other than the homepage or create account page, while not logged in.
   2. Ensure that there is an error popup indicating that the user is not logged in.
   3. User is then taken back to the homepage.

**8. While already logged in, the user is at the homepage or create account page**
   1. While already logged in, go to the URL of the homepage or create account page.
   2. Ensure that there is a popup indicating that the user has already been logged in.
   3. User is then taken to the main menu page.

**9. Change Profile Picture, Part 1**
   1. In main menu page, click on either the profile picture or "Change profile picture".
   2. Click Next.
   3. Ensure that a new picture is displayed.

**9. Change Profile Picture, Part 2**
   1. In main menu page, click on either the profile picture or "Change profile picture".
   2. Click Save.
   3. Ensure that all internal links are disabled and not shown on the website, and the user is prompted to wait for the profile picture to update.
   4. Page will reload after the waiting time is complete.

**10. Download Certificates**
   1. In main menu page, click on "Download Certificates".
   2. Ensure that all internal links are disabled and not shown on the website, and a lottie animation is shown indicating to wait.
   3. Once complete, popup will appear for the user to download certificate(s). If user has only scored maximum points for easy mode, only the certificate for easy mode is available for download. If user has only scored maximum points for standard mode, only the certificate for standard mode is available for download. If user has scored maximum points for both modes, both certificates are available for download. If user has not scored maximum points for any difficulty, no certificates will be available for download.
   4. Click "Download".
   5. Ensure that certificate is downloaded properly.

**11. Report a Problem, Part 1**
   1. In the "Report a Problem" page, leave the textarea blank.
   2. Click "Report"
   3. Ensure that form is not submitted.

**12. Report a Problem, Part 2**
   1. In the "Report a Problem" page, fill in the textarea.
   2. Click "Report"
   3. Ensure that a thank you popup message appears.

**13. Logout**
   1. In the main menu page, click "Logout"
   2. Ensure that a popup appears indicating that the user has logged out.

**14. Progress saved for Tutorial Mode**
   1. In the tutorial mode page, click on any of the chapters.
   2. At the bottom of the page, click on "End of Chapter XXX. Click here to mark Chapter XXX as complete!".
   3. Ensure all buttons are disabled and not displayed.
   4. Ensure that a popup appears indicating that status has been updated, prompting the user to wait.
   5. Page will reload.
   6. Ensure that the completed chapter is marked with a green background, and the progress bar is updated.
   7. Click on the completed chapter.
   8. Ensure that the completion button at the bottom of the page is not displayed.

**15. 100% Completion Tutorial Mode**
   1. In the tutorial mode page, complete all chapters by clicking on the completion button for each chapter.
   2. Ensure that all chapters are marked with a green background, and a trophy appears with a congratuations message.
   3. Ensure that the progress bar is full.

**16. Reset Completion**
   1. In the tutorial mode page, click on "Reset Completion".
   2. Ensure that all buttons are disabled and not displayed, and a message appears indicating that the progress is being reset.
   3. Ensure that a popup appears that the status has been updated.
   4. The page will reload.
   5. Ensure that no chapters are being marked with a green background.
   6. Ensure that there is no trophy or congratulations message.
   7. Ensure that the progress bar is empty.
   8. Ensure that the completion button appears for all chapters.

**17. Speed Training Easy mode, Part 1**
   1. Click on an option.
   2. Ensure that the selected option remains blue.
   3. Ensure that when the submit button is pressed, the answer is checked and a popup appears indicating whether the answer is correct or not correct.
   4. User is led to the next question.

**18. Speed Training Easy mode, Part 2**
   1. Click on an option.
   2. Click on another option.
   3. Ensure that the previous selected option is deselected, and the new option is selected.

**19. Speed Training Easy mode, Part 3**
   1. Do not select any options.
   2. Click on the submit button.
   3. Ensure that a popup appears prompting the user to answer the question.
   4. Ensure that the timer is still running.

**20. Speed Training Easy mode, Part 4**
   1. Let the time run until no time is left.
   2. Click or do not click on any options.
   3. Click on the submit button.
   4. Ensure that a popup appears indicating that the user has exceeded the time.
   5. User is led to the next question.

**21. Speed Training Standard mode, Part 1**
   1. Fill in all the blanks.
   2. Click on the submit button.
   3. Ensure that a popup appears indicating whether the user has answered correctly or incorrectly.
   4. User is led to the next question.

**22. Speed Training Standard mode, Part 2**
   1. Leave all blanks blank.
   2. Click on the submit button.
   3. Ensure that a popup appears indicating that the user has answered the question wrongly.
   4. User is led to the next question.

**23. Speed Training Standard mode, Part 3**
   1. Let the time run until no time is left.
   2. Click on the submit button.
   3. Ensure that a popup appears indicating that the user has exceeded the time.
   4. User is led to the next question.

**24. Speed Training Results screen (for both easy and standard)**
   1. After completing all 10 questions, ensure that the user is taken to the results screen, showing the points scored and total time taken.
   2. If the user gets the maximum points possible for the particular mode, ensure that a certificate is shown and the user can click on the "Download" button to download the certificate.

**25. Speed Training Leaderboard**
   1. In Speed Training mode page, click on "Leaderboard".
   2. Ensure that there is a lottie animation, indicating that the leaderboard is loading.
   3. Click on either Easy Mode button or Standard Mode button.
   4. Ensure that the respective leaderboard is displayed.
   5. Ensure that the leaderboard is ranked by points scored, followed by time taken.

**26. Entering into another training**
   1. In Speed Training mode, complete a training session.
   2. Click on "Stop Training" at the results page.
   3. Select a difficulty.
   4. Ensure that a popup appears indicating that the page has to reload as a session has been completed previously.

**27. Cheating, Part 1**
   1. In Speed Training mode, select any difficulty and begin.
   2. Go into Inspect Element and change the points to above the maximum points.
   3. Answer the question in any way. (Correct, Wrong, Times Up)
   4. Ensure that in the next question, the points has been reset to 0000 or 00000.

**28. Cheating, Part 2**
   1. In Speed Training mode, select any difficulty and begin.
   2. Go into another browser tab or open other applications.
   3. Ensure that a popup appears on the quiz indicating that another browser tab or application is opened.
   4. The page will reload.

**Other validations**
- Ensure that there are no broken links, and all external links are opened on a new tab.
  
## Credits

### Media
- Blue Python logo downloaded from https://www.pinclipart.com/downpngs/ibRbRmJ_python-programming-language-computer-programming-computer-python-logo/
- Original Python logo downloaded from https://en.wikipedia.org/wiki/Python_(programming_language)#/media/File:Python-logo-notext.svg
- Gray fluid background frame design element downloaded from https://www.rawpixel.com/image/2339978/free-illustration-png-frame-pattern-abstract
- GIF on "Speed Training" page obtained from https://tenor.com/view/road-runner-coyote-wile-e-coyote-chasing-hunting-gif-18107569
- Image on "Report a Problem" page obtained from https://www.ac-illust.com/main/detail.php?id=22420214&word=%E7%8C%AB%E3%80%80%E5%95%8F%E9%A1%8C%E3%81%AA%E3%81%97&searchId=3053327208
- Easy Mode Certificate template obtained from https://templates.office.com/en-sg/wave-border-employee-excellence-award-tm03460503
- Standard Mode Certificate template obtained from https://templates.office.com/en-sg/confetti-thank-you-certificate-tm03444065
- Favicon images obtained from https://remixicon.com/

### Fonts
- *Maven Pro* and *Open Sans* obtained at https://fonts.google.com/

## GitHub Page
- https://bryank0h.github.io/LearnPythonatNP

## Video Pitch
https://user-images.githubusercontent.com/93893634/154657174-2581169b-96ab-4c80-af8d-608fa013a165.mp4

Video at Google Drive: https://drive.google.com/drive/folders/14d_J5MKSr5aOHrfspzqqF8hnT1ixCE4i?usp=sharing
