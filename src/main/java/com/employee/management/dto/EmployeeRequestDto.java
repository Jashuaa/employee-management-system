package com.employee.management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class EmployeeRequestDto {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Email format is wrong")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Department field is required")
    private String department;

    @NotNull(message = "Salary is required")
    @Min(value = 0, message = "Salary must be >= 0")
    private BigDecimal salary;

    public EmployeeRequestDto() {
    }

    public EmployeeRequestDto(String name, String email, String department, BigDecimal salary) {
        this.name = name;
        this.email = email;
        this.department = department;
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }
}
