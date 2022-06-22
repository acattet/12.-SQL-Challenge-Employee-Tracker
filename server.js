const cTable = require("console.table");
const db = require("./db/connection.js");
const inquirer = require("inquirer");

const promptUser = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "whatToDo",
            message: "What would you like to do?",
            choices: [
            "View Departments",
            "View Roles",
            "View Employees", 
            "Add Department", 
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "End Program"
          ]
        }
    ])
    .then(promptController)

};

const promptController = input => {
    let sql;
    let object;

//selection
    switch(input.whatToDo) {

      //end program
        case "End Program":
            return console.log("Goodbye");

        //view departments    
        case "View Departments":
            sql = `SELECT * FROM department`;
            db.query(sql, (err, rows) => {
                    console.table(rows); 
                return promptUser();
            });
            break;
           
        //view roles    
        case "View Roles":
            sql = `SELECT role.*, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id`;
            db.query(sql, (err, rows) => {
                    console.table(rows);
                return promptUser();
            });
            break;

        //view emplyoyees    
        case "View Employees":
            sql = `SELECT employee.*, role.title AS role FROM employee LEFT JOIN role ON employee.role_id = role.id`;
            db.query(sql, (err, rows) => {                
                    console.table(rows);
                return promptUser();
            });
            break;

         //add stuff   
        case "Add Department":
            object = "department";
            addObject(object);
            break;
        case "Add Role":
            object = "role";
            addObject(object);
            break;
        case "Add Employee":
            object = "employee";
            addObject(object);
            break;
        case "Update Employee Role":
            updateEmployeePrompt();
            break;
    }
};

//add section
const addObject = object => {

  //add department
    if(object === "department") {
        return inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department?",
               
            }
        ]).then(addDepartment)
        .catch(err => {
            console.log(err);
        });
      //add role
    } else if(object === "role") {
        return inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role?",       
            },
            
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
            },
            {
                type: "input",
                name: "department",
                message: "Which department does the role belong to?",
            }
        ]).then(addRole)
        .catch(err => {
            console.log(err);
        });
        
        //add employee
    } else if(object === "employee") {
        return inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
            },
            {
                type: "input",
                name: "role",
                message: "What is the employee's role?",
            },
            
        ]).then(addEmployee)
        .catch(err => {
            console.log(err);
        });
    }
};
//update employee
const updateEmployeePrompt = () => {
  db.query(`SELECT COUNT(id) FROM employee`, (err, cell) => {
          loopCount = JSON.stringify(cell);
  });

  return inquirer.prompt([
      {
          type: "list",
          name: "employee",
          message: "Which employee's role do you want to update?",
          choices: choices
      },
      {
          type: "input",
          name: "role",
          message: "What is the employee's new role?",
          
          }
      
  ]).then(updateEmployee)
  .catch(err => {
      console.log(err);
  });
}

//adds data to table
//department data
const addDepartment = body => {
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {       
            console.log("Added " + body.name + " to the database");        
        return promptUser();
    });
};


//add role, add employee, and manage does not work
//role data
const addRole = body => {
   /* const sql = `INSERT INTO role (title)
    VALUES (?)`;
    const params = [body.title];
    db.query(sql, params, (err, result) => {
      if(err) {
          console.log(err.message);
      } else {
          console.log("Added " + body.title + " to the database");
      }
      return promptUser();
  });
  */
};


//employee data
const addEmployee = body => {
    /*
    const sql = `INSERT INTO role (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role, null];
    db.query(sql, params, (err, result) => {       
      console.log("Employee has been updated");      
  return promptUser();
});
*/
};


//update employee
const updateEmployee = body => {
   /*
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [body.role, 1];

    db.query(sql, params, (err, result) => {       
            console.log("Employee's role has been updated");      
        return promptUser();
    });
    */
};

db.connect(err => {
    if(err) throw err;
});

promptUser();