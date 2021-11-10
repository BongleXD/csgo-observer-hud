import React from "react";

import { CSGO, Team, Player } from "csgogsi-socket";
import { GSI } from "./../../App";
import { Match } from "../../api/Interfaces";

interface Props {
    game: CSGO,
    match: Match | null
}
  
interface State {
    winner: Team | null,
    mvp: Player | null,
    showWin: boolean,
    sideHide: boolean,
    showMVP: boolean
}

export default class Layout extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        winner: null,
        mvp: null,
        showWin: false,
        sideHide: false,
        showMVP: false
      }
    }

    render() {
      const { game, match } = this.props;
      const left = game.map.team_ct.orientation === "left" ? game.map.team_ct : game.map.team_t;
      const right = game.map.team_ct.orientation === "left" ? game.map.team_t : game.map.team_ct;
      const leftPlayers = game.players.filter(player => player.team.side === left.side);
      const rightPlayers = game.players.filter(player => player.team.side === right.side);
      const isFreezetime = (game.round && game.round.phase === "freezetime") || game.phase_countdowns.phase === "freezetime";
      const { sideHide, showMVP } = this.state;
      return(
        <div>
          {match}
        </div>
      );
    }
  }