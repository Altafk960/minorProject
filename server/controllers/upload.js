const mongoose = require('mongoose');
const Upload = require('../models/uploads');
exports.getMyUploads = async (req, res, next) => {

    const userId = req.userId;

    if (!userId)
        return res.status(403).json({ message: "you are not authenticated" });
    
    const result = await Upload.find({ userId: userId }).sort({createdAt: -1});
    console.log(result);
    return res.status(201).json(result);

}

exports.postUploads =async (req, res, next) => {
    const fileName = req.body.fileName;
    const hash = req.body.hash;
    const userId = req.body.userId;
    const fileType = req.body.fileType;

    console.log(fileName);

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    var newDate = year + "/" + month + "/" + day;

    const newUpload = new Upload({
        fileName:fileName,
        hash:hash,
        userId: userId,
        fileType:fileType,
        date:newDate
    });

    const result = await newUpload.save();

    if (!result)
        return res.status(400).json({ message: "cannot upload at the moment" });
    
    else
        return res.status(200).json({ message: "upload successful" });

}