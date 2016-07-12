/**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('booktrade', [
      'ngAnimate',
      'ngMaterial',
      'ngStorage',
      'ngCookies'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$mdThemingProvider'/*, '$httpProvider', '$routeProvider', '$locationProvider'*/];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
  function config($mdThemingProvider/*, $httpProvider, $routeProvider, $locationProvider*/) {

    //$httpProvider.responseInterceptors.push('httpInterceptor');
/*
    $routeProvider
        .when('/', { templateUrl: 'views/dashboard.html', controller: 'dashboard' })
        .when('/login', { templateUrl: 'views/auth.html', controller: 'auth' })
        .otherwise({ redirectTo: '/' });
*/
    //$locationProvider.html5Mode(true);

    var customPrimary = {
        '50': '#b4b6ff',
        '100': '#9b9cff',
        '200': '#8183ff',
        '300': '#686aff',
        '400': '#4e51ff',
        '500': '#3538ff',
        '600': '#1b1fff',
        '700': '#0206ff',
        '800': '#0003e7',
        '900': '#0003ce',
        'A100': '#cecfff',
        'A200': '#e7e8ff',
        'A400': '#ffffff',
        'A700': '#0003b4',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    };
    $mdThemingProvider
        .definePalette('customPrimary', 
                        customPrimary);

    var customAccent = {
        '50': '#5c0021',
        '100': '#75002a',
        '200': '#8f0033',
        '300': '#a8003c',
        '400': '#c20045',
        '500': '#db004e',
        '600': '#ff0f65',
        '700': '#ff2975',
        '800': '#ff4285',
        '900': '#ff5c96',
        'A100': '#ff0f65',
        'A200': '#f50057',
        'A400': '#db004e',
        'A700': '#ff75a6'
    };
    $mdThemingProvider
        .definePalette('customAccent', 
                        customAccent);

    var customWarn = {
        '50': '#6eeebc',
        '100': '#57ecb2',
        '200': '#41e9a7',
        '300': '#2ae69d',
        '400': '#1add91',
        '500': '#17c682',
        '600': '#14af73',
        '700': '#129864',
        '800': '#0f8155',
        '900': '#0c6b46',
        'A100': '#85f1c7',
        'A200': '#9cf3d1',
        'A400': '#b3f6dc',
        'A700': '#0a5437'
    };
    $mdThemingProvider
        .definePalette('customWarn', 
                        customWarn);

    var customBackground = {
        '50': '#ffffff',
        '100': '#ffffff',
        '200': '#ffffff',
        '300': '#fefefe',
        '400': '#f2f2f2',
        '500': '#e5e5e5',
        '600': '#d8d8d8',
        '700': '#cbcbcb',
        '800': '#bfbfbf',
        '900': '#b2b2b2',
        'A100': '#fff',//this is background
        'A200': '#ffffff',
        'A400': '#ffffff',
        'A700': '#a5a5a5'
    };
    $mdThemingProvider
        .definePalette('customBackground', 
                        customBackground);

   $mdThemingProvider.theme('default')
       .primaryPalette('customPrimary')
       .accentPalette('customAccent')
       .warnPalette('customWarn')
       .backgroundPalette('customBackground')
    
  }

  angular
    .module('booktrade')
    .run(run);

  run.$inject = ['$rootScope'];

  function run($rootScope) {

  }