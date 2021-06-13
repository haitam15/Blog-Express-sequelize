const getUsers = document.getElementById("users");
const getUser = document.getElementById("user");
const deleteUser = document.getElementById("delete");
const addUser = document.getElementById("formAdd");
const updateUser = document.getElementById("formUpdate");


const parseUsers = () => {
    document.getElementById("userUpdate").innerHTML = "";
    fetch("http://localhost:3000/users")
    .then( (res) => res.json() )
    .then( (data) => {
        let codeHTML = `
        <div class="row">
        <div class="col-md-2 col-sm-1"></div>
        <div class="col-md-8 col-sm-10" id="table">
            <table class="table table-dark table-striped mgn">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                </tr>
                </thead>
                <tbody>`
        data.forEach(user => { codeHTML += `
            <tr>
                <th scope="col">${user.id}</th>
                <th scope="col">${user.username}</th>
                <th scope="col">${user.email}</th>
                <th scope="col">${user.password}</th>
                <th scope="col">${user.role}</th>
            </tr>`
        });
        codeHTML += `
                        </tbody>
                    </table>
                </div>
            </div>`
        document.getElementById("usersList").innerHTML = codeHTML ;
    } ).catch((err)=>console.log(err));
}

getUsers.addEventListener("click",parseUsers);

const parseUser = () => {
    document.getElementById("userUpdate").innerHTML = "";
    const id = document.getElementById("getId").value;
    if (!id)
        return;
    fetch(`http://localhost:3000/users/${id}`)
    .then( (res) => res.json() )
    .then( (data) => {
        document.getElementById("usersList").innerHTML = (data.id) ? `
        <div class="row">
            <div class="col-md-3 col-sm-2"></div>
            <div class="col-md-5 col-sm-8" id="table">
                <table class="table table-warning table-striped mgn">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">${data.id}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">Username</th>
                        <td>${data.username}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>${data.email}</td>
                    </tr>
                    <tr>
                        <th scope="row">Password</th>
                        <td>${data.password}</td>
                    </tr>
                    <tr>
                        <th scope="row">Role</th>
                        <td>${data.role}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>` : `
        <div class="row text-center mgn">
            <h1>User not found !</h1>
        </div>`
    } ).catch((err)=>console.log(err));
}

getUser.addEventListener("click",parseUser);

deleteUser.addEventListener("click",() => {
    document.getElementById("userUpdate").innerHTML = "";
    const id = document.getElementById("deleteId").value;
    if (!id)
        return;
    fetch(`http://localhost:3000/users/${id}`,{method:'delete'}).then( (res)=> res.text() ).then( (data) => {
        document.getElementById("usersList").innerHTML = `
        <div class="row text-center mgn">
            <h1>${data}</h1>
        </div>`
    } ).catch((err)=>console.log(err));
})

addUser.addEventListener('submit',(e)=> {
    document.getElementById("userUpdate").innerHTML = "";
    e.preventDefault();
    let username = document.getElementById('usernameAdd').value;
    let email = document.getElementById('emailAdd').value;
    let password = document.getElementById('passwordAdd').value;
    let role = document.getElementById('roleAdd').value;
    fetch('http://localhost:3000/users/',{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({ username:username, email:email, password:password, role:role })
    })
    .then((res)=>res.text()).then( data => {
        document.getElementById("usersList").innerHTML = `
        <div class="row text-center mgn">
            <h1>${data}</h1>
        </div>`
    }).catch(err=>console.log(err));
});

updateUser.addEventListener('submit',(e)=> {
    document.getElementById("usersList").innerHTML = "";
    e.preventDefault();
    let id = document.getElementById('id').value;
    let username = document.getElementById('usernameUpdate').value;
    let email = document.getElementById('emailUpdate').value;
    let password = document.getElementById('passwordUpdate').value;
    let role = document.getElementById('roleUpdate').value;
    fetch(`http://localhost:3000/users/${id}`,{
        method:'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({ username:username, email:email, password:password, role:role })
    })
    .then((res)=>res.text()).then( data => {
        document.getElementById("userUpdate").innerHTML = `
        <div class="row text-center mgn">
            <h1>${data}</h1>
        </div>`
    }).catch(err=>console.log(err));
});
