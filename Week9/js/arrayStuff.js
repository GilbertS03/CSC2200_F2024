function workWArrays(){
    // alert("clicked")

    let fruits2 = new Array();
    let fruits3 = [`Apple`, `Berry`, `Cherry`, 42];
    fruits3[3] = "Donut";
    fruits3.push("Eggs")
    console.log(`Fruits size = ${fruits3.length}`);
    console.log(fruits3);

    let appleCherry = fruits3[0] + " " + fruits3[2];
    console.log(appleCherry);
    for(let i =0; i < fruits3.length; i++){
        console.log(fruits3[i])
    }
    console.log("__________________________")
    fruits3.forEach((fruit, index) => {
        console.log(`index = ${index} value: ${fruit}`);
    })
    let f1 = fruits3.shift();
    console.log(f1, fruits3)
    let f2 = fruits3.pop();
    console.log(f2);
    let idx = fruits3.indexOf("Cherryx");
    console.log(`idx = ${idx}`)

    let fruits = ["A", "B", "C", "D", "E", "F"];
    let someFruits = fruits.slice(3, 5)
    console.log(someFruits);

    let lowercase = fruits.map(fruit => fruit.toLowerCase());
    fruits.sort();
    fruits.reverse();
    if(fruits.includes("a")){
        console.log("yup")
    }

}