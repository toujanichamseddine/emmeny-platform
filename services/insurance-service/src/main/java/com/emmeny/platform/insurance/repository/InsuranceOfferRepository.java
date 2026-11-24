package com.emmeny.platform.insurance.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.emmeny.platform.insurance.model.InsuranceOffer;
import com.emmeny.platform.insurance.model.InsuranceOffer.ProductType;

public interface InsuranceOfferRepository extends MongoRepository<InsuranceOffer, String> {

        List<InsuranceOffer> findAllByActiveTrueAndProductTypeAndMarketCountry(
            ProductType productType, String marketCountry);
}