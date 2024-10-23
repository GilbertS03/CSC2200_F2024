let items = [];
function addItem(){
    let item = document.getElementById("item").value;
    if(item == null || item ===""){
        alert("Please enter a valid item")
    }
    else{
        items.push(item);
    }
    document.getElementById("results").innerHTML = "Added size: " + items.length;
}

function removeFromList(){
    let item = document.getElementById("item").value;
    let idx = items.indexOf(item)
    if(idx > -1){
        items.splice(idx, 1);
    }
    showList();
}

function showList(){
    let oStr = `<h2> Operation Results</h2>`
    oStr += "<ol>";
    for(let i=0; i < items.length; i++){
        oStr += `<li>${items[i]}</li>`;
    }
    oStr += "</ol>";
    document.getElementById("results").innerHTML = oStr;
}
