export interface ReturnResult {
    succeeded: boolean;
    value?: any;
}
export class Result<T> {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error: T | string;
    private _value: T;
    public constructor(isSuccess: boolean, error?: T | string, value?: T) {
        if (isSuccess && error) {
            throw new Error('InvalidOperation: A result cannot be successfull and contain and error');
        }
        if (!isSuccess && !error) {
            throw new Error('InvalidOperation: A failing result need to contain and error message');
        }
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;

        Object.freeze(this);
    }
    public getValue(): T {
        if (!this.isSuccess) {
            console.log(this.error);
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
        } else {
            return this._value;
        }
    }
    public errorValue(): T {
        return this.error as T;
    }
    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, null, value);
    }
    public static fail<U>(error: any): Result<U> {
        return new Result(false, error);
    }
    public static success(flag: boolean, value: any | false = false): any {
        if (value) return { succeeded: flag, value: { ...value } };
        return { succeeded: flag };
    }
    public static combine(results: Result<any>[]): Result<any> {
        for (let result of results) {
            if (result.isFailure) return result;
        }
        return Result.ok();
    }
}
