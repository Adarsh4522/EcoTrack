
const Observation = require("../models/Observation");

// Get all observations
const getObservations = async (req, res) => {
    try {
        const observations = await Observation.find()
            .sort({ acquiredAt: -1 });

        res.status(200).json({
            success: true,
            count: observations.length,
            data: observations
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get observation by ID
const getObservationById = async (req, res) => {
    try {
        const observation = await Observation.findById(req.params.id);

        if (!observation) {
            return res.status(404).json({
                success: false,
                message: "Observation not found"
            });
        }

        res.status(200).json({
            success: true,
            data: observation
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getObservations,
    getObservationById
};
