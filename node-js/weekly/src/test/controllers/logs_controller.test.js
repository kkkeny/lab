var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function LogStub () {
    return {
        user_id: '',
        indicator: '',
        platform: '',
        status: '',
        remark: '',
        method: '',
        ctime: '',
        mtime: '',
        atime: ''
    };
}

describe('LogController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /logs/new
     * Should render logs/new.ejs
     */
    it('should render "new" template on GET /logs/new', function (done) {
        request(app)
        .get('/logs/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/logs\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /logs
     * Should render logs/index.ejs
     */
    it('should render "index" template on GET /logs', function (done) {
        request(app)
        .get('/logs')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/logs\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /logs/:id/edit
     * Should access Log#find and render logs/edit.ejs
     */
    it('should access Log#find and render "edit" template on GET /logs/:id/edit', function (done) {
        var Log = app.models.Log;

        // Mock Log#find
        Log.find = sinon.spy(function (id, callback) {
            callback(null, new Log);
        });

        request(app)
        .get('/logs/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Log.find.calledWith('42').should.be.true;
            app.didRender(/logs\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /logs/:id
     * Should render logs/index.ejs
     */
    it('should access Log#find and render "show" template on GET /logs/:id', function (done) {
        var Log = app.models.Log;

        // Mock Log#find
        Log.find = sinon.spy(function (id, callback) {
            callback(null, new Log);
        });

        request(app)
        .get('/logs/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Log.find.calledWith('42').should.be.true;
            app.didRender(/logs\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /logs
     * Should access Log#create when Log is valid
     */
    it('should access Log#create on POST /logs with a valid Log', function (done) {
        var Log = app.models.Log
        , log = new LogStub;

        // Mock Log#create
        Log.create = sinon.spy(function (data, callback) {
            callback(null, log);
        });

        request(app)
        .post('/logs')
        .send({ "Log": log })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Log.create.calledWith(log).should.be.true;

            done();
        });
    });

    /*
     * POST /logs
     * Should fail when Log is invalid
     */
    it('should fail on POST /logs when Log#create returns an error', function (done) {
        var Log = app.models.Log
        , log = new LogStub;

        // Mock Log#create
        Log.create = sinon.spy(function (data, callback) {
            callback(new Error, log);
        });

        request(app)
        .post('/logs')
        .send({ "Log": log })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Log.create.calledWith(log).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /logs/:id
     * Should redirect back to /logs when Log is valid
     */
    it('should redirect on PUT /logs/:id with a valid Log', function (done) {
        var Log = app.models.Log
        , log = new LogStub;

        Log.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/logs/1')
        .send({ "Log": log })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/logs/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });

    /*
     * PUT /logs/:id
     * Should not redirect when Log is invalid
     */
    it('should fail / not redirect on PUT /logs/:id with an invalid Log', function (done) {
        var Log = app.models.Log
        , log = new LogStub;

        Log.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/logs/1')
        .send({ "Log": log })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * DELETE /logs/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Log on DELETE /logs/:id');

    /*
     * DELETE /logs/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Log on DELETE /logs/:id if it fails');
});
