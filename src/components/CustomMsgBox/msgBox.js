import { createVNode, render } from 'vue';

import {
  debugWarn,
  hasOwn,
  isClient,
  isElement,
  isFunction,
  isObject,
  isString,
  isUndefined,
  isVNode
} from 'element-plus/es/utils/index.mjs';
import MessageBoxConstructor from './index.vue';

// component default merge props & data

const messageInstance = new Map();

const getAppendToElement = props => {
  let appendTo = document.body;

  if (props.appendTo) {
    if (isString(props.appendTo)) {
      appendTo = document.querySelector(props.appendTo);
    }
    if (isElement(props.appendTo)) {
      appendTo = props.appendTo;
    }

    // should fallback to default value with a warning
    if (!isElement(appendTo)) {
      debugWarn(
        'ElMessageBox',
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      );
      appendTo = document.body;
    }
  }

  return appendTo;
};

const initInstance = (props, container, appContext = null) => {
  const vnode = createVNode(
    MessageBoxConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message)
            ? props.message
            : () => props.message
        }
      : null
  );
  vnode.appContext = appContext;
  render(vnode, container);
  getAppendToElement(props).appendChild(container.firstElementChild);
  return vnode.component;
};

const genContainer = () => {
  return document.createElement('div');
};

const showMessage = (options, appContext = null) => {
  const container = genContainer();

  // Adding destruct method.
  // when transition leaves emitting `vanish` evt. so that we can do the clean job.
  options.onVanish = () => {
    // not sure if this causes mem leak, need proof to verify that.
    // maybe calling out like 1000 msg-box then close them all.
    render(null, container);
    messageInstance.delete(vm); // Remove vm to avoid mem leak.
    // here we were suppose to call document.body.removeChild(container.firstElementChild)
    // but render(null, container) did that job for us. so that we do not call that directly
  };

  options.onAction = action => {
    const currentMsg = messageInstance.get(vm);

    if (currentMsg !== undefined) {
      let resolve;
      if (options.showInput) {
        resolve = { value: vm.inputValue, action };
      } else {
        resolve = action;
      }
      if (options.callback) {
        options.callback(resolve, instance.proxy);
      } else {
        if (action === 'cancel' || action === 'close') {
          if (options.distinguishCancelAndClose && action !== 'cancel') {
            currentMsg.reject('close');
          } else {
            currentMsg.reject('cancel');
          }
        } else {
          currentMsg.resolve(resolve);
        }
      }
    } else {
      // Handle the case where messageInstance.get(vm) returns undefined
      console.error('messageInstance.get(vm) returned undefined.');
    }
  };

  const instance = initInstance(options, container, appContext);
  let vm = null;
  if (instance) {
    vm = instance.proxy;

    for (const prop in options) {
      if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
        vm[prop] = options[prop];
      }
    }

    // change visibility after everything is settled
    vm.visible = true;
  } else {
    // Handle the case where initInstance returns null
    console.error('initInstance returned null.');
  }
  return vm;

  // This is how we use message box programmably.
  // Maybe consider releasing a template version?
  // get component instance like v2.
};

function CustomMessageBox(options, appContext = null) {
  if (!isClient) return Promise.reject();
  let callback;
  if (isString(options) || isVNode(options)) {
    options = {
      message: options
    };
  } else {
    callback = options.callback;
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(options, appContext || CustomMessageBox._context);
    // collect this vm to handle upcoming events.
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject
    });
  });
}

const MESSAGE_BOX_VARIANTS = ['alert', 'confirm', 'prompt'];
const MESSAGE_BOX_DEFAULT_OPTS = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true }
};

MESSAGE_BOX_VARIANTS.forEach(boxType => {
  CustomMessageBox[boxType] = messageBoxFactory(boxType);
});

function messageBoxFactory(boxType) {
  return function (message, title, options, appContext = null) {
    let titleOrOpts = '';
    if (isObject(title)) {
      options = title;
      titleOrOpts = '';
    } else if (isUndefined(title)) {
      titleOrOpts = '';
    } else {
      titleOrOpts = title;
    }

    return CustomMessageBox(
      Object.assign(
        {
          title: titleOrOpts,
          message,
          type: '',
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType]
        },
        options,
        {
          boxType
        }
      ),
      appContext
    );
  };
}

CustomMessageBox.close = () => {
  // instance.setupInstall.doClose()
  // instance.setupInstall.state.visible = false

  messageInstance.forEach((_, vm) => {
    vm.doClose();
  });

  messageInstance.clear();
};

// Assuming you have a global object or class called IElMessageBox
CustomMessageBox._context = null;

export default CustomMessageBox;
