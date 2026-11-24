
const mongoose = require("mongoose");

const observationSchema = new mongoose.Schema(
    {
        sourceObservationId: {
            type: String,
            required: true
        },

        source: {
            type: String,
            enum: ["NASA_FIRMS", "ISRO", "OTHER"],
            required: true
        },

        satellite: {
            type: String,
            default: null
        },

        instrument: {
            type: String,
            default: null
        },

        acquiredAt: {
            type: Date,
            required: true
        },

        receivedAt: {
            type: Date,
            default: Date.now
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

        confidence: {
            type: String,
            default: null
        },

        fireRadiativePower: {
            type: Number,
            default: null
        },

        originalProperties: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        linkedIncidentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Incident",
            default: null
        }
    },
    {
        timestamps: true
    }
);

observationSchema.index({ location: "2dsphere" });

observationSchema.index(
    { source: 1, sourceObservationId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Observation", observationSchema);
