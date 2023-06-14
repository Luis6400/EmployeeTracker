const inquirer = require('inquirer');
const mysql = require('mysql2');

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

})
    