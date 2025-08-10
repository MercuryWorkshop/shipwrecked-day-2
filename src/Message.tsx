import { css, type Component } from "dreamland/core";
import {
	Button,
	Icon,
	ToggleButton,
} from "m3-dreamland";
import iconAdd from "@ktibow/iconset-material-symbols/add";
import iconSend from "@ktibow/iconset-material-symbols/send-outline";

export const Message: Component<
	{ name: string; text: string; x: number; y: number },
	{ open: boolean }
> = function() {
	this.open = false;
	return (
		<div>
			<div class="root">
				<ToggleButton variant="elevated" value={use(this.open)}>
					{this.name}
				</ToggleButton>
				<div class="card" class:shown={use(this.open)}>
					<div class="bubble">
						"{this.text}"
					</div>
				</div>
			</div>
		</div>
	);
};
Message.style = css<typeof Message>`
	:scope {
		position: absolute;
		top: ${(x) => use(x.y).map((x) => x + "px")};
		left: ${(x) => use(x.x).map((x) => x + "px")};
	}

  .root {
    position: relative;
  }
  .bubble {
    border-radius: 8px 2rem 2rem;
    background: rgb(var(--m3dl-color-surface-container-low));
    box-shadow: var(--m3dl-elevation-1);
    color: rgb(var(--m3dl-color-on-surface));
    min-width: 8rem;
    padding: 1rem;
    max-height: calc(100vh - 6rem - 4px - ${(x) => use(x.y).map((x: number) => x - 20 + "px")});
    overflow: auto;
  }
  .card {
    position: absolute;
    top: calc(100% + 0.5rem);
    display: none;
  }
  .card.shown {
    display: block;
  }
`;

export const MessageCreate: Component<
	{ text: string; "on:post": () => void, open: boolean }
> = function() {
	return (
		<div class="create">
			<ToggleButton variant="elevated" value={use(this.open)} icon="full">
				<Icon icon={iconAdd} />
			</ToggleButton>

			<div class="card" class:shown={use(this.open)}>
				<div>
					<input type="text" placeholder="Message" value={use(this.text)} />
				</div>
				<div class="btn">
					<Button variant="filled" on:click={this["on:post"]}>
						<Icon icon={iconSend} />
					</Button>
				</div>
			</div>
		</div>
	);
};
MessageCreate.style = css`
	:scope {
		position: relative;
	}

	.card {
		position: absolute;
		top: calc(100% + 0.5rem);
		display: none;
		background: rgb(var(--m3dl-color-surface-container-low));
		box-shadow: var(--m3dl-elevation-1);
		padding: 0.5rem;
		padding-left: 1rem;
		border: none;
		border-radius: 8px 3rem 3rem 3rem;
		display: none;
		gap: 0.5rem;
		flex-direction: row;
		color: rgb(var(--m3dl-color-on-surface));
	}
	.card.shown {
		display: flex;
	}
	input {
		appearance: none;
		border: none;
		background: transparent;
		font-family: inherit;
		height: 2.5rem;
		box-shadow: none !important;
	}

	::placeholder {
		color: rgb(var(--m3dl-color-on-surface));
	}
`;
