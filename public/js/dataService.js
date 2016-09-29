
var dataService = {
    homeworks() {
        let homeworksData = evLive.data("Homeworks");
        let query = new Everlive.Query();
        let homeworksQuery = query.select("course", "deadline");

        return homeworksData.get(homeworksQuery);

        //return requester.getJSON("/api/homeworks");
    }
};
