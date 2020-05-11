// const APPID = 'paxebonum'

export async function getSongList() {
  let res = await fetch('/song');
  let json = await res.json();
  return json.results;
}

export async function getSong(id) {
  let res = await fetch(`/song/${id}`);
  return await res.json();
}

export async function addSong(song) {
  // let res = await fetch('/parse/classes/Song', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Parse-Application-Id': APPID
  //   },
  //   body: JSON.stringify(song)
  // });
  // return await res.json();
  return {}
}

export async function updateSong(song) {
  // const { objectId, createdAt, updatedAt, ...filteredSong } = song;
  // await fetch('/parse/classes/Song/' + objectId, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Parse-Application-Id': APPID
  //   },
  //   body: JSON.stringify(filteredSong)
  // });
}

export async function deleteSong(id) {
  // await fetch('/parse/classes/Song/' + id, {
  //   method: 'DELETE',
  //   headers: {
  //     'X-Parse-Application-Id': APPID
  //   }
  // });
}