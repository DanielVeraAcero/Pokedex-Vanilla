import fetch from 'node-fetch';

const pokemonContainer = document.querySelector('.pokemon-container');

const pokeAPI = 'https://pokeapi.co/api/v2/pokemon'

async function fetchPokemon(id) {
    let response = await fetch(`${pokeAPI}/${id}`);
    let data = await response.json();
    createPokemon(data);
}

function fetchManyPokemon(num) {
    for (let i = 1; i <= num; i++) {
        fetchPokemon(i);        
    }
}

function createPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprite.front_default;

    spriteContainer.appendChild(sprite);
    
    const numberPokedex = document.createElement('p');
    numberPokedex.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.append(numberPokedex);
    card.appendChild(name);

    pokemonContainer.appendChild(card)
}