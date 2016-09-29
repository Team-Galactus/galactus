
let templates = {
    get(name) {
        console.log(name);
        let url = `./templates/${name}.html`;
        console.log(url);
        return requester.get(url);
    }
};
