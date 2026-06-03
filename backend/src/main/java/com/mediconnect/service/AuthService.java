package com.mediconnect.service;

import com.mediconnect.dto.request.LoginRequest;
import com.mediconnect.dto.request.RegisterRequest;
import com.mediconnect.dto.response.AuthResponse;
import com.mediconnect.exception.BadRequestException;
import com.mediconnect.model.*;
import com.mediconnect.repository.DoctorRepository;
import com.mediconnect.repository.PatientRepository;
import com.mediconnect.repository.UserRepository;
import com.mediconnect.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PatientRepository patientRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserDetailsService userDetailsService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already in use");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        user = userRepository.save(user);

        String profileId;

        if (request.getRole() == Role.DOCTOR) {
            Doctor doctor = Doctor.builder()
                    .userId(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .specialty(request.getSpecialty() != null ? request.getSpecialty() : "General Practice")
                    .hospital(request.getHospital() != null ? request.getHospital() : "")
                    .phone(request.getPhone() != null ? request.getPhone() : "")
                    .bio(request.getBio() != null ? request.getBio() : "")
                    .experience(request.getExperience() != null ? request.getExperience() : 0)
                    .consultationFee(request.getConsultationFee() != null ? request.getConsultationFee() : "$100")
                    .education(request.getEducation() != null ? request.getEducation() : "")
                    .available(true)
                    .build();
            profileId = doctorRepository.save(doctor).getId();
        } else {
            Patient patient = Patient.builder()
                    .userId(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .phone(request.getPhone() != null ? request.getPhone() : "")
                    .dateOfBirth(request.getDateOfBirth() != null ? request.getDateOfBirth() : "")
                    .bloodGroup(request.getBloodGroup() != null ? request.getBloodGroup() : "")
                    .address(request.getAddress() != null ? request.getAddress() : "")
                    .gender(request.getGender() != null ? request.getGender() : "")
                    .build();
            profileId = patientRepository.save(patient).getId();
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        return AuthResponse.builder()
                .token(jwtUtil.generateToken(userDetails))
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .profileId(profileId)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (user.getRole() != request.getRole()) {
            throw new BadRequestException("Account not registered as " + request.getRole().name().toLowerCase());
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        String profileId = null;
        if (user.getRole() == Role.DOCTOR) {
            profileId = doctorRepository.findByUserId(user.getId()).map(Doctor::getId).orElse(null);
        } else {
            profileId = patientRepository.findByUserId(user.getId()).map(Patient::getId).orElse(null);
        }

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .profileId(profileId)
                .build();
    }
}
