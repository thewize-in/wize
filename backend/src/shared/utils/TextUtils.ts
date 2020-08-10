export class TextUtils {
    public static removeWhiteSpace(text: string) {
        return text.split(' ').join('');
    }
    public static emailtoUsername(email: string): string {
        let splitAT = email.split('@');
        let splitedATUsername = splitAT[0];
        let splitDOT = splitedATUsername.split('.');
        const username = splitDOT.join('');
        return username;
    }
}
