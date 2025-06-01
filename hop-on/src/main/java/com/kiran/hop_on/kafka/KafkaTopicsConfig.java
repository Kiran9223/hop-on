package com.kiran.hop_on.kafka;

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

}
