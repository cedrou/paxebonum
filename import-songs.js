const fs = require('fs')
const lineByLine = require('n-readlines');

function importSongs() {
    console.log("Import songs from Markdown file... ")

    // let md = fs.readFileSync('./data/livret-mch.md').toString();
    const liner = new lineByLine('./data/livret-mch.md');
    let row;
 
    let title
    let category
    let lyrics
    let songs = []

    const addSong = (title, category, lyrics) => {
        if (title && category && lyrics) {
            songs.push({
                objectId: songs.length + 100000,
                title: title,
                author: "",
                code: "",
                comment: "",
                category: category,
                url: "",
                lyrics: lyrics.trim()
            })
        }
    }

    while (row = liner.next()) {
        const line = row.toString()

        if (line.startsWith('##')) {
            addSong(title, category, lyrics)
            title = line.substr(2).trim()
            lyrics = ""
        } 
        else if (line.startsWith('#')) {
            addSong(title, category, lyrics)
            category = line.substr(1).trim()
            title = ""
            lyrics = ""
        }
        else {
            lyrics += line + '\n'
        }
    }

    fs.writeFileSync('./songs.json', JSON.stringify(songs))

    console.log("Done")
}


module.exports = importSongs;

//importSongs()