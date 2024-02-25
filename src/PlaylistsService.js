const { Pool } = require("pg");

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(playlistId) {
    const queryplaylist = {
      text: "SELECT id AS id, name AS name FROM playlists WHERE id = $1",
      values: [playlistId],
    };

    const resultPlaylist = await this._pool.query(queryplaylist);

    const querySongs = {
      text: "SELECT s.id, s.title, s.performer FROM songs AS s INNER JOIN playlist_songs AS ps ON s.id = ps.song_id WHERE ps.playlist_id = $1",
      values: [playlistId],
    };

    const resultSongs = await this._pool.query(querySongs);

    return { ...resultPlaylist.rows[0], songs: resultSongs.rows[0] };
  }
}

module.exports = PlaylistsService;
