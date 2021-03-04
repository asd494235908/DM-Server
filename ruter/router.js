const express = require('express');
const router = express.Router();
const uploadImg = require('./uploadImg');

/* 上传图片 */
router.post('/upload', (req, res) => {

    uploadImg(req, res);
});

module.exports = router;