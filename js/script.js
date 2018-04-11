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
                <label for="item${i}">${plate.text}</label>
            </li>
            `
    }).join('');
}

function delFromList(elem){
    elem.onclick = function(e){
        var target = event.target.innerText;
            
        for(i=0;i<items.length;i++){
            if(target === items[i].text) {
                items.splice(i,1);
                localStorage.setItem("items",JSON.stringify(items));
            }
        }
        populateList(items, itemsList);
    }        
};
delFromList(itemsList);

populateList(items, itemsList);
addItems.addEventListener('submit', addItem);

