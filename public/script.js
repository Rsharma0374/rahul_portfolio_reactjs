
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabname).classList.add("active-tab")
}

var sidemeu = document.getElementById("sidemenu");
function openmenu() {
    sidemeu.style.right = "0";
}
function closemenu() {
    sidemeu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbyyHYabxsxlfG8wdKa4BIMwhtqY7-nPTg-LqNcxy8L_D6Oj6mv6DFa1TpWDL7nGazEo/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

// form.addEventListener('submit', e => {
//     e.preventDefault()
//     fetch(scriptURL, { method: 'POST', body: new FormData(form) })
//         .then(response => {
//             msg.innerHTML = "Message sent successfully"
//             setTimeout(function () {
//                 msg.innerHTML = ""
//             }, 2000)
//             form.reset()
//         })
//         .catch(error => console.error('Error!', error.message))
// })

document.getElementById("showButton").onclick = function () {
    var hiddenVAPT = document.getElementById("hiddenVAPT");
    var hiddenPrivilege = document.getElementById("hiddenPrivilege");
    var showButton = document.getElementById("showButton");

    if (hiddenVAPT.style.display === "none" || hiddenVAPT.style.display === "") {
        hiddenVAPT.style.display = "block";
        hiddenPrivilege.style.display = "block";
        showButton.textContent = "See Less";
    } else {
        hiddenVAPT.style.display = "none";
        hiddenPrivilege.style.display = "none";
        showButton.textContent = "See More";
    }
};

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const submitBtn = document.getElementById('submit-btn');

        // Disable the submit button
        submitBtn.disabled = true;
        
        // Replace button text with a loading icon
        submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';

        const formData = new FormData(this);

        // Convert form data to JSON
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Make API call
        fetch('https://connector.guardianservices.in/email-connector/send-portfolio-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.oBody && data.oBody.payLoad) {
                return data.oBody && data.oBody.payLoad.status;
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
             // Reset button text and enable it
             submitBtn.innerHTML = 'Submit';
             submitBtn.disabled = false;

            // Handle API response
            console.log(data);
            document.getElementById('msg').textContent = 'Message sent successfully!';
            document.getElementById('contact-form').reset(); // Reset the form
        })
        .catch(error => {
            // Reset button text and enable it
            submitBtn.innerHTML = 'Submit';
            submitBtn.disabled = false;

            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('msg').textContent = 'An error occurred while sending the message.';
        });
    });
});

