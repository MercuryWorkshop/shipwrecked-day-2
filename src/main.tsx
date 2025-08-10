import { css, type Component } from 'dreamland/core'
import './style.css'
import { argbFromHex, Card, DynamicScheme, Hct, SchemeStyles, TextFieldFilled, Variant } from 'm3-dreamland';
import "m3-dreamland/styles";
import { Message, MessageCreate } from './Message';

let scheme = new DynamicScheme({
	sourceColorHct: Hct.fromInt(argbFromHex("CBA6F7")),
	contrastLevel: 0,
	specVersion: "2025",
	variant: Variant.TONAL_SPOT,
	isDark: true,
});

const App: Component<{}, { name: string, text: string, clickX: number, clickY: number, }> = function() {
	this.name = "Toshit";
	this.text = "";

	this.clickX = 0;
	this.clickY = 0;

	let click = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			this.clickX = Math.max(0, e.pageX - 23);
			this.clickY = Math.max(0, e.pageY - 20);
		}
	}

	return (
		<div id="app">
			<SchemeStyles scheme={scheme} motion="expressive">
				<div class="bg" />
				<div class="info">
					<Card variant="elevated">
						<div class="m3dl-font-display-small"><b>Spatial messenger thingy</b></div>
						<div class="m3dl-font-headline-small"><i>William Daniel Messenger</i></div>
						<div>
							social media board
						</div>
						<TextFieldFilled value={use(this.name)} placeholder="name" />
					</Card>
				</div>
				<div class="messages" on:click={click}>
					<MessageCreate text={use(this.text)} />
				</div>
			</SchemeStyles>
		</div>
	)
}
App.style = css<typeof App>`
	:scope :global(.m3dl-scheme-styles) {
		font: var(--m3dl-font);

		height: 100%;
		background: rgb(var(--m3dl-color-background));
		color: rgb(var(--m3dl-color-on-background));

		position: relative;
	}

	:scope :global(.m3dl-scheme-styles) > * {
		position: absolute;
		inset: 0;
	}

	.bg {
		background: url("/bg.jpg");
		background-size: cover;
		background-position: center;
	}

	.info {
		padding: 1em;
		display: flex;
		align-items: flex-start;
		justify-content: end;
	}

	.messages > :global(.create) {
		position: absolute;
		width: 15rem;
		top: ${x => use(x.clickY).map(x => x + "px")};
		left: ${x => use(x.clickX).map(x => x + "px")};
	}
`;

document.querySelector("#app")?.replaceWith(<App />);
