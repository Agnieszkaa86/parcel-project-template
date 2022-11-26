// https://jsonplaceholder.typicode.com/users
const statusIndicator = document.querySelector(".status");
const usersList = document.querySelector(".users-list");
let usersData = [];

function writeCurrentStatus(text){
    statusIndicator.innerHTML = text;
}

function printUsers(users) {
    let userListHTML = "";
    users.forEach((user) => {
        userListHTML += `
        <li data-userid="${user.id}">${user.name}</li>
        `;
    });
    usersList.innerHTML = userListHTML;
}

function makeUsersClikable() {
    const users = document.querySelectorAll(".users-list li")
    users.forEach((user) => {
        user.addEventListener("click", (event) => {
            console.log("Click event", event.target.dataset.userid);
            const userId = event.target.dataset.userid;
            fetchSingleUser(userId);
        })
    })
}
function fetchSingleUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log("single user data: ", data);
        });
}
writeCurrentStatus("Loading...");

const fetchUsers = fetch("https://jsonplaceholder.typicode.com/users");

fetchUsers
    .then((response) => {
        // console.log("response: ", response);
        const usersData = response.json();
        console.log("usersData: ", usersData);
        return usersData
    }).then((recivedUsersData) => {
        console.log("recivedUsersData: ", recivedUsersData)
        printUsers(recivedUsersData);
        makeUsersClikable();
    }).catch((error) => {
        console.log("We have a problem", error);
    }).finally(() => {
        writeCurrentStatus("");
    });
// console.log("users data: ", usersData)



// const statusIndicator = document.querySelector(".status");
// function writeCurrentStatus(text) {
//     statusIndicator.innerHTML = text;
// };

// let userData = [];

// writeCurrentStatus("Loading...")

// const fetchUsers = fetch('https://jsonplaceholder.typicode.com/users');
    
// fetchUsers
//     .then((response) => {
//         const userData = response.json();
//         console.log("usersData: ", userData);
//         return userData
//     }).then((recivedUserData) => {
//         console.log("recivedUserData: ", recivedUserData);
//         userData = recivedUserData;
//     }).catch((error) => {
//         console.log("We have a problem", error);
//     }).finally(() => {
//         writeCurrentStatus("Done!")
//     }); 
// console.log("user data", userData);
