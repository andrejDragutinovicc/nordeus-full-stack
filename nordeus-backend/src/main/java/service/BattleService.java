package service;

import org.springframework.stereotype.Service;

import config.GameConfig;
import dto.Request;
import dto.Response;
import engine.Battle;
import engine.BattleState;
import model.move.Move;

@Service
public class BattleService {

	private final Battle engine = new Battle();

	public Response playMove(Request request) {
		
		Move heroMove = GameConfig.getMove(request.getHeroMove());
		Move mosterMove = GameConfig.getMove(request.getMonsterMove());
		
		return  engine.runMoves(request.getBattleState(), heroMove, mosterMove);
		
		
	}	
	
}
