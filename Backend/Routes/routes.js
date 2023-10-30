const authcontroller = require('../Controller/authcontroller');
const loancontroller = require('../Controller/loancontroller');

const { authenticate, unAuthenticate } = require('../Middlewares/auth');

function initRoutes(app) {
    app.get('/', (req, res) => {
        return res.json('Welcome to Loan App');
    });

    // Auth Routes
    app.post('/register', authcontroller().register);
    app.post('/login', authcontroller().login);
    app.post('/logout', authcontroller().logout);

    // Loan Routes
    app.get('/myloans', loancontroller().myLoan);
    app.post('/loan-apply', loancontroller().newloan);
    app.post('/approve-status', loancontroller().updatestatus);
    app.post('/payInstallment', loancontroller().payInstallment);
}

module.exports = initRoutes;