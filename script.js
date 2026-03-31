// ऐप शुरू होते ही डेटा लोड करें
document.addEventListener("DOMContentLoaded", displayItems);

function addItem() {
    const name = document.getElementById("itemName").value;
    const qty = document.getElementById("itemQty").value;
    const price = document.getElementById("itemPrice").value;

    if (name === "" || qty === "" || price === "") {
        alert("कृपया पूरी जानकारी भरें");
        return;
    }

    const item = { name, qty, price };
    
    // LocalStorage से पुराने आइटम्स लें
    let items = localStorage.getItem("cosmeticStock") ? JSON.parse(localStorage.getItem("cosmeticStock")) : [];
    
    items.push(item);
    localStorage.setItem("cosmeticStock", JSON.stringify(items)); // डेटा सेव करें

    displayItems();
    clearInputs();
}

function displayItems() {
    const items = localStorage.getItem("cosmeticStock") ? JSON.parse(localStorage.getItem("cosmeticStock")) : [];
    const tbody = document.getElementById("inventoryBody");
    tbody.innerHTML = "";

    items.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>₹${item.price}</td>
                <td><button class="delete-btn" onclick="deleteItem(${index})">X</button></td>
            </tr>
        `;
    });
}

function deleteItem(index) {
    let items = JSON.parse(localStorage.getItem("cosmeticStock"));
    items.splice(index, 1);
    localStorage.setItem("cosmeticStock", JSON.stringify(items));
    displayItems();
}

function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
    document.getElementById("itemPrice").value = "";
}