// This imports the 'style.css' file, compiles it into JavaScript, and puts that code into 'main.bundle.js'
import '../style.css';

// 'Favicon' will contain the final url of the image after processing
import Favicon from '../favicon.png';

// GraphQL ***********************************************************************************************

// Configure your application
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

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