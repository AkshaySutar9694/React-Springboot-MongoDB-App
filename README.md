# React-Springboot-MongoDB-App

This project will showcase the integration of react application with springboot and mongoDB.

Will require to have mongoDB installed on your comuter. You can create a DB Schema named as "Emplooyees" and create a collection named "employees".
For now add sample records like below.

db.employees.insertMany([
{
_id: 1,
name: 'Ajit Sutar',
email: 'ajitsutar008@gmail.com',
place: 'Dattawad',
age: 34
},
{
_id: 2,
name: 'Abhinandan Sutar',
email: 'abhinandansutar@gmail.com',
place: 'Dattawad',
age: 27
},
{
_id: 3,
name: 'Kiran Sutar',
email: 'kiransutar34@gmail.com',
place: 'Kolhapur',
age: 30
},
{
_id: 4,
name: 'Amit Sutar',
email: 'amitsutar81@gmail.com',
place: 'Sadalgi',
age: 35
},
{
_id: 5,
name: 'Pavan Sutar',
email: 'pavansutar03@gmail.com',
place: 'Baramati',
age: 27
},
{
_id: 6,
name: 'Pallavi Sutar',
email: 'pallavisutar90@gmail.com',
place: 'Akiwat',
age: 23
}
]);

To run this application you can only checkout the demo folder and can run this application as a normal sring web app through editor. Hit localhost:8080/index.html to see react page.
