package config;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.move.*;

public class GameConfig {
	
	  private static final Map<MoveName, Move> moves = new HashMap<>();

//	    static {
//	        moves.put(MoveName.SLASH,
//	            new Move(MoveName.SLASH, "Slash", PHYSICAL, DAMAGE, 10, 0));
//
//	        moves.put(MoveName.SHIELD_UP,
//	            new Move(MoveName.SHIELD_UP, "Shield Up", MAGIC, BUFF_DEFENSE, 5, 2));
//	    }

	    public static Move getMove(MoveName name) {
	        return moves.get(name);
	    }
	    public static Move getMove(String name) {
	    	
	    	MoveName mn = MoveName.valueOf(name);
	        return moves.get(name);
	    }
	    
}
