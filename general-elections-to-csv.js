var _ = require( 'underscore' );
var fs = require( 'fs' );

_.mixin({
  quote: function( str ){
    return '"' + str + '"'
  }
});

var yearData = JSON.parse( fs.readFileSync( 'nz-general-elections.json' ) );

writeMetaCsv( yearData );

_( yearData ).each( function( data, year ){
  writeResultCsv( year, data.results );  
});

function writeMetaCsv( yearData ){
  var stringKeys = [ 'date', 'wikiSlug' ];

  var keys = _( yearData )    
    .chain()
    .map( function( year ){
      return _( year ).keys();
    })
    .flatten()
    .uniq()
    .without( 'results' )
    .value();
    
  var headers = _( [ 'year' ].concat( keys ) ).map( function( header ){
    return _( header ).quote();
  });
  
  var csv = headers.join( ',' );
  
  _( yearData ).each( function( data, year ){
    var values = _( keys ).map( function( key ){
      var isNumeric = !_( stringKeys ).contains( key );
      return _( data ).has( key ) ?
        ( isNumeric ? parseInt( data[ key ], 10 ) : _( data[ key ] ).quote() ) :
        ( isNumeric ? 0 : '' )        
    });
    
    csv += '\n';
    csv += [ parseInt( year, 10 ) ].concat( values ).join( ',' );
  });
  
  fs.writeFileSync( 'nz-general-elections-meta.csv', csv );
}

function writeResultCsv( year, results ){
  var keys = _( results )    
    .chain()
    .map( function( result ){
      return _( result ).keys();
    })
    .flatten()
    .uniq()
    .value();
    
  var headers = _( [ 'party' ].concat( keys ) ).map( function( header ){
    return _( header ).quote();
  });
    
  var csv = headers.join( ',' );
  _( results ).each( function( result, party ){
    var values = _( keys ).map( function( key ){
      return _( result ).has( key ) ? result[ key ] : 0;
    });
    csv += '\n';
    csv += [ _( party ).quote() ].concat( values ).join( ',' );
  });
  
  fs.writeFileSync( 'nz-general-election-' + year + '-results.csv', csv );
}

