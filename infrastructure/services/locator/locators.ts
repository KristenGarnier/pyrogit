import { statSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Locator } from "./locator.interface";

export class GitLocator implements Locator {
	findDir() {
		let dir = process.cwd();

		while (true) {
			const gitPath = join(dir, ".git");

			try {
				const stat = statSync(gitPath);

				if (stat.isDirectory()) return gitPath;

				if (stat.isFile()) return gitPath;
			} catch (err: any) {
				if (
					err.code !== "ENOENT" &&
					err.code !== "ENOTDIR" &&
					err.code !== "EACCES"
				) {
					return null;
				}
			}

			const parent = dirname(dir);
			if (parent === dir) return null;
			dir = parent;
		}
	}
}

export class RootLocator implements Locator {
	private locator: Locator;
	constructor() {
		this.locator = new GitLocator();
	}

	findDir() {
		const dir = this.locator.findDir();
		if (!dir) return dir;

		return dir.replace("/.git", "");
	}
}
