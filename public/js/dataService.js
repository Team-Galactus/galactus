
var appID = "r6hpe5hoscwytyr2";
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

        const accessToken = JSON.parse(localStorage.getItem("user")).access_token;
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

    register(user) {
        var userData = {
            "Username": user.username,
            "Password": user.password,
            "DisplayName": "",
            "Email": ""
        }

        return requester
            .postJSON(`https://api.everlive.com/v1/${appID}/Users`, userData)
            .then((response) => {
                return Promise.resolve();
            })
            .catch((error) => {
                return Promise.reject();
            });
    },

    addDashboard(dashboard) {
        const accessToken = JSON.parse(localStorage.getItem("user")).access_token;
        const modifiedDashboard = {
            id: `${dashboard.id}`,
            title: dashboard.title,
            description: dashboard.description,
            lists: dashboard.lists
        };

        const options = { headers: { "Authorization": `Bearer ${accessToken}` } };

        return requester
            .postJSON(`https://api.everlive.com/v1/${appID}/DashBoard`, modifiedDashboard, options)
            .then((response) => {
                console.log("1");
                return Promise.resolve();
            })
            .catch((error) => {
                console.log("2");
                return Promise.reject();
            });
    },

    dashboards() {
        const accessToken = JSON.parse(localStorage.getItem("user")).access_token;
        const options = { headers: { "Authorization": `Bearer ${accessToken}` } };

        return requester
           .getJSON(`https://api.everlive.com/v1/${appID}/DashBoard`, options)
           .then((response) => {
               return response;
           })
           .catch((error) => {
               return null;
           });
    },

    dashboardLists(id) {
        let dashboardsData = everliveApp.data("DashBoard");
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
