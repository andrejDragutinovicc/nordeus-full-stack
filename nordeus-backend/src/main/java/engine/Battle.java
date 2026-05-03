package engine;

import java.util.List;

import dto.Response;
import model.Character;
import model.Hero;
import model.move.Move;
import model.move.MoveName;
import model.move.MoveType;

public class Battle {

	public Response runMoves(BattleState bs, Move heroMove) {
		Response rs = new Response();
		System.out.println("Get hero : " + bs.getHero());
		System.out.println("Get Monster : " + bs.getMonster());
		System.out.println("Move: " + heroMove);

		Move monsterMove = bs.getMonster().calculateMove();
		rs.setBattleState(bs);
		rs.addStep(applyMove(bs.getHero(), bs.getMonster(), heroMove));

		if (bs.getMonster().getCurrentHealth() <= 0) {
			
			MoveName nova = bs.getMonster().getRandomMove();
			
			bs.getHero().addMove(nova);
			
			rs.setEquippedMove(nova);
			
			return rs;
		}

		rs.addStep(applyMove(bs.getMonster(), bs.getHero(), monsterMove));
//		RAZMISLITI O OVOME KAKO DA SE IMPLEMENTIRATI EFEKTE I DA LI RADITI TO UOPSTE 
//		List<BattleStep> p = bs.getHero().applyEffect();

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
			step.setValue(applyHEAL(attacker, deffrnder, move));
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

	private int applyHEAL(Character attacker, Character deffrnder, Move move) {

		int rez = (int) attacker.getHealCoef() * move.getValue();

		attacker.addHp(rez);
		
		return rez;

	}

	private int applyDAMAGE(Character attacker, Character deffrnder, Move move) {
		int rez = 0;
		if (move.getMoveType() == MoveType.PHYSICAL) {
			rez = (int) ((attacker.AttackPoints() - deffrnder.DeffensivePoints()) * move.getValue());
//			DODATI move.getValue u formulu
//			deffrnder.setCourentHealth(deffrnder.getCourentHealth()-rez);
		} else {
			rez = (int) ((attacker.MagicDamage() - deffrnder.MagicResist()) * move.getValue());
//			deffrnder.setCourentHealth(deffrnder.getCourentHealth()-rez);
			System.out.println("Magic damage je : " + rez);
		}
		deffrnder.loverHP(rez);
		System.out.println(deffrnder.toString());
		return rez;

	}

}
