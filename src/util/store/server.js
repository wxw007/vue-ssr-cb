export const registerStoreModules = (component, store) => {
    let storeModule = component.storeModule;
    if (storeModule) {
        const moduleObj = storeModule();
        for (let name in moduleObj) {
            let module = moduleObj[name];
            store.registerModule(name, module);
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