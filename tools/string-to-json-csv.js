var _ = require( 'underscore' );

_.mixin({
  quote: function( str ){
    if( str.charAt( 0 ) === '"' && str.charAt( str.length - 1 ) === '"' ) return str;    
    return '"' + str + '"';
  }
});

var isInteger = /^\d+$/;
var isNumber = /^(?:\d+\.+\d*|\d*\.+\d+)$/;
var isBoolean = /^(?:true|false)$/;

module.exports = function( value ){
  if( isNumber.test( value ) ){
    value = parseFloat( value );
    if( value % 1 === 0 ){
      value = value + '.0';
    }
  } else if( isInteger.test( value ) ){
    value = parseInt( value, 10 );
  } else if( !isBoolean.test( value ) ){
    value = _( value ).quote();
  }
  
  return value;  
};