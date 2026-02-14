const server_url = "http://localhost:5000";

function go() {
    console.log("go func called")
}

function go2() {
    console.log("go2 func called")
}

function go3(x, y) {
    // console.log("go3 func called")
    console.log(x, y)
}

const api_url = "https://jsonplaceholder.typicode.com/users";

const arr = [10, 20, 30, 40, 50];

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export {go, go3, api_url, arr, server_url, getCookie}; // named export
export default go2; // default export