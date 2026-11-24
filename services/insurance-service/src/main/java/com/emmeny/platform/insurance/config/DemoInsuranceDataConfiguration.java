package com.emmeny.platform.insurance.config;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.emmeny.platform.insurance.model.InsuranceOffer;
import com.emmeny.platform.insurance.model.InsuranceOffer.Coverage;
import com.emmeny.platform.insurance.model.InsuranceOffer.ProductType;
import com.emmeny.platform.insurance.repository.InsuranceOfferRepository;

@Configuration
@Profile("demo")
public class DemoInsuranceDataConfiguration {

    @Bean
    CommandLineRunner seedDemoOffers(InsuranceOfferRepository offers) {
        return args -> demoOffers().forEach(offer -> {
            if (!offers.existsById(offer.id())) {
                offers.save(offer);
            }
        });
    }

    private List<InsuranceOffer> demoOffers() {
        LocalDate validFrom = LocalDate.now();
        Instant createdAt = Instant.now();
        return List.of(
                offer("demo-motor-a", "demo-insurer-a", "Demo Assurance A", ProductType.MOTOR,
                        "RC Essentielle", "Offre fictive de responsabilité civile.", 520, 600,
                        List.of(liability()), validFrom, createdAt),
                offer("demo-motor-b", "demo-insurer-b", "Demo Assurance B", ProductType.MOTOR,
                        "Auto Sérénité", "Offre fictive avec assistance et bris de glace.", 760, 300,
                        List.of(liability(), assistance(), glass()), validFrom, createdAt),
                offer("demo-motor-c", "demo-insurer-c", "Demo Assurance C", ProductType.MOTOR,
                        "Auto Complète", "Offre fictive avec garanties étendues.", 1040, 150,
                        List.of(liability(), assistance(), glass(), theft()), validFrom, createdAt),
                offer("demo-travel-a", "demo-insurer-a", "Demo Assurance A", ProductType.TRAVEL,
                        "Séjour Auto Essentiel", "Exemple fictif pour un véhicule en déplacement en Tunisie.", 58, 0,
                        List.of(liability(), assistance()), validFrom, createdAt),
                offer("demo-travel-b", "demo-insurer-b", "Demo Assurance B", ProductType.TRAVEL,
                        "Séjour Auto Plus", "Exemple fictif pour un véhicule en déplacement en Tunisie.", 86, 0,
                        List.of(liability(), assistance(), glass(), theft()), validFrom, createdAt));
    }

    private InsuranceOffer offer(
            String id,
            String insurerId,
            String insurerName,
            ProductType productType,
            String name,
            String description,
            int premium,
            int deductible,
            List<Coverage> coverages,
            LocalDate validFrom,
            Instant createdAt) {
        return new InsuranceOffer(id, insurerId, insurerName, productType, name, description, coverages,
                BigDecimal.valueOf(premium), BigDecimal.valueOf(deductible), "TND", "TN",
                validFrom, validFrom.plusYears(1), true, createdAt);
    }

    private Coverage liability() {
        return new Coverage("LIABILITY", "Responsabilité civile", "Garantie de démonstration.", null, "TND");
    }

    private Coverage assistance() {
        return new Coverage("ASSISTANCE_24_7", "Assistance 24/7", "Garantie de démonstration.", null, "TND");
    }

    private Coverage glass() {
        return new Coverage("GLASS", "Bris de glace", "Garantie de démonstration.", null, "TND");
    }

    private Coverage theft() {
        return new Coverage("THEFT_FIRE", "Vol et incendie", "Garantie de démonstration.", null, "TND");
    }
}