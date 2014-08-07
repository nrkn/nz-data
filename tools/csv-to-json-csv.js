var fs = require( 'fs' );
var parse = require('csv-parse');
var _ = require( 'underscore' );
var strToJsonCsv = require( './string-to-json-csv' );

module.exports = function( csvLines, callback ){
  parse( csvLines, function( err, lines ){
    if( err ){
      callback( err );
    };
    
    var csvLines = lines.map( function( line ){
      var values = line.map( function( value ){      
        return strToJsonCsv( value );
      });
      
      return values.join( ',' );
    });
    callback( null, csvLines.join( '\n' ) );
  });
};