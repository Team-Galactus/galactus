//import { templateLoader } from './templates'

var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            login() {

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
                })
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
                    })
            }
        }
    }
};
