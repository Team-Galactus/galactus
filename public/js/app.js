
// toastr configuration
toastr.options.preventDuplicates = true;
toastr.options.timeOut = 2500; // How long the toast will display without user interaction
toastr.options.extendedTimeOut = 60; // How long the toast will display after a user hovers over it
toastr.options.progressBar = true;
toastr.options.closeButton = true;

let controllersInstance = controllers.get(dataService, templates);

let router = new Navigo(null, true);

dataService
    .isLoggedIn()
    .then(setNavigationElementsVisibility);

router
    .on({ // the order of the added routes using this method does not matter anymore
        "home": controllersInstance.home,
        "register": controllersInstance.registerUser,
        "dashboard": controllersInstance.dashboard,
        "dashboard/:id": controllersInstance.dashboardLists,
        "dashboard/:dashboardId/list/:listId": controllersInstance.listPreview,
        "": (() => {
            router.navigate("/home");
        })
    })
    .resolve();

$(document).ready(() => {

    $("#nav-btn-login").on("click", (ev) => {
        ev.preventDefault();
        controllersInstance
            .loginUser()
            .then(setNavigationElementsVisibility);
    });

    $('#nav-btn-logout').on('click', (ev) => {
        ev.preventDefault();
        controllersInstance
            .logoutUser()
            .then(setNavigationElementsVisibility);
    });

});

function setNavigationElementsVisibility(hide) {
    if (hide) {
        $("#tb-username").addClass("hidden");
        $("#tb-username").val("");
        $("#tb-password").addClass("hidden");
        $("#tb-password").val("");
        $('#nav-btn-login').addClass('hidden');
        $('#nav-btn-register').addClass('hidden');
        $('#nav-btn-logout').removeClass('hidden');
        $('.welcomeHolder a').addClass('hidden');
    } else {
        $("#tb-username").removeClass("hidden");
        $("#tb-password").removeClass("hidden");
        $('#nav-btn-login').removeClass('hidden');
        $('#nav-btn-register').removeClass('hidden');
        $('#nav-btn-logout').addClass('hidden');
        $('.welcomeHolder a').removeClass('hidden');
        $('#btn-dashboards').addClass('hidden');
    }
}