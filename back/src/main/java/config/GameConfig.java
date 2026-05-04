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

  
    private static final Stats[] LEVEL_STATS = {
        new Stats(100,  8, 14, 10,  100),  // lvl 1 healt, def, att, mag
        new Stats(130, 12, 20, 15,  150),  // lvl 2
        new Stats(165, 17, 27, 20,  170),  // lvl 3  (new Stats(280, 24, 22, 20))
        new Stats(210, 23, 36, 27,    Integer.MAX_VALUE),  // lvl 4 (max)
    };

    static {
     
        moves.put(MoveName.JUMP_STOMP,
            new Move(1,  MoveName.JUMP_STOMP,      MoveType.PHYSICAL, MoveEffect.DAMAGE, 14,  15, 0));
        moves.put(MoveName.GROUND_POUND,
            new Move(2,  MoveName.GROUND_POUND,    MoveType.PHYSICAL, MoveEffect.DAMAGE, 22, 14, 0));
        moves.put(MoveName.SPIN_JUMP,
            new Move(3,  MoveName.SPIN_JUMP,       MoveType.PHYSICAL, MoveEffect.DAMAGE, 16, 10, 0));
        moves.put(MoveName.SLIDE_KICK,
            new Move(4,  MoveName.SLIDE_KICK,      MoveType.PHYSICAL, MoveEffect.DAMAGE, 10,  5, 0));
        moves.put(MoveName.CAP_THROW,
            new Move(5,  MoveName.CAP_THROW,       MoveType.PHYSICAL, MoveEffect.DAMAGE, 12,  7, 0));
        moves.put(MoveName.SHELL_TOSS,
            new Move(6,  MoveName.SHELL_TOSS,      MoveType.PHYSICAL, MoveEffect.DAMAGE, 18, 11, 0));
        moves.put(MoveName.HAMMER_THROW,
            new Move(7,  MoveName.HAMMER_THROW,    MoveType.PHYSICAL, MoveEffect.DAMAGE, 20, 13, 0));
        moves.put(MoveName.BITE,
            new Move(8,  MoveName.BITE,            MoveType.PHYSICAL, MoveEffect.DAMAGE, 15,  9, 0));
        moves.put(MoveName.TACKLE,
            new Move(9,  MoveName.TACKLE,          MoveType.PHYSICAL, MoveEffect.DAMAGE, 13,  7, 0));
        moves.put(MoveName.CLAW_SWIPE,
            new Move(10, MoveName.CLAW_SWIPE,      MoveType.PHYSICAL, MoveEffect.DAMAGE, 17, 10, 0));


        moves.put(MoveName.FIREBALL,
            new Move(11, MoveName.FIREBALL,        MoveType.MAGIC,    MoveEffect.DAMAGE, 18, 17, 0));
        moves.put(MoveName.TANOOKI_TAIL,
            new Move(12, MoveName.TANOOKI_TAIL,    MoveType.MAGIC,    MoveEffect.DAMAGE, 15,  9, 0));
        moves.put(MoveName.BOOMERANG_THROW,
            new Move(13, MoveName.BOOMERANG_THROW, MoveType.MAGIC,    MoveEffect.DAMAGE, 20, 13, 0));
        moves.put(MoveName.LAVA_BREATH,
            new Move(14, MoveName.LAVA_BREATH,     MoveType.MAGIC,    MoveEffect.DAMAGE, 25, 18, 0));
        moves.put(MoveName.THUNDER_STOMP,
            new Move(15, MoveName.THUNDER_STOMP,   MoveType.MAGIC,    MoveEffect.DAMAGE, 22, 15, 0));
        moves.put(MoveName.POISON_SPIT,
            new Move(16, MoveName.POISON_SPIT,     MoveType.MAGIC,    MoveEffect.DAMAGE, 14,  9, 0));

    
        moves.put(MoveName.MUSHROOM,
            new Move(17, MoveName.MUSHROOM,        MoveType.UTILITY,  MoveEffect.HEAL,   20,  20, 0));
        moves.put(MoveName.SUPER_MUSHROOM,
            new Move(18, MoveName.SUPER_MUSHROOM,  MoveType.UTILITY,  MoveEffect.HEAL,   28,  20, 0));
        moves.put(MoveName.ONE_UP,
            new Move(19, MoveName.ONE_UP,          MoveType.MAGIC,    MoveEffect.HEAL,   50,  20, 0));
    }

    public static Move getMove(MoveName name) {
        return moves.get(name);
    }

    public static Move getMove(String name) {
        return moves.get(MoveName.valueOf(name));
    }

    public static Map<MoveName, Move> getMoves() {
        return moves;
    }

    public static Stats getStats(int lvl) {
        int index = Math.max(0, Math.min(lvl - 1, LEVEL_STATS.length - 1));
        return LEVEL_STATS[index];
    }

    public static int getMaxLevel() {
        return LEVEL_STATS.length;
    }

    public static Hero getStartingHero() {
        Stats stats = getStats(1);

        Hero hero = new Hero();
        hero.setId(1);
        hero.setName("Mario");
        hero.setStats(stats);
        hero.setCurrentHealth(stats.getHealth());
        hero.setMoves(List.of(
            MoveName.JUMP_STOMP,
            MoveName.FIREBALL,
            MoveName.MUSHROOM
        ));
        hero.setLevel(1);
        hero.setXp(0);


        return hero;
    }

    public static List<model.Character> getStartingMonsters() {

        // 1. Goomba  8, 14, 10
        Character goomba = new Character();
        goomba.setId(1);
        goomba.setName("Goomba");
        goomba.setStats(new Stats(55, 14, 16, 0));
        goomba.setCurrentHealth(55);
        goomba.setMoves(List.of(
            MoveName.SLIDE_KICK,
            MoveName.TACKLE
        ));

        // 2. Koopa Troopa
        Character koopa = new Character();
        koopa.setId(2);
        koopa.setName("Koopa Troopa");
        koopa.setStats(new Stats(80, 25, 15, 8));
        koopa.setCurrentHealth(80);
        koopa.setMoves(List.of(
            MoveName.SHELL_TOSS,
            MoveName.SPIN_JUMP
        ));

        // 3. Piranha Plant
        Character piranha = new Character();
        piranha.setId(3);
        piranha.setName("Piranha Plant");
        piranha.setStats(new Stats(150, 20, 20, 14));
        piranha.setCurrentHealth(150);
        piranha.setMoves(List.of(
            MoveName.POISON_SPIT,
            MoveName.BITE,
            MoveName.FIREBALL
        ));

        // 4. Hammer Bro
        Character hammerBro = new Character();
        hammerBro.setId(4);
        hammerBro.setName("Hammer Bro");
        hammerBro.setStats(new Stats(190, 25, 24, 30));
        hammerBro.setCurrentHealth(190);
        hammerBro.setMoves(List.of(
            MoveName.HAMMER_THROW,
            MoveName.GROUND_POUND,
            MoveName.MUSHROOM
        ));

        // 5. Bowser (boss)
        Character bowser = new Character();
        bowser.setId(5);
        bowser.setName("Bowser");
        bowser.setStats(new Stats(280, 30, 30, 20));//  new Stats(210, 23, 36, 27,    Integer.MAX_VALUE),  // lvl 4 (max)
        bowser.setCurrentHealth(280);
        bowser.setMoves(List.of(
            MoveName.LAVA_BREATH,
            MoveName.THUNDER_STOMP,
            MoveName.CLAW_SWIPE,
            MoveName.SUPER_MUSHROOM
        ));

        return List.of(goomba, koopa, piranha, hammerBro, bowser);
    }
}