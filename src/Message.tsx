import { css, type Component } from "dreamland/core";
import { Button, Card, Icon, TextFieldFilled, ToggleButton } from "m3-dreamland";
import iconAdd from "@ktibow/iconset-material-symbols/add";

export const Message: Component<{ name: string, text: string, x: number, y: number, }, { open: boolean }> = function() {
	this.open = false;
	return (
		<div>
			<div class="root">
				<ToggleButton variant="elevated" value={use(this.open)}>{this.name}</ToggleButton>
				<div class="card" class:shown={use(this.open)}>
					<Card variant="elevated">
						<i>Message:</i> {this.text}
					</Card>
				</div>
			</div>
		</div>
	)
}
Message.style = css<typeof Message>`
	:scope {
		position: absolute;
		top: ${x => use(x.y).map(x => x + "px")};
		left: ${x => use(x.x).map(x => x + "px")};
	}

	.root {
		position: relative;
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

export const MessageCreate: Component<{ text: string, "on:post": () => void, open: boolean }> = function() {
	return (
		<div class="create">
			<ToggleButton variant="elevated" value={use(this.open)} icon="full"><Icon icon={iconAdd} /></ToggleButton>
			<div class="card" class:shown={use(this.open)}>
				<Card variant="elevated">
					<div>
						<TextFieldFilled placeholder="Message" value={use(this.text)} />
					</div>
					<Button variant="filled" on:click={this["on:post"]}>Post</Button>
				</Card>
			</div>
		</div>
	)
}
MessageCreate.style = css`
	:scope {
		position: relative;
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
