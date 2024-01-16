function redirect(url) {
    window.location.href = "relatos.html";
  }
  
function exibir() {
  const content = document.querySelector('.text');
  document.getElementById('resposta').innerHTML = '<div class="yes"><div class="input-group"><input required="" id="boletim" type="password" name="Senha" autocomplete="off" class="input"><label class="user-label" for="boletim" >Digite o código de boletim</label></div><div class="ug"><button style="background:green;border:none;"onclick="exibir3()"><img src="./ICONS/cad.png">Validar boletim</button></div></div></div></div>'
  content.style.display = "none";
  const src = document.querySelector('.yes')
  src.scrollIntoView({ behavior: 'smooth' });
}

function exibir2() {
  document.getElementById('resposta').innerHTML = '<div class="none"><p>Recomendamos que você faça um boletim de ocorrência para o relato que está prestes a descrever. Por conta disso, o seu relato irá perder visibilidade e alcance frente a relatos na qual o usuário fez o boletim de ocorrência.</p><br><button class="ok" onclick="exibir3()">Ok</button></div>'
  const content = document.querySelector('.text');
  content.style.display = "none";
  const src = document.querySelector('.none')
  src.scrollIntoView({ behavior: 'smooth' });
}

function exibir3() {
    const content = document.querySelector('.text');
    const content2 = document.querySelector('.ins');
    const content3 = document.getElementById('resposta');
    content.style.display = "block";
    content2.style.display = "none";
    content3.style.display = "none";
    content.scrollIntoView({ behavior: 'smooth' });
  }
  
let tipoCrimeSelecionado = [];  // Lista de tipos de crime selecionados

function cor1() {
    const CV = document.getElementById('crimeV');
    toggleTipoCrimeSelecionado(CV);
}

function cor2() {
    const CI = document.getElementById('crimeI');
    toggleTipoCrimeSelecionado(CI);
}

function cor3() {
    const CP = document.getElementById('crimeP');
    toggleTipoCrimeSelecionado(CP);
}

function cor4() {
    const CS = document.getElementById('crimeS');
    toggleTipoCrimeSelecionado(CS);
}

function toggleTipoCrimeSelecionado(element) {
    if (tipoCrimeSelecionado.includes(element)) {
        // Se a div estiver na lista, remova-a
        const index = tipoCrimeSelecionado.indexOf(element);
        tipoCrimeSelecionado.splice(index, 1);
        element.classList.remove('preto', 'vermelho', 'cinza', 'azul');
    } else {
        // Caso contrário, adicione à lista e aplique a classe apropriada
        tipoCrimeSelecionado.push(element);
        if (element === document.getElementById('crimeV')) {
            element.classList.add('preto');
        } else if (element === document.getElementById('crimeI')) {
            element.classList.add('vermelho');
        } else if (element === document.getElementById('crimeP')) {
            element.classList.add('cinza');
        } else if (element === document.getElementById('crimeS')) {
            element.classList.add('azul');
        }
    }
}