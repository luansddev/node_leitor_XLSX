

  
  function altIcon2(button) {
    var image = button.querySelector('img');
    
    if (image.src.endsWith('outflag.png')) {
      image.src = './ICONS/flagb.png';
    } else {
      image.src = './ICONS/outflag.png';
    }
  }
  
  function altIcon3(button) {
    var image = button.querySelector('img');
              setTimeout(function() {
      window.location.href = "denuncia.html";
    }, 1000); 
    if (image.src.endsWith('flagout.png')) {
      image.src = './ICONS/flag.png';
    } else {
      image.src = './ICONS/flagout.png';
    }
  }
  
function redirect(url) {
    window.location.href = url;
  }

  let execute = 0;
  function coment(element) {
  var comentDiv = element.previousElementSibling;
  comentDiv.style.display = (comentDiv.style.display == 'none') ? 'block' : 'none';

  if(execute == 0){
    execute = 1;
    comentDiv.style.display = (comentDiv.style.display == 'none') ? 'block' : 'none'
  }
}



document.addEventListener('DOMContentLoaded', function() {
  var closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(function(button) {
    button.addEventListener('click', close);
  });
});

function close() {
  var comentDiv = this.parentElement.parentElement;
  comentDiv.style.display = 'none';
}


var conteudoRelatoDivs = document.querySelectorAll('.conteudo-relato');

conteudoRelatoDivs.forEach(function(conteudoRelatoDiv) {
  var comentarioBox = conteudoRelatoDiv.querySelector('.comentario-box');
  var textComentDivs = comentarioBox.querySelectorAll('.text-coment');
  var numeroComentarios = textComentDivs.length;
  var nmComentTag = conteudoRelatoDiv.querySelector('.nm_coment');
  nmComentTag.textContent = numeroComentarios.toString();
  var nmComent2Tag = conteudoRelatoDiv.querySelector('.nm_coment2');
  nmComent2Tag.textContent = numeroComentarios.toString();
});



