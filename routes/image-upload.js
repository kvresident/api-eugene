const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer')
const Account = require('../models/account');
const profilePictureUrl = require('../urls.js').profilePicture
const coverPictureUrl = require('../urls.js').coverPictureUrl
const router = express.Router();
const auth = require('../middlewares/auth.js');

const {saveMedia} = require("../utils/media")

const storage = multer.memoryStorage();
const upload = multer({ storage });

//router.use(fileUpload());

// Define the route to handle profile picture uploads
router.post('/profile-picture', auth, async (req, res) => {
  try {
    // Get the file data from the request
    const file = req.files.profilePicture;

    // Delete the existing profile picture file
    const accountId = req.body.accountId;
    const accessKey = req.body.accessKey;

    const account = await Account.findById(accountId);

    if (account.accessKey != accessKey) {
      return res.status(403).json({ error: "access denied, wrong access key" })
    }
    if (account.profilePicture) {
      const filePath = path.join(profilePictureUrl, account.profilePicture);
      fs.unlinkSync(filePath); // Delete the file synchronously
    }

    // Get the uploaded image filename
    const filename = accountId + '_' + Date.now() + path.extname(file.name);

    // Save the uploaded file to the server
    file.mv(path.join(profilePictureUrl, filename));

    // Update the Account model with the new profile picture filename
    const updatedAccount = await Account.findByIdAndUpdate(accountId, { profilePicture: filename }, { new: true });

    res.json(updatedAccount);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// Define the route to handle profile picture uploads
router.post('/cover-picture', auth, async (req, res) => {
  try {
    // Get the file data from the request
    const file = req.files.coverPicture;

    // Delete the existing profile picture file
    const accountId = req.body.accountId;
    const accessKey = req.body.accessKey;

    const account = await Account.findById(accountId);

    if (account.accessKey != accessKey) {
      return res.status(403).json({ error: "access denied, wrong access key" })
    }
    if (account.coverPicture) {
      const filePath = path.join(coverPictureUrl, account.coverPicture);
      fs.unlinkSync(filePath); // Delete the file synchronously
    }

    // Get the uploaded image filename
    const filename = 'cover_' + accountId + '_' + Date.now() + path.extname(file.name);

    // Save the uploaded file to the server
    file.mv(path.join(coverPictureUrl, filename));

    // Update the Account model with the new profile picture filename
    const updatedAccount = await Account.findByIdAndUpdate(accountId, { coverPicture: filename }, { new: true });

    res.json(updatedAccount);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete('/profile-picture', auth, async (req, res) => {
  let { accessKey, accountId } = req.body;
  if (!accessKey) {
    return res.status(403).json({ error: 'Permission denied, access key required' })
  }
  let account = await Account.findById(accountId);

  if (account.accessKey != accessKey) {
    return res.status(403).json({ error: 'Permission denied, Wrong access Key' })
  }
  account.profilePicture = null;
  let updatedAccount = await account.save();

  res.json(updatedAccount)
})

router.delete('/cover-picture', auth, async (req, res) => {
  let { accountId } = req.body;
  let account = await Account.findById(accountId);
  account.coverPicture = null;
  let updatedAccount = await account.save();

  res.json(updatedAccount)
})

router.post('/dp', upload.single('image'), (req, res) => {
  const image = req.file.buffer; // Get the uploaded image as a Buffer

  console.log(req.file);

  res.json({success: 'image uploaded'});

});

module.exports = router;
