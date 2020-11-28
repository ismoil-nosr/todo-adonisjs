import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TaskValidator from 'App/Validators/TaskValidator'

export default class TasksController {

  public async index ({ view }: HttpContextContract) {
    return view.render('todo/view')
  }

  public async fetchTasks ({ response, auth }: HttpContextContract) {
    let user = auth.user
    await user?.preload('tasks')
    
    return response.json(user?.tasks)
  }
  
  public async store ({ request, response, auth }: HttpContextContract) {
    let user = auth.user
    let data = await request.validate(TaskValidator)
    let task = await user?.related('tasks').create(data)

    return response.json(task)
  }

  public async update ({ request, response, params }: HttpContextContract) {
    let task = await Task.findOrFail(params.task)
    let data = await request.validate(TaskValidator)
    task.merge(data)
    await task.save()

    return response.json('Updated!')
  }

  public async destroy ({ response, params }: HttpContextContract) {
    let task = await Task.findOrFail(params.task)
    await task.delete()

    return response.json('Deleted successfully!')
  }

  public async bulkComplete ({ request, response, auth }: HttpContextContract) {
    let user = auth.user
    await user?.related('tasks').query().update({'completed': !!request.input('completed')})
    
    return response.json('Bulk Updated!')
  }

  public async bulkDelete ({ response, auth }: HttpContextContract) {
    let user = auth.user
    await user?.related('tasks').query().where({'completed': 1}).delete()

    return response.json('Bulk deleted successfully!')
  }
}