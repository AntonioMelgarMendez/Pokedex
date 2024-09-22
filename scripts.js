function searchPokemon() {
    const query = document.getElementById("pokemon-search").value.toLowerCase();
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then(pokemon => {
            const pokemonList = document.getElementById("pokemon-list");
            
            const card = document.createElement("div");
            card.classList.add("pokemon-card");

            const pokemonImage = document.createElement("img");
            pokemonImage.src = pokemon.sprites.front_default;
            const pokemonNumber = pokemon.id;
            const height = pokemon.height / 10; 
            const weight = pokemon.weight / 10; 
            const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(", ");
            const pokemonInfo = document.createElement("div");
            pokemonInfo.classList.add("pokemon-info");
            pokemonInfo.innerHTML = `
                <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#${pokemonNumber})</h3>
                <p>Types: ${types}</p>
                <p>Height: ${height} m</p>
                <p>Weight: ${weight} kg</p>
            `;

            const editButton = document.createElement("button");
            editButton.classList.add("edit");
            editButton.textContent = "Edit";
            editButton.onclick = () => {
                const nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.value = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            
                const typesInput = document.createElement("input");
                typesInput.type = "text";
                typesInput.value = types;
                
            
                pokemonInfo.innerHTML = "";
            
                pokemonInfo.appendChild(nameInput);
                pokemonInfo.appendChild(typesInput);
            
                const saveButton = document.createElement("button");
                saveButton.textContent = "Save";
                saveButton.onclick = () => {
                    pokemonInfo.innerHTML = `
                        <h3>${nameInput.value} (#${pokemonNumber})</h3>
                        <p>Types: ${typesInput.value}</p>
                        <p>Height: ${height} m</p>
                        <p>Weight: ${weight} kg</p>
                    `;
                };
            
                pokemonInfo.appendChild(saveButton);
            };
            
            

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => {
                pokemonList.removeChild(card); 
            };

            card.appendChild(pokemonImage);
            card.appendChild(pokemonInfo);
            card.appendChild(editButton);
            card.appendChild(deleteButton);
            pokemonList.appendChild(card);
            document.getElementById("pokemon-search").value = "";
        })
        .catch(error => {
            alert(error.message);
        });
}
