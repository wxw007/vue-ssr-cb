export default {
    toFormData(formModel) {
        // console.log(FormData);
        let formData = new FormData();
        for (let name in formModel) {
            let value = formModel[name];
            this.setNameValue({ prefix: name, value, formData })
        }
        return formData;
    },
    setNameValue({ prefix, value, formData }) {
        if (value == undefined || value == null) {//undefined的
            return;
        }

        if (typeof value == "object") {
            if (value instanceof FileList) {
                let fileList = value;
                for (let i = 0; i < fileList.length; i++) {
                    formData.append(prefix, fileList[i]);
                }
            } else if (value instanceof Array) {
                if (value.length == 0) {
                    return;
                }
                for (let i = 0; i < value.length; i++) {
                    this.setNameValue({ prefix: prefix + "[" + i + "]", value: value[i], formData });
                }
            } else {
                for (let key in value) {
                    this.setNameValue({ prefix: prefix + "." + key, value: value[key], formData })
                }
            }
        } else {
            formData.append(prefix, value);
        }
    }
}
  