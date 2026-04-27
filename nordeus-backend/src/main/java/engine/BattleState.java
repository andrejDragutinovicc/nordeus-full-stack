package engine;

import model.*;
import model.Character;

public class BattleState {

	private Hero hero;
	private Character monster;
	
	
	public Hero getHero() {
		return hero;
	}
	public void setHero(Hero hero) {
		this.hero = hero;
	}
	public Character getMonster() {
		return monster;
	}
	public void setMonster(Character monster) {
		this.monster = monster;
	}
	
	
}
