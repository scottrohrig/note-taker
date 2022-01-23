const fs = require( 'fs' );
const path = require( 'path' );

const writeToFile = ( _notes ) => {
    fs.writeFileSync(
        path.join( __dirname, '..', 'db', 'db.json' ),
        JSON.stringify( { notes: _notes }, null, 2 )
    );
}

const readFromFile = () => JSON.parse( fs.readFileSync( path.join( __dirname, '..', 'db', 'db.json' ) ) );

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

/** Removes a note from the database by given id
 * 
 * @param {uuid} id 
 */
function deleteById( id ) {
    // first read from file and make sure it's fresh
    let { notes } = readFromFile();

    // filter by id
    let results = notes.filter( note => id !== note.id );
    // update db file
    writeToFile( results );
}

module.exports = {
    readFromFile,
    createNewNote,
    validateNote,
    deleteById
};