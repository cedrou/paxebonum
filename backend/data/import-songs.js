const fs = require('fs')
const lineByLine = require('n-readlines');

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for(var i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function importSongs() {
    console.log("Import songs from Markdown file... ")

    const liner = new lineByLine(__dirname + '/livret-mch.md');
    let row;
 
    let title
    let category
    let lyrics
    let songs = []

    const addSong = (title, category, lyrics) => {
        if (title && category && lyrics) {
            songs.push({
                objectId: makeid(8),
                title: title,
                author: "",
                code: "",
                comment: "",
                category: category,
                url: "",
                lyrics: lyrics.trim(),
                imported: "mcb"
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

    fs.writeFileSync(__dirname + '/songs.json', JSON.stringify(songs))

    console.log("Done")
}


module.exports = importSongs;

//importSongs()