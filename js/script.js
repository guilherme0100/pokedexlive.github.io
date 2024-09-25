
// Seleciona elementos da página HTML relacionados ao nome, número e imagem do Pokémon
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

// Seleciona os elementos do formulário e botões de navegação
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Variável que mantém o ID do Pokémon que está sendo exibido atualmente
let searchPokemon = 1;

// Função assíncrona para buscar dados do Pokémon da API
const fetchPokemon = async (pokemon) => {
  // Faz uma requisição à API do Pokémon com base no nome ou ID do Pokémon
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  // Verifica se a requisição foi bem-sucedida (status 200)
  if (APIResponse.status === 200) {
    // Converte a resposta da API em JSON e retorna os dados
    const data = await APIResponse.json();
    return data;
  }
}

// Função assíncrona para renderizar os dados do Pokémon na página
const renderPokemon = async (pokemon) => {
  // Exibe uma mensagem de carregamento enquanto os dados são buscados
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  // Chama a função que busca os dados do Pokémon
  const data = await fetchPokemon(pokemon);

  // Se os dados forem encontrados, atualiza o conteúdo da página
  if (data) {
    pokemonImage.style.display = 'block'; // Mostra a imagem do Pokémon
    pokemonName.innerHTML = data.name; // Exibe o nome do Pokémon
    pokemonNumber.innerHTML = data.id; // Exibe o número do Pokémon
    // Define a imagem do Pokémon, utilizando o sprite animado da geração V
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''; // Limpa o campo de busca
    searchPokemon = data.id; // Atualiza o Pokémon atual com o ID do Pokémon encontrado
  } else {
    // Se os dados não forem encontrados, esconde a imagem e exibe uma mensagem de erro
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Adiciona um ouvinte de evento para quando o formulário for submetido (enter ou botão de busca)
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita o comportamento padrão de recarregar a página
  renderPokemon(input.value.toLowerCase()); // Chama a função de renderizar com o valor do input em letras minúsculas
});

// Adiciona um ouvinte de evento para o botão de "anterior"
buttonPrev.addEventListener('click', () => {
  // Verifica se o ID do Pokémon atual é maior que 1 (não permite ir abaixo de 1)
  if (searchPokemon > 1) {
    searchPokemon -= 1; // Decrementa o ID do Pokémon atual
    renderPokemon(searchPokemon); // Renderiza o Pokémon anterior
  }
});

// Adiciona um ouvinte de evento para o botão de "próximo"
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Incrementa o ID do Pokémon atual
  renderPokemon(searchPokemon); // Renderiza o próximo Pokémon
});

// Renderiza o Pokémon inicial (começando com o Pokémon de ID 1)
renderPokemon(searchPokemon);
