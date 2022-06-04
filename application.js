const inquirer = require("inquirer");
const fs = require("fs");
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const Manager = require('./lib/Manager');

const employees = [];

function init() {
    starterHTML();
    addEmployee();
}

function addEmployee() {
    inquirer.prompt([{
        message: "Enter employee's name.",
        name: "name"
    },
    {
        type: "list",
        message: "Select employee's role.",
        choices: [
            "Intern",
            "Engineer",
            "Manager",
        ],
        name: "role"
    },
    {
        message: "Enter employee's ID",
        name: "id"
    },
    {
        message: "Enter employee's email.",
        name: "email"
    }])

    .then(function({name, role, id, email}) {
        let employeeRole = "";
        if (role === "Engieer") {
            employeeRole = "GitHub Username";
        } else if (role === "School / Bootcamp Name") {
            employeeRole = "School / Bootcamp Name";
        } else {
            employeeRole = "Phone Number";
        }

        inquirer.prompt([{
            message: "Enter employee's role",
            name: "employeeRole"
        },
        {
            type: "list",
            message: "Are there additional employee's you'd like to add to the profile?",
            choices: [
                "yes",
                "no"
            ],

            name: "moreEmployees"
        }])

        .then(function({employeeRole, moreEmployees}) {
            let newEmployee;

            if (role === "Intern") {
                newEmployee = new Intern(name, id, email, employeeRole);
            } else if (role === "Engineer") {
                newEmployee = new Engineer(name, id, email, employeeRole);
            } else {
                newEmployee = new Manager(name, id, email, employeeRole);
            }

            employees.push(newEmployee);
            addHtml(newEmployee)

            .then(function(){
                if (moreEmployees === "yes"){
                    addEmployee();
        
                } else {
                    endHTML();
                }
            })
        })
    })
}

function starterHTML() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile Generator</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile Generator</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./src/output.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(employee) {
    return new Promise(function(resolve, reject){
        const name = employee.getName();
        const role = employee.getRole();
        const id = employee.getId();
        const email = employee.getEmail();

        let data = '';

        if (role === "intern") {
            const school = employee.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Engineer") {
                const gitHub = employee.getGithub();
                data = `<div class="col-6">
                <div class="card mx-auto mb-3" style="width: 18rem">
                <h5 class="card-header">${name}<br /><br />Engineer</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${id}</li>
                    <li class="list-group-item">Email Address: ${email}</li>
                    <li class="list-group-item">GitHub: ${gitHub}</li>
                </ul>
                </div>
            </div>`;
        } else {
            const phoneNumber = employee.getPhoneNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Phone Number: ${phoneNumber}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("adding team member");
        fs.appendFile("./src/output.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function endHTML() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./src/output.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}

init();