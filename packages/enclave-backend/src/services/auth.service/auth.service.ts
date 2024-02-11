import { User, UserData } from "../../models/user/user.entity"
import * as jwt from "jsonwebtoken"
import HttpErrors from "../../errors"

// TODO: let all the authentication interface with smth like firebase.

export class AuthService {
  static async localSignIn(
    email: string,
    password: string
  ): Promise<{
    userData: UserData
    token: string
  }> {
    // TODO: do hash comparison of password!
    const foundUser = await User.findOne({ where: { email, password } })
    if (!foundUser) throw HttpErrors.NotFound("No user found!")
    const userData = foundUser.getUserData()
    const token = AuthService.signJWT(userData)
    return {
      token,
      userData
    }
  }

  static async localSignUp(
    email: string,
    password: string,
    userData: UserData
  ): Promise<{
    userData: UserData
    token: string
  }> {
    // TODO: encrypt password!
    // TODO: check email uniqueness
    const emailExists = await User.exists({ where: { email } })
    if (emailExists) throw HttpErrors.BadRequest("Email already exists")
    // store info in the user table
    const newUser = new User({
      email,
      password,
      ...userData
    })
    await newUser.save()
    const token = AuthService.signJWT(userData)
    return {
      userData,
      token
    }
  }

  static signJWT(payload: UserData) {
    return jwt.sign(payload, process.env.JWT_SECRET as string)
  }
}
