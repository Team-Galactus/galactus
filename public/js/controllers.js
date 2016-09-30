
var handlebars = handlebars || Handlebars;

let controllers = {
    get(dataService, templates) {
        return {
            login() {

            },

            home() {

            },

            dashboard() {
                let dashboards;
                dataService.dashboards.get()
                    .then((dataService)=>{
                        console.log(data)
                    })
                    
                   
            },

            workshops() {

            },

            exams() {

            }
        }
    }
};
