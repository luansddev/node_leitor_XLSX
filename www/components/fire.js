firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    obterLocalizacaoUsuario();

    function obterLocalizacaoUsuario() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          obterNomeCidade(latitude, longitude);
        });
      } else {
        console.log("Geolocalização não suportada no seu navegador.");
        adicionarRelatoComCidade("Cidade Desconhecida");
      }
    }

    function obterNomeCidade(latitude, longitude) {
      const accessToken = "pk.eyJ1IjoidGhlYmxlc3NlZCIsImEiOiJjbGk5ZnQ0eDcwZXZ0M2xvZXk1enN0ZjN0In0.RZRZyoo90RPTxVMZ9xeW-w"; 
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${accessToken}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const cidade = data.features[0].context.find((context) =>
            context.id.startsWith("place.")
          ).text;

          filtrarRelatosPorCidade(cidade);
        })
        .catch((error) => {
          console.error("Erro ao obter nome da cidade:", error);
        });
    }


    function filtrarRelatosPorCidade(cidade) {
      const usuariosRef = db.collection('usuarios');

      usuariosRef.get()
        .then((usuariosSnapshot) => {
          usuariosSnapshot.forEach((usuarioDoc) => {
            const relatosRef = usuarioDoc.ref.collection('relato');

            relatosRef.where('cidade', '==', cidade).get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  const data = doc.data();
          const cidade = data.cidade;
          
          const timestamp = data.dataHora.toDate();
          const dia = timestamp.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
          const hora = timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          const nome = data.nome.substr(0, 6); 
          const relato = data.relato;
          const tipoCrime = data.tipoCrime;
          const tipoCrimes = tipoCrime.join(', '); 
          const comentarios = data.comentarios || []; 

            const numComentarios = comentarios.length;

        const nmComentElement = document.querySelector(`#${doc.id} .nm_coment`);
        if (nmComentElement) {
          nmComentElement.textContent = numComentarios;
        }

        const nmComent2Element = document.querySelector(`#${doc.id} .nm_coment2`);
        if (nmComent2Element) {
          nmComent2Element.textContent = numComentarios;
        }

          const divDoRelato = document.createElement('div');

          divDoRelato.innerHTML = `
   <div id="${cidade}" class="center">
     <div class="conteudo-relato">
   <div class="box-relato">
     <div class="title-relato">
       <div class="box-u">
       <b>#${nome}</b>
       <i>${dia} <b> • </b><strong>${hora}</strong></i>
       </div>
       <div class="security">
       <button class="dd" onclick="altIcon3(this)"><img id="savedImage2" src="./ICONS/outflag.png"></button></div>
     </div>
<div class="line-h"></div>
                  <center>
                    <div class="text">
                      <div class="idf_align">
                        <div class="idf">
                        </div>
                        <div class="idf2">
                          <div class="icn"><img src="./ICONS/crime.png"></div>
                          <div class="txt_icn"><i>${tipoCrimes}</i></div>
                        </div>
                      </div>

                      <section>${relato}</section>
                    </div>
                  </center>
                  <div class="line-h"></div>
  <div class="coment">
    <div class="coment-title">  
      <img src="./ICONS/coment.png">
        <b class="nm_coment">Comentários</b>
        
      <button class="close" onclick="close(this)"><img src="./ICONS/up.png"><b>Fechar</b></button>
    </div>  
    <center><div class="line-x"></div></center>
    <div id="comentario-box-${doc.id}" class="comentario-box">
            </div>
          </div>
        <div class="comentario" onclick="coment(this)"><a>Comentários<b class="nm_coment2"></a></b></div>
</div>
</div>
</div>
<br><br>
          `;

          const contenedorDeRelatos = document.getElementById('relato');
          contenedorDeRelatos.appendChild(divDoRelato);

          exibirComentariosDoRelato(usuarioDoc.id, doc.id);
         });
              })
              .catch((error) => {
                console.error('Erro ao filtrar relatos por cidade: ', error);
              });
          });
        })
        .catch((error) => {
          console.error('Erro ao obter usuários: ', error);
        });
    }
  } else {
  }
});


    function salvarDocumento(docId) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const uidDoUsuario = user.uid;
      const usuarioRef = firebase.firestore().collection('usuarios').doc(uidDoUsuario);
      const relatosSalvosRef = usuarioRef.collection('relatosSalvos').doc(docId);

      relatosSalvosRef.set({})
        .then(() => {
         console.log('Documento salvo com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao salvar o documento: ', error);
        });
    }
  });
}
function removerDocumentoSalvo(docId) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const uidDoUsuario = user.uid;
      const usuarioRef = firebase.firestore().collection('usuarios').doc(uidDoUsuario);
      const relatosSalvosRef = usuarioRef.collection('relatosSalvos').doc(docId);

      relatosSalvosRef.delete()
        .then(() => {
          console.log('Documento removido com sucesso');
        })
        .catch((error) => {
          console.error('Erro ao remover o documento salvo: ', error);
        });
    }
  });
}


function altIcon1(button, docId) {
  var image = button.querySelector('img');
  var isSaved = image.src.endsWith('salved.png'); 

  if (!isSaved) {
    image.src = './ICONS/salved.png';
    salvarDocumento(docId);

    localStorage.setItem(docId, 'salvo');
  } else {
    image.src = './ICONS/salve.png';
    removerDocumentoSalvo(docId);

    localStorage.removeItem(docId);
  }
}



async function obterUidDoDocumento() {
  const usuarioRef = db.collection('usuarios').doc('idDoUsuario');
  const relatoSnapshot = await usuarioRef.collection('relato').get();

  relatoSnapshot.forEach((doc) => {
    const uidDoDocumento = doc.id;
    console.log(uidDoDocumento);
  });
}

function adicionarComentario(uidUsuarioRelato, uidRelato, uidUsuarioComentario, textoComentario) {
  const dataHora = new Date();
  const comentario = {
    uidUsuario: uidUsuarioComentario,
    texto: textoComentario,
    dataHora: dataHora
  };

  const relatoRef = firebase.firestore().collection('usuarios').doc(uidUsuarioRelato).collection('relato').doc(uidRelato);

  relatoRef.update({
    comentarios: firebase.firestore.FieldValue.arrayUnion(comentario)
  })
  .then(() => {
    console.log('Comentário adicionado com sucesso!');
    exibirComentariosDoRelato(uidUsuarioRelato, uidRelato)
  })
  .catch((error) => {
    console.error('Erro ao adicionar comentário:', error);
  });
}

function enviarComentario(botaoEnviar, uidRelato, uidUsuarioRelato) {
    const uidUsuarioComentario = firebase.auth().currentUser.uid;
    const textoComentario = botaoEnviar.parentElement.querySelector('textarea').value;
    botaoEnviar.parentElement.querySelector('textarea').value = '';

    adicionarComentario(uidUsuarioRelato, uidRelato, uidUsuarioComentario, textoComentario)
        .then(() => {
            console.log('Comentário adicionado com sucesso!');
            exibirComentariosDoRelato(uidUsuarioRelato, uidRelato);
            contarComentariosRelato(uidUsuarioRelato, uidRelato);
        });
}


function exibirComentariosDoRelato(uidUsuarioDoRelato, uidRelato) {
  const relatoRef = firebase.firestore().collection('usuarios').doc(uidUsuarioDoRelato).collection('relato').doc(uidRelato);

  relatoRef.get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const comentarios = data.comentarios || [];

        const comentarioBoxId = `comentario-box-${doc.id}`;
        const contenedorDeComent = document.getElementById(comentarioBoxId);
        contenedorDeComent.innerHTML = ''; 

  const numComentarios = comentarios.length;

        // Atualização do número de comentários no HTML
        const nmComentElement = document.querySelector(`#${doc.id} .nm_coment`);
        if (nmComentElement) {
          nmComentElement.textContent = numComentarios;
        }

        const nmComent2Element = document.querySelector(`#${doc.id} .nm_coment2`);
        if (nmComent2Element) {
          nmComent2Element.textContent = numComentarios;
        }
        comentarios.forEach((comentario) => {
          const texto = comentario.texto;
          const uidUsuario = comentario.uidUsuario.substr(0, 6);
          const timestamp = comentario.dataHora.toDate();
          const dtDia = timestamp.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
          const dtHora = timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          const divDoComentario = document.createElement('div');
          divDoComentario.innerHTML = `
            <div class="text-coment">
              <div class="title-div-coment">
                <div class="box-c">
                  <b>#${uidUsuario}</b>
                  <i>${dtDia} <b> • </b><strong>${dtHora}</strong></i>
                </div>
                <div class="security-coment">
                  <button class="saved" onclick="altIcon3(this)"><img src="./ICONS/flagout.png"></button>
                </div>
              </div>
              <div class="coment-text">
                <u>${texto}</u>
              </div>
              <center><div class="line-coment"></div></center>
            </div>
          `;
          contenedorDeComent.appendChild(divDoComentario);
        });

      } else {
        console.log('Nenhum documento encontrado para o relato');
      }
    })
    .catch((error) => {
      console.error('Erro ao obter relato:', error);
    });
}


function alternar(docId) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const uidDoUsuario = user.uid;
      const usuarioRef = firebase.firestore().collection('usuarios').doc(uidDoUsuario);
      const relatosSalvosRef = usuarioRef.collection('relatosSalvos').doc(docId);

      relatosSalvosRef.get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
        
            removerRelatoSalvo(docId);
          } else {
        
            salvarRelato(docId);
          }
        })
        .catch((error) => {
          console.error('Erro ao verificar o relato salvo: ', error);
        });
    }
  });
}
function contarComentariosRelato(uidUsuarioDoRelato, uidRelato) {
    const relatoRef = db.collection('usuarios').doc(uidUsuarioDoRelato).collection('relato').doc(uidRelato);

    relatoRef.get()
        .then((doc) => {
            if (doc.exists) {
                const comentarios = doc.data().comentarios || [];
                const nmComent = comentarios.length;

                const relatoElement = document.getElementById(uidRelato);
                const nmComentElement = relatoElement.querySelector('.nm_coment');
                const nmComent2Element = relatoElement.querySelector('.nm_coment2');

                if (nmComentElement) {
                    nmComentElement.textContent = nmComent;
                }

                if (nmComent2Element) {
                    nmComent2Element.textContent = nmComent;
                }
            } else {
                console.log('Nenhum documento encontrado para o relato');
            }
        })
        .catch((error) => {
            console.error('Erro ao obter relato:', error);
        });
}