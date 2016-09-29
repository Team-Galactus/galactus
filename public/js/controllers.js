
var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            login() {

            },

            home() {

            },

            homeworks() {
                let homeworks;
                dataService.homeworks()
                    .then((homeworksResponse) => {
                        homeworks = homeworksResponse.result;
                        return templates.get("homeworks");
                    })
                    .then((templateHtml) => {
                        let templateFunc = handlebars.compile(templateHtml);
                        let html = templateFunc({ homeworks });
                        $("#container").html(html);
                    });
            },

            workshops() {

            },

            exams() {

            }
        }
    }
};
