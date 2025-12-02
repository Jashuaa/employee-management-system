package com.employee.management.repository;

import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employee.management.entity.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	

	public Optional<Employee> findByEmail(String email);
	
	Page<Employee> findAll(Pageable pageable);

}
