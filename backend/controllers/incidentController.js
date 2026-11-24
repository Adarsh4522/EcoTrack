const User = require("../models/User");
const Incident = require("../models/Incident");

// Create a new incident
const createIncident = async (req, res) => {
    try {
        const {
            incidentId,
            category,
            state,
            district,
            location,
            priority,
            linkedObservationIds,
            description
        } = req.body;

        const incident = await Incident.create({
            incidentId,
            category,
            state,
            district,
            location,
            priority,
            linkedObservationIds,
            description
        });

        res.status(201).json({
            success: true,
            message: "Incident created successfully",
            data: incident
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get all incidents

const getIncidents = async (req, res) => {
    try {
        let filter = {};

        if (req.user.role === "DISTRICT_OFFICER") {
            if (!req.user.state || !req.user.district) {
                return res.status(403).json({
                    success: false,
                    message: "Officer state and district are not assigned"
                });
            }

            filter.state = req.user.state;
            filter.district = req.user.district;
        } else if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        const incidents = await Incident.find(filter)
            .populate("linkedObservationIds")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: incidents.length,
            data: incidents
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get incident by ID

const getIncidentById = async (req, res) => {
    console.log("GET INCIDENT BY ID CONTROLLER HIT");
    try {
        let filter = {
            _id: req.params.id
        };

        if (req.user.role === "DISTRICT_OFFICER") {
            if (!req.user.state || !req.user.district) {
                return res.status(403).json({
                    success: false,
                    message: "Officer state and district are not assigned"
                });
            }

            filter.state = req.user.state;
            filter.district = req.user.district;

        } else if (req.user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        const incident = await Incident.findOne(filter)
            .populate("linkedObservationIds");

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found in your assigned district"
            });
        }

       res.status(200).json({
    success: true,
    message: "GET BY ID CONTROLLER RESPONSE",
    data: incident
});

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Move an incident to pending review
const reviewIncident = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found"
            });
        }

        if (incident.status !== "NEW_OBSERVATION") {
            return res.status(400).json({
                success: false,
                message: "Only new observations can be moved to pending review"
            });
        }

        incident.status = "PENDING_REVIEW";

        await incident.save();

        res.status(200).json({
            success: true,
            message: "Incident moved to pending review",
            data: incident
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const assignIncident = async (req, res) => {
    console.log("ASSIGN INCIDENT CONTROLLER HIT");
    try {
        const { officerId } = req.body;

        if (!officerId) {
            return res.status(400).json({
                success: false,
                message: "Please provide an officer ID"
            });
        }

        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found"
            });
        }

        if (incident.status !== "PENDING_REVIEW") {
            return res.status(400).json({
                success: false,
                message: "Only incidents pending review can be assigned"
            });
        }

        const officer = await User.findOne({
            _id: officerId,
            role: "DISTRICT_OFFICER",
            isActive: true
        });

        if (!officer) {
            return res.status(404).json({
                success: false,
                message: "Active district officer not found"
            });
        }

        if (
            officer.state !== incident.state ||
            officer.district !== incident.district
        ) {
            return res.status(400).json({
                success: false,
                message: "Officer does not belong to the incident's district"
            });
        }

        incident.assignedOfficerId = officer._id;
        incident.status = "ASSIGNED";

        await incident.save();

        res.status(200).json({
            success: true,
            message: "Incident assigned successfully",
            data: incident
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const startInvestigation = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found"
            });
        }

        // Only the assigned officer can start investigation
        if (
            !incident.assignedOfficerId ||
            incident.assignedOfficerId.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to this incident"
            });
        }

        // Incident must already be assigned
        if (incident.status !== "ASSIGNED") {
            return res.status(400).json({
                success: false,
                message: "Only assigned incidents can start investigation"
            });
        }

        incident.status = "UNDER_INVESTIGATION";

        await incident.save();

        return res.status(200).json({
            success: true,
            message: "Investigation started successfully",
            data: incident
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const resolveIncident = async (req, res) => {
    try {
        console.log("REQ BODY IN CONTROLLER:", req.body);
        const { resolutionReason } = req.body;

        console.log("RESOLUTION REASON:", resolutionReason);

        // Validate resolution reason
        if (!resolutionReason || !resolutionReason.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide a resolution reason"
            });
        }

        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found"
            });
        }

        // Only the assigned officer can resolve the incident
        if (
            !incident.assignedOfficerId ||
            incident.assignedOfficerId.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to this incident"
            });
        }

        // Incident must be under investigation
        if (incident.status !== "UNDER_INVESTIGATION") {
            return res.status(400).json({
                success: false,
                message: "Only incidents under investigation can be resolved"
            });
        }

        incident.status = "RESOLVED";
        incident.resolutionReason = resolutionReason.trim();

        await incident.save();

        return res.status(200).json({
            success: true,
            message: "Incident resolved successfully",
            data: incident
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const dismissIncident = async (req, res) => {
    try {
        const { dismissalReason } = req.body;

        // Validate dismissal reason
        if (!dismissalReason || !dismissalReason.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide a dismissal reason"
            });
        }

        const incident = await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found"
            });
        }

        // Only the assigned officer can dismiss the incident
        if (
            !incident.assignedOfficerId ||
            incident.assignedOfficerId.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not assigned to this incident"
            });
        }

        // Incident must be under investigation
        if (incident.status !== "UNDER_INVESTIGATION") {
            return res.status(400).json({
                success: false,
                message: "Only incidents under investigation can be dismissed"
            });
        }

        incident.status = "DISMISSED";
        incident.dismissalReason = dismissalReason.trim();

        await incident.save();

        return res.status(200).json({
            success: true,
            message: "Incident dismissed successfully",
            data: incident
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    createIncident,
    getIncidents,
    getIncidentById,
    reviewIncident,
    assignIncident,
    startInvestigation,
    resolveIncident,
    dismissIncident


};

