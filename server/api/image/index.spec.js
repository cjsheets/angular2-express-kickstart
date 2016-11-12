'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var imageCtrlStub = {
  index: 'imageCtrl.index',
  show: 'imageCtrl.show',
  create: 'imageCtrl.create',
  upsert: 'imageCtrl.upsert',
  patch: 'imageCtrl.patch',
  destroy: 'imageCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var imageIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './image.controller': imageCtrlStub
});

describe('Image API Router:', function() {
  it('should return an express router instance', function() {
    imageIndex.should.equal(routerStub);
  });

  describe('GET /api/images', function() {
    it('should route to image.controller.index', function() {
      routerStub.get
        .withArgs('/', 'imageCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/images/:id', function() {
    it('should route to image.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'imageCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/images', function() {
    it('should route to image.controller.create', function() {
      routerStub.post
        .withArgs('/', 'imageCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/images/:id', function() {
    it('should route to image.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'imageCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/images/:id', function() {
    it('should route to image.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'imageCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/images/:id', function() {
    it('should route to image.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'imageCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
