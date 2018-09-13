
export const registerStoreModules = (component, store) => {
    let storeModule = component.storeModule;
    if (storeModule) {
        const moduleObj = storeModule();
        for (let name in moduleObj) {
            let module = moduleObj[name];
            if (store.state[name]) {// 如果服务端渲染的
                store.registerModule(name, module, { preserveState: true });
            } else {
                store.registerModule(name, module);
            }
        }
    }

    let subComponents = component.components;
    if (subComponents) {
        let subComponent = null;
        for (let key in subComponents) {
            subComponent = subComponents[key];
            registerStoreModules(subComponent, store);
        }
    }
}


export const registerStoreModules2 = (component, store) => {
    let storeModule = component.storeModule;
    if (storeModule) {
        const moduleObj = storeModule();
        for (let name in moduleObj) {
            let module = moduleObj[name];
            if (!store.state[name]) {
                store.registerModule(name, module);
            }
        }
    }

    let subComponents = component.components;
    if (subComponents) {
        let subComponent = null;
        for (let key in subComponents) {
            subComponent = subComponents[key];
            registerStoreModules2(subComponent, store);
        }
    }
}
