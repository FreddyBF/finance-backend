export interface AuthResponseDTO {
    /** Authentication token */
    token: string;

    /** Token type (usually 'Bearer') */
    tokenType: 'Bearer';

    /** Token expiration timestamp (ISO string) */
    expiration: string;

    /** Authenticated user details */
    user: {
        /** User ID */
        id: number;

        /** Full name of the user */
        name: string;

        /** Email address of the user */
        email: string;
    };
}
