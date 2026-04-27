package dto;

import engine.BattleState;
import model.move.Move;

public class Request {

	
	private BattleState battleState;
	private String monsterMove;
	private String heroMove;
	
	
	public BattleState getBattleState() {
		return battleState;
	}
	public void setBattleState(BattleState battleState) {
		this.battleState = battleState;
	}
	public String getMonsterMove() {
		return monsterMove;
	}
	public void setMonsterMove(String monsterMove) {
		this.monsterMove = monsterMove;
	}
	public String getHeroMove() {
		return heroMove;
	}
	public void setHeroMove(String heroMove) {
		this.heroMove = heroMove;
	}
	
	
}
