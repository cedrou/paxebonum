import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import * as parse from './parse'
import { Redirect } from "react-router-dom";

var songs = [
  {
    title: "Alléluia, Magnificat",
    author: "Communauté de l'Emmanuel (B. Laplaize)",
    code: "20-02",
    comment: "D'après Lc 1, 46-55",
    url: "https://www.youtube.com/watch?v=9rOzt7wlaOc",
    lyrics: "1. Mon âme exalte le Seigneur !  \n   __Louange et gloire à son Nom !__  \n   Car il fit pour nous des merveilles !  \n   __Louange et gloire à son Nom !__\n\n__R. Alléluia ! Magnificat !  \n   Mon âme loue le Seigneur !  \n   Alléluia ! Magnificat !  \n   Béni soit Dieu mon Sauveur !__\n\n2. Il a posé les yeux sur moi.  \n   __Louange ...__  \n   Mon coeur tressaille d'allégresse !  \n   __Louange ...__"
  },
  {
    "title":"Célébrez la bonté du Seigneur",
    "author":"Communauté de l'Emmanuel (H.-R. Tiacoh)",
    "code":"17-11",
    "url":"https://www.youtube.com/watch?v=1ZhfMIUl4yQ",
    "lyrics":"R. Célébrez la bonté du Seigneur,\nSoyez sûrs de l´amour du Sauveur !\nAyez toujours foi en lui,\nEn tout temps, il vous conduit :\nJésus-Christ vous a livré sa vie !\n\n1. En tous lieux rendez grâce au Seigneur,\nDans la joie, la peine et la douleur.\nDieu est là, avec nous pour toujours,\nRien ne peut nous séparer de lui !\n\n2. Peuple Saint, adorez votre Roi,\nLe Seigneur victorieux du combat.\nLe Salut est venu par la croix,\nÀ jamais son amour règnera !\n\n3. De son sein jaillit l´eau de la vie,\nSur la croix, il a tout accompli.\nPar ses plaies, il nous envoie l´Esprit,\nFlots d´amour qui nous donnent la vie !\n\n4. Accueillez son Amour en vos vies,\nDevant la croix contemplez Marie.\nMéditez la Parole, espérez,\nDieu demeure avec nous, jubilez !"
  },
  {
    "title":"Je veux chanter ton amour, Seigneur",
    "author":"M. Dannaud",
    "code":"11-26",
    "url":"https://www.youtube.com/watch?v=9-GZ26qT7iA",
    "lyrics":"R. Je veux chanter ton amour, Seigneur,\nChaque instant de ma vie.\nDanser pour toi en chantant ma joie\nEt glorifier ton Nom.\n\n1. Ton amour pour nous\nEst plus fort que tout\nEt tu veux nous donner la vie,\nNous embraser par ton Esprit.\nGloire à toi !\n\n2. Oui, tu es mon Dieu,\nTu es mon Seigneur.\nToi seul es mon libérateur,\nLe rocher sur qui je m´appuie.\nGloire à toi !\n\n3. Car tu es fidèle,\nTu es toujours là,\nTout près de tous ceux qui te cherchent,\nTu réponds à ceux qui t´appellent.\nGloire à toi !\n\n4. Voici que tu viens\nAu milieu de nous,\nDemeurer au cœur de nos vies\nPour nous mener droit vers le Père.\nGloire à toi !\n\n5. Avec toi, Seigneur\nJe n´ai peur de rien.\nTu es là sur tous mes chemins.\nTu m´apprends à vivre l´amour.\nGloire à toi !"
  },
  {
    "title":"Je vous aime, ô mon Dieu",
    "author":"A. Dumont",
    "code":"20-09",
    "url":"https://www.youtube.com/watch?v=jhhz3T4Pnno",
    "lyrics":"R. Je vous aime, ô mon Dieu  \nEt mon seul désir est de vous aimer,  \nDe vous aimer jusqu'au dernier soupir de ma vie,  \nJusqu'au dernier soupir de ma vie.  \n\n1. Ô Dieu Saint, Tu as fait de mon cœur  \nLe Ciel de ta demeure, un temple sacré !  \nPère, Fils et Saint-Esprit,  \nTon amour est pour moi le plus grand des trésors !  \n\n2. Nous portons le nom de « fils de Dieu »  \nCar nous avons un Père qui veille sur nous  \nMontrons-nous dignes de Lui,  \nIl a livré son Fils, offrons-Lui notre amour !  \n\n3. Jésus Christ, notre Dieu et Seigneur,  \nTu nous conduis au Père, Tu es le Chemin !  \nTon sang versé sur la Croix  \nNous a rendu la vie, nous a ouvert le Ciel !  \n\n4. Esprit Saint, Eau Vive de l'amour  \nRépandue sur la terre en fine rosée,  \nTu viens arroser le grain  \nPour que lève l'épi sous le Soleil de Dieu.  \n\n5. Ô mon Dieu, ton amour est si bon,  \nLui qui remplit notre âme, notre seule joie !  \nQuel bonheur que de t'aimer,  \nNous sommes si petits, et Tu nous vois si grands !  \n\n6. Ton amour est de tous les instants,  \nDans ta Miséricorde, tout nous est donné,  \nTu veilles sur nous sans fin,  \nLorsque nous chancelons, Tu es notre soutien.",
    "comment":"D'après le Saint Curé d'Ars"
  }
]

class EditSong extends Component {

  state = {
    type: 'info',
    message: '',
    song: {},
    toView: false
  }

  async componentDidMount() {
    this.add = this.props.match.params.id === undefined;

    if (this.add) return;

    let song = await parse.getSong(this.props.match.params.id);
    this.setState({ song });
  }

  handleChange = (event) => {
    this.setState({
      song: { ...this.state.song, [event.target.name]: event.target.value }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Scroll to the top of the page to show the status message.
    document.getElementById('heading').scrollIntoView();

    this.setState({ type: 'info', message: 'Sending...' }, async () => {
      try {
        if (this.add) {
          await parse.addSong(this.state.song);
        } else {
          await parse.updateSong(this.state.song);
        }
        this.setState({ type: 'success', message: 'Chant ajouté avec succes', toView: true });
      } catch {
        this.setState({ type: 'danger', message: 'Désolé, il y a eu une erreur. Veuillez réessayer plus tard.' });
      }
    });
  }


  render() {
    if (this.state.toView) {
      return <Redirect to={"/library/view/" + this.state.song.objectId} />
    }
    
    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = <div id="status" className={classString} ref="status">
                     {this.state.message}
                   </div>;
    }
    return (
      <main>
        <div className="pt-3 pb-2 mb-3" id="heading">
          <h2>{this.add ? "Ajouter un nouveau chant" : "Modifier le chant"}</h2>
          <p>Entrez ici toutes les informations disponibles du chant à ajouter au repertoire.</p>
        </div>

        {status}
        
        <div class="row">
          <div class="col">
            <form action="" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input className="form-control" name="title" ref="title" required type="text" value={this.state.song.title} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="author">Auteur</label>
                <input className="form-control" name="author" ref="author" type="text" value={this.state.song.author} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="code">Cote</label>
                <input className="form-control" name="code" ref="code" type="text" value={this.state.song.code} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="comment">Commentaire</label>
                <input className="form-control" name="comment" ref="comment" type="text" value={this.state.song.comment} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <label htmlFor="url">YouTube</label>
                <input className="form-control" name="url" ref="url" type="url" value={this.state.song.url} onChange={this.handleChange}/>
              </div>

              <div className="form-group">
                <label htmlFor="lyrics">Paroles</label>
                <textarea className="form-control" name="lyrics" ref="lyrics" rows="16" required value={this.state.song.lyrics} onChange={this.handleChange}/>
              </div>

              <div className="form-group">
                <button className="btn btn-primary" type="submit">{this.add ? "Ajouter" : "Modifier"}</button>
              </div>
            </form>
          </div>
          <div class="col">
            <div className="d-flex flex-column pt-3 pb-2 mb-3">
              <h1 className="h2">{this.state.song.title}</h1>
              <div className="small">{this.state.song.author} - {this.state.song.code}</div>
            </div>
            <ReactMarkdown className="leads">{this.state.song.lyrics}</ReactMarkdown>
          </div>
        </div>
      </main>
    );
  }
}

export default EditSong;


