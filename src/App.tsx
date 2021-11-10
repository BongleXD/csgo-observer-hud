import React from 'react';
import Layout from './hud/Layout/Layout';
import { loadAvatarURL } from './api/Avatars';
import ActionManager, { ConfigManager } from './api/ActionManager';

import { CSGO, GSISocket } from "csgogsi-socket";
import { Match } from './api/Interfaces';

export const { GSI, socket } = GSISocket('localhost:3000', "update");

export const actions = new ActionManager();
export const configs = new ConfigManager();

interface DataLoader {
	match: Promise<void> | null
}

const dataLoader: DataLoader = {
	match: null
}

class App extends React.Component<any, { match: Match | null, game: CSGO | null, steamids: string[]}> {

  constructor(props: any) {
		super(props);
		this.state = {
			game: null,
			steamids: [],
			match: null
		}
	}

  verifyPlayers = async (game: CSGO) => {
		const steamids = game.players.map(player => player.steamid);
		steamids.forEach(steamid => {
			loadAvatarURL(steamid);
		})

		if (steamids.every(steamid => this.state.steamids.includes(steamid))) {
			return;
		}

		this.setState({ steamids });
	}

	componentDidMount() {
		socket.on("update_mirv", (data: any) => {
			GSI.digestMIRV(data);
		})

		GSI.on('data', game => {
			if (!this.state.game || this.state.steamids.length) this.verifyPlayers(game);
			this.setState({ game });
		});

	}

  loadMatch = async() => {

  }

	render() {
		if (!this.state.game) return '';
		return (
			<Layout game={this.state.game} match={this.state.match} />
		);
	}

}

export default App;
