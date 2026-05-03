package model;

import java.util.List;

import engine.BattleStep;
import model.move.MoveName;

public class Hero extends Character{
	
	private int level;
	private int xp;
//	private int upgradePoints;
	private List<MoveName> equippedMoves;
	
	
	
	
	
	@Override
	public String toString() {
		return "Hero [level=" + level + ", xp=" + xp + ", equippedMoves=" + equippedMoves + "]";
	}
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
//	public int getUpgradePoints() {
//		return upgradePoints;
//	}
//	public void setUpgradePoints(int upgradePoints) {
//		this.upgradePoints = upgradePoints;
//	}
	public void addMove(MoveName nova) {
		equippedMoves.add(nova);
	}
	public void addXp(int xp2) {
		xp += xp2;
		
	}
	public int lvlUp() {
		xp -= this.getStats().getLvlUpXp();
		
		
		return level++;
	}

	
}
