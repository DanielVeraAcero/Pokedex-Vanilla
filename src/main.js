// import fetch from 'node-fetch'; //! Esto se descomenta en caso de correrlo desde node

const pokemonContainer = document.querySelector('.pokemon-container');
const pokeAPI = 'https://pokeapi.co/api/v2/pokemon'
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')

let offset = 1;
let limit = 8;

prev.addEventListener('click',() => {
    if (offset != 1) {
        offset -= 9;
        removeChildNodes(pokemonContainer)
        fetchManyPokemon(offset, limit)
    }
})
next.addEventListener('click',() => {offset += 9; removeChildNodes(pokemonContainer); fetchManyPokemon(offset, limit)})

async function fetchPokemon(id) {
    let response = await fetch(`${pokeAPI}/${id}`);
    let data = await response.json();
    createPokemon(data);
}

function fetchManyPokemon(offset, limit) {
    for (let i = offset; i <= (offset + limit); i++) {
        fetchPokemon(i);        
    }
}

function createPokemon(pokemon) {
    let renderOrder = `${pokemon.id}`;
    const card = document.createElement('div');
    card.classList.add('pokemon-block');
    card.style.order = renderOrder;

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

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

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchManyPokemon(offset, limit);