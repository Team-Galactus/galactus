
var appID = "h2dqg9q03f6uig78";
var everliveApp = new Everlive(appID);

var dataService = {
    isLoggedIn() {
        return Promise.resolve()
            .then(() => {
                return !!localStorage.getItem("user");
            });
    },

    login(user) {
        const userData = {
            "username": user.username,
            "password": user.password,
            "grant_type": "password"
        };

        return requester
            .postJSON(`https://api.everlive.com/v1/${appID}/oauth/token`, userData)
            .then((response) => {
                return {
                    loggedInSuccessfully: true,
                    result: response.Result
                };
            })
            .catch((error) => {
                return {
                    loggedInSuccessfully: false,
                    result: null
                };
            });
    },

    logout() {
        if (localStorage.getItem("user") === null) {
            return Promise.resolve()
                .then(() => {
                    return null;
                });
        }

        const user = JSON.parse(localStorage.getItem("user"));
        const accessToken = user.access_token;
        const options = { headers: { "Authorization": `Bearer ${accessToken}` } };

        return requester
            .getJSON(`https://api.everlive.com/v1/${appID}/oauth/logout`, options)
            .then((response) => {
                return user.username;
            })
            .catch((error) => {
                return null;
            });
    },

    dashboards() {
        let dashboardsData = everliveApp.data("Dashboard");

        var result = dashboardsData.get()
        .then((data) => {
            return data;
        });
        return result;
    },

    dashboardLists(id) {
        let dashboardsData = everliveApp.data("Dashboard");
        let expandExpression = {
            "lists": {
                "TargetTypeName": "List"
            }
        };
        let query = new Everlive.Query();
        let dashboardQuery = query.take(id);
        let dashboardQuery1 = query.select("title", "description");

        var result = dashboardsData.expand(expandExpression).get(dashboardQuery)
            .then((data) => {
                console.log("data", data);
                return data;
            });
        return result;
    }
};
