// html route handling
const router = require( 'express' ).Router();
const path = require( 'path' );
const public = path.join( __dirname, '../', '../', 'public' );

// root
router.get( '/', ( req, res ) => {
    res.sendFile( path.join( public, 'index.js' ) );
} );

// notes
router.get( '/notes', ( req, res ) => {
    res.sendFile( path.join( public, 'notes.html' ) );
} );

//  default
router.get( '/', ( req, res ) => {
    res.sendFile( path.join( public, 'index.js' ) );
} );

module.exports = router;