var fs = require( 'fs' );
var _ = require( 'underscore' );
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
    
    var schema = {
      type: 'object',
      properties: {},
      required: []
    };
    
    for( var i = 0; i < keys.length; i++ ){
      var key = keys[ i ];
      
      schema.properties[ key ] = {};
      
      var isRequired = true;  
      var types = values.map( function( value ){
        var field = value[ i ];
        
        if( field === '' ){
          isRequired = false;
          return 'null';
        }
        
        return _( field ).isNumber() ? 
          ( /^\d+$/.test( field ) ? 
            'integer' : 
            'number' 
          ) : 
          'string';
      });
      
      types = _( types ).chain().without( 'null' ).uniq().value();
      
      var currentType = 'object';
      if( types.length === 0 ){
        currentType = 'string';
      } else if( types.length === 1 ){
        currentType = types[ 0 ];
      } else if( types.length === 2 && types.indexOf( 'number' ) !== -1 && types.indexOf( 'integer' ) !== -1 ){
        currentType = 'number';
      }
      
      schema.properties[ key ].type = currentType;
      
      if( isRequired ){
        schema.required.push( key );
      }  
    }    
    
    callback( null, schema );
  });  
};