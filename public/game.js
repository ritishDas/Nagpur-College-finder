//State
class State {
  constructor(def) {
    this.val = def;
    this.list = [];
  }

  use(obj, atr) {
    obj[atr]=this.val;
    this.list.push({ obj, atr });
  }

  change(newval) {
    this.val = newval;

    // Update each object in list
    for (let i = 0; i < this.list.length; i++) {
      const ref = this.list[i];    
      ref.obj[ref.atr] = newval;
    }
  }

  remove(obj) {
    this.list = this.list.filter(a => a.obj !== obj);
  }
}



//Prop system
class Prop {
  constructor(frame) {
    this.frame = frame.innerHTML;
    frame.innerHTML="";
    this.data = {};
    this.framepieces = [];
    this.datapieces = [];
    this.first = true; // if first element is not key
  }

  dataEntry(data) {
    this.data = data; // Assign provided data object to this.data
  if(this.framepieces.length!==0) return;
  
    const regex = /\{(\w+)\}/g;
    let lastIndex = 0;
    let match;
  
    while ((match = regex.exec(this.frame)) !== null) {
      const key = match[1];
      if (this.data.hasOwnProperty(key)) {
        // Set first flag based on initial positions
     
        if (this.framepieces.length === 0 && this.datapieces.length === 1) this.first = false;
        
        // Store found key and frame piece
        this.datapieces.push(key);
        this.framepieces.push(this.frame.slice(lastIndex, match.index));
        
        lastIndex = regex.lastIndex;
      }
    }
  
    this.framepieces.push(this.frame.slice(lastIndex));
  
  }
  
  output() {
    let str = "";
    const pieceCount = Math.max(this.framepieces.length, this.datapieces.length);

    for (let i = 0; i < pieceCount; i++) {
      if (i < this.framepieces.length) {
        str += this.framepieces[i];
      }
      if (i < this.datapieces.length) {
        str += this.data[this.datapieces[i]];
      }
    }
    return str;
  }
}



//react router dom
let routers = [];

function navigate(path) {
    const history = window.history;
    history.pushState({}, "Title", path);
    componentManager(path);
}

function componentManager(path) {
    // Match paths with or without parameters
    const match = path.match(/^(\/[a-zA-Z0-9/]+)\/(\d+)?$/);
    let basePath = match ? match[1] : path;
    let param = match && match[2] ? match[2] : null;

    for (let i = 0; i < routers.length; i++) {
        if (routers[i].routes[basePath]) {
            routers[i].navigate(basePath, param);
        }
    }
}

window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    componentManager(path);
});

class Router {
    constructor(element) {
        this.target = element;
        this.routes = {};
        routers.push(this);
    }

    addRoute(path, component, fun) {
        this.routes[path] = {
            component: component.innerHTML,
            fun,
        };
        component.innerHTML = ""; // Clear component content
    }

    navigate(path, param) {
        this.target.innerHTML = this.routes[path].component;

        if (param === null) {
            this.routes[path].fun();
        } else {
            this.routes[path].fun(Number(param)); // Convert param to number
        }
    }
}


//Helpers
function fetchele(name){
  return document.querySelector(name);
}
function pathfinder(){
  return window.location.pathname
}

//Users code

const mainrouter = new Router(fetchele("#main"));
    mainrouter.addRoute("/index.html",fetchele(".homeroute"),()=>{console.log("home loaded")});
    mainrouter.addRoute("/index.html/about",fetchele(".aboutroute"),()=>{console.log("about loaded")});
    mainrouter.addRoute("/index.html/college",fetchele(".collegeroute"),()=>{console.log("college loaded")});


alert(pathfinder());
componentManager(pathfinder());

