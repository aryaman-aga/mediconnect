package com.mediconnect.service;

import com.mediconnect.dto.request.UpdatePatientRequest;
import com.mediconnect.dto.response.PatientResponse;
import com.mediconnect.exception.ResourceNotFoundException;
import com.mediconnect.model.Patient;
import com.mediconnect.model.User;
import com.mediconnect.repository.PatientRepository;
import com.mediconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class PatientService {

    @Autowired private PatientRepository patientRepository;
    @Autowired private UserRepository userRepository;

    public PatientResponse getCurrentPatient() {
        Patient patient = patientRepository.findByUserId(getCurrentUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        return toResponse(patient);
    }

    public PatientResponse updateCurrentPatient(UpdatePatientRequest request) {
        Patient patient = patientRepository.findByUserId(getCurrentUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));

        if (request.getPhone() != null) patient.setPhone(request.getPhone());
        if (request.getDateOfBirth() != null) patient.setDateOfBirth(request.getDateOfBirth());
        if (request.getBloodGroup() != null) patient.setBloodGroup(request.getBloodGroup());
        if (request.getAddress() != null) patient.setAddress(request.getAddress());
        if (request.getGender() != null) patient.setGender(request.getGender());
        if (request.getEmergencyContact() != null) patient.setEmergencyContact(request.getEmergencyContact());

        return toResponse(patientRepository.save(patient));
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private PatientResponse toResponse(Patient p) {
        return PatientResponse.builder()
                .id(p.getId()).userId(p.getUserId()).name(p.getName()).email(p.getEmail())
                .phone(p.getPhone()).dateOfBirth(p.getDateOfBirth()).bloodGroup(p.getBloodGroup())
                .address(p.getAddress()).gender(p.getGender()).emergencyContact(p.getEmergencyContact())
                .build();
    }
}
