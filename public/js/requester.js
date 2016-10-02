
let requester = {
    get(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                method: "GET",
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
                }
            });
        });
    },
    getJSON(url, options) {
        options = options || {};
        return new Promise((resolve, reject) => {
            let headers = options.headers || {};
            console.log(headers);
            $.ajax({
                url,
                headers,
                method: "GET",
                contentType: "application/json",
                success(response) {
                    resolve(response);
                },
                error(err) {
                    reject(err);
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
                },
                error(err) {
                    reject(err);
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
                },
                error(err) {
                    reject(err);
                }
            });
        });
    }
};