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
                    templates.get('list')
                ])
                .then(([data, mainTemplate, listsTemplate]) => {

                    let mainCompiledTemplate = Handlebars.compile(mainTemplate),
                        listsCompiledTemplate = Handlebars.compile(listsTemplate),
                        mainHtml = mainCompiledTemplate(),
                        listsHtml = listsCompiledTemplate(data.result[0]);

                    $('#main').html(mainHtml);
                    $('#listsHolder').html(listsHtml);
                    console.log("List results: ", data);
                });
            }
        }
    }
};
