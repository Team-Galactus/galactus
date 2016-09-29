
var dataService = {
    homeworks() {
        let homeworksData = evLive.data("Homeworks");
        let query = new Everlive.Query();
        let homeworksQuery = query.select("course", "deadline");

        //
        var dasboardData = evLive.data("DashBoard");
        //let query2 = new Everlive.Query();
        var result = dasboardData.get(null);
        console.log(JSON.stringify(result));
        //console.log(JSON.parse(result));
        //

        return homeworksData.get(homeworksQuery);

        //return requester.getJSON("/api/homeworks");
    }
};
