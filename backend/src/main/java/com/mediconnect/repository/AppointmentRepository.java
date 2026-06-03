package com.mediconnect.repository;

import com.mediconnect.model.Appointment;
import com.mediconnect.model.AppointmentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    Page<Appointment> findByPatientIdOrderByCreatedAtDesc(String patientId, Pageable pageable);
    Page<Appointment> findByDoctorIdOrderByCreatedAtDesc(String doctorId, Pageable pageable);
    List<Appointment> findByDoctorIdAndAppointmentDate(String doctorId, String appointmentDate);
    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndStatusNot(
            String doctorId, String date, String time, AppointmentStatus status);
}
