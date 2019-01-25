// Dependencies
const proxyquire = require('proxyquire');
const chai = require('chai');
chai.use(require('sinon-chai'));
let expect = chai.expect;
const sinon = require('sinon');
const sinonStubPromise = require('sinon-stub-promise');

const fetch = require('node-fetch');

sinonStubPromise(sinon);

let fetchStub;

const { makeMockModels } = require('sequelize-test-helpers');

const mockModels = makeMockModels({
    fetch: sinon.stub(),
});

const save = proxyquire('../util/services', {
    '../models': mockModels,
});

let result;

describe('Service testing', () => {
    fetchStub = sinon.stub(fetch);

    const resetStubs = () => {
    };

    context('Testing post', () => {
        before(async () => {
            result = await save.fetch.post('test', '/test', {internalUserId: 0}, 'testbody');
        });

        after(resetStubs);

        it('Checked everything', () => {
            expect(result).to.eql({});
        });
    });

    context('Testing get', () => {
        before(async () => {
            result = await save.fetch.get('test', '/test', {internalUserId: 0});
        });

        after(resetStubs);

        it('Checked everything', () => {
            expect(result).to.eql({});
        });
    });
});