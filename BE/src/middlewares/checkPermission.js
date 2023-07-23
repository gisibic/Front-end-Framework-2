import jwt from 'jsonwebtoken'
import User from '../models/users'

export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập"
            })
        }
        const token = req.headers.authorization.split(" ")[1]
        const { id } = jwt.verify(token, "123456")
        const user = await User.findById(id)
        if (user.role !== "admin") {
            return res.status(401).json({
                message: "Bạn không có quyền"
            })
        }
        req.user = user
        next()
    } catch (error) {
        return res.status.json({
            message: error.message
        })
    }
}