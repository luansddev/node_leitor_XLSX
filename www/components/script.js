function abrir() {
  const content = document.querySelector('.sgt');
  const content2 = document.querySelector('.mama');
  content.style.display = "block";
  content2.style.display = "none";
  
  validaremail();
}

  
  function abrir2(e) {
  const content = document.querySelector('.sgt2');
  const content2 = document.querySelector('.sgt');
  content.style.display = "block";
  content2.style.display = "none";
}

function retur(element) {
  const content4 = document.querySelector('.mama');
  const content5 = document.querySelector('.sgt');
  content4.style.display = "block";
  content5.style.display = "none";
}

function retur2(element) {
  const content6 = document.querySelector('.sgt');
  const content7 = document.querySelector('.sgt2');
  content6.style.display = "block";
  content7.style.display = "none";
}

function redirect(url) {
  window.location.href = url;
}

function validaremail() {
  const email = document.getElementById('email').value;
            document.getElementById('codigoVerificacao').textContent = email;
}