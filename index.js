const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '9521293100',
    database: 'employer_db'
});

run();


function run() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'add Employee',
                    'update Employee Role',
                    'View All Roles',
                    'add Role',
                    'View All Departments',
                    'add Department',
                    'quit'
                ],
            },
        ])
        .then((answers) => {

            switch (answers.action) {
                case 'View All Employees':
                    connection.query("SELECT * FROM employee", function (err, results) {
                        console.table(results);
                        run();
                    });
                    break;
                case 'add Employee':
                    connection.query("SELECT * FROM employee", function (err, results) {
                        console.table(results);
                        addEmployee();
                    })
                    break;
                case 'update Employee Role':
                    connection.query("SELECT * FROM employee", function (err, results) {
                        console.table(results);
                        updateEmployeeRole();
                    })
                    break;
                case 'View All Roles':
                    connection.query("SELECT * FROM employeerole", function (err, results) {
                        console.table(results);
                        run();
                    }
                    )
                    break;
                case 'add Role':
                    connection.query("SELECT * FROM employeerole", function (err, results) {
                        console.log("Roles");
                        console.table(results);
                        connection.query("SELECT * FROM department", function (err, results) {
                            console.log("Departments");
                            console.table(results);
                            addRole();
                        })
                    }
                    )
                    break;
                case 'View All Departments':
                    connection.query("SELECT * FROM department", function (err, results) {
                        console.table(results);
                        run();
                    }
                    )
                    break;
                case 'add Department':
                    connection.query("SELECT * FROM department", function (err, results) {
                        console.log("Departments");
                        console.table(results);
                        addDepartment();
                    }
                    )
                    break;
                case 'quit':
                    connection.end();
                    break;




            }
        }
        )

}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?',
            },
        ])
        .then((answers) => {
            connection.query("INSERT INTO department SET ?", answers, function (err, results) {
                connection.query("SELECT * FROM department", function (err, results) {
                    console.log("Department added");
                    console.table(results);
                    run();
                });
            })
        }
        );
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department id of the role?',
            },
        ])
        .then((answers) => {
            connection.query("INSERT INTO employeerole SET ?", answers, function (err, results) {
                connection.query("SELECT * FROM employeerole", function (err, results) {
                    console.log("Role added");
                    console.table(results);
                    run();
                });
            })
        }
        );
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What is the id of the employee?',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the new role id of the employee?',
            },
        ])
        .then((answers) => {
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.role_id, answers.id], function (err, results) {
                connection.query("SELECT * FROM employee", function (err, results) {
                    console.log("Employee updated");
                    console.table(results);
                    run();
                });
            })
        }
        );

}


async function addEmployee() {
    await inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?',
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the role id of the employee?',
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is the manager id of the employee?',
            },
        ])
        .then((answers) => {
            connection.query("INSERT INTO employee SET ?", answers, function (err, results) {
                connection.query("SELECT * FROM employee", function (err, results) {
                    console.log("Employee added");
                    console.table(results);
                    run();
                });
            })
        }
        );
}
