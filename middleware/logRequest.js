const { validateEmployeeData } = require("./validateEmployeeData");

function logRequest(req, res, next) {
    console.log(`\nRequest Method: ${req.method} \t Request URL: ${req.url}`);
    if (req.method === "PATCH" || req.method === "POST") {
        console.log(`Request Body:`);
        console.log(req.body);
    }
    if (req.url === '/employees/add') {
        const errors = validateEmployeeData(req.body);
        if (errors.length !== 0) {
            return res.status(400).json({ success: false, error: errors });
        }
    }
    next();
}

module.exports = { logRequest };

//see if you have to add the validateEmployeeData function here or have  it as a separate js file as done above