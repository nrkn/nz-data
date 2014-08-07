var fs = require( 'fs' );
var tv4 = require( 'tv4' );
var async = require( 'async' );
var _ = require( 'underscore' );

_.mixin({
  indent: function( str, depth ){
    var lines = str.split( '\n' );
    lines = lines.map( function( line ){
      return Array( depth + 1 ).join( ' ' ) + line;
    });
    return lines.join( '\n' );
  }
});

function objectToJson( obj, schema, callback ){     
  if( _( obj ).isArray() ){
    
    var data = obj.map(function(el){
      return {
        obj: el,
        schema: schema
      };
    });    
    async.map( data, asyncObjectToJson, function( err, jsons ){
      var result = '[\n' + _( jsons.join( ',\n' ) ).indent( 2 ) + '\n]';      
      callback( null, result );
    });
    
    return;
  }
  
  var data = _( obj ).map( function( value, key ){
    if( _( schema.properties ).has( key ) ){
      var t = schema.properties[ key ].type;
      
      if( value === '' && ( t === 'number' || t === 'integer' ) ){
        return 0;
      }
    }
    
    return [ key, value ];
  });
  
  data = _( data ).object();
  
  if( tv4.validate( data, schema ) ){
    
    var json = JSON.stringify( data, function( key, value ){      
      if( _( schema.properties ).has( key ) ){
        var t = schema.properties[ key ].type;
        if( t === 'number' ){
          value = parseFloat( value );
          if( value % 1 === 0 ){
            return value + '.0';
          }
        }
      }
      
      return value;
    }, 2 );
       
    callback( null, json );
    return;   
  }
  
  var result = tv4.validateResult(data, schema);  
  
  console.log( result.error );
  callback( result.error );  
};

function asyncObjectToJson( data, callback ){      
  objectToJson( data.obj, data.schema, function( err, data ){
    if( err ) {
      callback( err );
      return;
    }
    callback( null, data );
  });
}

module.exports = objectToJson;