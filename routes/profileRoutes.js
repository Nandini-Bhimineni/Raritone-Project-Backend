const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");

const auth = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");


// =========================
// GET PROFILE
// =========================

router.get("/", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({
      userId: req.user.id,
    });

    if (!profile) {
      profile = new Profile({
        userId: req.user.id,
      });

      await profile.save();
    }

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// =========================
// UPDATE PROFILE
// =========================

router.put("/update", auth, async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.user.id },

      {
        $set: {
          bio: req.body.bio,
          personalDetails: req.body.personalDetails,
          updatedAt: Date.now(),
        },
      },

      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// =========================
// UPLOAD AVATAR
// =========================

router.post(
  "/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const avatarPath = `/uploads/${req.file.filename}`;

      const profile = await Profile.findOneAndUpdate(
        { userId: req.user.id },

        {
          avatar: avatarPath,
          updatedAt: Date.now(),
        },

        { new: true, upsert: true }
      );

      res.json({
        success: true,
        message: "Avatar uploaded successfully",
        profile,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);


// =========================
// SAVE PREFERENCES
// =========================

router.put("/preferences", auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },

      {
        preferences: req.body.preferences,
        updatedAt: Date.now(),
      },

      { new: true, upsert: true }
    );

    res.json({
      success: true,
      message: "Preferences updated",
      profile,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;