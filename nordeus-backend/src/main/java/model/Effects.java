package model;

import model.move.MoveEffect;

public class Effects {

	private String name;
	private MoveEffect effect;
	private int durationLeft;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public MoveEffect getEffect() {
		return effect;
	}
	public void setEffect(MoveEffect effect) {
		this.effect = effect;
	}
	public int getDurationLeft() {
		return durationLeft;
	}
	public void setDurationLeft(int durationLeft) {
		this.durationLeft = durationLeft;
	}
	
	
	
}
