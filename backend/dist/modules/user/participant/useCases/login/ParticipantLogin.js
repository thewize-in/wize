"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantLogin = void 0;
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client("171327338279-ersihqebjl6ee7qjr4i2bvkkbnaosnvu.apps.googleusercontent.com");
class ParticipantLogin {
    constructor() { }
    async execute(request) {
        const token = request.token;
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "171327338279-ersihqebjl6ee7qjr4i2bvkkbnaosnvu.apps.googleusercontent.com"
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
        }
        const response = await verify().catch(console.error);
        console.log(response);
    }
}
exports.ParticipantLogin = ParticipantLogin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFydGljaXBhbnRMb2dpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3VzZXIvcGFydGljaXBhbnQvdXNlQ2FzZXMvbG9naW4vUGFydGljaXBhbnRMb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2REFBbUQ7QUFDbkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQ0FBWSxDQUFDLDBFQUEwRSxDQUFDLENBQUM7QUFDNUcsTUFBYSxnQkFBZ0I7SUFDekIsZ0JBQWdCLENBQUM7SUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFZO1FBRXRCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDNUIsS0FBSyxVQUFVLE1BQU07WUFDakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDO2dCQUN0QyxPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsMEVBQTBFO2FBQ3ZGLENBQUMsQ0FBQztZQUNILE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEMsQ0FBQztRQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Q0FFSjtBQWxCRCw0Q0FrQkMifQ==