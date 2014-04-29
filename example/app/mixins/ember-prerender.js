export default Ember.Mixin.create({
  willComplete: function() {
    Em.RSVP.resolve();
  },
  actions: {
    didTransition: function() {
      var promises = [];
      var currentHandlerInfos = this.router.get('router.currentHandlerInfos');
      for (var i = 0; i < currentHandlerInfos.length; i++) {
        if (currentHandlerInfos[i].handler.willComplete) {
          promises.push(currentHandlerInfos[i].handler.willComplete());
        }
      }
      Ember.RSVP.all(promises).then(App.prerenderReady);
    }
  }
});
