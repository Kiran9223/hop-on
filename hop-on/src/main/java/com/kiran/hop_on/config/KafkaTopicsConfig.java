package com.kiran.hop_on.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicsConfig {

    @Bean
    public NewTopic rideRequestsTopic() {
        return TopicBuilder.name("ride-requests").build();
    }

    @Bean
    public NewTopic rideAcceptedTopic() {
        return TopicBuilder.name("ride-accepted").build();
    }

    @Bean
    public NewTopic driverNotificationTopic() {
        return TopicBuilder.name("driver-notifications").build();
    }

}
