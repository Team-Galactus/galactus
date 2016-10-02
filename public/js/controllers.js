//import { templateLoader } from './templates'

var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            loginUser() {
                let user = {
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
                                return false;
                            });
                    });
            },

            logoutUser() {
                return dataService
                    .logout()
                    .then((response) => {
                        if (response !== null) {
                            toastr.success(`${response.username} logged out successfully!`);
                        }
                        localStorage.removeItem("user");
                        $("#dashboardNav").html("");
                        router.navigate("/home");

                        // false: show navigation elements, hide logout button
                        return false;
                    });
            },

            register() {
                
            },

            home() {

            },

            dashboard() {
                Promise.all([
                    dataService.dashboards(),
                    templates.get('dashboardNav')
                ])
                .then(([data, template]) => {

                    let compiledTemplate = Handlebars.compile(template),
                        html = compiledTemplate(data.result);

                    $('#dashboardNav').html(html);
                    console.log("Dashboard results: ", data);
                });
            },

            dashboardLists(id) {
                Promise.all([
                    dataService.dashboardLists(id),
                    templates.get('list')
                ])
                .then(([data, template]) => {

                    let compiledTemplate = Handlebars.compile(template),
                        html = compiledTemplate(data.result[0]);
                    $('#listsHolder').html(html);
                    console.log("List results: ", data, html, $('#listsHolder'));
                });
            }
        }
        //});
    }
};
