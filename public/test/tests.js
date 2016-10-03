mocha.setup('bdd');

const {expect, assert} = chai;

const AUTH_KEY = "SOME_AUTH_KEY";
const user = {
	username: 'SOME_USERNAME',
	passHash: 'SOME_PASSHASH',
	"grant_type": "password"
};


describe('Tests', function () {

	describe('Is loggedIn tests', function () {
		beforeEach(function () {
			sinon.stub(requester, 'postJSON')
				.returns(new Promise((resolve, reject) => {
					resolve({
						result: {
							username: user.username,
							authKey: AUTH_KEY
						}
					});
				}));
			localStorage.clear();
		});
		afterEach(function () {
			requester.postJSON.restore();
			localStorage.clear();
		});

		it('expect not to be logged in when have not logged in', function (done) {
			dataService.isLoggedIn()
				.then(f => {

					expect(f).to.be.false;
				})
				.then(done, done);
		});
		it('expect to be logged in when we have logged in', function (done) {
			dataService.login(user)
				.then(f => {
					//console.log(f.loggedInSuccessfully);
					expect(f.loggedInSuccessfully).to.be.true;
				})
				.then(done, done);
		});
	});

	describe('Logout tests', function () {
		const result = {
			result: []
		};
		beforeEach(function () {
			sinon.stub(requester, 'getJSON')
				.returns(new Promise((resolve, reject) => {
					resolve(result);
				}));
			sinon.stub(requester, 'postJSON')
				.returns(new Promise((resolve, reject) => {
					resolve({
						result: {
							username: user.username,
							authKey: AUTH_KEY
						}
					});
				}));
		});
		afterEach(function () {
			requester.getJSON.restore();
			requester.postJSON.restore();
			localStorage.clear();
		});

		it('expect localStorage to have no username after logout', function (done) {
			dataService.login(user)
				.then(() => {
					return dataService.logout();
				})
				.then((f) => {
					//console.log(f);
					expect(f).to.be.null;
				})
				.then(done, done);
		});

		it('expect localStorage to have no authKey after logout', function (done) {
			dataService.login(user)
				.then(() => {
					return dataService.logout();
				})
				.then(() => {
					expect(localStorage.getItem('authKey')).to.be.null;
				})
				.then(done, done);
		});
	});

	describe('Dashboard tests', function () {
		const result = {
			result: []
		};
		beforeEach(function () {
			sinon.stub(requester, 'getJSON')
				.returns(new Promise((resolve, reject) => {
					resolve(result);
				}));

			//response.result["username"] = user.username;
			//localStorage.setItem("user", JSON.stringify(user.username));
			sinon.stub(requester, 'postJSON')
				.returns(new Promise((resolve, reject) => {
					resolve({
						result: {
							username: user.username,
							authKey: AUTH_KEY
						}
					});
				}));
		});
		afterEach(function () {
			requester.getJSON.restore();
			requester.postJSON.restore();
			localStorage.clear();
		});
		//console.log(user);
		it('expect Dashboard to return result when is loged', function (done) {
			localStorage.setItem("user", JSON.stringify(user.username));
			dataService.dashboards()
				.then((f) => {
					//console.log(f);
					expect(f).to.be.equal(result);
				})
				.then(done, done);
		});

		it('expect Dashboard return null when is logedOut', function (done) {
			dataService.logout()
				.then(() => {
					return dataService.dashboards();
				})
				.then((f) => {
					//console.log(f);
					expect(f).to.be.equal(result);
				})
				.then(done, done);
		});
	});
	describe('classes tests', function () {

		let newDashboard = { title: 'user Title', description: 'user descript' }
		let classes = new DashBoard(newDashboard);
		beforeEach(function () {

		});

		it('expect class Dashboard correct add new element list', function () {
			expect('list').to.be.equal(classes.addList('list')._lists[0]);
		});

	});

});

mocha.run();
