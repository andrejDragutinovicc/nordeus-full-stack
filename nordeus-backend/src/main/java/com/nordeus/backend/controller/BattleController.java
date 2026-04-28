package com.nordeus.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nordeus.backend.service.BattleService;

import dto.Request;
import dto.Response;
import dto.StartDto;
import engine.BattleState;
import model.move.Move;

@RestController
@RequestMapping("/api/game")
public class BattleController {
	
	private final BattleService service;

	public BattleController(BattleService service) {
		super();
		this.service = service;
	}
	
	
    @PostMapping("/turn")
    public Response palyMove(@RequestBody Request request) {
		
		return service.playMove(request);
		
	}
    @PostMapping("/start")
    public StartDto getStart(){
    	
    	return service.start();
    	
    }
	
}
