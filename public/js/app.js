
let router = new Navigo(null, true);

let controllersInstance = controllers.get(dataService, templates);

router
    .on({ // the order of the added routes using this method does not matter anymore
        "login": controllersInstance.login,
        "home": controllersInstance.home,
        "homeworks": controllersInstance.homeworks,
        "workshops": controllersInstance.workshops,
        "exams": controllersInstance.exams
    })
    .resolve(); // Very Important !!!

//toggle navigation link active class
$('#dashboardNav li').on('click', (event) => {
    $("#dashboardNav li.active").removeClass("active");
    $(event.currentTarget).addClass(" active");
});
