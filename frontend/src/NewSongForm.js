import React, { Component } from 'react';

// {
//   id: 1,
//   title: "Alléluia, Magnificat",
//   author: "Communauté de l'Emmanuel (B. Laplaize)",
//   code: "20-02",
//   comment: "D'après Lc 1, 46-55",
//   url: "https://www.youtube.com/watch?v=9rOzt7wlaOc",
//   lyrics: "1. Mon âme exalte le Seigneur !  \n   __Louange et gloire à son Nom !__  \n   Car il fit pour nous des merveilles !  \n   __Louange et gloire à son Nom !__\n\n__R. Alléluia ! Magnificat !  \n   Mon âme loue le Seigneur !  \n   Alléluia ! Magnificat !  \n   Béni soit Dieu mon Sauveur !__\n\n2. Il a posé les yeux sur moi.  \n   __Louange ...__  \n   Mon coeur tressaille d'allégresse !  \n   __Louange ...__"
// }
class NewSongForm extends Component {

  state = {
    type: 'info',
    message: '',
    title: 'Alléluia, Magnificat',
    author: "Communauté de l'Emmanuel (B. Laplaize)",
    code: '20-02',
    comment: "D'après Lc 1, 46-55",
    url: 'https://www.youtube.com/watch?v=9rOzt7wlaOc',
    lyrics: "1. Mon âme exalte le Seigneur !  \n   __Louange et gloire à son Nom !__  \n   Car il fit pour nous des merveilles !  \n   __Louange et gloire à son Nom !__\n\n__R. Alléluia ! Magnificat !  \n   Mon âme loue le Seigneur !  \n   Alléluia ! Magnificat !  \n   Béni soit Dieu mon Sauveur !__\n\n2. Il a posé les yeux sur moi.  \n   __Louange ...__  \n   Mon coeur tressaille d'allégresse !  \n   __Louange ...__"
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Scroll to the top of the page to show the status message.
    document.getElementById('heading').scrollIntoView();
    this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);
  }

  sendFormData() {
    // Prepare form data for submitting it.
    var formData = {
      title: this.state.title,
      author: this.state.author,
      code: this.state.code,
      comment: this.state.comment,
      url: this.state.url,
      lyrics: this.state.lyrics
    };

    // Send the form data.
    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4) {
        var response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp.status === 201) {
          _this.setState({ type: 'success', message: 'Chant ajoute avec succes' });
        }
        else {
          _this.setState({ type: 'danger', message: 'Desole, il y a eu une erreur. Veuillez essayer plus tard.' });
        }
      }
    };
    xmlhttp.open('POST', '/parse/classes/Song', true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.setRequestHeader('X-Parse-Application-Id', 'paxebonum');
    xmlhttp.send(JSON.stringify(formData));
  }

  render() {
    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = <div id="status" className={classString} ref="status">
                     {this.state.message}
                   </div>;
    }
    return (
      <div>
        <h2 id="heading">Ajouter un nouveau chant</h2>
        <p>Entrez ici toutes les informations disponibles du chant a ajouter au repertoire.</p>
        {status}
        
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input className="form-control" name="title" ref="title" required type="text" value={this.state.title} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="author">Auteur</label>
            <input className="form-control" name="author" ref="author" type="text" value={this.state.author} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="code">Cote SECLI</label>
            <input className="form-control" name="code" ref="code" type="text" value={this.state.code} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Commentaire</label>
            <input className="form-control" name="comment" ref="comment" type="text" value={this.state.comment} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="url">YouTube</label>
            <input className="form-control" name="url" ref="url" type="url" value={this.state.url} onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="lyrics">Paroles</label>
            <textarea className="form-control" name="lyrics" ref="lyrics" rows="16" required value={this.state.lyrics} onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <button className="btn btn-primary" type="submit">Ajouter le chant</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewSongForm;


