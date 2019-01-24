// Dependencies
const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');
const sinonStubPromise = require('sinon-stub-promise');

// Services
const UserService = require('../services/UserService');
const NotificationService = require('../services/NotificationService');

sinonStubPromise(sinon);

const userStub = sinon.stub(UserService, 'retriveOne');
const notificationStub = sinon.stub(NotificationService, 'sendEmail');

const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({
    warningSubscriber: {
        findAll: sinon.stub(),
        create: sinon.stub(),

    },
    sequelize: {
        Promise: {
            reject: sinon.stub()
        }
    }
});

const save = proxyquire('../controllers/warningSubscriber', {
    '../models': mockModels,
});

let result;

describe('WarningSubsriber testing', () => {
    const warningSubscriber = {
        title: 'title',
        comment: 'comment',
        warningId: '7357',
        status: 'wip'
    };

    const resetStubs = () => {
        mockModels.warningSubscriber.findAll.resetHistory();
    };

    context('Testing sendFunction() when nobody is subscribed', () => {
        before(async () => {
            mockModels.warningSubscriber.findAll.resolves([]);
            mockModels.sequelize.Promise.reject.resolves('Failed');
            notificationStub.resolves({ status: 400 });
            result = await save.send(warningSubscriber);
        });

        after(resetStubs);

        it('called warningSubscriber.findAll', () => {
            expect(mockModels.warningSubscriber.findAll).to.have.been.called;
        });

        it('called NotificationService.sendMail', () => {
            expect(notificationStub).to.have.been.called;
        });

        it('called warningSubscriber.findAll', () => {
            expect(result).to.eql('Failed');
        });
    });

    context('Testing sendFunction() when one is subscribed', () => {

        before(async () => {
            mockModels.warningSubscriber.findAll.resolves([{dataValues: {userId: 1}}]);
            userStub.resolves({ json: sinon.stub().returns([]) });
            notificationStub.resolves({ status: 202 });
            result = await save.send(warningSubscriber);
        });

        after(resetStubs);

        it('called warningSubscriber.findAll', () => {
            expect(mockModels.warningSubscriber.findAll).to.have.been.called;
        });

        it('called NotificationService.sendMail', () => {
            expect(notificationStub).to.have.been.called;
        });

        it('called UserService.findOne', () => {
            expect(userStub).to.have.been.called;
        });

        it('called warningSubscriber.findAll', () => {
            expect(result.dataValues.msg).to.eql('Emails where sent successfully');
        });
    });

    context('Testing sendFunction() when multiple is subscribed', () => {

        before(async () => {
            mockModels.warningSubscriber.findAll.resolves([{dataValues: {userId: 1}}, {dataValues: {userId: 2}}]);
            userStub.resolves({ json: sinon.stub().returns([]) });
            notificationStub.resolves({ status: 202 });
            result = await save.send(warningSubscriber);
        });

        after(resetStubs);

        it('called warningSubscriber.findAll', () => {
            expect(mockModels.warningSubscriber.findAll).to.have.been.called;
        });

        it('called NotificationService.sendMail', () => {
            expect(notificationStub).to.have.been.called;
        });

        it('called UserService.findOne', () => {
            expect(userStub).to.have.been.called;
        });

        it('called warningSubscriber.findAll', () => {
            expect(result.dataValues.msg).to.eql('Emails where sent successfully');
        });
    });
});