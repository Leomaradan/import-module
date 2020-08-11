class Queue {
    static enqueue(promise) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                promise,
                resolve,
                reject,
            });
            this.dequeue();
        });
    }
    static dequeue() {
        if (this.workingOnPromise) {
            return false;
        }
        const item = this.queue.shift();
        if (!item) {
            return false;
        }
        try {
            this.workingOnPromise = true;
            item.promise()
                .then((value) => {
                this.workingOnPromise = false;
                item.resolve(value);
                this.dequeue();
            })
                .catch(err => {
                this.workingOnPromise = false;
                item.reject(err);
                this.dequeue();
            });
        }
        catch (err) {
            this.workingOnPromise = false;
            item.reject(err);
            this.dequeue();
        }
        return true;
    }
}
Queue.queue = [];
Queue.workingOnPromise = false;

async function importModulePromise(loadPath) {
    let _module = window.module;
    let _exports = window.exports;
    let _define = window.define;
    let defined = {};
    function defineLoader(_requirment, factory) {
        const result = factory();
        if (typeof result === 'function') {
            defined = Object.assign({ default: result() }, result.prototype);
        }
        else {
            defined = result;
        }
    }
    defineLoader.amd = true;
    window.module = {};
    window.exports = {};
    window.define = defineLoader;
    const exported = await import(loadPath);
    let mergeExports = Object.assign(Object.assign(Object.assign(Object.assign({}, window.module.exports), exported), window.exports), defined);
    window.module = _module;
    window.define = _define;
    window.exports = _exports;
    return mergeExports;
}
const importModule = (path) => {
    return Queue.enqueue(() => importModulePromise(path));
};

export { importModule };
