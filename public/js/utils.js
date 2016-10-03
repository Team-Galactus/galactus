/**
 * Created by Angelina on 10/3/2016.
 */
Handlebars.registerHelper('dateFilter', function (data) {
    if (data) {
        //var newDate = data.substring(0, 10);
        var newDate2 = new Date(data);
        var day = newDate2.getDate();
        var month = newDate2.getMonth()+1;
        var year = newDate2.getFullYear();
        if(day<10){day='0'+day}
        if(month<10){month='0'+month}
        var result = day+'/'+month+'/'+year;
        return new Handlebars.SafeString(result);
    } else {
        return new Handlebars.SafeString("Not set");
    }
});
