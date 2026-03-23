exports.login = async (req, res) => {

    const { username, password } = req.body

    const adminUser = process.env.ADMIN_USERNAME
    const adminPass = process.env.ADMIN_PASSWORD

    if (username !== adminUser) {
        return res.status(401).json({
            message: "Sai tài khoản"
        })
    }

    if (password !== adminPass) {
        return res.status(401).json({
            message: "Sai mật khẩu"
        })
    }

    res.json({
        message: "Login success",
        username: adminUser
    })

}