
const express = require("express");

const {
    createIncident,
    getIncidents,
    getIncidentById,
    reviewIncident,
    assignIncident,
    startInvestigation,
    resolveIncident,
    dismissIncident

} = require("../controllers/incidentController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();
console.log("Incident routes loaded");
console.log("Resolve controller imported:", typeof resolveIncident);

// Verify JWT for every incident route
router.use(protect);

// Only administrators can create incidents
router.post(
    "/",
    authorizeRoles("ADMIN"),
    createIncident
);

// Only administrators can review incidents for now
router.patch(
    "/:id/review",
    authorizeRoles("ADMIN"),
    reviewIncident
);

// Only administrators and district officers can assign incidents
router.patch(
    "/:id/assign",
    authorizeRoles("ADMIN"),
    assignIncident
);

// Only assigned officers can start investigations
router.patch(
    "/:id/investigate",
    authorizeRoles("DISTRICT_OFFICER"),
    startInvestigation
);

router.patch(
    "/:id/resolve",
    authorizeRoles("DISTRICT_OFFICER"),
    resolveIncident
);

// Only assigned district officers can dismiss incidents
router.patch(
    "/:id/dismiss",
    authorizeRoles("DISTRICT_OFFICER"),
    dismissIncident
);

// Restrict incident reading to administrators for now
router.get(
    "/:id",
    authorizeRoles("ADMIN", "DISTRICT_OFFICER"),
    getIncidentById
);

router.get(
    "/",
    authorizeRoles("ADMIN", "DISTRICT_OFFICER"),
    getIncidents
);

module.exports = router;
