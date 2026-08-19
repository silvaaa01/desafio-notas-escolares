// Buscando elementos do HTML (se não houver select, remova a linha do tipoSelect)
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
// const tipoSelect = document.getElementById('tipo');   // descomente se tiver o select
const btnAdicionar = document.getElementById('btn-adicionar');
const lista = document.getElementById('lista-transacoes');
const mediaSpan = document.getElementById('saldo');  // mesmo id, mas agora exibirá média

// --- Função que recalcula a média e atualiza a tela ---
function atualizarMedia() {
  const itens = document.querySelectorAll('.transacao');
  let soma = 0;
  const quantidade = itens.length;

  // Soma todas as notas
  itens.forEach(function(item) {
    const nota = Number(item.dataset.valor);
    soma = soma + nota;
  });

  // Calcula a média (evita divisão por zero)
  const media = quantidade > 0 ? soma / quantidade : 0;

  // Exibe a média com uma casa decimal e vírgula no lugar do ponto
  mediaSpan.textContent = media.toFixed(1).replace('.', ',');

  // Aplica cor verde se média >= 6, vermelha se < 6 (e maior que 0)
  mediaSpan.classList.remove('positivo', 'negativo');
  if (media >= 6) {
    mediaSpan.classList.add('positivo');
  } else if (media > 0) {
    mediaSpan.classList.add('negativo');
  }
}

// --- Adicionar uma nova nota ---
btnAdicionar.addEventListener('click', function() {
  const disciplina = descricaoInput.value.trim();
  const nota = Number(valorInput.value);
  // const bimestre = tipoSelect ? tipoSelect.value : '';  // se tiver select

  // Validação: disciplina não pode ser vazia; nota entre 0 e 10
  if (disciplina === '' || isNaN(nota) || nota < 0 || nota > 10) {
    // PERSONALIZE AQUI: mensagem de alerta
    alert(<span style="color:red;">'Digite o nome da disciplina e uma nota entre 0 e 10.'</span>);
    return;
  }

  // Criar o item <li>
  const novoItem = document.createElement('li');
  novoItem.classList.add('transacao');

  // Adiciona classe visual conforme o valor da nota
  if (nota < 6) {
    novoItem.classList.add('nota-baixa');
  } else {
    novoItem.classList.add('nota-alta');
  }

  // Guarda a nota no dataset (atributo data-valor)
  novoItem.dataset.valor = nota;
  // Se tiver bimestre, guarde também: novoItem.dataset.tipo = bimestre;

  // Conteúdo interno do item
  novoItem.innerHTML = `
    <div class="info">
      <strong>${disciplina}</strong> - Nota <span style="color:red;">${nota.toFixed(1).replace('.', ',')}</span>
    </div>
    <button class="btn-excluir">Excluir</button>
  `;

  // Botão excluir
  const btnExcluir = novoItem.querySelector('.btn-excluir');
  btnExcluir.addEventListener('click', function() {
    novoItem.remove();
    atualizarMedia();
  });

  // Insere na lista
  lista.appendChild(novoItem);

  // Limpa os campos
  descricaoInput.value = '';
  valorInput.value = '';
  // tipoSelect.value = '1º Bim'; // se existir, reseta

  atualizarMedia();
});
