const { validateEmployeeData } = require("./validateAddEmployeeData");

function logRequest(req, res, next) {
    console.log(`\nRequest Method: ${req.method} \t Request URL: ${req.url}`);
    if (req.method === "PATCH" || req.method === "POST") {
        console.log(`Request Body:`);
        console.log(req.body);
    }
    next();
}

module.exports = { logRequest };

//see if you have to add the validateEmployeeData function here or have  it as a separate js file as done above