package com.mediconnect.repository;

import com.mediconnect.model.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface DoctorRepository extends MongoRepository<Doctor, String> {
    Optional<Doctor> findByUserId(String userId);
    Optional<Doctor> findByEmail(String email);
    boolean existsByUserId(String userId);

    @Query("{ $or: [ { 'name': { $regex: ?0, $options: 'i' } }, { 'specialty': { $regex: ?0, $options: 'i' } }, { 'hospital': { $regex: ?0, $options: 'i' } } ] }")
    Page<Doctor> searchDoctors(String query, Pageable pageable);

    Page<Doctor> findBySpecialtyIgnoreCase(String specialty, Pageable pageable);
    Page<Doctor> findByAvailableTrue(Pageable pageable);
}
