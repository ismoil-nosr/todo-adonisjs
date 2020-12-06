import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const user = new User()
    user.email = 'demo@example.com'
    user.name = 'Vasya'
    user.password = 'demo'
    await user.save()
  }
}