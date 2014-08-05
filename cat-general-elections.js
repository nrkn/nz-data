var fs = require( 'fs' );
var extend = require( 'extend' );

// read all the year data json files and concatenate them into a single json file
(function(){
  'use strict';

  // year data json filename pattern
  var electionDataFilenameRegex = /nz-general-election-(\d{4})\.json/;

  // new object to hold combined data
  var data = {};
  
  fs.readdirSync( './' )
    // get the filenames in the current directory that match the pattern
    .filter( function( filename ){
      return electionDataFilenameRegex.test( filename );
    })
    // read each file and copy the data for each year into a single object
    .forEach( function( filename ){
      extend( data, JSON.parse( fs.readFileSync( filename ) ) );
    });
  
  // convert new object to json
  var json = JSON.stringify( data, null, 2 );

  // write the combined json to disk
  fs.writeFileSync( 'nz-general-elections.json', json );
})();