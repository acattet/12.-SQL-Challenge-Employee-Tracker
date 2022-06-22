INSERT INTO department (name)
VALUES ("Customer Service");
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Engineer");

INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service Lead", 30000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 50000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Support", 40000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 45000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charles", "Ink", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tubs", "Light", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amanda", "Maker", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Logan", "Nimps", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Sump", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sally", "Sparrow", 2, 6);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Clamp", "Glamp", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Nooke", 1, 2);