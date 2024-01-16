firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const uid = user.uid;
    const colecaoRelatos = firebase.firestore().collection('usuarios').doc(uid).collection('relato');

    colecaoRelatos.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const cidade = data.cidade;
          const Uid = data.uid;
          const comentarios = data.comentarios || []; 

          const timestamp = data.dataHora.toDate();
          const dia = timestamp.toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric' });
          const hora = timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          const nome = data.nome.substr(0, 6); 
          const relato = data.relato;
          const tipoCrime = data.tipoCrime;
          const tipoCrimes = tipoCrime.join(', '); 

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
             <button class="saved" onclick="altIcon1(this, '${doc.id}')"><img src="./ICONS/salve.png"></button>
     <button class="dd" onclick="apagarRelato('${doc.id}', '${Uid}', '${cidade}')">
  <img src="./ICONS/delete.png">
</button>
</div>
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
        <div class="nav-coment-box">
          <div class="nav-coment">
            <button><textarea placeholder="Comentar"></textarea>
  <div class="line-v1"></div>
  <button class="enviar-comentario" onclick="enviarComentario(this, '${doc.id}')">
  <img src="./ICONS/send.png">
</button>
          </div>
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

          const contenedorDeComent = document.createElement('div');
          const comentarioBoxId = `comentario-box-${doc.id}`; 
          contenedorDeComent.id = comentarioBoxId;

          comentarios.forEach((comentario) => {
            const texto = comentario.texto;
            const uidUsuario = comentario.uidUsuario.substr(0, 6);;
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
            const comentarioBoxId = `comentario-box-${doc.id}`; 
            const contenedorDeComent = document.getElementById(comentarioBoxId);
            contenedorDeComent.appendChild(divDoComentario);
          });
        });
      })
      .catch((error) => {
        console.error('Erro ao obter relatos: ', error);
      });
  } else {
    
  }
});

function adicionarComentario(uidRelato, uidUsuario, textoComentario) {
  const dataHora = new Date();
  const comentario = {
    uidUsuario: uidUsuario,
    texto: textoComentario,
    dataHora: dataHora
  };

  const relatoRef = firebase.firestore().collection('usuarios').doc(uidUsuario).collection('relato').doc(uidRelato);

  relatoRef.update({
    comentarios: firebase.firestore.FieldValue.arrayUnion(comentario)
  })
  .then(() => {
    console.log('Comentário adicionado com sucesso!');
    exibirComentariosDoRelato(uidUsuario, uidRelato)
  })
  .catch((error) => {
    console.error('Erro ao adicionar comentário:', error);
  });
}

function enviarComentario(botaoEnviar, uidRelato) {
  const uidUsuario = firebase.auth().currentUser.uid;
  const textoComentario = botaoEnviar.parentElement.querySelector('textarea').value;
  botaoEnviar.parentElement.querySelector('textarea').value = '';

  adicionarComentario(uidRelato, uidUsuario, textoComentario);
}

function exibirComentariosDoRelato(uidUsuario, uidRelato) {
  const relatoRef = firebase.firestore().collection('usuarios').doc(uidUsuario).collection('relato').doc(uidRelato);

  relatoRef.get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const comentarios = data.comentarios || [];

        const comentarioBoxId = `comentario-box-${uidRelato}`;
        const contenedorDeComent = document.getElementById(comentarioBoxId);
        contenedorDeComent.innerHTML = ''; 

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

function apagarRelato(relatoId, uid, cidadeId) {
  const relatoRef = firebase.firestore().collection('usuarios').doc(uid).collection('relato').doc(relatoId);

  relatoRef.delete()
    .then(() => {
      console.log('Relato apagado com sucesso');

      const elementoARemover = document.getElementById(cidadeId);
      if (elementoARemover) {
        elementoARemover.remove();
      } else {
        console.log('Elemento HTML não encontrado para remover');
      }
    })
    .catch((error) => {
      console.error('Erro ao apagar relato: ', error);
    });
}

