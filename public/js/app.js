
let apiKey = "h2dqg9q03f6uig78";
let evLive = new Everlive(apiKey);

// toastr configuration
toastr.options.preventDuplicates = true;
toastr.options.timeOut = 2500; // How long the toast will display without user interaction
toastr.options.extendedTimeOut = 60; // How long the toast will display after a user hovers over it
toastr.options.progressBar = true;
toastr.options.closeButton = true;

let controllersInstance = controllers.get(dataService, templates);

let router = new Navigo(null, true);

function setNavigationElementsVisibility(hide) {
    if (hide) {
        $("#tb-username").addClass("hidden");
        $("#tb-username").val("");
        $("#tb-password").addClass("hidden");
        $("#tb-password").val("");
        $('#nav-btn-login').addClass('hidden');
        $('#nav-btn-register').addClass('hidden');
        $('#nav-btn-logout').removeClass('hidden');
    } else {
        $("#tb-username").removeClass("hidden");
        $("#tb-password").removeClass("hidden");
        $('#nav-btn-login').removeClass('hidden');
        $('#nav-btn-register').removeClass('hidden');
        $('#nav-btn-logout').addClass('hidden');
    }
}

dataService
    .isLoggedIn()
    .then(setNavigationElementsVisibility);

router
    .on({ // the order of the added routes using this method does not matter anymore
        "home": controllersInstance.home,
        "register": controllersInstance.register,
        "dashboard": controllersInstance.dashboard,
        "dashboard/:id": controllersInstance.dashboardLists,
        "": (() => {
            router.navigate("/home");
        })
        //"dashboard/:id/lists/:id":
    })
    .resolve(); // Very Important !!!

$("#nav-btn-login").on("click", (ev) => {
    // The preventDefault() method cancels the event if it is cancelable
    // For example, this can be useful when:
    //
    //    1. Clicking on a "Submit" button, prevent it from submitting a form
    //    2. Clicking on a link, prevent the link from following the URL
    ev.preventDefault();
    controllersInstance
        .loginUser()
        .then(setNavigationElementsVisibility);
});

$('#nav-btn-logout').on('click', () => {
    controllersInstance
        .logoutUser()
        .then(setNavigationElementsVisibility);
});

$(document).ready(() => {

    //toggle navigation link active class
    $('#dashboardNav').on('click', "li", (event) => {
        $("#dashboardNav li.active").removeClass("active");
        $(event.currentTarget).addClass(" active");
    });

    //submit event for addDashboard modal
    $('#addDashboard').click((event) => {
        event.preventDefault();
        let newDashboard = {},
            dashboardTitle = $('#dashboardTitle').val(),
            dashboardDescription = $('#dashboardDescription').val();

        newDashboard.title = dashboardTitle;
        newDashboard.description = dashboardDescription;

        let dashboard = new DashBoard(newDashboard);

        dataService
            .addDashboard(dashboard)
            .then(() => {
                controllersInstance.dashboard();
            })
            .catch(() => {
                toastr.error('Dashboard not added successfully!');
            });
    });

    //submit event for addList modal
    $('#addList').click((event) => {
        event.preventDefault();
        let newList = {},
            $listHolder = $('#lists'),
            listTitle = $('#listTitle').val(),
            listDescription = $('#listDescription').val();

        newList.title = listTitle;
        newList.description = listDescription;

        $listHolder.append('<li class="singleList">' +
                '<h3><a href=""> ' + newList.title + '</a></h3>' +
                '<p class="listDescription">' + newList.description + '</p>' +
            '</li>');
    });

});

