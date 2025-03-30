package com.zhanghao.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.session.events.SessionCreatedEvent;
import org.springframework.session.events.SessionDeletedEvent;
import org.springframework.session.events.SessionExpiredEvent;

@Configuration
public class RedisSessionListener {
    
    private static final Logger logger = LoggerFactory.getLogger(RedisSessionListener.class);
    
    @EventListener
    public void onSessionCreated(SessionCreatedEvent event) {
        logger.info("Session Created: {}", event.getSessionId());
    }
    
    @EventListener
    public void onSessionDeleted(SessionDeletedEvent event) {
        logger.info("Session Deleted: {}", event.getSessionId());
    }
    
    @EventListener
    public void onSessionExpired(SessionExpiredEvent event) {
        logger.info("Session Expired: {}", event.getSessionId());
    }
} 