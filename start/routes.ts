/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.on('register').render('auth/register').middleware('guest').as('register.get')
    Route.post('register', 'AuthController.register').middleware('guest').as('register.post')
    
    Route.on('login').render('auth/login').as('login.get').middleware('guest')
    Route.post('/login', 'AuthController.login').as('login.post').middleware('guest')
}).middleware('guest')

Route.group(() => {
    Route.get('/', 'TasksController.index')
    Route.get('/logout', 'AuthController.logout')

    Route.group(() => {
        Route.get('/tasks', 'TasksController.fetchTasks')
        Route.post('/tasks', 'TasksController.store')
        Route.patch('/tasks/:task', 'TasksController.update')
        Route.delete('/tasks/:task', 'TasksController.destroy')
        Route.post('/tasks/bulkComplete', 'TasksController.bulkComplete')
        Route.post('/tasks/bulkDelete', 'TasksController.bulkDelete')
    }).prefix('api')

}).middleware('auth')