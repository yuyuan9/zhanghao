package com.zhanghao.config;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.stereotype.Component;

@Component
public class RedisHealthIndicator implements HealthIndicator {
    
    private final RedisConnectionFactory redisConnectionFactory;
    
    public RedisHealthIndicator(RedisConnectionFactory redisConnectionFactory) {
        this.redisConnectionFactory = redisConnectionFactory;
    }
    
    @Override
    public Health health() {
        try (RedisConnection connection = redisConnectionFactory.getConnection()) {
            if (connection.ping() != null) {
                return Health.up().withDetail("version", connection.info().get("redis_version")).build();
            } else {
                return Health.down().withDetail("error", "Redis server did not respond to PING").build();
            }
        } catch (Exception e) {
            return Health.down(e).build();
        }
    }
} 