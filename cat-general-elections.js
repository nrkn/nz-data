// read all the year data json files and concatenate them into a single json file

var fs = require( 'fs' );
var keys = Object.keys || require( 'object-keys' );

// year data json filename pattern
var electionDataFilenameRegex = /nz-general-election-(\d{4})\.json/;

// get the filenames in the current directory that match the pattern
var filenames = fs.readdirSync( './' ).filter( function( filename ){
  return electionDataFilenameRegex.test( filename );
});

// read those files into an array
var yearJson = filenames.map( function( filename ){ 
  return fs.readFileSync( filename );
});

// copy the data for each year into a new object
var data = {};
yearJson.forEach( function( json ){
  var obj = JSON.parse( json );
  var year = getYear( obj );
  data[ year ] = obj[ year ];
});

// convert that object to json
var json = JSON.stringify( data, null, 2 );

// write the combined json to disk
fs.writeFileSync( 'nz-general-elections.json', json );

// the year data is always an object with a single key, that key being a year
function getYear( obj ){
  return parseInt( keys( obj )[ 0 ], 10 );
}