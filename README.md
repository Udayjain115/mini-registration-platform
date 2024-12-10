The application emphasizes modularity and reusability by extracting reusable components where appropriate, making the codebase easy to follow and maintain.

The codebase is organized into two main parts: the backend and the frontend.

Models: Both the event/userDetails files define the schema for respective data using mongoose, using custom validation to ensure things like uniqueness and valid email addresses

Middleware: The middleware was extracted into its own component and handles errors from API requests and sends the responses back to the frontend

Frontend
Components: There are 4 different components all re-useable ensuring that there is minimal repitition

Local Storage was used so that if the user ever tries to manually access any pages when they should not be allowed to (ie a non admin user logging into admin, gets redirected to the landing page and remains logged in), they can be redirected and stay logged in, to do this a custom hook (useCurrentUser) was used to allow me to manage the current users state and the local storage in a way that didnt require me to write a lot of code every time i needed to use the setCurrentUser prop

By making the Form component accept arrays of objects, i was able to have differnt buttons with different functionalities with potentially different styles while using the same component, this saved me from having to create and recreate multiple form components.

The design is also responsive, utilising flexbox and bootstrap so that the site works across different screen sizes for a webpage

Error handling is done through the backend, and appropiate error notifications pop up on the frontend whenever any error occurs, especially when from the users input, such as an invalid email address, invalid login details, duplicate event and duplicate user

Deployed Site:
https://mini-registration-platform.onrender.com
