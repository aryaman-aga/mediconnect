package com.mediconnect.controller;

import com.mediconnect.dto.request.UpdateDoctorRequest;
import com.mediconnect.dto.response.ApiResponse;
import com.mediconnect.dto.response.DoctorResponse;
import com.mediconnect.dto.response.PageResponse;
import com.mediconnect.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<DoctorResponse>>> getAllDoctors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String specialty) {
        return ResponseEntity.ok(ApiResponse.ok(doctorService.getAllDoctors(page, size, search, specialty)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DoctorResponse>> getDoctorById(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.ok(doctorService.getDoctorById(id)));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse<DoctorResponse>> getCurrentDoctor() {
        return ResponseEntity.ok(ApiResponse.ok(doctorService.getCurrentDoctor()));
    }

    @PutMapping("/me")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<ApiResponse<DoctorResponse>> updateCurrentDoctor(@RequestBody UpdateDoctorRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Profile updated", doctorService.updateCurrentDoctor(request)));
    }
}
