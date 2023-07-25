function validateUpdateEmployeeData(req, res, next) {

    const { eid, name, age, gender, skills, designation } = req.body;
    const errors = [];

    if (eid && typeof eid !== 'number') {
        errors.push('Employee ID must be of type number');
    }

    if (name && typeof name !== 'string') {
        errors.push('Name must be of type string');
    }

    if (age && typeof age !== 'number') {
        errors.push('Age must be of type number');
        if (age < 18) {
            errors.push('Age must be greater than or equal to 18');
        }
    }

    if (gender && (gender !== 'Male' && gender !== 'Female' && gender !== 'Other')) {
        errors.push('Gender must be of type string.\n Accepted Values: \'Male\', \'Female\' & \'Other\'');
    }

    if (skills && skills.length > 0) {
        skills.forEach((skill) => {
            if (typeof skill !== 'string') {
                errors.push('Skills must be of type string');
                return;
            }
        });
    }

    if (designation && typeof designation !== 'string') {
        errors.push('Designation must be of type string');
    }

    if (errors.length !== 0) {
        return res.status(400).json({ success: false, error: errors });
    }
    next();
}

module.exports = { validateUpdateEmployeeData };