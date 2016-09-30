
let templates = {
    get(name) {
        let url = `./templates/${name}.handlebars`;
        return requester.get(url);
    }
};

//const templateLoader = (() => {
//    function get(templateName) {
//        return new Promise((resolve, reject) => {
//            $.get(`../templates/${templateName}.handlebars`)
//            .done((data) => {
//                    let template = Handlebars.compile(data);
//                    resolve(template);
//                })
//            .fail(reject);
//        })
//    }
//
//    return {
//        get
//    }
//})();

//export { templateLoader };


