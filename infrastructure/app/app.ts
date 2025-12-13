import { Octokit } from "@octokit/rest";
import { ChangeRequestService } from "../../application/usecases/change-request.service";
import { GitHubChangeRequestRepository } from "../services/repos/github/github.adapter";
import { GitRemoteRepoResolver } from "../services/repos/resolver.adapter";
import { GitHubCurrentUserProvider } from "../services/repos/user.adapter";

export function init(token: string) {
	const octokit = new Octokit({ auth: token });

	const repoResolver = new GitRemoteRepoResolver({ remoteName: "origin" });
	const currentUserProvider = new GitHubCurrentUserProvider(octokit);

	const repository = new GitHubChangeRequestRepository(octokit, () =>
		currentUserProvider.getCurrentUser(),
	);

	return new ChangeRequestService({
		repoResolver,
		repository,
		currentUserProvider,
	});
}
