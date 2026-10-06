//Libraries
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');

//Setup defaults for script
const app = express();
app.use(express.static('public'))

const upload = multer()
const port = 3000 //Default port to http server

let connection = null;

async function query(sql, params) {
    //Singleton DB connection
    if (null === connection) {
        console.log('Here');
        connection = await mysql.createConnection({
            host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
            user: "BENJAMINBOSWELL",
            password: "tES9neEVEqrN4zc5ncpZUXkANZa0QndauYN",
            database: 'BENJAMINBOSWELL'
        });
    }

    const [results,] = await connection.execute(sql, params);
    return results;
}
app.post("/api/sensor",
    async (req, res) => {

        try {

            const insertSql = `INSERT INTO sensor_data_table (light_sensor) VALUES (?)`;
            await query(insertSql, [
                request.body.light_sensor
            ]);
            response.status(200).json({ message: 'light data inserted successfully' });
        } catch (error) {
            console.error('Error inserting light data:', error);
            response.status(500).json({ error: 'An error occurred while inserting light data' });
        }
        console.log(req.body);
        res.json({
            message: "Sensor data received"
        });
    });

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
