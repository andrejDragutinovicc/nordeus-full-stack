package dto;

import java.util.ArrayList;
import java.util.List;

import engine.BattleState;
import engine.BattleStep;
import model.Hero;

public class Response {

	private BattleState battleState;
	
	private List<BattleStep> battleSteps = new ArrayList<BattleStep>();

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
