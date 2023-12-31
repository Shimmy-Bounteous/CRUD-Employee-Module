function validatePassword(req, res, next) {

    const password = req.body.password;

    const hasUppercase = /[A-Z]/.test(password); // At least one uppercase letter
    const hasLowercase = /[a-z]/.test(password); // At least one lowercase letter
    const hasNumber = /[0-9]/.test(password); // At least one digit
    const hasSpecialCharacter = /[!@#$%^&*]/.test(password); // At least one special character

    // Check password length
    if (password.length < 6 || password.length > 30) {
        return res.status(400).json({ succes: false, message: 'Password should be 6-30 characters in length.' });
    }
    // Check if password has uppercase letter(s)
    if (!hasUppercase) {
        return res.status(400).json({ succes: false, message: 'Password should contain at least one uppercase letter' });
    }

    // Check if password has lowercase letter(s)
    if (!hasLowercase) {
        return res.status(400).json({ succes: false, message: 'Password should contain at least one lowercase letter' });
    }

    // Check if password has number(s)
    if (!hasNumber) {
        return res.status(400).json({ succes: false, message: 'Password should contain at least one number' });
    }

    // Check if password has special character(s)
    if (!hasSpecialCharacter) {
        return res.status(400).json({ succes: false, message: 'Password should contain at least one special character' });
    }

    // Password meets all requirements
    next();
}

module.exports = { validatePassword };


