const APPID = 'paxebonum'

export async function addSong(song) {
  await fetch('/parse/classes/Song', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': APPID
    },
    body: JSON.stringify(song)
  });
}

export async function getSongList() {
  let res = await fetch('/parse/classes/Song', {
    method: 'GET',
    headers: { 
      'X-Parse-Application-Id': APPID 
    } 
  });
  let json = await res.json();
  return json.results;
}

export async function getSong(id) {
  let res = await fetch('/parse/classes/Song/' + id, {
    method: 'GET',
    headers: { 
      'X-Parse-Application-Id': APPID 
    } 
  });
  return await res.json();
}

export async function updateSong(song) {
  const { objectId, createdAt, updatedAt, ...filteredSong } = song;
  await fetch('/parse/classes/Song/' + objectId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': APPID
    },
    body: JSON.stringify(filteredSong)
  });
}