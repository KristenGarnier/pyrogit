import { TextAttributes } from "@opentui/core";
import { useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import { Pyrogit } from "../../services/pyrogit";
import { useToastActions } from "../../stores/toast.store";
import type { ChangeRequestService } from "../../../../../application/usecases/change-request.service";
import { Modal } from "./modal";

type TokenInputProps = {
	onSuccess: (instance: ChangeRequestService) => void;
};

export function TokenInput({ onSuccess }: TokenInputProps) {
	const { theme } = useTheme();
	const toast = useToastActions();
	const [value, setValue] = useState("");
	const [loading, setLoading] = useState(false);

	async function submitToken() {
		setLoading(true);
		const pyro = new Pyrogit();
		const [error, instance] = await pyro.init(value);
		if (error) {
			setLoading(false);
			toast.error(error.message);
			return;
		}

		toast.success("Token initialisation success");
		setLoading(false);
		onSuccess(instance as ChangeRequestService);
	}

	return (
		<Modal>
			<Modal.Header
				title="GitHub Token Required"
				icon="🔐"
				description="Please enter your GitHub personal access token to continue."
			/>

			<Modal.Content>
				<input
					placeholder="Enter token..."
					value={value}
					onInput={setValue}
					onSubmit={submitToken}
					onPaste={(event) => setValue(event.text)}
					focused
				/>
			</Modal.Content>

			<Modal.Content>
				<box flexDirection="row" gap={1}>
					{loading && (
						<text fg={theme.info} attributes={TextAttributes.DIM}>
							Verifying token...
						</text>
					)}
				</box>
			</Modal.Content>
		</Modal>
	);
}
