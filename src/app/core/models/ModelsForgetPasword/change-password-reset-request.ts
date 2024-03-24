// pwd oublier changement de pwd
export class ChangePasswordResetRequest {
    newPassword!: string;
    confirmationPassword!: string;
    email!: string;
}
