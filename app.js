class EventEmitter {
  constructor(){
    this.events = {};
  }
  on(type, callback){
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
    console.log(this.events);
  };
  emit(type, value){
    if(this.events[type]){
      this.events[type].forEach( callback => callback(value))
    }
  }
}

class Controller{
  constructor(view, model){
    this.view = view;
    this.model = model
    view.on('itemAdded', this.handleAdd.bind(this));
  };

  handleAdd(item){
    this.model.items.push(item);
  }
}

class Model {
  constructor(){
    this.items = [];
  }
}

class View  extends EventEmitter {
  constructor(){
    super();
   this.input = document.getElementById('inputField');
   this.button = document.getElementById('addButton');
   this.itemList = document.getElementById('itemsList');
   this.addEventListeners();
  }

  addEventListeners(){
    this.button.addEventListener('click',
     () => {
      if(this.input.value === '') {
        alert('Please fill in the field');
      }else {
        this.addItem()
      }
    }
                                )
  }

  addItem(){
    var inputValue = this.input.value;
    var wrappedItem = this.createListItem(inputValue);
    this.itemList.appendChild(wrappedItem);
    this.emit('itemAdded', inputValue)
  }

  createListItem(listItem) {
    var li = document.createElement('li');
    var textNode = document.createTextNode(listItem);
    li.appendChild(textNode);

    return li;
  }
}

var myView = new View();
var myModel = new Model();
var myController = new Controller(myView, myModel);
