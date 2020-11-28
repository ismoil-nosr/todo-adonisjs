import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async register ({ request, auth, response }: HttpContextContract) {
    /**
     * Validate user details
     */
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      name: schema.string({ trim: true }, [
        rules.required()
      ]),
      password: schema.string({ trim: true }, [
        rules.confirmed(),
      ]),
    })

    const userDetails = await request.validate({
      schema: validationSchema,
    })

    /**
     * Create a new user
     */
    const user = new User()
    user.email = userDetails.email
    user.name = userDetails.name
    user.password = userDetails.password
    await user.save()

    await auth.login(user)
    response.redirect('/')
  }

  public async login ({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const rememberUser = !!request.input('remember_me')

    await auth.attempt(email, password, rememberUser)

    response.redirect('/')
  }

  public async logout({ auth, response } : HttpContextContract) {
      await auth.logout()
      response.redirect('/')
  }
}