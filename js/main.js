/*inizializazzione require*/
require.config({
  paths: {
    domReady: '../lib/require/domReady',
    text: '../lib/require/text',
    async: '../lib/require/async',
    jquery: '../lib/zepto/zepto',
    backbone: '../lib/backbone/backbone',
    ractive: '../lib/ractive/ractive',
    underscore:  '../lib/underscore/underscore',
    templates:"../templates",
    utils: "../lib/underscore/Utils"
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'backbone': {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
    },
    'ractive': {
        exports: 'ractive'
    }
  }
});

/*Main dell'applicazione*/
require(['jquery','domReady','underscore','backbone', 'router', 'utils'],
    function ($,domReady, _,Backbone, AppRouter, Utils) {
    domReady(function () {
      run();
      //document.addEventListener("deviceready", run, false);
    });

    function run() {	
        new AppRouter();
        Backbone.history.start();
    }
  });
