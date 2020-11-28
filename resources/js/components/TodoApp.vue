<template>
<section class="todoapp">
    <header class="header">
        <input class="new-todo" autocomplete="off" placeholder="Type your todo list" v-model="newTodo" @keyup.enter="addTodo">
        <button class="new-todo-button" @click="addTodo" v-show="newTodo.length > 0"></button>
    </header>
    <section class="main" v-show="todos.length" v-cloak>
        <div class="completed-wrapper">
            <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
            <label for="toggle-all">Complete all tasks</label>
            <button class="clear-completed" @click="bulkRemoveCompleted">
                Clear completed
            </button>
        </div>
        <ul class="todo-list">
            <li v-for="(todo, index) in filteredTodos" class="todo" :key="todo.id" :class="{ completed: todo.completed, editing: todo == editedTodo }">

                <div class="view">
                    <input class="toggle" type="checkbox" v-model="todo.completed" @click="completeTask(index)">
                    <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
                    <button class="destroy" @click="removeTodo(todo)"></button>
                </div>

                <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
            </li>
        </ul>
    </section>
    <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
            <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
        </span>
        <ul class="filters">
            <li><a href="#/all" :class="{ selected: visibility == 'all' }" @click.prevent="filterTasks('all')">All</a></li>
            <li><a href="#/active" :class="{ selected: visibility == 'active' }" @click.prevent="filterTasks('active')">Uncomplete</a></li>
            <li><a href="#/completed" :class="{ selected: visibility == 'completed' }" @click.prevent="filterTasks('completed')">Completed</a></li>
        </ul>
    </footer>
</section>
</template>

<script>
// May God forgive me for garbage code below. Amen!
// visibility filters
var filters = {
    all: function (todos) {
        return todos;
    },
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed;
        });
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.completed;
        });
    }
};
export default {
    data() {
        return {
            todos: [],
            newTodo: "",
            editedTodo: null,
            visibility: "all",
            filters: {
                all: function (todos) {
                    return todos;
                },
                active: function (todos) {
                    return todos.filter(function (todo) {
                        return !todo.completed;
                    });
                },
                completed: function (todos) {
                    return todos.filter(function (todo) {
                        return todo.completed;
                    });
                }
            }
        }
    },
    mounted() {
       this.fetchAllTasks();
    },
    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
        filteredTodos: function () {
            return filters[this.visibility](this.todos);
        },
        remaining: function () {
            return filters.active(this.todos).length;
        },
        allDone: {
            get: function () {
                return this.remaining === 0;
            },
            set: function (value) {
                this.todos.forEach(function (todo, index) {
                    todo.completed = value;
                });
                this.bulkComplete(value);
            }
        }
    },
    filters: {
        pluralize: function (n) {
            return n === 1 ? "task" : "tasks";
        }
    },
    methods: {
        fetchAllTasks() {
            axios.get('/tasks').then(response => {
                this.todos = response.data;
            })
        },
        addTodo() {
            var value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }
            var data = {
                title: value,
                completed: false
            };

            axios.post('/tasks', data)
            .then(response => {
                this.newTodo = "";
                this.fetchAllTasks();
                this.showSuccessMsg('Item added!');
            })
            .catch(error => {
                let errors = error.response.data.errors;

                errors.forEach(element => {
                    this.showErrorMsg(element.message);
                });
            });
        },
        completeTask(index) {
            var id = this.todos[index].id;
            var completed = !this.todos[index].completed ? 1 : 0;
            axios.patch('/tasks/' + id, {completed: completed})
            .then(response => {
                this.showSuccessMsg(response.data);
            })
            .catch(error => {
                this.showErrorMsg('Something went wrong, try again later.');
            });
        },
        removeTodo(todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
            axios.delete('/tasks/' + todo.id)
            .then(response => {
                this.showSuccessMsg(response.data);
            })
            .catch(error => {
                this.showErrorMsg('Something went wrong, try again later.');
            });
        },
        editTodo(todo) {
            this.beforeEditCache = todo.title;
            this.editedTodo = todo;
        },
        doneEdit(todo) {
            if (!this.editedTodo) {
                return;
            }
            this.editedTodo = null;
            todo.title = todo.title.trim();
            if (!todo.title) {
                this.removeTodo(todo);
            } else {
                axios.patch('/tasks/' + todo.id, {title: todo.title})
                    .then(response => {
                        this.showSuccessMsg(response.data);
                    })
                    .catch(error => {
                        let errors = error.response.data.errors;
                        console.log(errors);
                        errors.forEach(element => {
                            this.showErrorMsg(element.message);
                        });
                    });
            }
        },
        cancelEdit(todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        },
        bulkComplete(status) {
            axios.post('/tasks/bulkComplete', {completed: status ? 1 : 0})
            .then(response => {
                this.showSuccessMsg(response.data);
            })
            .catch(error => {
                this.showErrorMsg('Something went wrong, try again later.');
            });;
        },
        bulkRemoveCompleted() {
            var data = {ids: filters.completed(this.todos).map(a => a.id)};
            axios.post('/tasks/bulkDelete', data)
            .then(response => {
                this.showSuccessMsg(response.data);
            })
            .catch(error => {
                this.showErrorMsg('Something went wrong, try again later.');
            });

            this.todos = filters.active(this.todos);
        },
        filterTasks(filter) {
            this.visibility = filter;
        },
        showSuccessMsg(msg) {
            this.$toast.success(msg, {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            }); 
        },
        showErrorMsg(msg) {
            this.$toast.error(msg, {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            }); 
        }
    },
    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        "todo-focus": function (el, binding) {
            if (binding.value) {
                el.focus();
            }
        }
    }
}
</script>