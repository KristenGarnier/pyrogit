export interface AuthProvider {
	/**
	 * Token brut d’authentification
	 * (GitHub/GitLab)
	 */
	getToken(): Promise<string | null>;
}
