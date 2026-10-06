const express = require("express");

const app = express();

app.use(express.json());

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
