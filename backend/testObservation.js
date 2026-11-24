
require("dotenv").config();

const mongoose = require("mongoose");
const Observation = require("./models/Observation");

const testObservation = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const observation = await Observation.create({
            sourceObservationId: "TEST-ECO-001",
            source: "NASA_FIRMS",
            satellite: "VIIRS",
            instrument: "VIIRS",
            acquiredAt: new Date(),
            location: {
                type: "Point",
                coordinates: [75.8577, 22.7196]
            },
            confidence: "nominal",
            fireRadiativePower: 12.5,
            originalProperties: {
                testRecord: true,
                description: "Sample satellite thermal anomaly"
            }
        });

        console.log("Sample observation inserted successfully!");
        console.log(observation);

    } catch (error) {
        console.error("Error:", error.message);

    } finally {
        await mongoose.disconnect();
    }
};

testObservation();
