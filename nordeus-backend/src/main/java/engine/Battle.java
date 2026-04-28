package engine;

import java.util.List;

import dto.Response;
import model.Character;
import model.Hero;
import model.move.Move;
import model.move.MoveType;

public class Battle {

	public Response runMoves(BattleState bs, Move heroMove) {
		Response rs = new Response();
		System.out.println(bs.getHero());
		System.out.println(bs.getMonster());
		
		Move monsterMove = bs.getMonster().calculateMove();
		
		rs.addStep(applyMove(bs.getHero(),bs.getMonster(), heroMove));

		if (bs.getMonster().getCurrentHealth() <= 0) {
			return rs;
		}
		
		rs.addStep(applyMove(bs.getMonster(),bs.getHero(),monsterMove));
//		RAZMISLITI O OVOME KAKO DA SE IMPLEMENTIRATI EFEKTE I DA LI RADITI TO UOPSTE 
//		List<BattleStep> p = bs.getHero().applyEffect();
		
		
		rs.setBattleState(bs);
		
		
		return rs;
	}

	private BattleStep applyMove(Character attacker, Character deffrnder, Move move) {
		
		BattleStep step = new BattleStep();
		step.setEffect(move.getMoveEffect().name());
		step.setApplyedBy(attacker.getName());
		step.setMoveName(move.getName().name());
		
		
		
		
		switch (move.getMoveEffect()) {
		case DAMAGE: {
			step.setApplyTo(deffrnder.getName());
			step.setValue(applyDAMAGE(attacker, deffrnder, move));
			return step;
		}
		case HEAL: {
			step.setApplyTo(attacker.getName());
//			return applyHEAL(attacker, deffrnder, move);
			return step;
			
		}
		case BUFF: {
			step.setApplyTo(attacker.getName());
//			return applyBUFF(attacker, deffrnder, move);
			return step;
		}
		default:
			throw new IllegalArgumentException("Unexpected value:");
		}

	}

	private BattleStep applyBUFF(Character attacker, Character deffrnder, Move move) {
		return new BattleStep();

	}

	private BattleStep applyHEAL(Character attacker, Character deffrnder, Move move) {
		return null;

	}

	private int applyDAMAGE(Character attacker, Character deffrnder, Move move) {
		int rez = 0;
		if(move.getMoveType()== MoveType.PHYSICAL) {
			rez = (int) ((attacker.AttackPoints() - deffrnder.DeffensivePoints())*move.getValue());
//			DODATI move.getValue u formulu
//			deffrnder.setCourentHealth(deffrnder.getCourentHealth()-rez);
		}
		else {
			rez = (int) (attacker.MagicDamage()- deffrnder.MagicResist());
//			deffrnder.setCourentHealth(deffrnder.getCourentHealth()-rez);
		}
		deffrnder.loverHP(rez);
		System.out.println(deffrnder.toString());
		return rez;

	}

}
