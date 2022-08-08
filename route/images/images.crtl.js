'use strict';

const image = (req, res) => {
    const file = req.file;
    res.send({
        imageUrl: file.path,
    });
};

module.exports = {
    image,
};