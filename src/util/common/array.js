export const pushArray = (src, tar) => {
    for (let i = 0; i < tar.length; i++) {
        src.push(tar[i]);
    }
}

export const getLast = (arr) => {
    return arr[arr.length - 1];
}


export const getPropertyOfLast = (arr, key) => {
    if (arr == null || arr.length == 0) {
        return null;
    }
    let last = getLast(arr);
    if (last == null) {
        return null;
    }
    return last[key];
}

