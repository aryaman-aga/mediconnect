package com.mediconnect.controller;

import com.mediconnect.dto.request.UpdatePatientRequest;
import com.mediconnect.dto.response.ApiResponse;
import com.mediconnect.dto.response.PatientResponse;
import com.mediconnect.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/me")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse<PatientResponse>> getCurrentPatient() {
        return ResponseEntity.ok(ApiResponse.ok(patientService.getCurrentPatient()));
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<ApiResponse<PatientResponse>> updateCurrentPatient(@RequestBody UpdatePatientRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Profile updated", patientService.updateCurrentPatient(request)));
    }
}
