package model;

import java.util.List;

import engine.BattleStep;
import model.move.MoveName;

public class Hero extends Character{
	
	private int level;
	private int xp;
	private int upgradePoints;
	private List<MoveName> equippedMoves;
	
	
	
	
	
	public List<MoveName> getEquippedMoves() {
		return equippedMoves;
	}
	public void setEquippedMoves(List<MoveName> equippedMoves) {
		this.equippedMoves = equippedMoves;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getXp() {
		return xp;
	}
	public void setXp(int xp) {
		this.xp = xp;
	}
	public int getUpgradePoints() {
		return upgradePoints;
	}
	public void setUpgradePoints(int upgradePoints) {
		this.upgradePoints = upgradePoints;
	}
	public void addMove(MoveName nova) {
		equippedMoves.add(nova);
	}

	
}
