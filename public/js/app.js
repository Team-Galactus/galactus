
let router = new Navigo(null, true);

let controllersInstance = controllers.get(dataService, templates);

router
    .on({ // the order of the added routes using this method does not matter anymore
        "login": controllersInstance.login,
        "home": controllersInstance.home,
        "dashboards": controllersInstance.homeworks
    })
    .resolve(); // Very Important !!!


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
            $dashboardList = $('#dashboardList'),
            dashboardTitle = $('#dashboardTitle').val(),
            dashboardDescription = $('#dashboardDescription').val();

        newDashboard.title = dashboardTitle;
        newDashboard.description = dashboardDescription;

        $dashboardList.find('li.active').removeClass('active');
        $dashboardList.append('<li class="active">' +
                '<a href="#">' +
                    '<h2>' + newDashboard.title + '</h2>' +
                    '<p class="subTitle">' + newDashboard.description + '</p>' +
                '</a>' +
            '</li>');
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
                '<h3> ' + newList.title + '</h3>' +
                '<p class="listDescription">' + newList.description + '</p>' +
            '</li>');
    });

});

