import React, { useState, useEffect } from 'react';
import { Alert } from "react-bootstrap";
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs'
import 'dayjs/locale/fr';
import isoWeek from 'dayjs/plugin/isoWeek'

dayjs.extend(isoWeek)
dayjs.locale('fr')


const songOpening = {
  title: "Le monde attend le passage des Saints",
  lyrics: `
  __Le monde attend le passage des saints,  
  Là où les saints passent, Dieu passe avec eux,  
  Soyez saints comme Dieu (bis)__
  
  1. Je puis malgré ma petitesse, aspirer à la sainteté ;  
     Se contentant de mes efforts, Dieu m’élèvera à lui,  
     Il sera ma sainteté !
  
  2. La sainteté, c’est la force de Dieu dans la faiblesse de l’homme ;  
     La sainteté c’est d’être mû par l’Esprit-Saint,  
     Car c’est Dieu seul qui fait les Saints !`
}

const songKyrie = {
  title: "Messe de la Trinité",
  lyrics: `
  __Seigneur, prends pitié de nous !__ (ter)  
  __O Christ, prends pitié de nous !__ (ter)  
  __Seigneur, prends pitié de nous !__ (ter)
  `
}

const songGloria = {
  title: "Léon GUILLOU",
  lyrics: `
  __Gloria, Gloria in excelsis Deo__ (bis)

  1. Et paix sur la Terre aux hommes qu’il aime.  
     Nous te louons, nous te bénissons, nous t’adorons,  
     Nous te glorifions, nous te rendons grâce pour ton immense gloire,  
     Seigneur Dieu, roi du ciel, Dieu le Père tout puissant.

  2. Seigneur, Fils unique, Jésus Christ, Seigneur Agneau de Dieu, le Fils du Père ;  
     Toi qui enlèves le péché du monde, prends pitié de nous ;  
     Toi qui enlèves le péché du monde, reçois notre prière ;  
     Toi qui es assis à la droite du Père, prends pitié de nous.
     
  3. Car Toi seul es Saint,  
     Toi seul est Seigneur, 
     Toi seul es le Très-Haut, Jésus Christ, avec le Saint-Esprit,  
     dans la gloire de Dieu le Père. Amen !
  `
}

const songIntercession = {
  lyrics: `
  __La voix de Tes enfants, Seigneur, résonne sur la Terre,  
  Vers Toi, comme un encens, Seigneur, s’élèvent nos prières.__
  `
}

const songGifts = {
  title: "Humblement, dans le silence de mon cœur",
  lyrics: `
  __Humblement, dans le silence de mon cœur  
  Je me donne à toi, mon Seigneur__
  
  1. Par ton amour, fais-moi demeurer humble et petit devant toi
  2. Enseigne-moi ta sagesse, Ô Dieu, viens habiter mon silence
  3. Entre tes mains, je remets ma vie, ma volonté, tout mon être
  4. Je porte en moi ce besoin d'amour de me donner, de me livrer sans retour
  5. Vierge Marie, garde mon chemin dans l'abandon, la confiance de l'amour
  `
}

const songSanctus = {
  title: "Messe de la Trinité",
  lyrics: `
  __Saint, saint, saint le Seigneur, le Dieu de l'univers !__ (bis)  
  Ciel et Terre sont remplis de ta splendeur et de ta gloire !  
  __Hosanna au plus haut des Cieux !__ (bis)  
  Béni soit celui qui vient au nom du Seigneur !  
  __Hosanna au plus haut des Cieux !__ (bis)
    `
}

const songAnamnesis = {
  title: "Messe de la Trinité",
  lyrics: `
  Gloire à toi qui étais mort ! (bis)  
  Gloire à toi qui es vivant ! (bis)  
  Dieu Sauveur, nous attendons ta venue.  
  Viens Seigneur Jésus ! (bis)
    `
}
const songAgnus = {
  title: "Messe de la Trinité",
  lyrics: `
  Agneau de Dieu, envoyé par le Père, tu nous sauves du péché,  
	__Prends pitié de nous, Seigneur.__ (bis)  
  Agneau de Dieu, emportant notre mort, tu nous donnes ta vie,  
	__Prends pitié de nous, Seigneur.__ (bis)  
  Agneau de Dieu, dans l’Amour de l’Esprit, tu apaises notre cœur,  
	__Donne-nous la paix, Seigneur.__ (bis)
  `
}
const songCommunion = {
  title: "Approchons-nous de la table",
  lyrics: `
  1. Approchons-nous de la table, où le Christ va s’offrir parmi nous.  
     Offrons-lui ce que nous sommes car le Christ va nous transformer en lui.

  2. Voici l’admirable échange où le Christ prend sur lui nos péchés.  
     Mettons-nous en sa présence, il nous revêt de sa divinité.

  3. Père nous te rendons grâce pour ton fils Jésus Christ le Seigneur  
     Par ton Esprit de puissance, rends-nous digne de vivre de tes dons.
  `
}
const songFinal = {
  title: "Jour de joie, jour de Victoire",
  lyrics: `
  __Jour de joie, jour de victoire,  
  Il étend sa main d’en haut,  
  Me retire des grandes hauts :  
  Il me saisit et me délivre !  
  L’Eternel est mon appui  
  Devant tous mes ennemis !   
  Dieu se lève avec éclat  
  Et il marche devant moi.__
  `
}

    
function RawHtml({children, ...params}) {
  return <div dangerouslySetInnerHTML={ {__html: children } } {...params} />;
}

function ViewSheet({match}) {

  const date = match.params.date || dayjs().isoWeekday(7).format("YYYY-MM-DD");

  const [aelf, setAelf] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {

      let fetchResult = await fetch(`/aelf/messes/${date}/france`);
      let json = await fetchResult.json();
      setAelf(json);
      setIsLoading(false);
    }
    fetchData();
  }, [date]);

  if (isLoading) {
    return <Alert variant='light'>Chargement en cours...</Alert>
  }

  return (
    <>
      <div className="h4">{aelf.informations.jour_liturgique_nom} – {dayjs(date).format("DD MMMM YYYY")}</div>
      
      <div className="text-uppercase font-weight-bolder">Liturgie de l'accueil</div>

      <h5 className="pt-3"><span className="border border-dark px-1">Chant d'entrée</span> <span className="small font-italic">{songOpening.title}</span></h5>
      <ReactMarkdown>{songOpening.lyrics}</ReactMarkdown>

      <h5 className="pt-3"><span className="border border-dark px-1">Prière pénitentielle</span> <span className="small font-italic">{songKyrie.title}</span></h5>
      <ReactMarkdown>{songKyrie.lyrics}</ReactMarkdown>

      <h5 className="pt-3"><span className="border border-dark px-1">Gloire à Dieu</span> <span className="small font-italic">{songGloria.title}</span></h5>
      <ReactMarkdown>{songGloria.lyrics}</ReactMarkdown>

      
      <div className="text-uppercase font-weight-bolder">Liturgie de la Parole</div>

      <h5 className="pt-3 mb-0">{aelf.messes[0].lectures[0].intro_lue} <span className="small font-italic">({aelf.messes[0].lectures[0].ref})</span></h5>
      <div className="ml-4 font-italic">{aelf.messes[0].lectures[0].titre}</div>

      <h5 className="pt-3">Psaume <span className="small font-italic">({aelf.messes[0].lectures[1].ref})</span></h5>
      <RawHtml className="ml-4">{aelf.messes[0].lectures[1].refrain_psalmique}</RawHtml>
      <RawHtml className="ml-4">{aelf.messes[0].lectures[1].contenu}</RawHtml>

      <h5 className="pt-3 mb-0">{aelf.messes[0].lectures[2].intro_lue} <span className="small font-italic">({aelf.messes[0].lectures[2].ref})</span></h5>
      <div className="ml-4 font-italic">{aelf.messes[0].lectures[2].titre}</div>

      <h5 className="pt-3 mb-0">{aelf.messes[0].lectures[3].intro_lue} <span className="small font-italic">({aelf.messes[0].lectures[3].ref})</span></h5>
      <div className="ml-4 font-italic">{aelf.messes[0].lectures[3].titre}</div>

      <h5 className="pt-3"><span className="border border-dark px-1">Prière Universelle</span></h5>
      <ReactMarkdown>{songIntercession.lyrics}</ReactMarkdown>

      <h5 className="pt-3"><span className="border border-dark px-1">Offertoire</span> <span className="small font-italic">{songGifts.title}</span></h5>
      <ReactMarkdown>{songGifts.lyrics}</ReactMarkdown>

      
      <div className="text-uppercase font-weight-bolder">Liturgie de l'Eucharistie</div>

      <h5 className="pt-3"><span className="border border-dark px-1">Sanctus</span> <span className="small font-italic">{songSanctus.title}</span></h5>
      <ReactMarkdown>{songSanctus.lyrics}</ReactMarkdown>

      <h5 className="pt-3"><span className="border border-dark px-1">Anamnèse</span> <span className="small font-italic">{songAnamnesis.title}</span></h5>
      <ReactMarkdown>{songAnamnesis.lyrics}</ReactMarkdown>

      <h5 className="pt-3"><span className="border border-dark px-1">Agneau de Dieu</span> <span className="small font-italic">{songAgnus.title}</span></h5>
      <ReactMarkdown>{songAgnus.lyrics}</ReactMarkdown>

      <h5 className="pt-3"><span className="border border-dark px-1">Communion</span> <span className="small font-italic">{songCommunion.title}</span></h5>
      <ReactMarkdown>{songCommunion.lyrics}</ReactMarkdown>

      
      <div className="text-uppercase font-weight-bolder">Liturgie de l'Envoi</div>

      <h5 className="pt-3"><span className="border border-dark px-1">Chant d'envoi</span> <span className="small font-italic">{songFinal.title}</span></h5>
      <ReactMarkdown>{songFinal.lyrics}</ReactMarkdown>

    </>
  );
}

export default ViewSheet;