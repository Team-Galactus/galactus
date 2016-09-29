
let requester = {
    get(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: "GET",
                success(response) {
                    resolve(response);
                }
            });
        });
    },
    getJSON(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: "GET",
                contentType: "application/json",
                success(response) {
                    resolve(response);
                }
            });
        });
    },
    putJSON(url, body, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            let headers = options.headers || {};

            $.ajax({
                url,
                headers,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                }
            });
        });
    },
    postJSON(url, body, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            var headers = options.headers || {};

            $.ajax({
                url,
                headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                }
            });
        });
    }
};