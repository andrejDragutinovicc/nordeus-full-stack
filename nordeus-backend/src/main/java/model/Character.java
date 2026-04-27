package model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Random;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import config.GameConfig;
import engine.BattleStep;
import model.move.Move;
import model.move.MoveEffect;
import model.move.MoveName;

public class Character {
	
	private int id;
	private String name;
	private Stats stats;
	private int courentHealth;
	private List<MoveName> moves;
//	private List<Effects> effects;
	
	public int getDeffensivePoints() {
		return 0;
	}
	
	public int getMagicDamage() {
		return 0;
	}
	
	public int getMagicResist() {
		return 0;
	}
	
	
	public int getAttackPoints() {
		return 0;
	}
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Stats getStats() {
		return stats;
	}
	public void setStats(Stats stats) {
		this.stats = stats;
	}
	public int getCourentHealth() {
		return courentHealth;
	}
	public void setCourentHealth(int courentHealth) {
		this.courentHealth = courentHealth;
	}
	public List<MoveName> getMoves() {
		return moves;
	}
	public void setMoves(List<MoveName> moves) {
		this.moves = moves;
	}

	public void loverHP(int rez) {

		courentHealth-=rez;
		
//	}
//	public List<BattleStep> applyEffect() {
//		List<BattleStep> l = new ArrayList<BattleStep>();
//		for (Effects e : effects) {
//			
//		}
//		
//		
//		return null;
//	}

	public Move calculateMove() {
		List<Move> m = new ArrayList<Move>();
		
		for (MoveName moveName : moves) {
			m.add(GameConfig.getMove(moveName));
		}
		double healtPersentage = courentHealth/stats.getHealth();
		double x = Math.random();
		
		if(x-0.1>healtPersentage) {
			List<Move> heal = m.stream().filter( p -> p.getMoveEffect()== MoveEffect.HEAL).collect(Collectors.toList());
			
			Random rand = new Random();
			int index = rand.nextInt(heal.size());
			return heal.get(index);
			
		}
		else if(x/healtPersentage<0.8) {
			List<Move> dmg = m.stream().filter( p -> p.getMoveEffect()== MoveEffect.DAMAGE).collect(Collectors.toList());
			Random rand = new Random();
			int index = rand.nextInt(dmg.size());
			return dmg.get(index);
		}else {
			List<Move> other = m.stream().filter( p -> p.getMoveEffect()!= MoveEffect.DAMAGE && p.getMoveEffect()!= MoveEffect.HEAL).collect(Collectors.toList());
			Random rand = new Random();
			int index = rand.nextInt(other.size());
			return other.get(index);
		}
		
		return null;
	}
	

}
