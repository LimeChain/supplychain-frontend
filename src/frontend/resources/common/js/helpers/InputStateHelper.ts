import { observable } from 'mobx';
import S from '../utilities/Main';

export default class InputStateHelper {

    keys: string[];
    parentChange: (key: string, value: any) => void;

    values: Map < string, string >;
    errors: Map < string, boolean >;
    onChanges: Map < string, () => void >;

    constructor(keys, parentChange = null) {
        this.keys = keys;
        this.parentChange = parentChange;

        this.values = observable.map(new Map());
        this.errors = observable.map(new Map());
        this.onChanges = new Map();

        this.keys.forEach((key) => {
            this.values.set(key, S.Strings.EMPTY);
            this.errors.set(key, false);
            this.onChanges.set(key, this.onChange.bind(this, key));
        })
    }

    setParentCallbacks(parentChange = null) {
        this.parentChange = parentChange;
    }

    onChange(key: string, value: any) {
        this.values.set(key, value);
        this.errors.set(key, value === S.Strings.EMPTY);
        if (this.parentChange !== null) {
            this.parentChange(key, value)
        }
    }

    updateValues(values: any[]) {
        this.keys.forEach((key, index) => {
            this.values.set(key, values[index]);
        });
    }

    getValues(fields: string[] | null = null) {
        if (fields === null) {
            fields = this.keys;
        }

        const set = new Set();
        fields.forEach((f) => {
            set.add(f);
        });

        let valid = true;
        this.values.forEach((value, key) => {
            if (set.has(key) === false) {
                return;
            }

            valid = valid && value !== S.Strings.EMPTY;
            this.errors.set(key, value === S.Strings.EMPTY);
        });

        if (valid === false) {
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

    getValue(key: string) {
        const value = this.values.get(key);
        const valid = value !== S.Strings.EMPTY;
        this.errors.set(key, value === S.Strings.EMPTY);

        if (valid === false) {
            return null;
        }

        return value;
    }

}
