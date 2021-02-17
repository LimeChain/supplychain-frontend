import S from '../utilities/Main';

export default class InputStateHelper {

    constructor(keys, parentUpdate = null, parentChange = null) {
        this.keys = keys;
        this.parentUpdate = parentUpdate;
        this.parentChange = parentChange;

        this.values = new Map();
        this.errors = new Map();
        this.onChanges = new Map();

        this.keys.forEach((key) => {
            this.values.set(key, S.Strings.EMPTY);
            this.errors.set(key, false);
            this.onChanges.set(key, this.onChange.bind(this, key));
        })
    }

    setParentCallbacks(parentUpdate, parentChange = null) {
        this.parentUpdate = parentUpdate;
        this.parentChange = parentChange;
    }

    onChange(key, value) {
        this.values.set(key, value);
        this.errors.set(key, value === S.Strings.EMPTY);
        if (this.parentChange !== null) {
            this.parentChange(key, value)
        }
        this.parentUpdate();
    }

    updateValues(values) {
        this.keys.forEach((key, index) => {
            this.values.set(key, values[index]);
        });
    }

    getValues() {
        let valid = true;
        this.values.forEach((value, key) => {
            valid = valid && value !== S.Strings.EMPTY;
            this.errors.set(key, value === S.Strings.EMPTY);
        });

        if (valid === false) {
            this.parentUpdate();
            return null;
        }

        return this.values;
    }

    isValid() {
        let valid = true;
        this.errors.forEach((value, key) => {
            valid = valid && !value;
        });
        return valid;
    }

    getValue(key) {
        const value = this.values.get(key);
        const valid = value !== S.Strings.EMPTY;
        this.errors.set(key, value === S.Strings.EMPTY);

        if (valid === false) {
            this.parentUpdate();
            return null;
        }

        return value;
    }

}
