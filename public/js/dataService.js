
let homeworks = 
    [{
        id: 1,
        course: "JS-App",
        deadline: "04.10.2016"
    },
    {
        id: 2,
        course: "HQC-2",
        deadline: "07.10.2016"
    }];


var dataService = {
    homeworks() {

        // this is a temporarily hack
        return Promise.resolve()
            .then(() => {
                return { homeworks };
            }); 
        //return requester.getJSON("/api/homeworks");
    }
};
