import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token

    if (!token) {
      return res.json({ success: false, message: 'Not authorized, login again' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.id   // attach to request
    next()

  } catch (error) {
    res.json({ success: false, message: 'Invalid or expired token' })
  }
}

export default authUser
