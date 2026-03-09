const express = require("express");
const app = express();

app.get("/rgbToHex", function(req, res) {
    const red = parseInt(req.query.red, 10);
    const green = parseInt(req.query.green, 10);
    const blue = parseInt(req.query.blue, 10);
    const hex = rgbToHex(red, green, blue);
    res.send(hex);
});

function rgbToHex(red, green, blue){
    const redHex = red.toString(16);
    const greenHex = green.toString(16);
    const blueHex = blue.toString(16);
    return pad(redHex) + pad(greenHex) + pad(blueHex);
};

function pad(hex) { 
    return (hex.length === 1 ? "0" + hex : hex); 
}

app.listen(3000);