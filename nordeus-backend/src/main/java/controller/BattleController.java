package controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.Request;
import dto.Response;
import engine.BattleState;
import service.BattleService;

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
	
}
