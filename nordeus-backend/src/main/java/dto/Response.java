package dto;

import java.util.ArrayList;
import java.util.List;

import engine.BattleState;
import engine.BattleStep;
import model.Hero;
import model.move.Move;
import model.move.MoveName;

public class Response {

	private BattleState battleState;
	private List<BattleStep> battleSteps = new ArrayList<BattleStep>();
	private MoveName equippedMove;
	private int lvlUp;
	
	
	
	

	public int getLvlUp() {
		return lvlUp;
	}


	public void setLvlUp(int lvlUp) {
		this.lvlUp = lvlUp;
	}


	public MoveName getEquippedMove() {
		return equippedMove;
	}


	public void setEquippedMove(MoveName equippedMove) {
		this.equippedMove = equippedMove;
	}


	public void addStep(BattleStep bs) {
		battleSteps.add(bs);
	}
	
	
	public BattleState getBattleState() {
		return battleState;
	}

	public void setBattleState(BattleState battleState) {
		this.battleState = battleState;
	}

	public List<BattleStep> getBattleSteps() {
		return battleSteps;
	}

	public void setBattleSteps(List<BattleStep> battleSteps) {
		this.battleSteps = battleSteps;
	}
	
	

	
	
}
