
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

// get total

function getTotal(){    
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.style.background = 'rgb(128, 4, 4)';
        total.innerHTML = '';
    }
};

// create product and save the data in localStorage

let dataPro;

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value
    };
    
    if(title.value != '' && price.value != '' && category.value != '' ){
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);
                    clearData();
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
    }


    localStorage.setItem('product', JSON.stringify(dataPro));
    showPro();
}

// clear inputs

function clearData(){
    title.value = '',
    price.value = '',
    taxes.value = '',
    ads.value = '',
    discount.value = '',
    total.innerHTML = '',
    category.value = '',
    count.value = '';
}

// read

function showPro(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id='update' onclick="updateData(${i})">update</button></td>
                <td><button id='delete' onclick="deletePro(${i})">delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    // show the button of delete all
    let deleteBtn = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        deleteBtn.innerHTML = `
            <button onclick="deleteAllPro()">Delete All (${dataPro.length})</button>
        `
    }else{
        deleteBtn.innerHTML = '';
    }
}

showPro();

// delete
function deletePro(i){
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showPro();
}

function deleteAllPro(){
    localStorage.clear();
    dataPro.splice(0);
    showPro();
}
// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
// search
let searchMood = 'title';

function createSearchMood(id){
    let search = document.getElementById('search');
    if(id == "searchTitle"){
         searchMood = 'title';
         search.placeholder = 'search by title';
    }else{
        searchMood = 'category';
        search.placeholder = 'search by category';
    }
    search.focus();
    search.value = '';
    showPro();
}

function searchData(value){
    let table = '';
    if(searchMood == 'title'){
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value)){
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id='update' onclick="updateData(${i})">update</button></td>
                <td><button id='delete' onclick="deletePro(${i})">delete</button></td>
            </tr>
        `
            }
        }
    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value)){
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id='update' onclick="updateData(${i})">update</button></td>
                <td><button id='delete' onclick="deletePro(${i})">delete</button></td>
            </tr>
        `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}