exports.auth = async (req, res) => {
    const { email, password } = req.body;
    const result = {};
    if (password.includes('Test')) {
        result.status = 200;
        console.log('valid!');
        res.send(result);
    } else {
        result.status = 400;
        res.send(result);
    }
};
