var isPublic = typeof window != "undefined";
/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things

  var map = {
    'app':                        'app', // 'dist',
    'tmp':                        'tmp',
    'fonts':                      'fonts',
    '@angular':                   (isPublic)? '@angular' : 'node_modules/@angular',
    'rxjs':                       (isPublic)? 'rxjs' : 'node_modules/rxjs',
    '@angular/http/testing':      (isPublic)? '@angular/http/bundles/http-testing.umd.js' : 'node_modules/@angular/http/bundles/http-testing.umd.js',
    '@angular/platform-browser/animations':      (isPublic)? '@angular/platform-browser/bundles/platform-browser-animations.umd.js' : 'node_modules/platform-browser/bundles/platform-browser-animations.umd.js',
    '@angular/animations/browser':      (isPublic)? '@angular/animations/bundles/animations-browser.umd.js' : 'node_modules/@angular/animations/bundles/animations-browser.umd.js',
    'ng2-pdf-viewer':             'ng2-pdf-viewer',
    'pdfjs-dist':                 'pdfjs-dist',
    'jwt-decode':                 'jwt-decode',
    'file-saver':                 (isPublic)? 'file-saver/FileSaver.js' : 'node_modules/file-saver/FileSaver.js',


    //'@angular/http/testing':      (isPublic)? '@angular/http/testing' : 'node_modules/@angular/http/testing'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'ng2-pdf-viewer':             { main: 'dist/index.js', defaultExtension: 'js' },
    'pdfjs-dist':                 { defaultExtension: 'js' },
    'jwt-decode':                 { defaultExtension: 'js' }

  };
  console.log(packages);
  console.log("this is map " ,map);
  var ngPackageNames = [
    'animations',
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  //console.log("this is config ->", config)
  System.config(config);
})(this);
