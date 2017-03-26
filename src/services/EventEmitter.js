export default class EventEmitter {
    constructor() {
        this._handlers = {};
    }
    on(type, handler) {
        if (typeof this._handlers[type] === 'undefined') {
            this._handlers[type] = [];
        }
        this._handlers[type].push(handler);
    }
    off(type=null){
      if(type === null){
        this._handlers = {};
        return;
      }
      this._handlers[type] = [];
    }
    emit(type, data) {
        let handlers = this._handlers[type] || [];
        for (var i = 0; i < handlers.length; i++) {
            let handler = handlers[i];
            handler.call(this, data);
        }
    }
}
