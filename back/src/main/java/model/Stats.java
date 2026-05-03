package model;

public class Stats {
	
	private int health;
	private int defense;
	private int attack;
	private int magic;
	
	private int lvlUpXp;
	
	
	
	
	
	public Stats() {
		
	}
	public Stats(int health, int defense, int attack, int magic, int lvlUpXp) {
		super();
		this.health = health;
		this.defense = defense;
		this.attack = attack;
		this.magic = magic;
		this.lvlUpXp = lvlUpXp;
	}
	public int getLvlUpXp() {
		return lvlUpXp;
	}
	public void setLvlUpXp(int lvlUpXp) {
		this.lvlUpXp = lvlUpXp;
	}
	public Stats(int health, int defense, int attack, int magic) {
		super();
		this.health = health;
		this.defense = defense;
		this.attack = attack;
		this.magic = magic;
	}
	public int getHealth() {
		return health;
	}
	public void setHealth(int health) {
		this.health = health;
	}
	public int getDefense() {
		return defense;
	}
	public void setDefense(int defense) {
		this.defense = defense;
	}
	public int getAttack() {
		return attack;
	}
	public void setAttack(int attack) {
		this.attack = attack;
	}
	public int getMagic() {
		return magic;
	}
	public void setMagic(int magic) {
		this.magic = magic;
	}
	@Override
	public String toString() {
		return "Stats [health=" + health + ", defense=" + defense + ", attack=" + attack + ", magic=" + magic + "]";
	}
	
	

}
