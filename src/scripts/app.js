// This imports the 'style.css' file, compiles it into JavaScript, and puts that code into 'main.bundle.js'
import '../style.css';

// 'Favicon' will contain the final url of the image after processing
import Favicon from '../favicon.png';

// GraphQL ***********************************************************************************************

// Configure your application
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

// Enable queries, mutations, and subscriptions

// Mutations------------------------------------------------------------------------------------------------
// import { API, graphqlOperation } from 'aws-amplify';
import { createTodo, updateTodo, deleteTodo } from '../graphql/mutations';

const todo = { name: "My first todo", description: "Hello world!" };

/* create a todo */
await API.graphql(graphqlOperation(createTodo, {input: todo}));

/* update a todo */
// await API.graphql(graphqlOperation(updateTodo, { input: { id: todoId, name: "Updated todo info" }}));

/* delete a todo */
// await API.graphql(graphqlOperation(deleteTodo, { input: { id: todoId }}));

// Queries-----------------------------------------------------------------------------------------------------
// import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from '../graphql/queries';

const todos = await API.graphql(graphqlOperation(listTodos));

// Subscriptions------------------------------------------------------------------------------------------------
// import { API, graphqlOperation } from 'aws-amplify';
import { onCreateTodo } from '../graphql/subscriptions';

// Subscribe to creation of Todo
const sub = API.graphql(
    graphqlOperation(onCreateTodo)
).subscribe({
    next: (payload) => {
      const createdTodo = payload.value.data?.onCreateTodo;
      console.log(createdTodo);
    }
});

// Stop receiving data updates from the subscription
sub.unsubscribe();

//*********************************************************************************************************


function addFavicon(faviconUrl) {
    // Create a link element
    var link = document.createElement('link');
    link.rel = 'icon'; // Set the relationship type to 'icon'
    link.href = faviconUrl; // Set the href attribute to the URL of your favicon image
    link.type = 'image/x-icon'; // Set the MIME type for the favicon (usually image/x-icon)

    // Append the link element to the document head
    document.head.appendChild(link);
}

addFavicon(Favicon)

// It is good practice to initialize variables at the top of the program
const date = new Date()
const hour = date.getHours()

// After DOM loads so element exists.
document.addEventListener('DOMContentLoaded', function() {
    if (hour >= 17 || hour <= 7) {
        let element = document.body
        element.style.backgroundColor = "grey"
    }
})