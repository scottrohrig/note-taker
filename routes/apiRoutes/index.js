const router = require( 'express' ).Router();
const { v4: uuid } = require( 'uuid' );
const { readFromFile, createNewNote, validateNote, deleteById } = require( '../../lib/notes' );

// get notes
router.get( '/notes', ( req, res ) => {
    const { notes } = readFromFile();
    res.json( notes );
} );

// post notes
router.post( '/notes', ( req, res ) => {
    const { notes } = readFromFile();
    // provide unique id
    req.body.id = uuid();
    // console.log( 'body', req.body );

    // validate req
    if ( !validateNote( req.body ) ) {
        res.status( 400 ).send( 'The note is not properly formatted.' )
    } else {
        // create new note
        const note = createNewNote( req.body, notes );
        // and respond
        res.json( note );
    }
} );

// delete note route
router.delete( '/notes/:id', ( req, res ) => {
    // filter notes by id
    deleteById( req.params.id )
    res.json( { message: 'deleted' } );
} );

// modularize
module.exports = router;