var fs = require( 'fs' );
var csvToJsonCsv = require( './csv-to-json-csv' );

module.exports = function( csvString, callback ){
  function csvLineToArray( line ){
    return JSON.parse( '[' + line + ']' );
  }
  
  csvToJsonCsv( csvString, function( err, jsonCsvString ){
    if( err ){
      callback( err );
    };
   
    var csvLines = jsonCsvString.split( '\n' );
    var headerLine = csvLines[ 0 ];
    csvLines = csvLines.slice( 1 );
    
    var keys = csvLineToArray( headerLine );
    var values = csvLines.map( function( line ){
      return csvLineToArray( line );
    });    
    
    var arr = values.map( function( arr ){
      var obj = {};
      
      for( var i = 0; i < keys.length; i++ ){
        obj[ keys[ i ] ] = arr[ i ];
      }
      
      return obj;
    });
    
    callback( null, arr );
  });  
};