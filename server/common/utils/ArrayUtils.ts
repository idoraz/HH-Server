import { isEmpty, isArray } from 'lodash';

export default class ArrayUtils {
    static isArrayNotEmpty(array: Array<any>) { return !isEmpty(array) && isArray(array); }
}