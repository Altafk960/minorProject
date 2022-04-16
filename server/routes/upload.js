const express = require('express');
const auth = require('../middleware/auth');
const uploadController = require('../controllers/upload');

const router = express.Router();

router.get('/myUploads',auth, uploadController.getMyUploads);
router.post('/myUploads',auth, uploadController.postUploads);

module.exports = router;