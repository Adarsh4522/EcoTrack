
const express = require("express");

const {
    getObservations,
    getObservationById
} = require("../controllers/tempController");

const router = express.Router();

router.get("/", getObservations);
router.get("/:id", getObservationById);

module.exports = router;
