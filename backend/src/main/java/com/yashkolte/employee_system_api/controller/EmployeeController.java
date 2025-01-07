package com.yashkolte.employee_system_api.controller;

import com.yashkolte.employee_system_api.entity.EmployeeEntity;
import com.yashkolte.employee_system_api.services.EmployeeService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/chat")
    public ResponseEntity<String> chatWithModel(@RequestBody Map<String, Object> requestPayload) {
        String apiUrl = "https://models.inference.ai.azure.com/chat/completions";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer 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");

        // Ensure "model" is present in the payload
        if (!requestPayload.containsKey("model")) {
            requestPayload.put("model", "gpt-4o-mini");
        }

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestPayload, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
            return new ResponseEntity<>(response.getBody(), response.getStatusCode());
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

        
    @PostMapping("/todo")
    public EmployeeEntity createEmployee(@RequestBody EmployeeEntity employee) {
        return employeeService.createEmployee(employee);
    }

    @GetMapping("/todobysub/{sub}")
    public List<EmployeeEntity> getAllEmployeesBySub(@PathVariable String sub ) {
    	System.out.println("Sub :"+ sub);
        return employeeService.getAllBySub(sub);
    }

    @DeleteMapping("/todo/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        boolean deleted = false;
        deleted = employeeService.deleteEmployee(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/todo/{id}")
    public ResponseEntity<EmployeeEntity> getEmployeeById(@PathVariable Long id) {
    	EmployeeEntity employee = null;
        employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/todo/{id}")
    public ResponseEntity<EmployeeEntity> updateEmployee(@PathVariable Long id,
                                                   @RequestBody EmployeeEntity employee) {
        employee = employeeService.updateEmployee(id, employee);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/todo/aidesc/{id}")
        public ResponseEntity<EmployeeEntity> updateAIDescription(@PathVariable Long id,
                                                            @RequestBody EmployeeEntity employee) {
            employee = employeeService.updateAIDescription(id, employee);
            return ResponseEntity.ok(employee);
        }


}
