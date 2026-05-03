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
        // Physical moves
        moves.put(MoveName.JUMP_STOMP,
            new Move(1, MoveName.JUMP_STOMP, MoveType.PHYSICAL, MoveEffect.DAMAGE, 14, 0));

        moves.put(MoveName.GROUND_POUND,
            new Move(2, MoveName.GROUND_POUND, MoveType.PHYSICAL, MoveEffect.DAMAGE, 22, 0));

        moves.put(MoveName.SPIN_JUMP,
            new Move(3, MoveName.SPIN_JUMP, MoveType.PHYSICAL, MoveEffect.DAMAGE, 16, 0));

        moves.put(MoveName.SLIDE_KICK,
            new Move(4, MoveName.SLIDE_KICK, MoveType.PHYSICAL, MoveEffect.DAMAGE, 10, 0));

        moves.put(MoveName.CAP_THROW,
            new Move(5, MoveName.CAP_THROW, MoveType.PHYSICAL, MoveEffect.DAMAGE, 12, 0));

        // Magic / Power-up moves	
        moves.put(MoveName.FIREBALL,
            new Move(6, MoveName.FIREBALL, MoveType.MAGIC, MoveEffect.DAMAGE, 18, 0));

        moves.put(MoveName.TANOOKI_TAIL,
            new Move(7, MoveName.TANOOKI_TAIL, MoveType.MAGIC, MoveEffect.DAMAGE, 15, 0));

        moves.put(MoveName.BOOMERANG_THROW,
            new Move(8, MoveName.BOOMERANG_THROW, MoveType.MAGIC, MoveEffect.DAMAGE, 20, 0));

        // Heal / Utility moves
        moves.put(MoveName.MUSHROOM,
            new Move(9, MoveName.MUSHROOM, MoveType.UTILITY, MoveEffect.HEAL, 20, 0));

        moves.put(MoveName.SUPER_MUSHROOM,
            new Move(10, MoveName.SUPER_MUSHROOM, MoveType.UTILITY, MoveEffect.HEAL, 35, 0));

        moves.put(MoveName.ONE_UP,
            new Move(11, MoveName.ONE_UP, MoveType.MAGIC, MoveEffect.HEAL, 50, 0));
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
        Stats stats = new Stats(100, 14, 8, 10);

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
        hero.setUpgradePoints(0);

        return hero;
    }

    public static List<model.Character> getStartingMonsters() {

        // 1. Goomba (easy)
        Character goomba = new Character();
        goomba.setId(1);
        goomba.setName("Goomba");
        goomba.setStats(new Stats(60, 6, 4, 0));
        goomba.setCurrentHealth(60);
        goomba.setMoves(List.of(
            MoveName.SLIDE_KICK
        ));

        // 2. Koopa Troopa
        Character koopa = new Character();
        koopa.setId(2);
        koopa.setName("Koopa Troopa");
        koopa.setStats(new Stats(75, 8, 12, 2));
        koopa.setCurrentHealth(75);
        koopa.setMoves(List.of(
            MoveName.SPIN_JUMP,
            MoveName.SLIDE_KICK
        ));

        // 3. Piranha Plant
        Character piranha = new Character();
        piranha.setId(3);
        piranha.setName("Piranha Plant");
        piranha.setStats(new Stats(85, 10, 8, 5));
        piranha.setCurrentHealth(85);
        piranha.setMoves(List.of(
            MoveName.FIREBALL,
            MoveName.JUMP_STOMP
        ));

        // 4. Hammer Bro
        Character hammerBro = new Character();
        hammerBro.setId(4);
        hammerBro.setName("Hammer Bro");
        hammerBro.setStats(new Stats(100, 14, 10, 6));
        hammerBro.setCurrentHealth(100);
        hammerBro.setMoves(List.of(
            MoveName.BOOMERANG_THROW,
            MoveName.GROUND_POUND,
            MoveName.MUSHROOM
        ));

        // 5. Bowser (boss)
        Character bowser = new Character();
        bowser.setId(5);
        bowser.setName("Bowser");
        bowser.setStats(new Stats(180, 18, 22, 15));
        bowser.setCurrentHealth(180);
        bowser.setMoves(List.of(
            MoveName.FIREBALL,
            MoveName.GROUND_POUND,
            MoveName.TANOOKI_TAIL,
            MoveName.SUPER_MUSHROOM
        ));

        return List.of(goomba, koopa, piranha, hammerBro, bowser);
    }
}