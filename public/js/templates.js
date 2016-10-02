
let templates = {
    get(name) {
        let url = `./templates/${name}.handlebars`;
        return requester.get(url);
    }
};
