import jwt from 'jsonwebtoken'
import models from '../models'

async function checkToken(token) {
  let __id = null
  try {
    const { _id } = await jwt.decode(token)
    __id = _id
  } catch (err) {
    return false
  }
  const user = await models.Usuarios.findOne({ _id: __id, modo: 1 })
  if (user) {
    const token = jwt.sign({ _id: __id }, 'tokensecretpassword', {
      expiresIn: '1d',
    })
    return { token, rol: user.rol }
  } else {
    return false
  }
}

export default {
  encode: async (_id) => {
    const token = jwt.sign({ _id: _id }, 'tokensecretpassword', {
      expiresIn: '1d',
    })
    return token
  },
  decode: async (token) => {
    try {
      const { _id } = await jwt.verify(token, 'tokensecretpassword')
      const user = await models.Usuarios.findOne({ _id, modo: 1 })
      if (user) {
        return user
      } else {
        return false
      }
    } catch (err) {
      const newToken = await checkToken(token)
      return newToken
    }
  },
}
