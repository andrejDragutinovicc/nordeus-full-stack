package model.move;

public class Move {
	
	private int id;
	private MoveName name;
	private MoveType moveType;
	private MoveEffect moveEffect;
	private int value;
	
	
	
	public MoveName getName() {
		return name;
	}
	
	

	public Move(int id, MoveName name, MoveType moveType, MoveEffect moveEffect, int value, int duration) {
		super();
		this.id = id;
		this.name = name;
		this.moveType = moveType;
		this.moveEffect = moveEffect;
		this.value = value;
		this.duration = duration;
	}



	public void setName(MoveName name) {
		this.name = name;
	}

	private int duration;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public MoveType getMoveType() {
		return moveType;
	}

	public void setMoveType(MoveType moveType) {
		this.moveType = moveType;
	}

	public MoveEffect getMoveEffect() {
		return moveEffect;
	}

	public void setMoveEffect(MoveEffect moveEffect) {
		this.moveEffect = moveEffect;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	

}
