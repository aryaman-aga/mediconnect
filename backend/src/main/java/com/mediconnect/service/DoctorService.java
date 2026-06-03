package com.mediconnect.service;

import com.mediconnect.dto.request.UpdateDoctorRequest;
import com.mediconnect.dto.response.DoctorResponse;
import com.mediconnect.dto.response.PageResponse;
import com.mediconnect.exception.ResourceNotFoundException;
import com.mediconnect.model.Doctor;
import com.mediconnect.model.User;
import com.mediconnect.repository.DoctorRepository;
import com.mediconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    @Autowired private DoctorRepository doctorRepository;
    @Autowired private UserRepository userRepository;

    public PageResponse<DoctorResponse> getAllDoctors(int page, int size, String search, String specialty) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("rating").descending());
        Page<Doctor> doctors;

        if (search != null && !search.isBlank()) {
            doctors = doctorRepository.searchDoctors(search.trim(), pageable);
        } else if (specialty != null && !specialty.isBlank()) {
            doctors = doctorRepository.findBySpecialtyIgnoreCase(specialty, pageable);
        } else {
            doctors = doctorRepository.findAll(pageable);
        }
        return PageResponse.from(doctors.map(this::toResponse));
    }

    public DoctorResponse getDoctorById(String id) {
        return toResponse(doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found")));
    }

    public DoctorResponse getCurrentDoctor() {
        Doctor doctor = doctorRepository.findByUserId(getCurrentUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found"));
        return toResponse(doctor);
    }

    public DoctorResponse updateCurrentDoctor(UpdateDoctorRequest request) {
        Doctor doctor = doctorRepository.findByUserId(getCurrentUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found"));

        if (request.getPhone() != null) doctor.setPhone(request.getPhone());
        if (request.getBio() != null) doctor.setBio(request.getBio());
        if (request.getHospital() != null) doctor.setHospital(request.getHospital());
        if (request.getConsultationFee() != null) doctor.setConsultationFee(request.getConsultationFee());
        if (request.getEducation() != null) doctor.setEducation(request.getEducation());
        if (request.getExperience() != null) doctor.setExperience(request.getExperience());
        if (request.getAvailable() != null) doctor.setAvailable(request.getAvailable());
        if (request.getAvailableSlots() != null) doctor.setAvailableSlots(request.getAvailableSlots());
        if (request.getLanguages() != null) doctor.setLanguages(request.getLanguages());

        return toResponse(doctorRepository.save(doctor));
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private DoctorResponse toResponse(Doctor d) {
        return DoctorResponse.builder()
                .id(d.getId()).userId(d.getUserId()).name(d.getName()).email(d.getEmail())
                .specialty(d.getSpecialty()).hospital(d.getHospital()).phone(d.getPhone())
                .bio(d.getBio()).imageUrl(d.getImageUrl()).rating(d.getRating())
                .reviewCount(d.getReviewCount()).experience(d.getExperience())
                .available(d.isAvailable()).availableSlots(d.getAvailableSlots())
                .consultationFee(d.getConsultationFee()).education(d.getEducation())
                .languages(d.getLanguages()).build();
    }
}
