package com.mediconnect.repository;

import com.mediconnect.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PatientRepository extends MongoRepository<Patient, String> {
    Optional<Patient> findByUserId(String userId);
    Optional<Patient> findByEmail(String email);
    boolean existsByUserId(String userId);
}
