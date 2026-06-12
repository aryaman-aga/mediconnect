package com.mediconnect.component;

import com.mediconnect.model.*;
import com.mediconnect.repository.AppointmentRepository;
import com.mediconnect.repository.DoctorRepository;
import com.mediconnect.repository.PatientRepository;
import com.mediconnect.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    @Autowired private UserRepository userRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PatientRepository patientRepository;
    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        boolean needsReset = userRepository.existsByEmail("sarah.johnson@mediconnect.com");
        if (needsReset) {
            log.info("Detected old seed data. Resetting database to update to Indian names...");
            appointmentRepository.deleteAll();
            doctorRepository.deleteAll();
            patientRepository.deleteAll();
            userRepository.deleteAll();
        }

        if (userRepository.count() > 0) { log.info("Database already seeded, skipping."); return; }
        log.info("Seeding database with sample data...");
        seedDoctors();
        seedPatient();
        log.info("Database seeding complete.");
    }

    private void seedDoctors() {
        record Seed(String name, String email, String specialty, String hospital, String bio,
                     String img, double rating, int reviews, int exp) {}

        List<Seed> seeds = List.of(
            new Seed("Dr. Shalini Sharma", "shalini.sharma@mediconnect.com", "Cardiology", "Delhi Heart Institute",
                "Interventional Cardiologist with 15+ years experience.", "https://randomuser.me/api/portraits/women/44.jpg", 4.9, 127, 15),
            new Seed("Dr. Manoj Kumar", "manoj.kumar@mediconnect.com", "Neurology", "Max Brain & Spine Center",
                "Board-certified neurologist specializing in epilepsy and stroke.", "https://randomuser.me/api/portraits/men/32.jpg", 4.8, 98, 12),
            new Seed("Dr. Ekta Roy", "ekta.roy@mediconnect.com", "Pediatrics", "Fortis Children's Clinic",
                "Compassionate pediatrician for newborns to teenagers.", "https://randomuser.me/api/portraits/women/68.jpg", 4.9, 214, 10),
            new Seed("Dr. Jitendra Verma", "jitendra.verma@mediconnect.com", "Orthopedics", "Apollo Sports Medicine Institute",
                "Orthopedic surgeon specializing in sports injuries and joint replacement.", "https://randomuser.me/api/portraits/men/75.jpg", 4.7, 89, 18),
            new Seed("Dr. Priya Patel", "priya.patel@mediconnect.com", "Dermatology", "Skin & Aesthetic Clinic",
                "Dermatologist specializing in medical and cosmetic dermatology.", "https://randomuser.me/api/portraits/women/26.jpg", 4.8, 156, 8),
            new Seed("Dr. Rajesh Iyer", "rajesh.iyer@mediconnect.com", "Psychiatry", "MindCare Mental Health Associates",
                "Psychiatrist providing evidence-based treatment.", "https://randomuser.me/api/portraits/men/52.jpg", 4.9, 73, 14),
            new Seed("Dr. Leela Nair", "leela.nair@mediconnect.com", "Gynecology", "Manipal Women's Health Center",
                "OB/GYN specializing in minimally invasive surgery.", "https://randomuser.me/api/portraits/women/12.jpg", 4.8, 192, 11),
            new Seed("Dr. Devendra Joshi", "devendra.joshi@mediconnect.com", "General Practice", "Narayana Family Health Clinic",
                "Family medicine physician for patients of all ages.", "https://randomuser.me/api/portraits/men/15.jpg", 4.6, 241, 7)
        );

        List<String> slots = List.of("09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
                "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM");

        for (Seed s : seeds) {
            User user = User.builder().name(s.name()).email(s.email())
                    .password(passwordEncoder.encode("password123")).role(Role.DOCTOR).build();
            user = userRepository.save(user);

            Doctor doctor = Doctor.builder()
                    .userId(user.getId()).name(s.name()).email(s.email())
                    .specialty(s.specialty()).hospital(s.hospital()).bio(s.bio())
                    .imageUrl(s.img()).rating(s.rating()).reviewCount(s.reviews())
                    .experience(s.exp()).available(true).availableSlots(slots)
                    .consultationFee("$120").education("MD, AIIMS Delhi")
                    .languages(List.of("English", "Hindi")).build();
            doctorRepository.save(doctor);
        }
    }

    private void seedPatient() {
        User user = User.builder().name("Aarav Sharma").email("patient@mediconnect.com")
                .password(passwordEncoder.encode("password123")).role(Role.PATIENT).build();
        user = userRepository.save(user);

        Patient patient = Patient.builder()
                .userId(user.getId()).name("Aarav Sharma").email("patient@mediconnect.com")
                .phone("+91 98765 43210").dateOfBirth("1995-08-15").bloodGroup("O+")
                .address("Flat 402, Shanti Kunj, Sector 21, Noida, UP 201301").gender("Male").build();
        patientRepository.save(patient);
    }
}
