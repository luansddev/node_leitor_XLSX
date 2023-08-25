function abrir1() {
    const content = document.querySelector('.content-1');
    const button = document.querySelector('.up');
    content.classList.add("open");
    button.classList.add("open2");
    content.scrollIntoView({ behavior: 'smooth' });
  }

  function abrir2() {
    const content = document.querySelector('.content-2');
    const button = document.querySelector('.up');
    content.classList.add("open");
    button.classList.add("open2");
    content.scrollIntoView({ behavior: 'smooth' });
  }
  

  
  function altIcon1(button) {
    var image = button.querySelector('img');
    
    if (image.src.endsWith('salve.png')) {
      image.src = './ICONS/salved.png';
    } else {
      image.src = './ICONS/salve.png';
    }
  }
  
  
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

function up() {
    const content = document.querySelector('.thou');
    content.scrollIntoView({ behavior: 'smooth' });
  }


  