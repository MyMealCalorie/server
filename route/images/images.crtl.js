'use strict';

const image = (req, res) => {
    const file = req.file;
    console.log(file);
    res.send({
        imageUrl: file.path,
    });
};

module.exports = { image };