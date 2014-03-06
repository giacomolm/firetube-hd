define(["jquery", "underscore", "backbone"],
  function ($, _, Backbone) {
    var Video = Backbone.Model.extend({
      defaults: {
          id: undefined,
	  ext: undefined,
	  urls: []
      }

      });

    return Video;

  });
