package dto;

import model.Stats;

public class MonsterDto {

	private int id;
	private String name;
	private Stats stats;
	private int courentHealth;
	
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
	
	
}
