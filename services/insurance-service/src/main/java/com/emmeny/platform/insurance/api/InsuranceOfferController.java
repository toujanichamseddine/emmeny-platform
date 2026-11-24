package com.emmeny.platform.insurance.api;

import java.util.List;
import java.util.Comparator;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.emmeny.platform.insurance.model.InsuranceOffer;
import com.emmeny.platform.insurance.model.InsuranceOffer.ProductType;
import com.emmeny.platform.insurance.repository.InsuranceOfferRepository;

@RestController
@RequestMapping("/api/offers")
public class InsuranceOfferController {

    private final InsuranceOfferRepository offers;

    public InsuranceOfferController(InsuranceOfferRepository offers) {
        this.offers = offers;
    }

    @GetMapping
    public List<InsuranceOffer> listOffers(
            @RequestParam ProductType productType,
            @RequestParam(defaultValue = "TN") String marketCountry) {
        return offers.findAllByActiveTrueAndProductTypeAndMarketCountry(productType, marketCountry.toUpperCase())
            .stream()
            .sorted(Comparator.comparing(InsuranceOffer::premiumAmount))
            .toList();
    }
}