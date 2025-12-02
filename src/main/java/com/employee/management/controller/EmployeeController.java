package com.employee.management.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee.management.dto.EmployeeRequestDto;
import com.employee.management.dto.EmployeeResponseDto;
import com.employee.management.service.EmployeeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<EmployeeResponseDto> saveEmployee(@Valid @RequestBody EmployeeRequestDto requestDto) {
        EmployeeResponseDto savedEmployee  =  service.createEmployee(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<List<EmployeeResponseDto>> getAllEmployees() {
    	List<EmployeeResponseDto> employees  = service.getAllEmployees();
    	return ResponseEntity.ok(employees);
    }
 // GET ALL WITH PAGINATION & SORTING
    @GetMapping("/page")
    public ResponseEntity<Page<EmployeeResponseDto>> getAllEmployeesWithPagination(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id,asc") String[] sort
    ) {

        // Convert sort parameters into Sort object
        String sortField = sort[0];  // field name like "name"
        String sortDirection = sort[1]; // asc / desc

        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc")
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));

        Page<EmployeeResponseDto> employeePage = service.getAllEmployees(pageable);

        return ResponseEntity.ok(employeePage);
    }


    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> getEmployeeById(@PathVariable Long id) {
    	EmployeeResponseDto employee =  service.getEmployeeById(id);
    	return ResponseEntity.ok(employee);
    }

    // GET BY EMAIL
    @GetMapping("/by-email")
    public ResponseEntity<EmployeeResponseDto> getEmployeeByEmail(@RequestParam String email) {
    	EmployeeResponseDto employee =  service.getEmployeeByEmail(email);
    	return ResponseEntity.ok(employee);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> updateEmployee(@PathVariable Long id,
                                              @Valid @RequestBody EmployeeRequestDto requestDto) {
    	EmployeeResponseDto updatedEmployee =  service.updateEmployee(id, requestDto);
    	return ResponseEntity.ok(updatedEmployee);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
    		service.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted Sucessfully");
    }
}
