var itemsList = document.querySelector('.plates'),
    addItems = document.querySelector('.add-items'),
    items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(event){
    event.preventDefault();
    var text = (this.querySelector('[name=item]')).value,
        item = {
        text: text,
        done: false
    }
    items.push(item);    
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList){
    platesList.innerHTML = plates.map(function(plate, i){
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}>
                <label for="item${i}">${plate.text}</label>
                <img data-index=${plate.text} src="img/img_383566.png" onclick="delFromList()">
            </li>
            `
    }).join('');
};

function delFromList(){
    var target = event.target.getAttribute('data-index');
    for(i = 0; i < items.length; i += 1) {
        if(target === items[i].text) {
            items.splice(i,1);  // попробовать через remove item
            localStorage.setItem("items",JSON.stringify(items));
        }
    }
    populateList(items, itemsList);
};

function toogleDone(event){
    var el = event.target,
        index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

populateList(items, itemsList);
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toogleDone);

