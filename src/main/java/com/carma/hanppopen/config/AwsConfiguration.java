package com.carma.hanppopen.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsConfiguration {

    @Value("${aws.AWSAccessKeyId}")
    private String awsAccessKey;

    @Value("${aws.AWSSecretKey}")
    private String awsSecretKey;

    @Value("${aws.region}")
    private String awsRegion;

    public AWSStaticCredentialsProvider awsCredentials() {
        BasicAWSCredentials credentials =
                new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        return new AWSStaticCredentialsProvider(credentials);
    }

    @Bean
    public AmazonSimpleEmailService getAmazonSimpleEmailService() {
        return AmazonSimpleEmailServiceClientBuilder.standard().withCredentials(awsCredentials())
                .withRegion(awsRegion).build();
    }
}