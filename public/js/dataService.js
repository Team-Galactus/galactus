
var everliveApp = new Everlive('h2dqg9q03f6uig78');

var expandExp = {
  "Likes" : {
    "TargetTypeName" : "Users"
    }
};

var dataService = {
    
    dashboards() {
        let dashboardsData = everliveApp.data("Dashboard");
        //let query = new Everlive.Query();
        //let dashboardQuery = query.select("title", "description");

        //
        //var dasboardData = evLive.data("DashBoard");
        //let query2 = new Everlive.Query();
        var result = dasboardData.get(null);
        console.log(JSON.stringify(result));
        //console.log(JSON.parse(result));
        //

       // return homeworksData.get(homeworksQuery);

        //return requester.getJSON("/api/homeworks");
    }
};
