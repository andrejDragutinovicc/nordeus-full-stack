package config;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.move.*;

public class GameConfig {
	
	  private static final Map<MoveName, Move> moves = new HashMap<>();

	    static {
	    	   moves.put(MoveName.SLASH,
	    		        new Move(1, MoveName.SLASH, MoveType.PHYSICAL, MoveEffect.DAMAGE, 12, 0));

	    		    moves.put(MoveName.HEAVY_STRIKE,
	    		        new Move(2, MoveName.HEAVY_STRIKE, MoveType.PHYSICAL, MoveEffect.DAMAGE, 20, 0));

	    		    moves.put(MoveName.FIREBALL,
	    		        new Move(3, MoveName.FIREBALL, MoveType.MAGIC, MoveEffect.DAMAGE, 18, 0));

	    		    moves.put(MoveName.ICE_BLAST,
	    		        new Move(4, MoveName.ICE_BLAST, MoveType.MAGIC, MoveEffect.DAMAGE, 16, 0));

	    		    moves.put(MoveName.LIGHTNING_STRIKE,
	    		        new Move(5, MoveName.LIGHTNING_STRIKE, MoveType.MAGIC, MoveEffect.DAMAGE, 22, 0));

	    		    moves.put(MoveName.QUICK_STAB,
	    		        new Move(6, MoveName.QUICK_STAB, MoveType.PHYSICAL, MoveEffect.DAMAGE, 10, 0));

	    		    moves.put(MoveName.HEAL,
	    		        new Move(7, MoveName.HEAL, MoveType.MAGIC, MoveEffect.HEAL, 15, 0));

	    		    moves.put(MoveName.GREATER_HEAL,
	    		        new Move(8, MoveName.GREATER_HEAL, MoveType.MAGIC, MoveEffect.HEAL, 25, 0));

	    		    moves.put(MoveName.RECOVER,
	    		        new Move(9, MoveName.RECOVER, MoveType.UTILITY, MoveEffect.HEAL, 12, 0));

	    		    moves.put(MoveName.FIRST_AID,
	    		        new Move(10, MoveName.FIRST_AID, MoveType.UTILITY, MoveEffect.HEAL, 10, 0));
	    }

	    public static Move getMove(MoveName name) {
	        return moves.get(name);
	    }
	    public static Move getMove(String name) {
	    	
	    	MoveName mn = MoveName.valueOf(name);
	        return moves.get(name);
	    }
	    
}
