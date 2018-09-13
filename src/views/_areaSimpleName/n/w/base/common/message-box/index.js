import Vue from 'vue'
import tip from './tips.vue'
import merge from '@/util/common/merge'

const TipConstructor = Vue.extend(tip);

let instance;

const MessageBox = {};



MessageBox.tip = (options) => {
    let defaultOptions = {
        message: "",
        duration: 2000,
        show: false
    };

    if (typeof options == "string") {
        defaultOptions.message = options;
        options = defaultOptions;
    } else {
        options = merge(defaultOptions, options);
    }


    instance = new TipConstructor({
        el: document.createElement('div'),
        data: options
    });

    document.body.appendChild(instance.$el);
};

export default MessageBox;