package com.employee.management.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping("/")
	public String home() {
		return "<h1>Employee Management System Backend</h1>"
                + "<p>Backend REST API built with Spring Boot.</p>"
                + "<p>For demo purposes, this deployment uses an H2 in-memory database.</p>"
                + "<p>Use Swagger to test CRUD operations:</p>"
                + "<a href='/swagger-ui/index.html'>Open Swagger UI</a>";
			}
}