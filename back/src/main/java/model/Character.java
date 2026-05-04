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
	private int currentHealth;
	private List<MoveName> moves;

//	private List<Effects> effects;
	
	
//	implementirati
	public double DeffensivePoints() {
		return (double)stats.getDefense()/20;
	}
//	implementirati
	public double MagicDamage() {
		return (double)stats.getMagic()/10;
	}
//	implementirati
	public double MagicResist() {
		return (double)stats.getMagic()/20;
	}
	
//	Imentirati
	public double AttackPoints() {
		return (double)stats.getAttack()/10;
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
	
	
	public int getCurrentHealth() {
		return currentHealth;
	}

	public void setCurrentHealth(int currentHealth) {
		this.currentHealth = currentHealth;
	}

	public List<MoveName> getMoves() {
		return moves;
	}
	public void setMoves(List<MoveName> moves) {
		this.moves = moves;
	}

	public void loverHP(int rez) {

		currentHealth -= rez;
		
	}
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
		Move rezultat;
		List<Move> m = new ArrayList<Move>();
		
		for (MoveName moveName : moves) {
			m.add(GameConfig.getMove(moveName));
		}
		double healtPersentage = (double)currentHealth/stats.getHealth();
		double x = Math.random();
		
		System.out.println("x = "+ x+"healtPersentage = " +healtPersentage);
		
		if(x-0.1>healtPersentage) {
			List<Move> heal = m.stream().filter( p -> p.getMoveEffect()== MoveEffect.HEAL).collect(Collectors.toList());
			if (heal == null || heal.size()==0) {
				heal =m ;
			}
			Random rand = new Random();
			int index = rand.nextInt(heal.size());
			rezultat =  heal.get(index);
			
		}
		else if(x/healtPersentage<0.8) {
			List<Move> dmg = m.stream().filter( p -> p.getMoveEffect()== MoveEffect.DAMAGE).collect(Collectors.toList());
			Random rand = new Random();
			int index = rand.nextInt(dmg.size());
			rezultat =  dmg.get(index);
		}else {
			List<Move> other = m.stream().filter( p -> p.getMoveEffect()!= MoveEffect.DAMAGE && p.getMoveEffect()!= MoveEffect.HEAL).collect(Collectors.toList());
			Random rand = new Random();
			if (other == null || other.size()==0) {
				other =m ;
			}
			int index = rand.nextInt(other.size());
			rezultat =  other.get(index);
		}
		System.out.println(rezultat.getName());
		return rezultat;
		
	}

	@Override
	public String toString() {
		return "Character [id=" + id + ", name=" + name + ", stats=" + stats + ", currentHealth=" + currentHealth
				+ ", moves=" + moves + "]";
	}

	public double getHealCoef() {
		double healtPersentage = (double)currentHealth/stats.getHealth();
		return 0.5 + (1 - healtPersentage);
	}

	public void addHp(int rez) {
		currentHealth+= rez;
		
	}

	public MoveName getRandomMove() {
		
		Random rand = new Random();
		int index = rand.nextInt(moves.size());
		return moves.get(index);
	}
	

}
