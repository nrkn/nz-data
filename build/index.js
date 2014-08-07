var fs = require( 'fs' );
var path = require( 'path' );
var async = require( 'async' );
var _ = require( 'underscore' );
var csvToJsonCsv = require( '../tools/csv-to-json-csv' );
var csvToJsonSchema = require( '../tools/csv-to-json-schema' );
var csvToObjects = require( '../tools/csv-to-objects' );
var objectToJson = require( '../tools/object-to-json' );

if (typeof String.prototype.endsWith !== 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

var sourceDirectory = '..';

function loadCsvs( directory, callback ){
  fs.readdir( directory, function( err, files ){
    if( err ){
      callback( err );
      return;
    }
    
    files = files.filter( function( filename ){
      return filename.endsWith( '.csv' );
    });
    
    var csvs = files.map( function( filename ){
      return {
        filename: filename,
        csv: fs.readFileSync( path.join( directory, filename ), 'utf-8' )
      }
    });
    
    callback( null, csvs );
  });
}

function getJsonCsvPath( baseDirectory, filename ){
  filename = filename.substr( 0, filename.length - 4 );
  return path.join( baseDirectory, 'json/json.csv', filename + '.json.csv' );
}

function getJsonSchemaPath( baseDirectory, filename ){
  filename = filename.substr( 0, filename.length - 4 );
  return path.join( baseDirectory, 'json/schemas', filename + '.schema.json' );
}

function getJsonPath( baseDirectory, filename ){
  filename = filename.substr( 0, filename.length - 4 );
  return path.join( baseDirectory, 'json', filename + '.json' );
}

function jsonCsvs( csvs, callback ){
  async.map( csvs, function( data, callback ){    
    csvToJsonCsv( data.csv, function( err, csv ){
      callback( null, {
        filename: data.filename,
        jsonCsv: csv
      });      
    });
  }, callback );
}


function jsonSchemas( csvs, callback ){
  async.map( csvs, function( data, callback ){    
    csvToJsonSchema( data.csv, function( err, schema ){
      callback( null, {
        filename: data.filename,
        schema: schema
      });      
    });
  }, callback );
}

function objects( csvs, callback ){
  async.map( csvs, function( data, callback ){    
    csvToObjects( data.csv, function( err, arr ){
      callback( null, {
        filename: data.filename,
        arr: arr
      });      
    });
  }, callback );
}

loadCsvs( sourceDirectory, function( err, csvs ){
  if( err ) throw err;
  
  jsonCsvs( csvs, function( err, jsonCsvs ){
    if( err ) throw err;    
    
    jsonCsvs.forEach( function( data ){
      fs.writeFile( getJsonCsvPath( sourceDirectory, data.filename ), data.jsonCsv, function( err ){
        if( err ) throw err;
      });
    });
  });
  
  jsonSchemas( csvs, function( err, schemas ){
    if( err ) throw err;    
    
    schemas.forEach( function( data ){
      fs.writeFile( getJsonSchemaPath( sourceDirectory, data.filename ), JSON.stringify( data.schema, null, 2 ), function( err ){
        if( err ) throw err;
      });
    });
    
    objects( csvs, function( err, objs ){
      if( err ) throw err;    
      
      objs.forEach( function( obj ){        
        var schema = _( schemas ).find( function( data ){
          return data.filename === obj.filename;
        }).schema;
        

        
        objectToJson( obj.arr, schema, function( err, json ){          
          if( err ) throw err;  
          
          var filePath = getJsonPath( sourceDirectory, obj.filename );
          
          fs.writeFile( filePath, json, function( err ){
            if( err ) throw err;
          });          
        });
      });
    });
  });  
});