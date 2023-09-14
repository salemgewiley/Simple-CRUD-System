let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let statue = 'create';
let tmp;

// get total
function getTotal() {
    if (price.value !== '') {
        let result;
        result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#1c603f';
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = '#124549';
    }
}

//create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (statue === 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro)
            }
        } else {
            dataPro.push(newPro)
        }
    } else {
        dataPro[tmp] = newPro;
        statue = 'create';
        submit.innerHTML = 'Create '
        count.style.display = 'block';
    }
    //save local storage
    localStorage.setItem('product', JSON.stringify(dataPro))
    clearData()
    showData()
}

//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
    total.style.backgroundColor = '#124549';
}

//read
function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
<td>${i + 1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price + '$'} </td>
<td>${dataPro[i].taxes + '$'}</td>
<td>${dataPro[i].ads + '$'}</td>
<td>${dataPro[i].discount + '$'}</td>
<td>${dataPro[i].total + '$'}</td>
<td>${dataPro[i].category}</td>
<td><button onclick="updateData(${i})" id="update">update</button></td>
<td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>
    `
    }
    document.getElementById('tbody').innerHTML = table
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button></td>`
    } else {
        btnDelete.innerHTML = ``
    }

}

showData()

//delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

//delete all
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


//count


//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    statue = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

//search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMood = 'title';

    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search by ' + searchMood;
    search.focus()
    search.value = '';
    showData();

}

function searchData(value) {
    let table = '';
    if (searchMood === 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>        
                `
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>        
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data
