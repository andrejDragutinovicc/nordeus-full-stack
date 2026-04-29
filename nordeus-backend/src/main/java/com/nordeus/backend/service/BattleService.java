package com.nordeus.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import config.GameConfig;
import dto.Request;
import dto.Response;
import dto.StartDto;
import engine.Battle;
import engine.BattleState;
import model.Hero;
import model.move.Move;
import model.move.MoveName;

@Service
public class BattleService {

	private final Battle engine = new Battle();

	public Response playMove(Request request) {
		
		Move heroMove = GameConfig.getMove(request.getHeroMove());
//		Move mosterMove = GameConfig.getMove(request.getMonsterMove());
		
		return  engine.runMoves(request.getBattleState(), heroMove);
		
		
	}

	public List<Move> getMoves() {
		
		return new ArrayList<>(GameConfig.getMoves().values());
	}

	public StartDto start() {
		StartDto start = new StartDto();
		start.setHero(GameConfig.getStartingHero());
		start.setMonsters(GameConfig.getStartingMonsters());
		
		
//		List<Move> m = new ArrayList<>(GameConfig.getMoves().values());
		
		return start;
	}

	public Hero addMove(Hero h, MoveName m) {
		
		List<MoveName> l = h.getMoves();
		if(l.contains(m)) {
			throw new IllegalArgumentException();
		}
		else {
			h.getMoves().add(m);
			return h;
		}

	}

	
}
