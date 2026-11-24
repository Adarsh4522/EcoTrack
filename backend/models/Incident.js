
const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
    {
        incidentId: {
            type: String,
            unique: true,
            required: true
        },

        category: {
            type: String,
            enum: [
                "suspected_crop_burning",
                "suspected_forest_fire",
                "other_fire_or_thermal_anomaly",
                "unclassified"
            ],
            default: "unclassified"
        },

        state: {
            type: String,
            required: true
        },

        district: {
            type: String,
            required: true
        },

        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },

        status: {
            type: String,
            enum: [
                "NEW_OBSERVATION",
                "PENDING_REVIEW",
                "ASSIGNED",
                "UNDER_INVESTIGATION",
                "RESOLVED",
                "DISMISSED"
            ],
            default: "NEW_OBSERVATION"
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
            default: "MEDIUM"
        },

        linkedObservationIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Observation"
        }],

        assignedOfficerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        description: {
            type: String,
            default: ""
        },

        resolutionReason: {
            type: String,
            default: null
        },

        dismissalReason: {
    type: String,
    default: null
},

        reportedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

incidentSchema.index({ location: "2dsphere" });
incidentSchema.index({ status: 1, priority: 1 });
incidentSchema.index({ state: 1, district: 1 });

module.exports = mongoose.model("Incident", incidentSchema);
