//import { templateLoader } from './templates'

var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            loginUser(user) {
                user = user || {
                    username: $("#tb-username").val(),
                    password: $("#tb-password").val()
                };

                return dataService
                    .isLoggedIn()
                    .then((isLoggedIn) => {
                        if (isLoggedIn) {
                            //redirect to
                            router.navigate("/dashboard");
                            return true;
                        }

                        return dataService
                            .login(user)
                            .then((response) => {
                                if (response.loggedInSuccessfully) {
                                    toastr.success('Login successfully!');

                                    response.result["username"] = user.username;
                                    localStorage.setItem("user", JSON.stringify(response.result));

                                    router.navigate("/dashboard");
                                    return true;
                                }

                                toastr.error('Invalid user or password!');
                                return false;
                            });
                    });
            },

            logoutUser() {
                return dataService
                    .logout()
                    .then((response) => {
                        if (response !== null) {
                            toastr.success(`${response} logged out successfully!`);
                        }
                        localStorage.removeItem("user");
                        $("#dashboardNav").html("");
                        router.navigate("/home");

                        // false: show navigation elements, hide logout button
                        return false;
                    });
            },

            registerUser() {
                templates.get('register')
                    .then((template) => {
                        let compiledTemplate = Handlebars.compile(template),
                            html = compiledTemplate();
                        $('#main').html(html);

                        $('#btn-register').on('click', () => {
                            let user = {
                                username: $("#tb-register-username").val(),
                                password: $("#tb-register-password").val()
                            };

                            return dataService
                                .register(user)
                                .then(() => {
                                    return controllersInstance
                                        .loginUser(user)
                                        .then(setNavigationElementsVisibility);;
                                })
                                .catch(() => {
                                    toastr.error('Invalid username, password or user with the same name already exists!');
                                    return false;
                                });
                        });
                    });
            },

            home() {
                Promise.all([
                    templates.get('welcome'),
                    templates.get('footer'),
                    dataService.isLoggedIn()
                ])
                .then(([homeTemplate, footerTemplate, isLoggedIn]) => {
                    let compiledHomeTemplate = Handlebars.compile(homeTemplate),
                        compiledFooterTemplate = Handlebars.compile(footerTemplate),
                        homeHtml = compiledHomeTemplate(),
                        footerHtml = compiledFooterTemplate();

                    $('#main').html(homeHtml);
                    $('footer').html(footerHtml);

                    if (isLoggedIn) {
                        $('#btn-dashboards').removeClass('hidden');
                    }
                });
            },

            dashboard() {
                Promise.all([
                    dataService.dashboards(),
                    templates.get('main'),
                    templates.get('dashboardNav'),
                    templates.get('modals')
                ])
                .then(([data, mainTemplate, dashboardNavTemplate, modalsTemplate]) => {
                    let mainCompiledTemplate = Handlebars.compile(mainTemplate),
                        dashboardCompiledTemplate = Handlebars.compile(dashboardNavTemplate),
                        modalsCompiledTemplate = Handlebars.compile(modalsTemplate),

                        mainHtml = mainCompiledTemplate(),
                        dashboardHtml = dashboardCompiledTemplate(data.Result),
                        modalsHtml = modalsCompiledTemplate();

                    $('#main').html(mainHtml);
                    $('#dashboardNav').html(dashboardHtml);
                    $('#modals').html(modalsHtml);

                    //submit event for addDashboard modal
                    $('#addDashboard').click((event) => {
                        event.preventDefault();
                        let newDashboard = {},
                            dashboardTitle = $('#dashboardTitle').val(),
                            dashboardDescription = $('#dashboardDescription').val();

                        newDashboard.title = dashboardTitle;
                        newDashboard.description = dashboardDescription;

                        let dashboard = new DashBoard(newDashboard);

                        dataService
                            .addDashboard(dashboard)
                            .then(() => {
                                controllersInstance.dashboard();
                            })
                            .catch(() => {
                                toastr.error('Dashboard not added successfully!');
                            });
                    });

                    console.log("Dashboard results: ", data);
                    return Promise.resolve();
                })
                .catch(() => {
                    return Promise.reject();
                });
            },

            dashboardLists(id) {
                Promise.all([
                    dataService.dashboardLists(id),
                    templates.get('main'),
                    templates.get('dashboardNav'),
                    templates.get('list'),
                    templates.get('modals')
                ])
                .then(([data, mainTemplate, dashboardTemplate, listsTemplate, modalsTemplate]) => {

                    let dashboards = JSON.parse(localStorage.getItem('dashboards'));

                    let mainCompiledTemplate = Handlebars.compile(mainTemplate),
                        dashboardCompiledTemplate = Handlebars.compile(dashboardTemplate),
                        listsCompiledTemplate = Handlebars.compile(listsTemplate),
                        modalsCompiledTemplate = Handlebars.compile(modalsTemplate),

                        mainHtml = mainCompiledTemplate(),
                        dashboardHtml = dashboardCompiledTemplate(dashboards),
                        listsHtml = listsCompiledTemplate(data.Result),
                        modalsHtml = modalsCompiledTemplate();

                    $('#main').html(mainHtml);
                    $('#dashboardNav').html(dashboardHtml);
                    $('#listsHolder').html(listsHtml);
                    $('#modals').html(modalsHtml);

                    $('a[href*="dashboard/' + id.id + '"]').parent('li').addClass('active');

                    //submit event for addList modal
                    $('#addList').click((event) => {
                        event.preventDefault();
                        let newList = {},
                            listTitle = $('#listTitle').val(),
                            listDescription = $('#listDescription').val();

                        newList.title = listTitle;
                        newList.description = listDescription;

                        let list = new List(newList);
                        let dashboardId ={
                            "id": window.location.hash.split('/')[2]
                        };

                        dataService
                            .addList(list)
                            .then((response) => {
                                dataService.updateDashboard(dashboardId, response.Id)
                                    .then(() => {
                                        console.log("hoho");
                                        controllersInstance.dashboardLists(dashboardId);
                                    });
                            })
                            .catch(() => {
                                toastr.error('List not successfully added!');
                            });

                    });
                });
            },

            listPreview(dashboardId, listId) {
                Promise.all([
                    dataService.list(arguments[0].listId),
                    templates.get('main'),
                    templates.get('dashboardNav'),
                    templates.get('list'),
                    templates.get('listPreview'),
                    templates.get('modals')
                ])
                .then(([data, mainTemplate, dashboardTemplate, listsTemplate, listPreviewTemplate, modalsTemplate]) => {
                    let dashboards = JSON.parse(localStorage.getItem('dashboards')),
                        lists = JSON.parse(localStorage.getItem('lists'));

                    let mainCompiledTemplate = Handlebars.compile(mainTemplate),
                        dashboardCompiledTemplate = Handlebars.compile(dashboardTemplate),
                        listsCompiledTemplate = Handlebars.compile(listsTemplate),
                        listsPreviewCompiledTemplate = Handlebars.compile(listPreviewTemplate),
                        modalsCompiledTemplate = Handlebars.compile(modalsTemplate),

                        mainHtml = mainCompiledTemplate(),
                        dashboardHtml = dashboardCompiledTemplate(dashboards),
                        listsHtml = listsCompiledTemplate(lists),
                        listPreviewHtml = listsPreviewCompiledTemplate(data.Result),
                        modalsHtml = modalsCompiledTemplate();

                    $('#main').html(mainHtml);
                    $('#dashboardNav').html(dashboardHtml);
                    $('#listsHolder').html(listsHtml);
                    $('#listPreview').html(listPreviewHtml);
                    $('#modals').html(modalsHtml);

                    $('a[href*="dashboard/' + arguments[0].dashboardId + '"]').parent('li').addClass('active');
                    $('a[href*="list/' + arguments[0].listId + '"]').parents('li').addClass('active');

                    //submit event for addList modal
                    $('#addTask').click((event) => {
                        event.preventDefault();
                        let newTask = {},
                            taskTitle = $('#taskTitle').val(),
                            taskDescription = $('#taskDescription').val(),
                            taskDeadline = new Date($('#taskDeadline').val());

                        newTask.title = taskTitle;
                        newTask.description = taskDescription;
                        newTask.deadline = taskDeadline.toISOString();

                        let task = new Task(newTask);
                        let listId ={
                            "id": window.location.hash.split('/')[4]
                        };
                        let dashboardId ={
                            "id": window.location.hash.split('/')[2]
                        };

                        dataService
                            .addTask(task)
                            .then((response) => {
                                dataService.updateList(listId, response.Id)
                                    .then(() => {
                                        console.log("hoho");
                                        controllersInstance.listPreview({"dashboardId":dashboardId, "listId":listId.id});
                                    });
                            })
                            .catch(() => {
                                toastr.error('List not successfully added!');
                            });
                    });

                        //add checkbox and connect it to current task
                    $('.addNewCheckbox').click((event) => {
                        event.preventDefault();
                        let newCheckbox = {},
                            $checkboxInput = $(event.currentTarget).parents('.checklist').find('.checkboxTitle'),
                            checkboxTitle = $checkboxInput.val();

                        newCheckbox.title = checkboxTitle;
                        let checkbox = new CheckBox(newCheckbox);

                        let taskId ={
                            "id": $checkboxInput.data('taskid')
                        };

                        dataService
                            .addCheckbox(checkbox)
                            .then((response) => {
                                dataService.updateTask(taskId, response.Id)
                                    .then(() => {
                                        controllersInstance.listPreview({"dashboardId":arguments[0].dashboardId, "listId": arguments[0].listId});
                                    });
                            })
                            .catch(() => {
                                toastr.error('List not successfully added!');
                            });

                    });

                });
            }
        }
    }
};
