const Measurement =
require("../models/measurement");


// CREATE OR UPDATE
exports.saveMeasurement =
async (req, res) => {

    try {

        const {
            chest,
            waist,
            shoulder,
            hip,
            height
        } = req.body;

        const existing =
        await Measurement.findOne({
            userId: req.user.id
        });

        if (existing) {

            existing.chest = chest;
            existing.waist = waist;
            existing.shoulder = shoulder;
            existing.hip = hip;
            existing.height = height;

            await existing.save();

            return res.status(200).json({
                success: true,
                message: "Measurements updated",
                data: existing
            });

        }

        const measurement =
        await Measurement.create({

            userId: req.user.id,

            chest,
            waist,
            shoulder,
            hip,
            height

        });

        res.status(201).json({
            success: true,
            message: "Measurements saved",
            data: measurement
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// GET
exports.getMeasurement =
async (req, res) => {

    try {

        const measurement =
        await Measurement.findOne({
            userId: req.user.id
        });

        if (!measurement) {

            return res.status(404).json({
                success: false,
                message: "Measurement not found"
            });

        }

        res.status(200).json({
            success: true,
            data: measurement
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// DELETE
exports.deleteMeasurement =
async (req, res) => {

    try {

        await Measurement.findOneAndDelete({
            userId: req.user.id
        });

        res.status(200).json({
            success: true,
            message: "Measurement deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};