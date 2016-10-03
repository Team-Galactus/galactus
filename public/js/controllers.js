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
                templates.get('welcome')
                .then((template) => {
                    let compiledTemplate = Handlebars.compile(template),
                        html = compiledTemplate();
                    $('#main').html(html);
                });
            },

            dashboard() {
                Promise.all([
                    dataService.dashboards(),
                    templates.get('main'),
                    templates.get('dashboardNav')
                ])
                .then(([data, mainTemplate, dashboardNavTemplate]) => {
                    let mainCompiledTemplate = Handlebars.compile(mainTemplate),
                        dashboardCompiledTemplate = Handlebars.compile(dashboardNavTemplate),
                        mainHtml = mainCompiledTemplate(),
                        dashboardHtml = dashboardCompiledTemplate(data.Result);

                    $('#main').html(mainHtml);
                    $('#dashboardNav').html(dashboardHtml);

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
                    templates.get('list')
                ])
                .then(([data, mainTemplate, dashboardTemplate, listsTemplate]) => {

                    let dashboards = JSON.parse(localStorage.getItem('dashboards'));
                    let mainCompiledTemplate = Handlebars.compile(mainTemplate),
                        dashboardCompiledTemplate = Handlebars.compile(dashboardTemplate),
                        listsCompiledTemplate = Handlebars.compile(listsTemplate),
                        mainHtml = mainCompiledTemplate(),
                        dashboardHtml = dashboardCompiledTemplate(dashboards),
                        listsHtml = listsCompiledTemplate(data.Result);

                    $('#main').html(mainHtml);
                    $('#dashboardNav').html(dashboardHtml);
                    $('#listsHolder').html(listsHtml);

                    $('a[href*="dashboard/' + id.id + '"]').parent('li').addClass('active');
                });
            },

            listPreview(dashboardId, listId) {
                console.log(arguments);
                Promise.all([
                    dataService.list(arguments[0].listId),
                    templates.get('main'),
                    templates.get('dashboardNav'),
                    templates.get('list'),
                    templates.get('listPreview')
                ])
                .then(([data, mainTemplate, dashboardTemplate, listsTemplate, listPreviewTemplate]) => {
                    let dashboards = JSON.parse(localStorage.getItem('dashboards')),
                        lists = JSON.parse(localStorage.getItem('lists'));

                    let mainCompiledTemplate = Handlebars.compile(mainTemplate),
                        dashboardCompiledTemplate = Handlebars.compile(dashboardTemplate),
                        listsCompiledTemplate = Handlebars.compile(listsTemplate),
                        listsPreviewCompiledTemplate = Handlebars.compile(listPreviewTemplate),

                        mainHtml = mainCompiledTemplate(),
                        dashboardHtml = dashboardCompiledTemplate(dashboards),
                        listsHtml = listsCompiledTemplate(lists),
                        listPreviewHtml = listsPreviewCompiledTemplate(data.Result);

                    $('#main').html(mainHtml);
                    $('#dashboardNav').html(dashboardHtml);
                    $('#listsHolder').html(listsHtml);
                    $('#listPreview').html(listPreviewHtml);

                    console.log("Tasks: ", data.Result);
                    $('a[href*="dashboard/' + arguments[0].dashboardId + '"]').parent('li').addClass('active');
                    $('a[href*="list/' + arguments[0].listId + '"]').parents('li').addClass('active');

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
                                        console.log("hoho");
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
