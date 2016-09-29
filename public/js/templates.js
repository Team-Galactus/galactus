
let templates = {
    get(name) {
        let url = `./templates/${name}.html`;
        return requester.get(url);
    }
};
