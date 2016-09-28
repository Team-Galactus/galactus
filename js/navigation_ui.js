/**
 * Created by Angelina on 9/28/2016.
 */
//toggle nvigation link active class
$(document).ready( function () {
    var $dashboardItem = $('#dashboardNav li');

    $dashboardItem.click(function(event) {
        event.preventDefault();
        var $activeLink = $('#dashboardNav li.active'),
            $target = $(this);
        $activeLink.removeClass('active')
        $target.addClass('active');
    });


});
