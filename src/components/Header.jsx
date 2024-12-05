import LogoImg from "@public/game-logo.png";

export function Header() {
	return (
		<header>
			<img src={LogoImg} alt="Hand-drawn tic Tac Toe game" />
			<h1>Tic-Tac-Toe</h1>
		</header>
	);
}
