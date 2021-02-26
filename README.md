# flashcard-app
Project description: Flashcard-o-matic
A local school has decided to put together a flash card application, Flashcard-o-matic, to help their students study online. Teachers will use this application to create decks of flash cards for the subjects that they teach, and students will study the decks. The school needs you to build the application that the students and teachers will use.

Home page for Flashcard App:

Bootstrap 4 is included with the starter HTML. You're welcome to use vanilla CSS or Bootstrap 4 for styling your project. However, your finished product doesn't have to match the styles in the provided screenshots, because you won't be assessed on the styling or responsiveness of your project.

For detailed instructions on how to complete this project, consult the Instructions document in the Qualified assessment interface.

Learning objectives
This project is designed to test your ability to work with rendering and state management using React. Before taking on this project, you should be comfortable with the learning objectives listed below:

Installing packages via NPM
Running tests from the command line
Writing React function components
Creating routes, including nested routes, using React Router
Using hooks like useState(), useParams(), and useHistory()
Debugging React code through console output and using the VS Code debugger
Steps to complete
To complete this project, you must do the following:

Write code that passes all the tests in the Qualified assessment in this checkpoint.
Write code that passes all of the requirements in the project rubric below, and submit your GitHub repo link to the grading team in the next checkpoint.
Remember to sync this Qualified project with your local machine so that you can commit it to GitHub in the next checkpoint.

Project rubric
For your project to pass, all of the following statements must be true.

All tests are passing in Qualified.
All the props are treated as read-only.
State is never directly mutated; it's only updated via setState().
The Edit Card and Create Card screens share the same form component.
The useEffect() hooks have the appropriate dependencies listed in the dependency array.
State is "lifted up" to the parent component where appropriate.
All inputs are controlled. Generally, there is a warning on the console when you type into the input box and it changes from uncontrolled to controlled. The warning looks like this: "Warning: Input is changing an uncontrolled input of type <text|number|etc.> to be controlled." This is often the result of initializing the state to null or undefined.
