import { css, type Component} from 'dreamland/core'
import './style.css'
import { argbFromHex, Card, DynamicScheme, Hct, SchemeStyles, TextFieldFilled, Variant } from 'm3-dreamland';
import { Message, MessageCreate } from './Message';
import { send_message, add_message_listener} from './send';

let scheme = new DynamicScheme({
	sourceColorHct: Hct.fromInt(argbFromHex("CBA6F7")),
	contrastLevel: 0,
	specVersion: "2025",
	variant: Variant.TONAL_SPOT,
	isDark: true,
});

const App: Component<{}, { name: string, text: string, clickX: number, clickY: number, open: boolean, messages: HTMLElement[] }> = function() {
	this.name = "Toshit";
	this.text = "";

	this.clickX = -48;
	this.clickY = -48;
	this.open = false;
	this.messages = [];

	let click = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			this.clickX = Math.max(0, e.pageX - 23);
			this.clickY = Math.max(0, e.pageY - 20);
		}
	}

  let add_message = (name : string, text : string, x : number, y : number) => {
    this.messages = [
      ... this.messages, <Message name = {name} text = {text} x = {x} y = {y} />
    ];
    this.text = "";
    this.clickX = -48;
    this.clickY = -48;
    this.open = false;
  }

  add_message_listener((msg: string) => {
    const msg_parsed = JSON.parse(msg);
    add_message(msg_parsed.username, msg_parsed.message, msg_parsed.x, msg_parsed.y);
  })

  let post = () => {
    send_message(this.name, this.text, this.clickX, this.clickY);
    add_message(this.name, this.text, this.clickX, this.clickY)
  }

	return (
		<div id="app">
			<SchemeStyles scheme={scheme} motion="expressive">
				<div class="bg" />
				<div class="messages" on:click={click}>
					{use(this.messages)}
					<MessageCreate text={use(this.text)} on:post={post} open={use(this.open)} />
				</div>
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
		// inset: 0;
	}

	.bg {
		background: url("/bg.jpg");
		background-size: cover;
		background-position: center;
		inset: 0;
	}

	.info {
		pointer-events: none;
		padding: 1em;
		display: flex;
		align-items: flex-start;
		justify-content: end;
		z-index: 2;
		width: max-content;
		height: max-content;
		right: 0;
	}

	.messages {
	  z-index: 1;
			inset: 0;
	}
	.info > :global(*) {
		pointer-events: auto;
	}

	.messages > :global(.create) {
		position: absolute;
		width: 15rem;
		top: ${x => use(x.clickY).map(x => x + "px")};
		left: ${x => use(x.clickX).map(x => x + "px")};
	}
`;

document.querySelector("#app")?.replaceWith(<App />);
