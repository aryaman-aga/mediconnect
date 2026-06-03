package com.mediconnect.service;

import com.mediconnect.dto.request.AppointmentRequest;
import com.mediconnect.dto.request.UpdateAppointmentStatusRequest;
import com.mediconnect.dto.response.AppointmentResponse;
import com.mediconnect.dto.response.PageResponse;
import com.mediconnect.exception.BadRequestException;
import com.mediconnect.exception.ResourceNotFoundException;
import com.mediconnect.model.*;
import com.mediconnect.repository.AppointmentRepository;
import com.mediconnect.repository.DoctorRepository;
import com.mediconnect.repository.PatientRepository;
import com.mediconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PatientRepository patientRepository;
    @Autowired private UserRepository userRepository;

    public AppointmentResponse bookAppointment(AppointmentRequest request) {
        User user = getCurrentUser();
        if (user.getRole() != Role.PATIENT) throw new BadRequestException("Only patients can book appointments");

        Patient patient = patientRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found"));

        if (!doctor.isAvailable()) throw new BadRequestException("Doctor is not available");

        boolean slotTaken = appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndStatusNot(
                doctor.getId(), request.getAppointmentDate(), request.getAppointmentTime(), AppointmentStatus.CANCELLED);
        if (slotTaken) throw new BadRequestException("This time slot is already booked");

        Appointment appointment = Appointment.builder()
                .patientId(patient.getId()).doctorId(doctor.getId())
                .patientName(patient.getName()).doctorName(doctor.getName())
                .doctorSpecialty(doctor.getSpecialty())
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .reason(request.getReason())
                .status(AppointmentStatus.PENDING)
                .build();

        return toResponse(appointmentRepository.save(appointment), doctor.getImageUrl());
    }

    public PageResponse<AppointmentResponse> getPatientAppointments(int page, int size) {
        Patient patient = patientRepository.findByUserId(getCurrentUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        Pageable pageable = PageRequest.of(page, size);
        Page<Appointment> appointments = appointmentRepository.findByPatientIdOrderByCreatedAtDesc(patient.getId(), pageable);
        return PageResponse.from(appointments.map(a -> {
            String img = doctorRepository.findById(a.getDoctorId()).map(Doctor::getImageUrl).orElse(null);
            return toResponse(a, img);
        }));
    }

    public PageResponse<AppointmentResponse> getDoctorAppointments(int page, int size) {
        Doctor doctor = doctorRepository.findByUserId(getCurrentUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found"));
        Pageable pageable = PageRequest.of(page, size);
        Page<Appointment> appointments = appointmentRepository.findByDoctorIdOrderByCreatedAtDesc(doctor.getId(), pageable);
        return PageResponse.from(appointments.map(a -> toResponse(a, doctor.getImageUrl())));
    }

    public AppointmentResponse updateAppointmentStatus(String appointmentId, UpdateAppointmentStatusRequest request) {
        User user = getCurrentUser();
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));

        if (user.getRole() == Role.DOCTOR) {
            Doctor doctor = doctorRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found"));
            if (!appointment.getDoctorId().equals(doctor.getId()))
                throw new AccessDeniedException("You cannot modify this appointment");
        } else {
            Patient patient = patientRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
            if (!appointment.getPatientId().equals(patient.getId()))
                throw new AccessDeniedException("You cannot modify this appointment");
            if (request.getStatus() != AppointmentStatus.CANCELLED)
                throw new BadRequestException("Patients can only cancel appointments");
        }

        appointment.setStatus(request.getStatus());
        if (request.getNotes() != null) appointment.setNotes(request.getNotes());

        String img = doctorRepository.findById(appointment.getDoctorId()).map(Doctor::getImageUrl).orElse(null);
        return toResponse(appointmentRepository.save(appointment), img);
    }

    public void cancelAppointment(String appointmentId) {
        Patient patient = patientRepository.findByUserId(getCurrentUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient profile not found"));
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));
        if (!appointment.getPatientId().equals(patient.getId()))
            throw new AccessDeniedException("You cannot cancel this appointment");
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private AppointmentResponse toResponse(Appointment a, String doctorImageUrl) {
        return AppointmentResponse.builder()
                .id(a.getId()).patientId(a.getPatientId()).doctorId(a.getDoctorId())
                .patientName(a.getPatientName()).doctorName(a.getDoctorName())
                .doctorSpecialty(a.getDoctorSpecialty()).doctorImageUrl(doctorImageUrl)
                .appointmentDate(a.getAppointmentDate()).appointmentTime(a.getAppointmentTime())
                .status(a.getStatus()).reason(a.getReason()).notes(a.getNotes())
                .createdAt(a.getCreatedAt()).build();
    }
}
