
let router = new Navigo(null, true);

let controllersInstance = controllers.get(dataService, templates);

router
    .on("login", controllersInstance.login)
    .on("home", controllersInstance.home)
    .on("homeworks", controllersInstance.homeworks)
    .on("workshops", controllersInstance.workshops)
    .on("exams", controllersInstance.exams)
    .resolve(); // Very Important !!!

//toggle navigation link active class
$('#dashboardNav li').on('click', (event) => {
    $("#dashboardNav li.active").removeClass("active");
    $(event.currentTarget).addClass(" active");
});
