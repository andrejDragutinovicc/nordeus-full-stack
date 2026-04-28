package config;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import model.Hero;
import model.Stats;
import model.move.*;
import model.Character;


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
	        return moves.get(mn);
	    }
		public static Map<MoveName, Move> getMoves() {
			return moves;
		}
		public static Hero getStartingHero() {

		    Stats stats = new Stats(100,15,10,8);
//		    stats.setHealth(100);
//		    stats.setAttack(15);
//		    stats.setDefense(10);
//		    stats.setMagic(8);

		    Hero hero = new Hero();
		    hero.setId(1);
		    hero.setName("Knight");
		    hero.setStats(stats);
		    hero.setCurrentHealth(stats.getHealth());
		    hero.setMoves(List.of(
		            MoveName.SLASH,
		            MoveName.HEAVY_STRIKE,
		            MoveName.HEAL
		    ));
		    hero.setLevel(1);
		    hero.setXp(0);
		    hero.setUpgradePoints(0);

		    return hero;
		}
		public static List<model.Character> getStartingMonsters() {

		    // 1. Goblin (lak)
		    Character goblin = new Character();
		    goblin.setId(1);
		    goblin.setName("Goblin");
		    goblin.setStats(new Stats(80, 5, 10, 3));
		    goblin.setCurrentHealth(80);
		    goblin.setMoves(List.of(
		            MoveName.SLASH,
		            MoveName.QUICK_STAB
		    ));

		    // 2. Goblin Mage
		    Character mage = new Character();
		    mage.setId(2);
		    mage.setName("Goblin Mage");
		    mage.setStats(new Stats(70, 4, 8, 12));
		    mage.setCurrentHealth(70);
		    mage.setMoves(List.of(
		            MoveName.FIREBALL,
		            MoveName.HEAL
		    ));

		    // 3. Spider
		    Character spider = new Character();
		    spider.setId(3);
		    spider.setName("Giant Spider");
		    spider.setStats(new Stats(90, 8, 14, 2));
		    spider.setCurrentHealth(90);
		    spider.setMoves(List.of(
		            MoveName.QUICK_STAB,
		            MoveName.HEAVY_STRIKE
		    ));

		    // 4. Orc
		    Character orc = new Character();
		    orc.setId(4);
		    orc.setName("Orc Warrior");
		    orc.setStats(new Stats(110, 12, 18, 2));
		    orc.setCurrentHealth(110);
		    orc.setMoves(List.of(
		            MoveName.HEAVY_STRIKE,
		            MoveName.SLASH
		    ));

		    // 5. Dragon (boss)
		    Character dragon = new Character();
		    dragon.setId(5);
		    dragon.setName("Dragon");
		    dragon.setStats(new Stats(150, 15, 20, 18));
		    dragon.setCurrentHealth(150);
		    dragon.setMoves(List.of(
		            MoveName.FIREBALL,
		            MoveName.LIGHTNING_STRIKE,
		            MoveName.HEAVY_STRIKE
		    ));

		    return List.of(goblin, mage, spider, orc, dragon);
		}
	    
}
