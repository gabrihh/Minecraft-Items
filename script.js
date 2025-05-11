
async function fetchItems() {
    try {
        const itemsResponse = await fetch('https://raw.githubusercontent.com/PetarMc1/Minecraft-Items-API-v2/refs/heads/master/src/Data/1.20/items.json');
        const itemsData = await itemsResponse.json();
        const iconsResponse = await fetch('https://minecraft-api.vercel.app/api/items');
        const iconsData = await iconsResponse.json();
        displayItems(itemsData, iconsData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayItems(itemsData, iconsData) {
    const itemListContainer = document.getElementById('item-list');
    itemListContainer.innerHTML = '';
    itemsData.forEach(item => {
        const icon = iconsData.find(icon => icon.namespacedId === item.name);
        if (icon) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="${icon.image}" alt="${item.displayName}">
                <p><strong>${item.displayName}</strong></p>
                <p>ID: ${item.id}</p>
                <p>${icon.description}</p>
            `;
            itemListContainer.appendChild(itemElement);
        }
    });
}

fetchItems();
