package dto;

import engine.BattleState;
import model.move.Move;
import model.move.MoveName;

public class Request {

	
	private BattleState battleState;
	private MoveName heroMove;
	
	
	public BattleState getBattleState() {
		return battleState;
	}
	public void setBattleState(BattleState battleState) {
		this.battleState = battleState;
	}


	
	public MoveName getHeroMove() {
		return heroMove;
	}
	public void setHeroMove(MoveName heroMove) {
		this.heroMove = heroMove;
	}
	
	
}
