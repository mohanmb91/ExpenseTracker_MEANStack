 describe('emUser', function($http,$scope) {
  beforeEach(module('app'));

  describe('isAdmina', function() {
    it('should return false if the roles array does not have an admin entry', inject(function(emUser) {
      var user = new emUser();
      user.roles = ['not admin'];
      expect(user.isAdmin()).to.be.falsey;
    }));

    it('should return true if the roles array has an admin entry', inject(function(emUser) {
      var user = new emUser();
      user.roles = ['admin'];
      expect(user.isAdmin()).to.be.true;
    }))
  })
})