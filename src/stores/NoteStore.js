import Emitter from '../services/EventEmitter';

class EditorStore extends Emitter {}

const _instance = new EditorStore();

export default _instance;
