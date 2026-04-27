package dto;

import model.Stats;

public class HeroDto extends MonsterDto{

	
	
	private int id;
	private String name;
	private Stats stats;
	private int courentHealth;
	private int level;
	private int xp;
	private int upgradePoints;
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
	
	
}
