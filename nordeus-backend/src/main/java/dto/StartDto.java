package dto;

import java.util.List;

import model.Hero;
import model.move.Move;

public class StartDto {

	private Hero hero;
	private List<Character> monsters;
//	private List<Move> allMoves;
	public Hero getHero() {
		return hero;
	}
	public void setHero(Hero hero) {
		this.hero = hero;
	}
	public List<Character> getMonsters() {
		return monsters;
	}
	public void setMonsters(List<Character> monsters) {
		this.monsters = monsters;
	}
	
	
	
	
}
