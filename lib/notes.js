const fs = require( 'fs' );
const path = require( 'path' );
const { allowedNodeEnvironmentFlags } = require( 'process' );

const writeToFile = ( _notes ) => {
    fs.writeFileSync(
        path.join( __dirname, '..', 'db', 'db.json' ),
        JSON.stringify( { notes: _notes }, null, 2 )
    );
}

/** Adds note to notes db and notes array
 * 
 * @param {req.body} body 
 * @param {Array} notes 
 * @returns 
 */
function createNewNote( body, notes ) {
    const note = body;
    // add note to notes
    notes.push( note );

    // write to file
    writeToFile( notes );

    console.log( 'creating note ', note, 'notes', notes );
    // return note
    return note;
}

/** RETURNS true if note is complete else false
 * 
 * @param {req.body} note 
 */
function validateNote( note ) {
    if ( !note.title || typeof note.title !== 'string' ) {
        return false;
    }
    if ( !note.text || typeof note.text !== 'string' ) {
        return false;
    }
    return true;
}

function deleteById( id, notes ) {
    // filter by id
    let results = notes.filter( note => id != note.id );
    console.log( 'results', results );
    // update db file
    writeToFile( results );
    // ideally return this to use in history
    // return note
}

module.exports = {
    createNewNote,
    validateNote,
    deleteById
};