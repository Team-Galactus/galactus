
var everliveApp = new Everlive('h2dqg9q03f6uig78');

var expandExp = {
  "Likes" : {
    "TargetTypeName" : "Users"
    }
};

var dataService = {
    
    dashboards() {
        let dashboardsData = everliveApp.data("Dashboard");
        let expandExpression = {
            "lists": {
                "TargetTypeName" : "List"
            }
        };
        let query = new Everlive.Query();
        let dashboardQuery = query.select();

        var result = dashboardsData.expand(expandExpression).get(dashboardQuery)
        .then((data) => {
            return data;
        });
        return result;


        //return requester.getJSON("/api/homeworks");
    }
};
