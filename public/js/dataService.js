
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
                return Promise.resolve();
            })
            .catch((error) => {
                return Promise.reject();
            });
    },

    addList(list) {
        const accessToken = JSON.parse(localStorage.getItem("user")).access_token;
        const modifiedList = {
            id: `${list.id}`,
            title: list.title,
            description: list.description
            //tasks: list.tasks
        };

        const options = { headers: { "Authorization": `Bearer ${accessToken}` } };

        return requester
            .postJSON(`https://api.everlive.com/v1/${appID}/List`, modifiedList, options)
            .then((response) => {
                return Promise.resolve(response.Result);
            })
            .catch((error) => {
                return Promise.reject();
            });
    },

    dashboards() {
        const accessToken = JSON.parse(localStorage.getItem("user")).access_token;
        const options = { headers: { "Authorization": `Bearer ${accessToken}` } };

        return requester
           .getJSON(`https://api.everlive.com/v1/${appID}/DashBoard`, options)
           .then((response) => {

               localStorage.setItem('dashboards',JSON.stringify(response.Result));

               return response;
           })
           .catch((error) => {
               return null;
           });
    },



    dashboardLists(id) {
        const accessToken = JSON.parse(localStorage.getItem("user")).access_token;
        const options = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "X-Everlive-Expand": JSON.stringify({
                    "lists": {
                        "TargetTypeName" : "List"
                     }
                })
            }
        };

        return requester
            .getJSON(`https://api.everlive.com/v1/${appID}/DashBoard/${id.id}`, options)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return null;
            });
    },

    updateDashboard(dashboardId, listId ) {
        const accessToken = JSON.parse(localStorage.getItem("user")).access_token;
        const options = { headers: { "Authorization": `Bearer ${accessToken}` } };

        return this.dashboardLists(dashboardId)
            .then((response)=>{
                let dashboardListIds = response.Result.lists.map((list) => list.Id);
                dashboardListIds.push(listId);

                let updatedDashboard = {
                    "lists": dashboardListIds
                };

                return requester
                    .putJSON(`https://api.everlive.com/v1/${appID}/DashBoard/${dashboardId.id}`, updatedDashboard, options)
                    .then((response) => {
                        return response;
                    })
                    .catch((error) => {
                        return null;
                    });
            })
            .then(() => {
                return Promise.resolve();
            });
    }
};
