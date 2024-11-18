let numItems = 0;
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("add").addEventListener("click", function () {
        document.getElementById("noItems").innerText = "";
        const item = document.createTextNode(document.getElementById("items").value);
        document.getElementById("items").value = "";
        const listItem = document.createElement("li");
        listItem.appendChild(item);
        document.getElementById("list").appendChild(listItem);
        numItems += 1;
        document.getElementById("listNum").innerText = `List Of Items (${numItems}):`;
    })
    document.getElementById("remove").addEventListener("click", function () {
        if(numItems !== 0){
            document.getElementById("list").removeChild(document.getElementById("list").lastChild);
            numItems -= 1;
            document.getElementById("listNum").innerText = `List Of Items (${numItems}):`;
        }
        else{
            document.getElementById("noItems").innerText = "No items to remove";
            document.getElementById("noItems").style.color = "red";
        }
    })
})
